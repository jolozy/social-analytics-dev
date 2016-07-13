define(["app",
    "apps/tag/list/list_controller"],
  function(App) {

    App.module('Tag', function (Tag, App, Backbone, Marionette, $, _) {
      // Router
      Tag.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'tags': 'listTags'
        }
      });

      var API = {
        listTags: function () {
          App.Tag.List.Controller.listTags("");
        }
      };

      App.on('tag:list', function (tag_type) {
        App.navigate('tags');
        API.listTags(tag_type);
      });

      App.addInitializer(function () {
        new Tag.Router({
          controller: API
        });
      }); //Tag.Router

      // Listeners

    }); // App.module

    return App.Tag.Router;

  });
