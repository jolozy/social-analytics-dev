/*
  NOTE: This User app for for user_search, not for the user who is logged in.
 */

define(["app",
    "apps/user/list/list_controller"],
  function(App) {

    App.module('User', function (User, App, Backbone, Marionette, $, _) {
      // Router
      User.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'user-search': 'listUser'
        }
      });

      var API = {
        listUser: function () {
          App.User.List.Controller.listUsers();
        }
      };

      App.on('user:list', function () {
        App.navigate('user-search');
        API.listEmail();
      });

      App.addInitializer(function () {
        new User.Router({
          controller: API
        });
      }); //Submission.Router

      // Listeners

    }); // App.module

    return App.User.Router;

  });
