define(["app", "moment",
        "tpl!apps/email/list/tpl/email-listview.tpl",
        "tpl!apps/email/list/tpl/email-itemview.tpl",
        "tpl!apps/email/list/tpl/modal-edit-email.tpl",
        "tpl!apps/email/list/tpl/modal-create-email.tpl",
        "tpl!apps/email/list/tpl/modal-schedule-email.tpl",
        "redactor", "chosen", "time-picker"],
    function(App, moment, emailListViewTpl, emailItemViewTpl, editEmailModalViewTpl, createEmailModalViewTpl,
            scheduleEmailModalViewTpl) {

        App.module('Email.List', function (Email, App, Backbone, Marionette, $, _) {
            // Common base view shared between CreateEmailModalView and EditEmailModalView
            Email.Common = Marionette.ItemView.extend({
                getEmailSnippet: function(video_id, alt_lang) {
                    var self = this;
                    $.ajax({
                        url: App.apiURL + 'admin/scheduled_emails/template',
                        data: {
                            video_id: video_id,
                            alt_lang: alt_lang
                        },
                        type: "GET",
                        success: function(res) {
                            $('#email_message_body').redactor('set', res.message_body);
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                }
            });
            
            // Views
            Email.EmailItemView = Marionette.ItemView.extend({
                template: emailItemViewTpl,

                onShow: function() {
                    var status = this.model.get('status');
                    if (status === 'draft') {
                        $(this.$el).find('.email-status > small').append(moment(this.model.get('updated_at')).calendar());
                    } else if (status === 'sent' || status === 'scheduled') {
                        $(this.$el).find('.email-status > small').append(moment(this.model.get('date_to_send')).calendar());
                    }
                },

                events: {
                    'click .email-edit': 'editEmail',
                    'click .email-delete': 'deleteEmail',
                    'click .email-schedule': 'scheduleEmail'
                },

                editEmail: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.model.collection.filterBy) {
                        tab = this.model.collection.filterBy;
                    }
                    Email.Controller.showEditEmailModalView(this.model.get('id'), $('.js-tf-search').val(), tab);
                },

                deleteEmail: function(e) {
                    e.preventDefault();
                    if (confirm("Are you sure you want to delete this email?")) {
                        this.model.urlRoot = App.apiURL + "admin/scheduled_email/";
                        this.model.destroy({
                            success: function() {
                                jQuery.gritter.add({
                                    title: 'Email deleted',
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

                scheduleEmail: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.model.collection.filterBy) {
                        tab = this.model.collection.filterBy;
                    }
                    Email.Controller.scheduleEmailModalView(this.model.get('id'), $('.js-tf-search').val(), tab);
                }
            });

            Email.EmailListView = Marionette.CompositeView.extend({
                template: emailListViewTpl,
                tagName: 'div',
                className: 'email-listview-container',

                itemView: Email.EmailItemView,
                itemViewContainer: ".js-email-list",

                events: {
                    'click .js-submission-tab': 'goToSubmissionStatusTabClicked',
                    'click .js-reset-search': 'resetSearch',
                    'keydown .js-tf-search': 'searchTextFieldKeyDown',
                    'click .js-create-new-email': 'createNewEmail',
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
                    App.trigger('email:list');
                },

                searchTextFieldKeyDown: function (e) {
                    if(e.keyCode == 13) {
                        this.searchEmails();
                    }
                },

                searchEmails: function () {
                    var tab = '';
                    if (this.collection.filterBy) {
                        tab = this.collection.filterBy;
                    }
                    Email.Controller.listEmails($('.js-tf-search').val(), tab);
                },

                goToSubmissionStatusTabClicked: function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var tab = e.target.attributes['href'].value.substring(1);
                    Email.Controller.listEmails('', tab);
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

                createNewEmail: function(e) {
                    e.preventDefault();
                    var tab = '';
                    if (this.collection.filterBy) {
                        tab = this.collection.filterBy;
                    }
                    Email.Controller.createEmailModalView($('.js-tf-search').val(), tab);
                }
            });

            Email.EditEmailModalView = Email.Common.extend({
                tagName: "div",
                className: "modal fade js-modal-email-edit",
                template: editEmailModalViewTpl,

                onShow: function () {
                    this.initUI();
                    this.initAltLang();
                },

                initUI: function () {
                    $('.wysiwyg').redactor({
                        buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist', 'html']
                    });
                    $('#sender').val(this.model.get('sender'));
                    $('#email_message_body').redactor('set', this.model.get('message_body'));
                },

                events: {
                    'click .js-edit-email-submit-btn': 'saveEmail'
                },  // events

                initAltLang: function() {
                    var self = this;
                    $('.js-select-language').select2({
                        minimumResultsForSearch: 9999,
                        placeholder: "Select language",
                        width: '100%',
                        ajax: {
                            url: App.apiURL + "admin/scheduled_emails/template/languages",
                            results: function (data, page) {
                                var lang = App.getLangJson();
                                var results = data.map(function (v){
                                    return {id:v, text:lang[v].name};
                                });
                                return {results: results};
                            }
                        }
                    }).on("change", function () {
                        self.alt_lang = this.value;
                        if (self.model.get('video_id')) {
                            self.getEmailSnippet(self.model.get('video_id'), self.alt_lang);
                        }
                    });
                },

                saveEmail: function() {
                    var self = this;
                    this.model.urlRoot = App.apiURL + "admin/scheduled_email/";
                    this.model.save({
                        recipient: $('#email_to').val(),
                        sender: $('#sender').val(),
                        cc: $('#email_cc').val(),
                        bcc: $('#email_bcc').val(),
                        subject: $('#email_subject').val(),
                        message_body: $('#email_message_body').val()
                    }, {
                        success: function() {
                            jQuery.gritter.add({
                                title: 'Email updated',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-email-edit').modal('hide');
                            Email.Controller.listEmails(self.model.search_string, self.model.filterBy);
                        },
                        error: function(err) {
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                }

            }); // Email.EditEmailModalView

            Email.CreateEmailModalView = Email.Common.extend({
                tagName: "div",
                className: "modal fade js-modal-email-create",
                template: createEmailModalViewTpl,

                onShow: function () {
                    this.initUI();
                    this.initVideoSelect2();
                    this.initAltLang();
                },

                initUI: function () {
                    $('.wysiwyg').redactor({
                        buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist', 'html']
                    });
                },

                events: {
                    'click .js-create-email-submit-btn': 'createEmail'
                },  // events

                createEmail: function() {
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
                        video_id: this.video_id,
                        tags: this.tags,
                        date_to_send: this.date_to_send
                    }, {
                        type: 'POST',
                        success: function() {
                            jQuery.gritter.add({
                                title: 'Email created',
                                class_name: 'growl-success'
                            });
                            $('.js-modal-email-create').modal('hide');
                            Email.Controller.listEmails(self.model.search_string, self.model.filterBy);
                        },
                        error: function(err) {
                            jQuery.gritter.add({
                                title: 'Error',
                                class_name: 'growl-error'
                            });
                        }
                    });
                },

                initVideoSelect2: function () {
                    var self = this;
                    $('.js-select-video').select2({
                        placeholder: "Select video",
                        width: '100%',
                        minimumInputLength: 2,
                        ajax: {
                            url: App.apiURL + "admin/search",
                            quietMillis: 500,
                            data: function (term, page) {
                                return {
                                    search_string: term, // search term
                                    current_page: 0,
                                    per_page: 20
                                };
                            },
                            results: function (data, page) {
                                var results = data.videos.map(function (v){
                                    return {id:v.id, text:v.title + " (" + v.id + ")"};
                                });
                                return {results: results};
                            }
                        }
                    }).on("change", function () {
                        self.video_id = this.value;
                        self.getEmailTemplate(self.video_id, self.alt_lang);
                    });
                },  // initVideoSelect2

                initAltLang: function() {
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
                                    return {id:v, text:lang[v].name};
                                });
                                return {results: results};
                            }
                        }
                    }).on("change", function () {
                        self.alt_lang = this.value;
                        if (self.video_id) {
                            if ($('#email_message_body').val()) {
                                self.getEmailSnippet(self.video_id, self.alt_lang);
                            } else {
                                self.getEmailTemplate(self.video_id, self.alt_lang);
                            }
                        }
                    });
                },

                getEmailTemplate: function(video_id, alt_lang) {
                    var self = this;
                    $.ajax({
                        url: App.apiURL + 'admin/scheduled_emails/template',
                        data: {
                            video_id: video_id,
                            alt_lang: alt_lang
                        },
                        type: "GET",
                        success: function(res) {
                            $('#email_bcc').val(res.bcc);
                            $('#sender').val(res.sender);
                            $('#email_cc').val(res.cc);
                            $('#email_message_body').redactor('set', res.message_body);
                            $('#email_to').val(res.recipient);
                            $('#email_subject').val(res.subject);
                            self.sender = res.sender;
                            self.tags = res.tags;
                            self.video_id = res.video_id;
                            self.date_to_send = res.date_to_send;
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                }

            }); // Email.CreateEmailModalView

            Email.ScheduleEmailModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-email-schedule",
                template: scheduleEmailModalViewTpl,

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
                    'click .js-schedule-email-submit-btn': 'scheduleEmail'
                },  // events

                scheduleEmail: function(e) {
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
                    this.model.urlRoot = App.apiURL + "admin/scheduled_email/";
                    this.model.save({
                        date_to_send: datetime
                    }, {
                        success: function() {
                            var data = {
                                ids: self.model.get('id') + ''
                            };
                            $.ajax({
                                url: App.apiURL + 'admin/scheduled_emails/schedule',
                                dataType: 'json',
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify(data),
                                success: function() {
                                    jQuery.gritter.add({
                                        title: 'Email scheduled',
                                        class_name: 'growl-success'
                                    });
                                    $('.js-modal-email-schedule').modal('hide');
                                    Email.Controller.listEmails(self.model.search_string, self.model.filterBy);
                                },
                                error: function() {
                                    jQuery.gritter.add({
                                        title: 'Error',
                                        class_name: 'growl-error'
                                    });
                                }
                            });
                        }
                    });


                }
            }); // Email.ScheduleEmailModalView

        });

        return ;
    });
