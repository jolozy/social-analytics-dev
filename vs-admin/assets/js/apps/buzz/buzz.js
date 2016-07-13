define(["app",
    "apps/buzz/list/list_controller"],
  function(App) {

    App.module('Buzz', function (Buzz, App, Backbone, Marionette, $, _) {
      // Router
      Buzz.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'buzz-newsletters': 'listBuzzNewsLetters'
        }
      });

      var API = {
        listBuzzNewsLetters: function () {
          App.Buzz.List.Controller.listBuzzNewsletters();
        }
      };

      App.on('buzz:list', function () {
        App.navigate('buzz-newsletters');
        API.listBuzzNewsLetters();
      });

      App.addInitializer(function () {
        new Buzz.Router({
          controller: API
        });
      }); //Submission.Router

      // Listeners

    }); // App.module

    return App.Buzz.Router;

  });
