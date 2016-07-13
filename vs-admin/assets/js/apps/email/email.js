define(["app",
        "apps/email/list/list_controller"],
    function(App) {

        App.module('Email', function (Email, App, Backbone, Marionette, $, _) {
            // Router
            Email.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    'emails': 'listEmail'
                }
            });

            var API = {
                listEmail: function () {
                    App.Email.List.Controller.listEmails();
                }
            };

            App.on('email:list', function () {
                App.navigate('emails');
                API.listEmail();
            });

            App.addInitializer(function () {
                new Email.Router({
                    controller: API
                });
            }); //Submission.Router

            // Listeners

        }); // App.module

        return App.Email.Router;

    });