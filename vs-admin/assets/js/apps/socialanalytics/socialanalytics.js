define(["app",
        "apps/socialanalytics/list/list_controller"
    ],
    function(App) {

        App.module('SocialAnalytics', function(SocialAnalytics, App, Backbone, Marionette, $, _) {
            // Router
            SocialAnalytics.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    'social-analytics': 'listSocialAnalytics'
                }
            });

            var API = {
                listSocialAnalytics: function() {
                    App.SocialAnalytics.List.Controller.listSocialAnalytics();
                    //console.log('list social analytics');
                }
            };

            App.on('socialAnalytics:list', function() {
                App.navigate('social-analytics', true);
                API.listSocialAnalytics();
            });

            App.addInitializer(function() {
                new SocialAnalytics.Router({
                    controller: API
                });
            }); //Submission.Router

            // Listeners

        }); // App.module

        return App.SocialAnalytics.Router;

    });
