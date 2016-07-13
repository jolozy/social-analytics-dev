define(["app",
        "apps/newsletter/list/list_view",
        "entities/newsletter"],
    function(App) {

        App.module('Newsletter.List', function (Newsletter, App, Backbone, Marionette, $, _) {
            // Controller
            Newsletter.Controller = {
                listNewsletters: function (searchString, filter) {
                    var fetchingNewsletters = App.request("newsletter:entities", searchString, filter);
                    $.when(fetchingNewsletters).done(function (newsletters) {
                        var newsletterListView = new Newsletter.NewsletterListView({
                            collection: newsletters
                        });
                        App.mainRegion.show(newsletterListView);
                    });
                },  // listComments

                showEditNewsletterModalView: function(newsletterID, searchString, filterBy) {
                    var newsletterInfo = new App.Entities.Newsletter();
                    newsletterInfo.urlRoot = App.apiURL + "admin/sendy_email/" + newsletterID;
                    newsletterInfo.search_string = searchString;
                    newsletterInfo.filterBy = filterBy;

                    var editNewsletterModalView = new Newsletter.EditNewsletterModalView({
                        model: newsletterInfo
                    });

                    newsletterInfo.on('sync', function() {
                    	console.log('show edit modal');
                        App.modalRegion.show(editNewsletterModalView);
                        $('#modal-region .modal').modal('show');
                        newsletterInfo.unbind('sync');
                    });

                    newsletterInfo.fetch();
                },

                showPreviewNewsletterModalView: function(newsletterID, searchString, filterBy) {
                    var newsletterInfo = new App.Entities.Newsletter();
                    newsletterInfo.urlRoot = App.apiURL + "admin/sendy_email/" + newsletterID;
                    newsletterInfo.search_string = searchString;
                    newsletterInfo.filterBy = filterBy;
                    var previewNewsletterModalView = new Newsletter.PreviewNewsletterModalView({
                        model: newsletterInfo
                    });

                    newsletterInfo.on('sync', function() {
                    	console.log('show preview modal');
                        App.modalRegion.show(previewNewsletterModalView);
                        $('#modal-region .modal').modal('show');
                        newsletterInfo.unbind('sync');
                    });

                    newsletterInfo.fetch();
                },

                showSentNewsletterModalView: function(newsletterID, searchString, filterBy) {
                    var newsletterInfo = new App.Entities.Newsletter();
                    newsletterInfo.urlRoot = App.apiURL + "admin/sendy_email/" + newsletterID;
                    newsletterInfo.search_string = searchString;
                    newsletterInfo.filterBy = filterBy;

                    var sentNewsletterModalView = new Newsletter.SentNewsletterModalView({
                        model: newsletterInfo
                    });

                    newsletterInfo.on('sync', function() {
                        App.modalRegion.show(sentNewsletterModalView);
                        $('#modal-region .modal').modal('show');
                        newsletterInfo.unbind('sync');
                    });

                    newsletterInfo.fetch();
                },

                createNewsletterModalView: function(searchString, filterBy) {
                    var newsletterInfo = new App.Entities.Newsletter();
                    newsletterInfo.urlRoot = App.apiURL + "admin/sendy_emails/";
                    newsletterInfo.filterBy = filterBy;
                    newsletterInfo.search_string = searchString;

                    var createNewsletterModalView = new Newsletter.CreateNewsletterModalView({
                        model: newsletterInfo
                    });

                    App.modalRegion.show(createNewsletterModalView);
                    $('#modal-region .modal').modal('show');
                },

                scheduleNewsletterModalView: function(newsletterID, searchString, filterBy) {
                    var newsletterInfo = new App.Entities.Newsletter();
                    newsletterInfo.urlRoot = App.apiURL + "admin/sendy_email/" + newsletterID;
                    newsletterInfo.filterBy = filterBy;
                    newsletterInfo.search_string = searchString;

                    var scheduleNewsletterModalView = new Newsletter.ScheduleNewsletterModalView({
                        model: newsletterInfo
                    });

                    newsletterInfo.on('sync', function() {
                        App.modalRegion.show(scheduleNewsletterModalView);
                        $('#modal-region .modal').modal('show');
                        newsletterInfo.unbind('sync');
                    });

                    newsletterInfo.fetch();
                }
            };  // List.Controller
        });   // App.module

        return App.Newsletter.List.Controller;

    });
