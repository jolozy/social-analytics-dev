define(["app",
  "apps/video/edit/edit_view",
  "entities/video", "entities/email", "entities/video-translation"],
  function(App) {
    App.module('Video.Edit', function (Edit, App, Backbone, Marionette, $, _) {

      Edit.Controller = {
          showEditForm: function (video_id) {
            var video;
            var video_translations;
            var mediaLibrary;
            var video_note;

            if (video_id) {
              video = App.request('video:entity', video_id);
              video_translations = App.request('video_translation:entities', video_id);
              mediaLibrary = App.request('video:media_library', video_id);
              video_note = App.request('video:note', video_id);
            }
            else
              video = new App.Entities.Video();

            var formView = new Edit.FormView({
              model: video,
              mediaLibrary: mediaLibrary,
              collection: video_translations,
              note: video_note
            });

            App.mainRegion.show(formView);
          },

          showVideoTranslationView: function(video_id, video_translations, video_translation) {
            if (!video_translation) {
              video_translation = new App.Entities.VideoTranslation();
            }
            video_translation.urlRoot = App.apiURL + "admin/video/" + video_id + "/localizations";
            var videoTranslationView = new Edit.VideoTranslationView({
              model: video_translation,
              video_id: video_id,
              video_translations: video_translations
            });

            App.modalRegion.show(videoTranslationView);
            $('#modal-region .modal').modal('show');
          },

          createEmailModalView: function(video_id, callback) {
            var emailInfo = new App.Entities.Email();
            emailInfo.urlRoot = App.apiURL + "admin/scheduled_email/";
            emailInfo.video_id = video_id;
            emailInfo.callback = callback;

            var createEmailModalView = new Edit.CreateEmailModalView({
              model: emailInfo
            });

            App.modalRegion.show(createEmailModalView);
            $('#modal-region .modal').modal('show');
          }
      };  //Edit.Controller

    });
  return;
});
