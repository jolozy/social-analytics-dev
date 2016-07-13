define(["app", "moment",
        "tpl!apps/newsletter/list/tpl/newsletter-listview.tpl",
        "tpl!apps/newsletter/list/tpl/newsletter-itemview.tpl",
        "tpl!apps/newsletter/list/tpl/modal-create-newsletter.tpl",
        "tpl!apps/newsletter/list/tpl/modal-sent-newsletter.tpl",
        "tpl!apps/newsletter/list/tpl/modal-schedule-newsletter.tpl",
        "tpl!apps/newsletter/list/tpl/modal-preview-newsletter.tpl",
        "redactor", "chosen", "time-picker"],
    function(App, moment, newsletterListViewTpl, newsletterItemViewTpl, createNewsletterModalViewTpl,
             sentNewsletterModalViewTpl, scheduleNewsletterModalViewTpl, previewNewsletterModalViewTpl) {

        App.module('Newsletter.List', function (Newsletter, App, Backbone, Marionette, $, _) {
            var campaignIds = [];
            var selectedVideos = {};
            var introduction = 'Introduction here';
            var updatedVideoPromises = [];

            function updateSenderFields(language, name, email) {
                var defaultName = 'Jian Ho'
                switch (language) {
                    case 'zh':
                        defaultName = '家建 Jian'
                        break
                    default:
                        defaultName = 'Jian Ho'
                }

                if (!name) {
                    $('#newsletter_sender_name').val(defaultName)
                } else {
                    $('#newsletter_sender_name').val(name)
                }

                if (!email) {
                    $('#newsletter_sender_email').val('jiajian@viddsee.com')
                } else {
                    $('#newsletter_sender_email').val(email)
                }
            }

            function getVideoInfo(id,  language) {
                return $.ajax({
                    url: App.apiURL + 'mobile/video/' + id,
                    type: "GET",
                    beforeSend: function(request) {
                        request.setRequestHeader("Accept-Language", language)
                    },
                    success: function(res) {                    	
                        if (selectedVideos[id]) {
                            if (res.description_long.replace(/ /g,'') !== '') {
                                selectedVideos[id]['long_desc'] = res.description_long
                            }
                            if (res.description_short.replace(/ /g,'') !== '') {
                                selectedVideos[id]['short_desc'] = res.description_short
                            }
                            selectedVideos[id]['text'] = res.title + " (" + id + ")"
                            selectedVideos[id]['title'] = res.title
                        }
                    },
                    error: function(err) {
                        console.log(err)
                    }
                })
            }

            function retrieveNewLanguage(language) {            	
                updatedVideoPromises = []
                for (var key in selectedVideos) {
                    if (selectedVideos.hasOwnProperty(key)) {
                        var promise = getVideoInfo(key, language)
                        updatedVideoPromises.push(promise)
                    }
                }
            }

            function initVideoSelect2() {
                var meta = JSON.parse(this.model.get('meta'))
                var language = this.model.get('language')
                introduction = 'Introduction here'
                selectedVideos = {}

                if (meta.hasOwnProperty('videos')) {
                    selectedVideos = meta.videos
                }

                if (meta.hasOwnProperty('intro')) {
                    introduction = meta.intro
                }

                var sel = $('.js-select-videos')
                sel.select2({
                    tags: true,
                    placeholder: "Select videos",
                    width: '100%',
                    minimumInputLength: 2,
                    ajax: {
                        url: App.apiURL + "admin/search",
                        quietMillis: 500,
                        transport: function(params) {
                            params.beforeSend = function(request) {
                                var selectedLanguage = $('.js-select-language').select2('data')
                                if (selectedLanguage) {
                                    language = selectedLanguage.id
                                }
                                request.setRequestHeader("Accept-Language", language)
                            };
                            return $.ajax(params);
                        },
                        data: function (term, page) {
                            return {
                                search_string: term, // search term
                                current_page: 0,
                                per_page: 20
                            };
                        },
                        results: function (data, page) {
                            var results = data.videos.map(function (v){
                                return {
                                    id:v.id,
                                    text:v.title + " (" + v.id + ")",
                                    long_desc: v.description_long,
                                    short_desc: v.description_short,
                                    title: v.title,
                                    uid: v.uid,
                                    friendly_url: v.friendly_url
                                };
                            });
                            return {results: results};
                        }
                    },
                    initSelection: function(element, callback) {
                        callback(dictionaryToArray(selectedVideos))
                    }
                }).on("change", function(e) {
                    // read introduction again in case blur event not activated yet
                    // this occurs when user deletes a video tag before clicking out of the
                    // contentEditable
                    var currVal =$('#newsletter-editable-intro').html()
                    if(currVal) {
                        introduction = currVal
                    }
                    changeEventCallback(e)
                }.bind(this));

                if (selectedVideos !== {}) {
                    // attach event listeners for previously selected videos
                    for (var key in selectedVideos) {
                        if (selectedVideos.hasOwnProperty(key)) {
                            var shortId = '#newsletter-editable-short-' + key
                            var longId = '#newsletter-editable-long-' + key
                            addContentEditableEventListeners(shortId, longId, selectedVideos)
                        }
                    }

                    // force initSelection to be triggered. Need to provide dummy value
                    sel.val(-111).trigger('change')
                }

                $(document).on('blur', '#newsletter-editable-intro', function(e) {
                    $('#newsletter-editable-intro').removeClass('content-editable-focus')
                    introduction = e.target.innerHTML;
                }).on('focus', '#newsletter-editable-intro', function() {
                    $('#newsletter-editable-intro').addClass('content-editable-focus')
                });
            }  // initVideoSelect2

            function addCampaign(newCampaignNum, currentList) {
                var newCampaignForm = '<div class="form-group campaign campaign-' + newCampaignNum + '">' +
                    '<label class="col-sm-2 control-label"></label>' +
                    '<div class="col-sm-9">' +
                    '<div class="js-select-mailinglist-' + newCampaignNum + '"></div></div>' +
                    '<div class="col-sm-1 btn-remove-campaign remove-campaign-' + newCampaignNum+ '">' +
                    '<span class="glyphicon glyphicon-remove"></span></div></div>'

                $('.add-campaign-before').before(newCampaignForm)
                initNewMailingListSelect(newCampaignNum, currentList)
                $('.remove-campaign-' + newCampaignNum).on('click', function() {
                    $('.campaign-' + newCampaignNum).remove()
                    $('.num-campaigns').text('Campaigns (' + $('.campaign').length + '): ')
                    var index = campaignIds.indexOf(newCampaignNum)
                    if (index > -1) {
                        campaignIds.splice(index, 1)
                    }
                })
                $('.num-campaigns').text('Campaigns (' + $('.campaign').length + '): ')
            }

            function initNewMailingListSelect(campaignNum, currentList) {
                var sel = $('.js-select-mailinglist-' + campaignNum)
                sel.select2({
                    placeholder: "Select mailing lists",
                    tags: true,
                    width: '100%',
                    ajax: {
                        url: App.apiURL + "admin/sendy_lists",
                        data: function (term, page) {
                            return {
                                search_string: term, // search term
                                current_page: 0,
                                per_page: 100
                            };
                        },
                        results: function (data, page) {
                            var results = data.lists.map(function (v){
                                return {id: v.id, text: v.name, sendy_id: v.sendy_id};
                            });
                            return {results: results};
                        }
                    },
                    initSelection: function(element, callback) {
                        if (currentList) {
                            callback(currentList)
                        }
                    }
                })
                campaignIds.push(campaignNum)
                if (currentList) {
                    // force initSelection to be triggered. Need to provide dummy value
                    sel.val(-111).trigger('change')
                }
            }

            function initMailingListSelect() {
                campaignIds = []
                var totalCampaigns = 0
                var currentList = this.model.get('lists')
                if (currentList) {
                    currentList = JSON.parse(currentList)
                }
                if (currentList && currentList.length > 0) {
                    for (var i = 0; i < currentList.length; ++i) {
                        totalCampaigns++
                        if (totalCampaigns === 1) {
                            initNewMailingListSelect(totalCampaigns, currentList[i])
                        } else {
                            addCampaign(totalCampaigns, currentList[i])
                        }
                    }
                } else {
                    totalCampaigns++
                    initNewMailingListSelect(totalCampaigns, false)
                }

                $('.btn-add-campaign').on('click', function() {
                    totalCampaigns++
                    addCampaign(totalCampaigns, false)
                })
            }

            function updateTemplateLanguage(newTemplate, body, newLanguage) {
                // Replaces [[CONTENT]] with a div to contain the newsletter's message body
                var PLACEHOLDER = '[[CONTENT]]'
                var index = newTemplate.indexOf('[[CONTENT]]')

                var currentBody = $('#newsletter_message_body').html()
                if (body) {
                    currentBody = body
                } else if (!currentBody) {
                    currentBody = ''
                }

                var newHtml = newTemplate.slice(0, index) + '<div id="newsletter_message_body"> ' +
                    '</div>' + newTemplate.slice(index+PLACEHOLDER.length)
                $('#newsletter-template').html(newHtml)
                $('#newsletter_message_body').html(currentBody)
                if (newLanguage) {
                    updatePreview()
                } else {
                    $('.js-select-videos').val(-111).trigger('change') //force videos to update again
                }
            }

            function getNewTemplate(language) {
                $.ajax({
                    url: App.apiURL + 'admin/sendy_emails/template/newsletter?language=' + language,
                    type: "GET",
                    success: function(res) {
                        updateTemplateLanguage(res, false, language)
                    },
                    error: function(err) {
                        console.log(err)
                    }
                })
            }

            function initTemplateSelect() {
                var currentSelection = this.model.get('language')
                var sel = $('.js-select-language')
                sel.select2({
                    placeholder: 'Select language',
                    width: '100%',
                    ajax: {
                        url: App.apiURL + 'admin/sendy_emails/available_locales',
                        results: function(data) {
                            var results = data.map(function(localeCode) {
                                return {id: localeCode, text: getLocaleName(localeCode)}
                            })
                            return {results: results}
                        }
                    },
                    initSelection: function(element, callback) {
                        if (currentSelection) {
                            callback({id: currentSelection, text: getLocaleName(currentSelection)})
                        }
                    }
                }).on('change', function() {                	
                    // regenerate template with new language
                    var languageData = $('.js-select-language').select2('data')
                    var newLanguage = 'en' // default english
                    if (languageData) {
                        newLanguage = languageData.id
                    }
                    console.log(currentSelection);
                    if (currentSelection != newLanguage) {
                    	retrieveNewLanguage(newLanguage);                                        	
                    }
                    $.when.apply($, updatedVideoPromises)
                        	.done(getNewTemplate.bind(this, newLanguage));
                    updateSenderFields(newLanguage)
                })
                // force initSelection to be triggered. Need to provide dummy value
                sel.val(-111).trigger('change')
            }

            function addContentEditableEventListeners(shortId, longId, selectedVideos) {
                $(document).on('blur', shortId, function(e) {
                    $(shortId).removeClass('content-editable-focus')
                    var videoId = getVideoIdFromShortDescClass(e.target.id);
                    if (videoId in selectedVideos) {
                        selectedVideos[videoId].short_desc = e.target.innerHTML
                    }
                });
                $(document).on('blur', longId, function(e) {
                    $(longId).removeClass('content-editable-focus')
                    var videoId = getVideoIdFromlongDescClass(e.target.id);
                    if (videoId in selectedVideos) {
                        selectedVideos[videoId].long_desc = e.target.innerHTML
                    }
                });
                $(document).on('focus', shortId, function() {
                    $(shortId).addClass('content-editable-focus')
                })
                $(document).on('focus', longId, function() {
                    $(longId).addClass('content-editable-focus')
                })
            }

            function changeEventCallback(e) {
                if (e.added) {
                    selectedVideos[e.added.id] = e.added;
                    var shortId = '#newsletter-editable-short-' + e.added.id
                    var longId = '#newsletter-editable-long-' + e.added.id
                    addContentEditableEventListeners(shortId, longId, selectedVideos)
                } else if (e.removed) {
                    delete selectedVideos[e.removed.id];
                    var isVideoUnpublished = $('#unpublished-' + e.removed.id)
                    if (isVideoUnpublished.length > 0) {
                        isVideoUnpublished.remove()
                    }
                }
                updatePreview();
            }

            function removeContentEditableFromHTML(html) {
                return html.replace(/contentEditable="true" class="content-editable"/ig, '')
            }

            function getNewsletterPayload(status) {
                var meta = {
                    videos: selectedVideos,
                    intro: $('#newsletter-editable-intro').html()
                }
                var languageId = 'en'
                var selectedLanguage = $('#newsletter-language-id').select2('data')
                if (selectedLanguage) {
                    languageId = selectedLanguage.id
                }
                var campaigns = []
                for (var i = 0; i < campaignIds.length; ++i) {
                    var id = campaignIds[i]
                    var mailingLists = $('.js-select-mailinglist-' + campaignIds[i]).select2('data')
                    if (mailingLists.length > 0) {
                        campaigns.push(mailingLists)
                    }
                }

                return {
                    lists: JSON.stringify(campaigns),
                    status: status,
                    subject: $('#newsletter_subject').val(),
                    content: removeContentEditableFromHTML($('#newsletter_message_body').html()),
                    meta: JSON.stringify(meta),
                    language: languageId,
                    sender_name: $('#newsletter_sender_name').val(),
                    sender_email: $('#newsletter_sender_email').val()
                }
            }

            function addVideoThumbnail(videoId) {
                var imgSrc = App.apiURL + 'video/' + videoId + '/thumbnail?overlays=play-btn';
                return '<img src="' + imgSrc + '" width="550">';
            }

            function addLinkToElement(element, link) {
                return '<a target="_blank" href="' + link + '" style="text-decoration: none; color:#000">'
                    + element + '</a>';
            }

            function addEditableDescription(shortDescription, longDescription, id, videoLink) {
                var shortDivId = 'newsletter-editable-short-' + id;
                var longDivId = 'newsletter-editable-long-' + id;
                var html = '<div id=' + shortDivId + ' contentEditable=true class="content-editable">' +
                    '<h2 style="font-family:Helvetica;font-size:26px;font-style:normal;font-weight:bold;line-height:125%;letter-spacing:-.75px;">' +
                    addLinkToElement(shortDescription, videoLink) + '</h2></div>';

                html += '<div id=' + longDivId + ' contentEditable=true class="content-editable">' + longDescription + '</div>';
                return html;
            }

            function addWatchButton(title, link, language) {
                var style = 'border-radius:5px;background-color:#d4145a;padding:14px;display: table; ' +
                    'vertical-align: middle;cursor: pointer;border: 1px solid transparent;font-weight:normal;' +
                    'font-family:Arial;font-size:16px;letter-spacing:normal;line-height:100%;text-align:center;' +
                    'text-decoration:none;color:#ffffff;word-wrap:break-word;margin: 0 auto;border-collapse:separate;'

                switch (language) {
                    case 'en':
                        return '<a target="_blank" href="' + link + '" style="' + style + '">Watch \'' + title + '\'</a>'
                    case 'zh':
                        return '<a target="_blank" href="' + link + '" style="' + style + '">觀賞《' + title + '》</a>'
                    case 'id':
                        return '<a target="_blank" href="' + link + '" style="' + style + '">Tonton \'' + title + '\'</a>'
                    default:
                        return '<a target="_blank" href="' + link + '" style="' + style + '">Watch \'' + title + '\'</a>'
                }
            }

            function getVideoIdFromShortDescClass(className) {
                return className.slice(26);
            }

            function getVideoIdFromlongDescClass(className) {
                return className.slice(25);
            }

            function newVideoSuggestion(video, language) {
                if (video.short_desc.replace(/ /g,'') === '') {
                    video.short_desc = 'Headline here';
                }
                if (video.long_desc.replace(/ /g,'') === '') {
                    video.long_desc = 'Description here';
                }
                var link = 'https://www.viddsee.com/video/' + video.friendly_url + '/' + video.uid

                // append tracking code
                switch (language) {
                    case 'en':
                        link += '?utm_source=email&utm_medium=weekly-en'
                        break
                    case 'zh':
                        link += '?utm_source=email&utm_medium=weekly-zh'
                        break
                    case 'id':
                        link += '?utm_source=email&utm_medium=weekly-id'
                        break
                    default:
                        link += '?utm_source=email&utm_medium=weekly-en'
                }

                testUrl(link).fail(function(err) {
                    var warning = video.title + ' is an unpublished video. Video links will not work.'
                    if ($('#unpublished-' + video.id).length === 0) {
                        $('.unpublished-warnings').append('<small class="unpublished" id="unpublished-' + video.id + '">' +
                            warning + '<br></small>')
                    }
                })

                return addLinkToElement(addVideoThumbnail(video.id), link) + '<br><br>' +
                    addEditableDescription(video.short_desc, video.long_desc, video.id, link) + '<br>' +
                    addWatchButton(video.title, link, language) + '<br><br>';
            }

            function updatePreview() {
                var language = 'en'
                var selectedLanguage = $('#newsletter-language-id').select2('data')
                if (selectedLanguage) {
                    language = selectedLanguage.id
                }
                var html = '';
                if (getDictionarySize(selectedVideos) !== 0) {
                    html = '<div id="newsletter-editable-intro" contentEditable=true class="content-editable">' + introduction + '</div><br>';
                    for (var key in selectedVideos) {
                        if (selectedVideos.hasOwnProperty(key)) {
                            var video = selectedVideos[key];
                            html += newVideoSuggestion(video, language);
                        }
                    }
                }
                $('#newsletter_message_body').html(html);
            }

            // Views
            Newsletter.NewsletterItemView = Marionette.ItemView.extend({
                template: newsletterItemViewTpl,

                onShow: function() {
                    var status = this.model.get('status');
                    if (status === 'draft') {
                        $(this.$el).find('.newsletter-status > small').append(moment(this.model.get('updated_at')).calendar());
                    } else if (status === 'sent' || status === 'scheduled') {
                        $(this.$el).find('.newsletter-status > small').append(moment(this.model.get('scheduled_date')).calendar());
                    }
                },

                events: {
                    'click .email-edit': 'editNewsletter',
                    'click .email-delete': 'deleteNewsletter',
                    'click .email-schedule': 'scheduleNewsletter',
                    'click .email-preview': 'previewNewsletter',
                    'click .email-view': 'viewNewsletter'
                },

                previewNewsletter: function(e) {                	
                    e.preventDefault();
                    var tab = '';
                    if (this.model.collection.filterBy) {
                        tab = this.model.collection.filterBy;
                    }
                    Newsletter.Controller.showPreviewNewsletterModalView(this.model.get('id'), $('.js-tf-search').val(), tab);
                },

                viewNewsletter: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.model.collection.filterBy) {
                        tab = this.model.collection.filterBy;
                    }
                    Newsletter.Controller.showSentNewsletterModalView(this.model.get('id'), $('.js-tf-search').val(), tab);
                },

                editNewsletter: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.model.collection.filterBy) {
                        tab = this.model.collection.filterBy;
                    }
                    Newsletter.Controller.showEditNewsletterModalView(this.model.get('id'), $('.js-tf-search').val(), tab);
                },

                deleteNewsletter: function(e) {
                    e.preventDefault();
                    if (confirm("Are you sure you want to delete this newsletter?")) {
                        this.model.urlRoot = App.apiURL + "admin/sendy_email/";
                        this.model.destroy({
                            success: function() {
                                jQuery.gritter.add({
                                    title: 'Newsletter deleted',
                                    class_name: 'growl-success'
                                });
                            },
                            error: function() {
                                jQuery.gritter.add({
                                    title: 'Error',
                                    class_name: 'growl-error'
                                });
                            }
                        });
                    }
                },

                scheduleNewsletter: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.model.collection.filterBy) {
                        tab = this.model.collection.filterBy;
                    }
                    Newsletter.Controller.scheduleNewsletterModalView(this.model.get('id'), $('.js-tf-search').val(), tab);
                }
            });

            Newsletter.NewsletterListView = Marionette.CompositeView.extend({
                template: newsletterListViewTpl,
                tagName: 'div',
                className: 'newsletter-listview-container',

                itemView: Newsletter.NewsletterItemView,
                itemViewContainer: ".js-newsletter-list",

                events: {
                    'click .js-submission-tab': 'goToSubmissionStatusTabClicked',
                    'click .js-reset-search': 'resetSearch',
                    'keydown .js-tf-search': 'searchTextFieldKeyDown',
                    'click .js-create-new-newsletter': 'createNewNewsletter',
                    'click .js-page': 'goToPageClicked'
                },

                onRender: function() {
                    this.initUI();
                },

                initialize: function() {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                initUI: function() {
                    if (!this.collection.filterBy) {
                        $('.js-tab-all').addClass('active');
                    }

                    if(this.collection.search_string){
                        $('.js-tf-search').val(this.collection.search_string);
                        $('.js-results-title').html("Search results for \"" + this.collection.search_string + "\"");
                    }

                    if (this.collection.totalPages === 0) {
                        $('.js-num-of-newsletters').text('No newsletters are found.');
                    }
                    var total_pages = this.collection.totalPages;
                    var current_page = this.collection.currentPage;
                    var pages_in_range = this.collection.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);

                    switch(this.collection.filterBy){
                        case 'all':
                            $('.js-tab-all').addClass('active');
                            break;
                        case 'draft':
                            $('.js-tab-draft').addClass('active');
                            break;
                        case 'scheduled':
                            $('.js-tab-scheduled').addClass('active');
                            break;
                        case 'sent':
                            $('.js-tab-sent').addClass('active');
                            break;
                    }
                },

                resetSearch: function (e) {
                    $('.js-tf-search').val("");
                    App.trigger('newsletter:list');
                },

                searchTextFieldKeyDown: function (e) {
                    if(e.keyCode == 13) {
                        this.searchNewsletters();
                    }
                },

                searchNewsletters: function () {
                    var tab = '';
                    if (this.collection.filterBy) {
                        tab = this.collection.filterBy;
                    }
                    Newsletter.Controller.listNewsletters($('.js-tf-search').val(), tab);
                },

                goToSubmissionStatusTabClicked: function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var tab = e.target.attributes['href'].value.substring(1);
                    Newsletter.Controller.listNewsletters('', tab);
                },

                goToPageClicked: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var page = e.target.attributes['data-page'].value;
                    this.goToPage(page);
                },

                goToPage: function (page) {
                    // Update Pagination
                    var total_pages = this.collection.totalPages;
                    var current_page = parseInt(page,10);
                    var pages_in_range = this.collection.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
                    $('.js-submission-grid').html("");

                    var view = this;
                    this.collection.goTo(page,{
                        update: true,
                        remove: true,
                        success: function () {
                            view.isLoading = false;
                        }
                    });
                },

                showRangeCenteredOnPage: function (current_page, total_pages, pages_in_range) {
                    var html = '';
                    var start;
                    var end;
                    var prev_html;
                    var next_html;
                    var first_html;
                    var last_html;
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

                createNewNewsletter: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.collection.filterBy) {
                        tab = this.collection.filterBy;
                    }
                    Newsletter.Controller.createNewsletterModalView($('.js-tf-search').val(), tab);
                }
            });

            Newsletter.PreviewNewsletterModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-newsletter-preview",
                template: previewNewsletterModalViewTpl,

                onShow: function () {
                },

                sendNewsletter: function() {
                    var email = $('#preview_email').val()
                    $.ajax({
                        url: App.apiURL + 'admin/sendy_email/' + this.model.get('id') + '/preview_email',
                        type: "POST",
                        data: {
                            recipient: email
                        },
                        success: function() {
                            jQuery.gritter.add({
                                title: 'Newsletter sent to ' + email,
                                class_name: 'growl-success'
                            });
                            $('.js-modal-newsletter-preview').modal('hide')
                        },
                        error: function(err) {
                            console.log(err);
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    })
                },

                events: {
                    'click .js-preview-newsletter-submit-btn': 'sendNewsletter'
                },  // events

                dismissNewsletter: function() {
                    $('.js-modal-newsletter-preview').modal('hide')
                }
            }); // Newsletter.SentNewsletterModalView


            Newsletter.SentNewsletterModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-newsletter-sent",
                template: sentNewsletterModalViewTpl,

                onShow: function () {
                    this.initUI();
                    initMailingListSelect.call(this)
                    this.disableMailingLists()
                    this.initTemplate()
                },

                initUI: function () {
                    $(this.$el).find('.panel-heading > p').append(moment(this.model.get('scheduled_date')).calendar())
                    $('#newsletter_subject').val(this.model.get('subject'))
                },

                disableMailingLists: function() {
                    var currentList = this.model.get('lists')
                    if (currentList) {
                        currentList = JSON.parse(currentList)
                        for (var i = 0; i < currentList.length; ++i) {
                            var campaignNum = i + 1
                            $('.js-select-mailinglist-' + campaignNum).select2('disable')
                            $('.remove-campaign-' + campaignNum).remove()
                        }
                    }
                },

                initTemplate: function() {
                    var language = this.model.get('language')
                    var body = this.model.get('content')
                    $.ajax({
                        url: App.apiURL + 'admin/sendy_emails/template/newsletter?language=' + language,
                        type: "GET",
                        success: function(res) {
                            updateTemplateLanguage(res, body)
                        },
                        error: function(err) {
                            console.log(err)
                        }
                    })
                },

                events: {
                    'click .js-create-newsletter-dismiss-btn': 'dismissNewsletter'
                },  // events

                dismissNewsletter: function() {
                    $('.js-modal-newsletter-sent').modal('hide')
                }
            }); // Newsletter.SentNewsletterModalView

            Newsletter.EditNewsletterModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-newsletter-edit",
                template: createNewsletterModalViewTpl,

                onShow: function () {
                    this.initUI()
                    initMailingListSelect.call(this)
                    initTemplateSelect.call(this)
                    initVideoSelect2.call(this)
                    updateSenderFields.call(this, 'en', this.model.get('sender_name'), this.model.get('sender_email'))
                },

                initUI: function () {
                    $('#newsletter_subject').val(this.model.get('subject'))
                },

                events: {
                    'click .js-create-newsletter-submit-btn': 'saveNewsletter'
                },  // events

                saveNewsletter: function() {
                    var self = this;
                    this.model.urlRoot = App.apiURL + "admin/sendy_email/"
                    var current_status = this.model.status;
                    this.model.save(getNewsletterPayload(current_status/*'draft'*/), {
                        type: 'PUT',
                        success: function() {
                            jQuery.gritter.add({
                                title: 'Newsletter updated',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-newsletter-edit').modal('hide');
                            Newsletter.Controller.listNewsletters(self.model.search_string, self.model.filterBy);
                        },
                        error: function(err) {
                            console.log(err);
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                }
            }); // Newsletter.EditNewsletterModalView

            Newsletter.CreateNewsletterModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-newsletter-create",
                template: createNewsletterModalViewTpl,

                onShow: function () {
                    initMailingListSelect.call(this)
                    initTemplateSelect.call(this)
                    initVideoSelect2.call(this)
                    updateSenderFields.call(this, 'en') 
                },

                events: {
                    'click .js-create-newsletter-submit-btn': 'createNewsletter'
                },  // events

                createNewsletter: function() {
                    var self = this;
                    this.model.urlRoot = App.apiURL + "admin/sendy_emails/";
                    this.model.save(getNewsletterPayload('draft'), {
                        type: 'POST',
                        success: function() {
                            jQuery.gritter.add({
                                title: 'Newsletter created',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-newsletter-create').modal('hide');
                            Newsletter.Controller.listNewsletters(self.model.search_string, self.model.filterBy);
                        },
                        error: function(err) {
                            console.log(err);
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                }
            }); // Newsletter.CreateNewsletterModalView

            Newsletter.ScheduleNewsletterModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-newsletter-schedule",
                template: scheduleNewsletterModalViewTpl,

                onShow: function () {
                    this.initUI();
                },

                initUI: function () {
                    $('.startdatepicker').datepicker();
                    $('.timepicker').timepicker();
                    if (this.model.get('date_to_send')) {
                        var datetime = this.model.get('date_to_send');
                        $('.startdatepicker').datepicker('setDate', new Date(moment(datetime).unix() * 1000));
                        $('.timepicker').timepicker('setTime', moment(datetime).format("hh:mm:ss a"));
                    }
                },

                events: {
                    'click .js-schedule-newsletter-submit-btn': 'scheduleNewsletter'
                },  // events

                scheduleNewsletter: function(e) {
                    e.preventDefault();
                    var self = this;

                    // Validation
                    if (!$('.js-schedule-date').val() || !$('.js-schedule-time').val()) {
                        jQuery.gritter.add({
                            title: 'Please select a date and time.',
                            class_name: 'growl-error'
                        });
                        return;
                    }

                    var datetime = moment($('.js-schedule-date').val() + ' ' + $('.js-schedule-time').val()).format();
                    this.model.urlRoot = App.apiURL + "admin/sendy_email/";
                    this.model.save({
                        scheduled_date: datetime,
                        status: 'scheduled'
                    }, {
                        type: 'PUT',
                        success: function() {
                            jQuery.gritter.add({
                                title: 'Schedule updated',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-newsletter-schedule').modal('hide');
                            Newsletter.Controller.listNewsletters(self.model.search_string, self.model.filterBy);
                        },
                        error: function(err) {
                            console.log(err);
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                }
            }); // Newsletter.ScheduleNewsletterModalView

        });
    });
