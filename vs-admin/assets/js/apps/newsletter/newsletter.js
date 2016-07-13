define(["app",
        "apps/newsletter/list/list_controller"],
    function(App) {

        App.module('Newsletter', function (Newsletter, App, Backbone, Marionette, $, _) {
            // Router
            Newsletter.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    'newsletters': 'listNewsletter'
                }
            });

            var API = {
                listNewsletter: function () {
                    App.Newsletter.List.Controller.listNewsletters();
                }
            };

            App.on('newsletter:list', function () {
                App.navigate('newsletters');
                API.listNewsletter();
            });

            App.addInitializer(function () {
                new Newsletter.Router({
                    controller: API
                });
            }); //Submission.Router

            // Listeners

        }); // App.module

        return App.Newsletter.Router;

    });