define(["app",
  "apps/video/list/list_controller",
  "apps/video/edit/edit_controller"],
function(App) {

  App.module('Video', function (Video, App, Backbone, Marionette, $, _) {
    // Router
    Video.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'videos': 'listVideos',
          'video': 'listVideos',
          'video/new': 'editVideo',
          'video/:video_id': 'editVideo'
        }
      });

      var API = {
        listVideos: function () {
          App.Video.List.Controller.listVideos();
        },

        editVideo: function (video_id) {
          App.Video.Edit.Controller.showEditForm(video_id);
        },

        newVideo: function () {
          App.Video.Edit.Controller.showEditForm();
        }
      };

      App.on('video:list', function () {
        App.navigate('videos');
        API.listVideos();
      });

      App.on('video:edit', function (video_id) {
        App.navigate('video/'+video_id);
        API.editVideo(video_id);
      });

      App.on('video:new', function () {
        App.navigate('video/new');
        API.newVideo();
      });

      App.addInitializer(function () {
        new Video.Router({
          controller: API
        });
      }); //Video.Router
  }); // App.module

  return App.Video.Router;

});