define(["app", "tpl!apps/video/edit/tpl/video-edit-form.tpl",
        "tpl!apps/video/edit/tpl/video-translation-view.tpl",
        "tpl!apps/video/edit/tpl/video-translation-iv.tpl",
        "tpl!apps/video/edit/tpl/modal-create-email.tpl", "moment", "dropzone",
        "redactor", "jquery-ui", "masked-input", "chosen", "time-picker",
        "toggles", "fileupload", "select2"],
    function (App, videoEditFormTpl, videoTranslationView, videoTranslationItemView, createEmailModalView, moment, Dropzone) {

        App.module('Video.Edit', function (Edit, App, Backbone, Marionette, $, _) {

            Edit.VideoTranslationItemView = Marionette.ItemView.extend({
                tagName: 'tr',
                template: videoTranslationItemView,

                initialize: function (options) {
                    this.options = options;
                    this.model.bind("change", this.render, this);
                    this.listenTo(this.model, 'change', this.render);
                },

                events: {
                    'click .js-btn-edit': 'editVideoTranslation',
                    'click .js-btn-delete': 'deleteVideoTranslation'
                },

                onShow: function () {
                    var lang = App.getLangJson();
                    if (this.model.get('locale')) {
                        $(this.$el.children().get()[0]).text(lang[this.model.get('locale')].name);
                    }
                },

                editVideoTranslation: function () {
                    var video_id = this.options.video_id;
                    var video_translation = this.model;
                    Edit.Controller.showVideoTranslationView(video_id, this.model.collection, video_translation);
                },

                deleteVideoTranslation: function () {
                    if (confirm('Are you sure you want to delete this?')) {
                        var video_translation = this.model;
                        video_translation.set({
                            id: this.model.get('locale')
                        });

                        video_translation.destroy({
                            success: function () {
                                jQuery.gritter.add({
                                    title: 'Translation Deleted',
                                    class_name: 'growl-success'
                                });
                            },
                            error: function () {
                                jQuery.gritter.add({
                                    title: 'Error',
                                    class_name: 'growl-error',
                                });
                            }
                        });
                    }
                }
            });

            Edit.FormView = Marionette.CompositeView.extend({
                template: videoEditFormTpl,
                tagName: 'div',
                className: '',
                itemView: Edit.VideoTranslationItemView,
                itemViewContainer: '.js-video-translations-container',

                serializeData: function(){
                    return {
                        model: this.model.toJSON(),
                        mediaLibrary: (this.options.mediaLibrary) ? this.options.mediaLibrary.toJSON() : null,
                        note: (this.options.note) ? this.options.note.toJSON() : null
                    };
                },

                itemViewOptions: function (model, index) {
                    return {
                        video_id: this.options.model.get('id')
                    }
                },

                initialize: function () {
                    var view = this;
                    this.model.bind("change", this.initFormData, this);
                    this.listenTo(this.model, 'change', this.initFormData);
                    this.options.note.bind("change", this.initVideoNoteDisplay, this);
                    this.listenTo(this.options.note, 'change', this.initVideoNoteDisplay);

                    if (this.options.mediaLibrary) {
                        this.options.mediaLibrary.fetch({
                            video_id: view.model.get('id'),
                            success: function(model) {
                                view.initMediaLibraryDisplay();
                            }
                        });
                    }

                    // if (this.options.note) {
                    //     this.options.note.fetch({
                    //         video_id: view.model.get('id'),
                    //         success: function(model) {
                    //             view.initVideoNoteDisplay();
                    //         }
                    //     });
                    // }
                },

                onShow: function () {
                    var self = this;
                    var video = this.model;

                    if (!this.model.get('id')) {
                        this.initEmptyForm();
                    }

                    $('.js-video-tabs a[href="#basic"]').tab('show');

                    $('.wysiwyg').redactor({
                        buttons: ['bold', 'italic', '|', 'link', 'unorderedlist', 'orderedlist', 'html']
                    });

                    // $('#duration, #credits_start').mask("99:99:99");
                    $('.chosen-select').chosen({'width': '100%', 'white-space': 'nowrap'});

                    $('#genres').select2({tags: ["Action", "Animation", "Comedy", "Documentary", "Drama", "Experimental", "Family", "Horror", "Sci-Fi", "Thriller"]});
                    $("#topics").select2({tags: ["Community", "Childhood", "Crime", "Family", "Friendship", "Health", "Hope", "Identity", "Inspiration", "Love", "Politics", "Sexuality"]});
                    $("#meta_tags").select2({tags: ["Abuse", "Art", "Beauty", "Childhood", "Community", "Conquest", "Conspiracy", "Corruption", "Crime", "Death", "Desperation", "Diversity", "Economy", "Environment", "Family", "Food", "Friendship", "Gender", "Greed", "Growth", "Health", "Hope", "Human Nature", "Human Rights", "Identity", "Immigration", "Inspiration", "LGBT", "Life & Society", "Loss", "Love", "Music", "Nature", "Other Worlds", "Parenting", "Perseverance", "Politics", "Poverty", "Reality", "Redemption", "Religion", "Revenge", "Sexuality", "Social Justice", "Technology", "Travel", "Youth"]});


                    $('#video_file_input').on('change', function () {
                        if (self.model.get('id')) {
                            self.uploadVideoFile();
                        } else {
                            self.saveVideo(function () {
                                self.uploadVideoFile();
                            });
                        }
                    });

                    // Initialize the Media Library
                    this.initMediaLibrary();
                },

                onRender: function () {
                    if (!this.model.get('id')) {
                        this.initEmptyForm();
                    }

                },

                initMediaLibrary: function() {
                    var view = this;
                    // Global variable to keep track number of parts left
                    view.progress = 0;
                    view.totalParts = 0;

                    // This is to initialize Dropzone
                    view.mediaLibraryDropzone = new Dropzone("#media-library-dropzone", {
                        // autoProcessQueue: false,
                        init: function() {
                            this.on("sending", function(file, http, formData) {
                                // Hide Dropzone
                                $('#media-library-dropzone').hide();
                                $('.media-progress-bar').show();

                                var fileName = file.name.split('.')[0].split(" ").join("_");
                                var fileExt = file.name.split('.')[file.name.split('.').length - 1];
                                var date = new Date().toGMTString();
                                $.ajax({
                                    type: 'GET',
                                    url: App.apiURL + 'admin/video/' + view.model.get('id') + '/media/upload_signature?to_sign=' + view.generateStringToSignInitiate(date, fileExt, fileName),
                                }).done(function(res) {
                                    view.initiateMultipartUpload(res, http, fileExt, date, file);
                                });
                            });
                        }
                    });
                },

                initiateMultipartUpload: function(signature, http, fileExt, date, file) {
                    var view = this;
                    var fileName = file.name.split('.')[0].split(" ").join("_");

                    // Determine the total number of parts needed.
                    var blobSize = 5.0 * 1024.0 * 1024.0;
                    var totalFileSize = file.size;
                    var totalNumberOfParts = Math.ceil(totalFileSize / blobSize);
                    view.progress += totalNumberOfParts;
                    view.totalParts += totalNumberOfParts;

                    var ETags = [];
                    var url = 'https://viddsee.s3.amazonaws.com/' + App.s3Folder + view.model.get('id') + '/' + fileName + '.'+fileExt+'?uploads';
                    http.open("POST", url, true);
                    http.setRequestHeader("Authorization", 'AWS AKIAIZM3RQRE5XANYRAA:' + signature);
                    http.setRequestHeader("x-amz-date", date);
                    http.setRequestHeader('x-amz-acl', 'public-read');
                    http.onreadystatechange = function() {
                        if(http.readyState == 4 && http.status == 200) {
                            var UploadId = XMLParser(http.responseText, 'UploadId');
                            view.uploadPart(file, UploadId, 1, ETags);
                        }
                    };
                    http.send();
                },

                uploadPart: function(file, UploadId, partNumber, ETags) {
                    var view = this;
                    var date = new Date().toGMTString();
                    var fileName = file.name.split('.')[0].split(" ").join("_");
                    var fileExt = file.name.split('.')[file.name.split('.').length - 1];
                    var xhr = new XMLHttpRequest();
                    var shouldContinue = true;

                    // File slicing is done here!
                    // All calculations here are done in bytes
                    var blobSize = 5.0 * 1024.0 * 1024.0;
                    var totalFileSize = file.size;
                    var startPos = (partNumber - 1.0) * blobSize;
                    var endingPos = partNumber * blobSize;

                    // Remainder is lesser than allocated blob size => last part of file
                    if (totalFileSize - startPos < blobSize) {
                        shouldContinue = false;
                        endingPos = totalFileSize;
                    }

                    var blob = file.slice(startPos, endingPos); // 5mb blobs


                    $.ajax({
                        type: 'GET',
                        url: App.apiURL + 'admin/video/' + view.model.get('id') + '/media/upload_signature?to_sign=' + view.generateStringToSignUploadPart(date, file.type, fileExt, partNumber, UploadId, fileName),
                    }).done(function(res) {
                        var url = 'https://viddsee.s3.amazonaws.com/' + App.s3Folder + view.model.get('id') + '/' + fileName + '.' + fileExt + '?' + 'partNumber=' + partNumber + '&uploadId=' + UploadId;
                        xhr.open("PUT", encodeURI(url), true);
                        xhr.setRequestHeader("Authorization", 'AWS AKIAIZM3RQRE5XANYRAA:' + res);
                        xhr.setRequestHeader("x-amz-date", date);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                // Update progress here
                                view.progress -= 1;
                                $('.media-progress-bar > div').css('width', (view.totalParts - view.progress) / view.totalParts * 100 + '%');

                                var ETagString = xhr.getResponseHeader('ETag');
                                ETags.push({
                                    PartNumber: partNumber,
                                    ETag: ETagString.substring(1, ETagString.length - 1)
                                });
                                if (shouldContinue) {
                                    // view.updateMultipartInfo(UploadId);
                                    view.uploadPart(file, UploadId, partNumber + 1, ETags);
                                } else {
                                    view.completeMultipartUpload(UploadId, file, ETags);
                                }
                            }
                        };
                        xhr.send(blob);
                    });
                },

                completeMultipartUpload: function(UploadId, file, ETags) {
                    var view = this;
                    var fileName = file.name.split('.')[0].split(" ").join("_");
                    var fileExt = file.name.split('.')[file.name.split('.').length - 1];
                    var date = new Date().toGMTString();

                    // Create XML String to complete the multipart upload
                    var XMLObject = '<CompleteMultipartUpload>';
                    for (var i = 0; i < ETags.length; i++) {
                        XMLObject += '<Part><PartNumber>' + ETags[i].PartNumber + '</PartNumber>';
                        XMLObject += '<ETag>' + ETags[i].ETag + '</ETag></Part>'
                    }
                    XMLObject += '</CompleteMultipartUpload>';

                    $.ajax({
                        type: 'GET',
                        url: App.apiURL + 'admin/video/' + view.model.get('id') + '/media/upload_signature?to_sign=' + view.generateStringToComplete(date, fileExt, UploadId, fileName),
                    }).done(function(res) {
                        var http = new XMLHttpRequest();
                        var url = 'https://viddsee.s3.amazonaws.com/' + App.s3Folder + view.model.get('id') + '/' + fileName + '.'+fileExt+'?uploadId='+UploadId;
                        http.open("POST", encodeURI(url), true);
                        http.setRequestHeader("Authorization", 'AWS AKIAIZM3RQRE5XANYRAA:' + res);
                        http.setRequestHeader("x-amz-date", date);
                        http.setRequestHeader("Content-Type", "application/xml; charset=UTF-8");
                        http.onreadystatechange = function() {
                            if(http.readyState == 4 && http.status == 200) {
                                var location = XMLParser(http.responseText, 'Location');
                                view.createMediaItem(location, file);
                            }
                        };
                        http.send(XMLObject);
                    });
                },

                generateStringToSignInitiate: function(date, fileType, fileName) {
                    return escape('POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:'+date+'\n/viddsee/'+App.s3Folder+this.model.get('id')+'/'+fileName+'.'+fileType+'?uploads');
                },

                generateStringToSignUploadPart: function(date, fileType, fileExt, partNumber, UploadId, fileName) {
                    return escape('PUT\n\n\n\nx-amz-date:'+date+'\n/viddsee/'+App.s3Folder+this.model.get('id')+'/'+fileName+'.'+fileExt+'?'+'partNumber='+partNumber+'&uploadId='+UploadId);
                },

                generateStringToComplete: function(date, fileType, UploadId, fileName) {
                    return escape('POST\n\napplication/xml; charset=UTF-8\n\nx-amz-date:'+date+'\n/viddsee/'+App.s3Folder+this.model.get('id')+'/'+fileName+'.'+fileType+'?uploadId='+UploadId);
                },

                createMediaItem: function(location, file) {
                    var view = this;
                    var data = {
                        name: file.name.split('.')[0].split(" ").join("_"),
                        description: '',
                        file_url: location,
                        mimetype: file.type,
                        multiupload_info: ''
                    };
                    $.ajax({
                        url: App.apiURL + 'admin/video/' + this.model.get('id') + '/media',
                        dataType: 'json',
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(data),
                    }).done(function(res) {
                        view.options.mediaLibrary.fetch({
                            video_id: view.model.get('id'),
                            success: function(model) {
                                view.initMediaLibraryDisplay();
                            }
                        });
                    });
                },

                initMediaLibraryDisplay: function() {
                    var html = '';
                    var mediaItems = this.options.mediaLibrary.models;

                    for (var i in mediaItems) {
                        var mediaItem = mediaItems[i];

                        // Determine the icon to be used
                        var mimeType = mediaItem.get('mimetype');
                        var fileType = '.' + mimeType.split('/')[1];
                        var fileIcon = 'fa-file-o';
                        if (mimeType.indexOf('image') > -1) {
                            fileIcon = 'fa-file-photo-o';
                        } else if (mimeType.indexOf('video') > -1) {
                            fileIcon = 'fa-file-video-o';
                        }

                        html += '<div class="col-sm-4">';
                        html += '<div class="panel panel-default widget-photoday media-item-container">';
                        html += '<div class="media-description-container">'
                        html += '</br><i class="fa fa-5x ' + fileIcon + '"></i></br></br>';
                        html += mediaItem.get('name') + fileType + '</br>';
                        html += '</div>'
                        html += '<ul class="photo-meta">';
                        html += '<li><a href=' + mediaItem.get('file_url') + '><i class="fa fa-download"></i> Download</a></li>';
                        html += '<li><a class="js-delete-media-item delete-media-btn" data-id="'+mediaItem.get('id')+'"><i class="fa fa-trash-o"></i> Delete</a></li>';
                        html += '</ul>';
                        html += '</div>';
                        html += '</div>';
                    }
                    $('#media-library-display').html(html);

                    // Only reset dropzone when all files are uploaded.
                    if (this.progress === 0) {
                        this.totalParts = 0;
                        $('#media-library-dropzone').show();
                        $('.media-progress-bar').css('display', 'none');
                        $('.media-progress-bar > div').css('width', '0%');
                        this.mediaLibraryDropzone.removeAllFiles();
                    }

                    // Attach delete event to media items
                    var view = this;
                    $('.js-delete-media-item').click(function(e) {
                        var target = e.currentTarget;
                        var id = $(target).data('id');
                        view.deleteMediaItem(id);
                    });

                    // Init pagination
                    var total_pages = this.options.mediaLibrary.totalPages;
                    var current_page = this.options.mediaLibrary.currentPage;
                    var pages_in_range = this.options.mediaLibrary.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
                },

                initVideoNoteDisplay: function() {
                    var video_note = this.options.note;
                    if (video_note) {
                        $('#note').val(video_note.get('note'));
                        $('#collapse-note').collapse();
                    }
                },

                deleteMediaItem: function(id) {
                    var view = this;
                    $.ajax({
                        url: App.apiURL + 'admin/video/' + this.model.get('id') + '/media/' + id,
                        dataType: 'json',
                        type: "DELETE",
                        contentType: "application/json; charset=utf-8",
                    }).done(function(res) {
                        view.options.mediaLibrary.fetch({
                            video_id: view.model.get('id'),
                            success: function(model) {
                                view.initMediaLibraryDisplay();
                            }
                        });
                    });
                },

                uploadVideoFile: function () {
                    var file = $('#video_file_input')[0].files[0];
                    var video = this.model;
                    video.uploadVideoFile(file, {
                        progress: function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                var progress_string = Math.round(percentComplete * 100) + "%";
                                $('#source_url').val(progress_string);
                                $('#tc_source_url').val(progress_string);
                            }
                        },  // progress
                        success: function (file_url) {
                            jQuery.gritter.add({
                                title: 'Uploading Complete...',
                                class_name: 'growl-success',
                            });
                            $('#source_url').val(file_url);
                            $('#tc_source_url').val(file_url);
                            $('.js-transcode').removeAttr('disabled');
                        } // success
                    }); // video.uploadVideoFile
                },

                goToPageClicked: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var page = e.target.attributes['data-page'].value;
                    this.goToPage(page);
                },

                goToPage: function (page) {

                    // Update Pagination
                    var total_pages = this.options.mediaLibrary.totalPages;
                    var current_page = parseInt(page,10);
                    var pages_in_range = this.options.mediaLibrary.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
                    $('.js-video-grid').html("");

                    var view = this;
                    this.options.mediaLibrary.goTo(page,{
                        update: true,
                        remove: true,
                        success: function () {
                            view.initMediaLibraryDisplay();
                        }
                    });
                },

                showRangeCenteredOnPage: function (current_page, total_pages, pages_in_range) {
                    // Forces pagination to only show maximum 5 page button
                    pages_in_range = 2;
                    var html = "", start, end, prev_html, next_html, first_html, last_html;
                    if(total_pages > 1){
                        if(total_pages > 9){
                            if((current_page - pages_in_range - 1) < 0){
                                start = 0;
                                end = pages_in_range * 2 + 1;
                                prev_html = '<li class="disabled"><a>&laquo;</a></li>';
                                next_html = '<li><a class="js-page" data-page="'+(end)+'">&raquo;</a></li>';
                                first_html = '';
                                last_html = '<li><a class="js-page" data-page="'+(total_pages - 1)+'">Last</a></li>';
                            }else if ((current_page + pages_in_range + 1) > total_pages){
                                start = total_pages - ((pages_in_range * 2) + 1);
                                end = total_pages;
                                prev_html = '<li><a class="js-page" data-page="'+(start - 1)+'">&laquo;</a></li>';
                                next_html = '<li class="disabled"><a>&raquo;</a></li>';
                                first_html = '<li><a class="js-page" data-page="0">First</a></li>';
                                last_html = '';

                            }else{
                                start = current_page - pages_in_range;
                                end = current_page + pages_in_range;
                                prev_html = '<li><a class="js-page" data-page="'+(start - 1)+'">&laquo;</a></li>';
                                next_html = '<li><a class="js-page" data-page="'+(end)+'">&raquo;</a></li>';
                                first_html = '<li><a class="js-page" data-page="0">First</a></li>';
                                last_html = '<li><a class="js-page" data-page="'+(total_pages - 1)+'">Last</a></li>';
                            }
                            html += first_html;
                            html += prev_html;
                            for (var i = start; i < end; i++){
                                if(i == current_page)
                                    html += '<li class="active"><a data-page="'+i+'">'+(i + 1)+'</a></li>';
                                else
                                    html += '<li><a class="js-page" data-page="'+i+'">'+(i + 1)+'</a></li>';
                            }
                            html += next_html;
                            html += last_html;
                        }else{
                            start = 0;
                            end = total_pages;
                            for (var i = start; i < end; i++){
                                if(i == current_page)
                                    html += '<li class="active"><a data-page="'+i+'">'+(i + 1)+'</a></li>';
                                else
                                    html += '<li><a class="js-page" data-page="'+i+'">'+(i + 1)+'</a></li>';
                            }
                        }

                        $('ul.pagination').html(html);
                    }
                },

                initEmptyForm: function () {
                    var year_spinner = $('#year').spinner();
                    year_spinner.spinner('value', 2014);

                    $('.datepicker').datepicker();
                    $('.js-published-date').datepicker('setDate', new Date());
                    $('.js-published-time').timepicker();
                    $('.js-programme-time').timepicker({
                        defaultTime: false
                    });
                    $('.toggle').toggles();
                },

                initFormData: function () {
                    var self = this;

                    //Basic
                    $('#title').val(this.model.get('title'));
                    $('#friendly_url').val(this.model.get('friendly_url'));
                    this.updatePreviewURL();

                    // Toggles
                    $('#published').toggles({on: this.model.get('published')});
                    $('#published').on('toggle', function (e, active) {
                        self.published = active;
                    });
                    $('#featured').toggles({on: this.model.get('featured')});
                    $('#featured').on('toggle', function (e, active) {
                        self.featured = active;
                    });
                    $('#advertising').toggles({on: this.model.get('advertising')});
                    $('#advertising').on('toggle', function (e, active) {
                        self.advertising = active;
                    });
                    $('#excluded').toggles({on: this.model.get('excluded')});
                    $('#excluded').on('toggle', function (e, active) {
                        self.excluded = active;
                    });
                    $('#do_not_show').toggles({on: this.model.get('do_not_show')});
                    $('#do_not_show').on('toggle', function (e, active) {
                        self.do_not_show = active;
                    });
                    $('#tc_watermark').toggles({on: true});
                    self.tc_watermark = true;
                    $('#tc_watermark').on('toggle', function (e, active) {
                        self.tc_watermark = active;
                    });

                    var published_date;
                    if (this.model.get('published_date') == null || this.model.get('published_date') == '1970-01-01T00:00:00Z') {
                        // Manual check for 1970-01-01T00:00:00Z for films that already have that date.
                        published_date = new Date();
                    } else {
                        published_date = new Date(this.model.get('published_date'));
                    }
                    $('.js-published-date').datepicker();
                    $('.js-published-date').datepicker('setDate', published_date);
                    $('.js-published-time').timepicker();

                    var hours = published_date.getHours() > 12 ? (published_date.getHours() % 12) : published_date.getHours();
                    var ampm = published_date.getHours() >= 12 ? 'PM' : 'AM';
                    var minutes = published_date.getMinutes();
                    var time_string = hours + ":" + minutes + " " + ampm;
                    $('.js-published-time').timepicker('setTime', time_string);

                    var programme_date = new Date(this.model.get('republished_date'));
                    $('.js-programme-date').datepicker();
                    if (this.model.get('republished_date')) {
                        $('.js-programme-date').datepicker('setDate', programme_date);
                    }

                    $('.js-programme-time').timepicker({
                        defaultTime: false
                    });

                    if (this.model.get('republished_date')) {
                        var re_hours = programme_date.getHours() > 12 ? (programme_date.getHours() % 12) : programme_date.getHours();
                        var re_ampm = programme_date.getHours() >= 12 ? 'PM' : 'AM';
                        var re_minutes = programme_date.getMinutes();
                        var re_time_string = re_hours + ":" + re_minutes + " " + re_ampm;
                        $('.js-programme-time').timepicker('setTime', re_time_string);
                    }

                    //Advanced
                    $('#year').val(this.model.get('year'));
                    $('#description_short').val(this.model.get('description_short'));
                    $('#description_long').redactor('set', this.model.get('description_long'));
                    $('#directors').val(this.model.get('directors'));
                    $('#cast').val(this.model.get('cast'));
                    // $('#crew').val(this.model.get('crew'));
                    $('#festivals').redactor('set', this.model.get('festivals'));

                    if (this.model.get('country')) {
                        var countries = this.model.get('country').split(',');
                        $('#country').val(countries);
                        $('#country').trigger("chosen:updated");
                    }

                    $('#language').val(this.model.get('language'));

                    $('#subtitle_language').val(this.model.get('subtitle_language'));

                    if (this.model.get('genres')) {
                        var genres = this.model.get('genres').split(',');
                        $('#genres').val(genres).trigger("change");
                        ;
                    }

                    if (this.model.get('topics')) {
                        var topics = this.model.get('topics').split(',');
                        $('#topics').val(topics).trigger("change");
                        ;
                    }

                    if (this.model.get('meta_tags')) {
                        var meta_tags = this.model.get('meta_tags').split(',');
                        $('#meta_tags').val(meta_tags).trigger("change");
                        ;
                    }

                    // $('#period').val(this.model.get('period'));

                    if (this.model.get('content_rating')) {
                        var content_rating = this.model.get('content_rating').split(',');
                        $('#content_rating').val(content_rating);
                        $('#content_rating').trigger('chosen:updated');
                    }

                    $('#website_url').val(this.model.get('website_url'));
                    $('#embed_url').val(this.model.get('embed_url'));
                    $('#fb_page_url').val(this.model.get('fb_page_url'));
                    $('#tw_handle').val(this.model.get('tw_handle'));
                    // $('#tw_hashtag').val(this.model.get('tw_hashtag'));

                    if (this.model.get('bucket')) {
                        var bucket = this.model.get('bucket');
                        $('#bucket').val(bucket);
                        $('#bucket').trigger('chosen:updated');
                    }

                    //Images
                    $('#coverphoto').attr('src', this.model.get('photo_large_url'));

                    //Video File
                    $('#duration').val(this.model.get('duration'));
                    $('#credits_start').val(time_s_to_hms(this.model.get('credits_start')));
                    $('#vimeo_ids').val(this.model.get('vimeo_ids'));
                    this.setVideoSourcesURL();

                    //Creator
                    if (this.model.get('creator_name') || this.model.get('creator_email') || this.model.get('rights_general') || this.model.get('rights_advertising')) {
                        $('.js-video-tabs a[href="#creator"]').show();
                        $('#creator_name').val(this.model.get('creator_name'));
                        $('#creator_email').val(this.model.get('creator_email'));
                        $('#rights_third_party').toggles({on: this.model.get('rights_general'), click: false});
                        $('#rights_monetisation').toggles({on: this.model.get('rights_advertising'), click: false});
                    }

                    // Referral
                    if (this.model.get('referral')) {
                        $('#creator_referral').val(this.model.get('referral'));
                    }
                    // The referral field is disabled by default
                    // Only then the video is from a submission, then we allow editing of referral
                    if (this.model.get('creator_name') && this.model.get('creator_email')) {
                        $('#creator_referral').removeAttr('readonly');
                    }

                    // Transcode Jobs
                    if (this.model.get('transcoding_jobs').length) {
                        var jobs = this.model.get('transcoding_jobs');
                        $('.js-transcoding-jobs-container').show();
                        $('.js-transcoding-jobs').html('');
                        jobs.forEach(function (job) {
                            var row_html = '<tr>';
                            row_html += '<td>' + job.job_type + '</td>';
                            row_html += '<td>' + job.status + '</td>';
                            row_html += '<td><input onClick="this.select();" class="form-control" value="' + job.filename + '" readonly></td>';
                            row_html += '</tr>';
                            $('.js-transcoding-jobs').append(row_html);

                            self.setTranscodedSourcesURL(job);
                        });
                    }
                },

                setTranscodedSourcesURL: function (job) {
                    if (job.job_type == "mp4_hd" && $('#hosted_hd').val() == "") {
                        $('#hosted_hd').val(job.filename);
                    } else if (job.job_type == "mp4_sd" && $('#hosted_sd').val() == "") {
                        $('#hosted_sd').val(job.filename);
                    } else if (job.job_type == "mp4_mo" && $('#hosted_mo').val() == "") {
                        $('#hosted_mo').val(job.filename);
                    }
                },

                setVideoSourcesURL: function () {
                    var self = this;
                    var sources = this.model.get('sources');
                    for (var i in sources) {
                        var source = sources[i];
                        switch (source.source_type) {
                            case 'vimeo_mo':
                                $('#vimeo_mo').val(source.url);
                                break;
                            case 'vimeo_sd':
                                $('#vimeo_sd').val(source.url);
                                break;
                            case 'vimeo_hd':
                                $('#vimeo_hd').val(source.url);
                                break;
                            case 'vimeo_hls':
                                $('#vimeo_hls').val(source.url);
                                break;
                            case 'hosted_mo':
                                $('#hosted_mo').val(source.url);
                                break;
                            case 'hosted_sd':
                                $('#hosted_sd').val(source.url);
                                break;
                            case 'hosted_hd':
                                $('#hosted_hd').val(source.url);
                                break;
                            case 'youtube':
                                $('#youtube').val(source.url);
                                break;
                            /*case 'hosted_hls':
                             $('#hosted_hls').val(source.url);
                             break;*/
                            case 'source':
                                $('#video_file_source_url').attr('src', source.url);
                                $('#tc_source_url').val(source.url);
                                $('#source_url').val(source.url);
                                $('.js-transcode').removeAttr('disabled');
                                var vid = document.getElementById("video_file_source_url");
                                vid.addEventListener('loadedmetadata', function () {
                                    if ($('#duration').val() == "" || self.model.get('creator_name') || self.model.get('creator_email')) {
                                        $('#duration').val(Math.ceil(vid.duration / 60));
                                    }
                                });
                                break;
                            default:
                                break;
                        }
                    }
                },

                saveVideoSources: function () {
                    this.saveVideoSource("vimeo_mo");
                    this.saveVideoSource("vimeo_sd");
                    this.saveVideoSource("vimeo_hd");
                    this.saveVideoSource("vimeo_hls");
                    this.saveVideoSource("hosted_mo");
                    this.saveVideoSource("hosted_sd");
                    this.saveVideoSource("hosted_hd");
                    // this.saveVideoSource("hosted_hls");
                    this.saveVideoSource("youtube");
                },

                saveVideoSource: function (source_name) {
                    var video = this.model;
                    video.saveSource(source_name, $('#' + source_name).val(), "published", function (err) {
                        if (err)
                            console.log(err);
                    });
                },

                events: {
                    'keyup #friendly_url': 'videoUrlKeyUp',
                    'keyup #title': 'videoTitleKeyUp',
                    'click .js-upload-photo': 'uploadCoverphoto',
                    'click .js-save': 'saveVideoClicked',
                    'click .js-delete': 'deleteVideo',
                    'click .js-transcode': 'transcodeVideo',
                    'click .js-new-video-translation-btn': 'newVideoTranslationClicked',
                    'click .js-page': 'goToPageClicked',
                    'click .js-save-note': 'saveNote',
                },  // /events

                videoUrlKeyUp: function (e) {
                    this.updatePreviewURL();
                },

                updatePreviewURL: function () {
                    var video_url = $('#friendly_url').val();
                    var preview_url = "https://www.viddsee.com/video/" + video_url + '/' + this.model.get('id');
                    $('.js-preview-url').val(preview_url);
                },

                videoTitleKeyUp: function (e) {
                    if (!this.model.get('friendly_url')) {
                        var titleKeyed = $('#title').val();
                        var titleStripped = titleKeyed.replace(/["']/g, "").replace(/[^a-z0-9]+/gi, '-').toLowerCase();
                        titleStripped = titleStripped.replace(/-$/gm, "");
                        $('#friendly_url').val(titleStripped);
                        this.updatePreviewURL();
                    }
                },

                uploadCoverphoto: function (e) {
                    var self = this;
                    if (this.model.get('id')) {
                        self.showImageUploaderModal();
                    } else {
                        self.saveVideo(function () {
                            self.showImageUploaderModal();
                        });
                    }
                },

                showImageUploaderModal: function () {
                    var self = this;
                    self.updateModel();
                    require(["apps/modal/image-upload/image-upload"], function () {
                        var config = {
                            url: App.apiURL + "video/photo/upload",
                            success: function (data, res) {
                                $('#coverphoto').attr('src', res.photo_large_url);
                                self.model.set({
                                    'thumbnail_url': res.thumbnail_url,
                                    'photo_large_url': res.photo_large_url,
                                    'photo_medium_url': res.photo_medium_url,
                                    'photo_small_url': res.photo_small_url
                                });
                                $('.modal').modal('hide');
                            },
                            progress: function (file, percentage, bytesent) {
                                // console.log("percent: ", percentage);
                            }
                        };
                        App.trigger("imageupload:show", config);

                    });
                },

                updateModel: function () {
                    var published_date = new Date($('.js-published-date').val() + " " + $('.js-published-time').val());
                    var programme_date = new Date($('.js-programme-date').val() + " " + $('.js-programme-time').val());
                    if (!moment(programme_date).isValid() || programme_date < published_date) {
                        programme_date = null;
                    }
                    var duration = $('#duration').val();
                    var credits_start = time_hms_to_s($('#credits_start').val());
                    var vimeoIds = $('#vimeo_ids').val();
                    var country = ($('#country').val()) ? $('#country').val().join(',') : "";
                    var content_rating = ($('#content_rating').val()) ? $('#content_rating').val().join(',') : "";

                    //Basic
                    var video = this.model;

                    // Save prev state of published for creation of email
                    this.wasPublished = this.model.get('published');

                    video.set({
                        'title': $('#title').val(),
                        'friendly_url': $('#friendly_url').val(),
                        'published': this.published,
                        'featured': this.featured,
                        'advertising': this.advertising,
                        'excluded': this.excluded,
                        'do_not_show': this.do_not_show,
                        'published_date': published_date,
                        'republished_date': programme_date,
                        'year': $('#year').val(),
                        'description_short': $('#description_short').val(),
                        'description_long': $('#description_long').val(),
                        'directors': $('#directors').val(),
                        'cast': $('#cast').val(),
                        // 'crew': $('#crew').val(),
                        'festivals': $('#festivals').val(),
                        'country': country,
                        'language': $('#language').val(),
                        'subtitle_language': $('#subtitle_language').val(),
                        'genres': $('#genres').val(),
                        'topics': $('#topics').val(),
                        'meta_tags': $('#meta_tags').val(),
                        // 'period': $('#period').val(),
                        'content_rating': content_rating,
                        'website_url': $('#website_url').val(),
                        'fb_page_url': $('#fb_page_url').val(),
                        'tw_handle': $('#tw_handle').val(),
                        'bucket': $('#bucket').val(),
                        'embed_url': $('#embed_url').val(),
                        // 'tw_hashtag': $('#tw_hashtag').val(),
                        //Video File
                        'duration': duration,
                        'credits_start': credits_start,
                        'vimeo_ids': vimeoIds,
                        // Referral
                        'referral': $('#creator_referral').val()
                    });

                },  // updateModel

                updateNote: function() {
                    var note = this.options.note;

                    note.set({
                        'note': $('#note').val()
                    });
                }, // updateNote

                saveVideo: function (callback) {
                    var self = this;
                    this.validate(function () {
                        jQuery.gritter.add({
                            title: 'Saving...',
                            class_name: 'growl-warning'
                        });
                        if (self.model.get('id')) {
                            self.saveVideoSources();
                        }
                        self.updateModel();

                        App.setHeaders();
                        self.model.save({}, {
                            success: function (video) {
                                jQuery.gritter.add({
                                    title: 'Saved',
                                    class_name: 'growl-success'
                                });

                                // Check if email needs to be sent upon publishing
                                if (!self.wasPublished && video.get('published') && !video.get('has_email')) {
                                    Edit.Controller.createEmailModalView(video.get('id'), function () {
                                        self.model.set('uid', video.get('id'));
                                        App.navigate('video/' + self.model.get('id'));
                                        if (callback) {
                                            callback();
                                        }
                                    });
                                } else {
                                    self.model.set('uid', video.get('id'));
                                    App.navigate('video/' + self.model.get('id'));
                                    if (callback) {
                                        callback();
                                    }
                                }
                            },
                            error: function () {
                                jQuery.gritter.add({
                                    title: 'Error',
                                    text: 'An error has occured while saving',
                                    class_name: 'growl-danger'
                                });
                            }
                        });
                    });
                },  // saveVideo

                saveNote: function (callback) {
                    var self = this;
                    var isSaveNote = $(callback.currentTarget).hasClass('js-save-note');
                    if (isSaveNote) {
                        jQuery.gritter.add({
                            title: 'Saving video note...',
                            class_name: 'growl-warning'
                        });
                    }
                    self.updateNote();

                    App.setHeaders();
                    self.options.note.save({}, {
                        type: 'POST',
                        success: function (video) {
                            if (isSaveNote) {
                                jQuery.gritter.add({
                                    title: 'Saved video note',
                                    class_name: 'growl-success'
                                });
                            }
                        },
                        error: function () {
                            if (isSaveNote) {
                                jQuery.gritter.add({
                                    title: 'Error',
                                    text: 'An error has occured while saving',
                                    class_name: 'growl-danger'
                                });
                            }
                        }
                    });
                },  // saveNote

                validate: function (callback) {
                    // Only perform validation when film is being published
                    var isPublishing = $('#published > div').hasClass('active');
                    if (!isPublishing) {
                        callback();
                        return;
                    }

                    var hasError = false;
                    var listOfRequiredFields = ['title', 'directors', 'description_long', 'country', 'genres',
                        'topics', 'coverphoto', 'duration', 'credits_start', 'hosted_hd',
                        'hosted_sd', 'hosted_mo', 'vimeo_sd', 'vimeo_mo', 'vimeo_hls',
                        'embed_url'];
                    var listOfEmptyFields = [];
                    for (var i in listOfRequiredFields) {
                        var field = listOfRequiredFields[i];
                        if (field === 'coverphoto') {
                            if (!$('#' + field).attr('src')) {
                                hasError = true;
                                listOfEmptyFields.push(field);
                            }
                        } else if (!$('#' + field).val()) {
                            hasError = true;
                            listOfEmptyFields.push(field);
                        }
                    }

                    // Remove all previous errors indicators (if any)
                    $('.form-group').removeClass('has-error');
                    // Add 'has-error' class to form groups with errors
                    listOfEmptyFields.map(function (field) {
                        $('#' + field).closest('.form-group').addClass('has-error');
                        if (field === 'coverphoto') {
                            jQuery.gritter.add({
                                title: 'Error',
                                text: 'Please upload a cover photo!',
                                class_name: 'growl-danger'
                            });
                        }
                    });

                    if (hasError) {
                        jQuery.gritter.add({
                            title: 'Error',
                            text: 'Please fill in the required fields!',
                            class_name: 'growl-danger'
                        });
                    } else {
                        callback();
                    }
                },

                saveVideoClicked: function (e) {
                    e.preventDefault();
                    this.saveVideo();
                    this.saveNote(e);
                },

                deleteVideo: function () {
                    if (confirm('Are you sure you want to delete this?')) {
                        this.model.deleteVideo({
                            success: function () {
                                jQuery.gritter.add({
                                    title: 'Video Deleted',
                                    class_name: 'growl-success'
                                });
                                App.trigger('video:list');
                            },
                            error: function () {
                                jQuery.gritter.add({
                                    title: 'Error',
                                    class_name: 'growl-error'
                                });
                            }
                        });
                    }
                }, // deleteVideo

                transcodeVideo: function () {
                    jQuery.gritter.add({
                        title: 'Transcoding...',
                        class_name: 'growl-success'
                    });
                    this.model.transcodeVideo(this.tc_watermark);
                },

                newVideoTranslationClicked: function () {
                    var self = this;
                    if (this.model.get('id')) {
                        Edit.Controller.showVideoTranslationView(this.model.get('id'), this.collection);
                    } else {
                        this.saveVideo(function () {
                            Edit.Controller.showVideoTranslationView(self.model.get('id'), self.collection);
                        });
                    }
                }
            }); //Edit.FormView

            Edit.VideoTranslationView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-video-translation-edit",
                template: videoTranslationView,

                onShow: function () {
                    this.initUI();
                },

                initUI: function () {
                    var self = this;

                    // Append options
                    var lang = App.getLangJson();
                    $('.chosen-select').append('<option value="">Select locale...</option>');
                    for (var key in lang) {
                        $('.chosen-select').append('<option value="' + key + '">' + lang[key].name + ' (' + key + ')' + '</option>');
                    }

                    $('.chosen-select').chosen({'width': '100%', 'white-space': 'nowrap'});

                    $('.wysiwyg').redactor({
                        buttons: ['bold', 'italic', '|', 'link', 'unorderedlist', 'orderedlist', 'html']
                    });

                    if (self.model.get('locale')) {
                        var locale = self.model.get('locale');
                        $('#locale').val(locale);
                        $('#locale').prop('disabled', true).trigger('chosen:updated');
                    }

                    $('#translated_title').val(self.model.get('title'));
                    $('#translated_description_short').val(self.model.get('description_short'));
                    $('#translated_description_long').redactor('set', self.model.get('description_long'));
                },

                events: {
                    'click .js-video-translation-submit-btn': 'submitBtnClicked'
                },  // events

                submitBtnClicked: function (e) {
                    var self = this;
                    e.preventDefault();

                    if ($('#locale').val() == "") {
                        alert("Please Select a Locale before submitting");
                    } else {
                        var data = {
                            title: $('#translated_title').val().replace(/"/g, '&quot;'),
                            description_short: $('#translated_description_short').val(),
                            description_long: $('#translated_description_long').val()
                        };
                        this.model.set({
                            'id': $('#locale').val(),
                            'locale': $('#locale').val(),
                            'fields': data
                        });

                        this.model.save({}, {
                            success: function (translation) {
                                jQuery.gritter.add({
                                    title: 'Translation updated',
                                    class_name: 'growl-success'
                                });
                                $('.js-modal-video-translation-edit').modal('hide');
                                if (!self.model.collection) {
                                    self.options.video_translations.add(self.model)
                                }
                                // App.trigger('video:list');
                            },
                            error: function () {
                                jQuery.gritter.add({
                                    title: 'Error',
                                    class_name: 'growl-error'
                                });
                            }
                        });
                    }
                } // submitBtnClicked
            }); // Edit.VideoTranslationView

            Edit.CreateEmailModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-email-create",
                template: createEmailModalView,

                onShow: function () {
                    this.initUI();
                    this.initAltLang();
                    this.getEmailTemplate(this.model.video_id, '');
                },

                initUI: function () {
                    var self = this;
                    $('.startdatepicker').datepicker();
                    $('.timepicker').timepicker();
                    // This is account for a bug where the time value will not change
                    $('.timepicker').change(function() {
                        self.timePicked = $(this).val();
                    });
                    $('.wysiwyg').redactor({
                        buttons: ['bold', 'italic', '|', 'link', 'unorderedlist', 'orderedlist', 'html']
                    });
                },

                events: {
                    'click .js-create-email-submit-btn': 'createEmail',
                    'click .js-schedule-email-submit-btn': 'scheduleEmail'
                },  // events

                createEmail: function () {
                    var self = this;
                    this.model.urlRoot = App.apiURL + "admin/scheduled_emails/";
                    this.model.save({
                        recipient: $('#email_to').val(),
                        sender: $('#sender').val(),
                        cc: $('#email_cc').val(),
                        bcc: $('#email_bcc').val(),
                        message_body: $('#email_message_body').val(),
                        status: 'draft',
                        subject: $('#email_subject').val(),
                        video_id: this.model.video_id,
                        tags: this.tags,
                        date_to_send: this.date_to_send
                    }, {
                        type: 'POST',
                        success: function () {
                            jQuery.gritter.add({
                                title: 'Email created',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-email-create').modal('hide');
                            self.model.callback();
                        },
                        error: function (err) {
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                },

                scheduleEmail: function () {
                    var dateTime = moment($('.startdatepicker').val() + ' ' + this.timePicked).format();

                    var self = this;
                    this.model.urlRoot = App.apiURL + "admin/scheduled_emails/";
                    this.model.save({
                        recipient: $('#email_to').val(),
                        sender: $('#sender').val(),
                        cc: $('#email_cc').val(),
                        bcc: $('#email_bcc').val(),
                        message_body: $('#email_message_body').val(),
                        status: 'scheduled',
                        subject: $('#email_subject').val(),
                        video_id: this.model.video_id,
                        tags: this.tags,
                        date_to_send: dateTime
                    }, {
                        type: 'POST',
                        success: function () {
                            jQuery.gritter.add({
                                title: 'Email created',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-email-create').modal('hide');
                            self.model.callback();
                        },
                        error: function (err) {
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                },

                initDateTime: function (datetime) {
                    if (datetime) {
                        $('.startdatepicker').datepicker('setDate', new Date(moment(datetime).unix() * 1000));
                        $('.timepicker').timepicker('setTime', moment(datetime).format("hh:mm:ss a"));
                    }
                },

                initAltLang: function () {
                    var self = this;
                    $('.js-select-language').select2({
                        minimumResultsForSearch: 9999,
                        placeholder: "Select language",
                        width: '100%',
                        ajax: {
                            url: App.apiURL + "admin/scheduled_emails/template/languages",
                            results: function (data, page) {
                                var lang = App.getLangJson();
                                var results = data.map(function (v) {
                                    return {id: v, text: lang[v].name};
                                });
                                return {results: results};
                            }
                        }
                    }).on("change", function () {
                        self.alt_lang = this.value;
                        if (self.model.video_id) {
                            self.getEmailSnippet(self.model.video_id, self.alt_lang);
                        }
                    });
                },

                getEmailSnippet: function (video_id, alt_lang) {
                    var self = this;
                    $.ajax({
                        url: App.apiURL + 'admin/scheduled_emails/template/snippet',
                        data: {
                            video_id: video_id,
                            alt_lang: alt_lang
                        },
                        type: "GET",
                        success: function (res) {
                            var html = $('#email_message_body').redactor('get');
                            var index = html.indexOf('<p>Regards,<br>Tysha</p>');

                            var newHtml = html.slice(0, index) + res.snippet + html.slice(index);
                            $('#email_message_body').redactor('set', newHtml);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                },

                getEmailTemplate: function (video_id, alt_lang) {
                    var self = this;
                    $.ajax({
                        url: App.apiURL + 'admin/scheduled_emails/template',
                        data: {
                            video_id: video_id,
                            alt_lang: alt_lang
                        },
                        type: "GET",
                        success: function (res) {
                            $('#email_bcc').val(res.bcc);
                            $('#sender').val(res.sender);
                            $('#email_cc').val(res.cc);
                            $('#email_message_body').redactor('set', res.message_body);
                            $('#email_to').val(res.recipient);
                            $('#email_subject').val(res.subject);
                            self.tags = res.tags;
                            self.model.video_id = res.video_id;
                            self.date_to_send = res.date_to_send;
                            self.initDateTime(self.date_to_send);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }

            }); // Email.CreateEmailModalView

        }); // App.module

        return;
    });
