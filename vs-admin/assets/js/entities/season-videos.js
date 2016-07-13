define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.SeasonVideo = Backbone.Model.extend({
            defaults: {
                published: "",
                season_id: "",
                published_date: "",
                video_index: "",
                video: "",
                video_id: "",
                title: ""
            },

            togglePublish: function () {
                // this.urlRoot = App.apiURL + "admin/series/" + this.get('series_id') + "/season/" + this.get('season_id') + "/video";
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            }
        });

        Entities.SeasonVideoCollection = Backbone.Collection.extend({
            model: Entities.SeasonVideo
        });

        var season_videos;

        var API = {
            getSeasonVideoEntity: function(series_id, season_id, season_video_id){
                var season_video = new Entities.SeasonVideo({id: season_video_id});
                season_video.urlRoot = App.apiURL + "admin/series/" + series_id + "/season/" + season_id + "/video";
                season_video.fetch();
                return season_video;
            },
            getSeasonVideoEntities: function(series_id, season_id){
                season_videos = new Entities.SeasonVideoCollection();
                season_videos.url = App.apiURL + "admin/series/" + series_id  + "/season/" + season_id + "/videos";
                season_videos.fetch();
                
                return season_videos;
            }
                
        };

        App.reqres.setHandler("series:season:video:entities", function(series_id, season_id){
            return API.getSeasonVideoEntities(series_id, season_id);
        });

        App.reqres.setHandler("series:season:video:entity", function(series_id, season_id, season_video_id){
            return API.getSeasonVideoEntity(series_id, season_id, season_video_id);
        });
    });
});