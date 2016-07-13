define(["app",
      "apps/facebook/list/list_controller"],
    function(App) {

      App.module('Facebook', function (Facebook, App, Backbone, Marionette, $, _) {
        // Router
        Facebook.Router = Marionette.AppRouter.extend({
          appRoutes: {
            'facebook-pages': 'listFacebookPosts'
          }
        });

        var API = {
          listFacebookPosts: function () {
            App.Facebook.List.Controller.listFacebookPosts();
          }
        };

        App.on('facebook:list', function () {
          App.navigate('facebook-pages');
          API.listFacebookPosts();
        });

        App.addInitializer(function () {
          new Facebook.Router({
            controller: API
          });
        }); //Submission.Router

        // Listeners

      }); // App.module

      return App.Facebook.Router;

    });