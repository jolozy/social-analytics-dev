define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.VideoTranslation = Backbone.Model.extend({
          defaults: {
              locale: "",
              title: "",
              description_short: "",
              description_long: ""
          },

        });

        Entities.VideoTranslationsCollection = Backbone.Collection.extend({
            model: Entities.VideoTranslation
        });

        var API = {
            /*getVideoTranslationEntity: function(channel_id, channel_video_id){
                var channel_video = new Entities.ChannelVideo({id: channel_video_id});
                channel_video.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/video";
                channel_video.fetch();
                return channel_video;
            },*/
            getVideoTranslationEntities: function(video_id){
                var video_translations = new Entities.VideoTranslationsCollection();
                video_translations.url = App.apiURL + "admin/video/" + video_id + "/localizations";
                video_translations.fetch();

                return video_translations;
            }

        };

        App.reqres.setHandler("video_translation:entities", function(video_id){
            return API.getVideoTranslationEntities(video_id);
        });
    });
});
