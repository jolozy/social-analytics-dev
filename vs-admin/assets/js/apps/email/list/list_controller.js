define(["app",
        "apps/email/list/list_view",
        "entities/email"],
    function(App) {

        App.module('Email.List', function (Email, App, Backbone, Marionette, $, _) {
            // Controller
            Email.Controller = {
                listEmails: function (searchString, filter) {
                    var fetchingEmails = App.request("email:entities", searchString, filter);
                    $.when(fetchingEmails).done(function (emails) {
                        var emailListView = new Email.EmailListView({
                            collection: emails
                        });
                        App.mainRegion.show(emailListView);
                    });
                },  // listComments

                showEditEmailModalView: function(emailID, searchString, filterBy) {
                    var emailInfo = new App.Entities.Email();
                    emailInfo.urlRoot = App.apiURL + "admin/scheduled_email/" + emailID;
                    emailInfo.search_string = searchString;
                    emailInfo.filterBy = filterBy;

                    var editEmailModalView = new Email.EditEmailModalView({
                        model: emailInfo
                    });

                    emailInfo.on('sync', function() {
                        App.modalRegion.show(editEmailModalView);
                        $('#modal-region .modal').modal('show');
                        emailInfo.unbind('sync');
                    });

                    emailInfo.fetch();
                },

                createEmailModalView: function(searchString, filterBy) {
                    var emailInfo = new App.Entities.Email();
                    emailInfo.urlRoot = App.apiURL + "admin/scheduled_email/";
                    emailInfo.filterBy = filterBy;
                    emailInfo.search_string = searchString;

                    var createEmailModalView = new Email.CreateEmailModalView({
                        model: emailInfo
                    });

                    App.modalRegion.show(createEmailModalView);
                    $('#modal-region .modal').modal('show');
                },

                scheduleEmailModalView: function(emailID, searchString, filterBy) {
                    var emailInfo = new App.Entities.Email();
                    emailInfo.urlRoot = App.apiURL + "admin/scheduled_email/" + emailID;
                    emailInfo.filterBy = filterBy;
                    emailInfo.search_string = searchString;

                    var scheduleEmailModalView = new Email.ScheduleEmailModalView({
                        model: emailInfo
                    });

                    emailInfo.on('sync', function() {
                        App.modalRegion.show(scheduleEmailModalView);
                        $('#modal-region .modal').modal('show');
                        emailInfo.unbind('sync');
                    });

                    emailInfo.fetch();
                }
            };  // List.Controller
        });   // App.module

        return App.Email.List.Controller;

    });