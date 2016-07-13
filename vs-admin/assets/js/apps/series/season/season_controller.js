define(["app",
    "apps/series/season/season_view",
    "entities/series-season",
    "entities/season-videos"],
function(App) {

  App.module('Series.EditSeason', function (EditSeason, App, Backbone, Marionette, $, _) {
    // Controller
    EditSeason.Controller = {
      newSeason: function(series_id) {
        this.showSeasonEditForm(series_id);
      },

      showSeasonEditForm: function (series_id, season_id) {
        var season;
        var videos;
        if(season_id){
          season = App.request("series:season:entity", series_id, season_id);
          videos = App.request("series:season:video:entities", series_id, season_id);
          // videos.series_id = series_id;
          // videos.season_id = season_id;
          // App.navigate("series/"+series_id+"/season/"+season_id);
        }else{
          season = new App.Entities.SeriesSeason();
          season.set("series_id", series_id);
          // App.navigate("series/"+series_id+"/season/new");
        }

        season.urlRoot = App.apiURL + "admin/series/" + series_id + "/season";

        var formView = new EditSeason.VideoListView({
          model: season,
          collection: videos,
          series_id: series_id,
          season_id: season_id
        });

        formView.on('itemview:video:edit', function (childView, model) {
          // model.urlRoot = App.apiURL + "admin/series/" + series_id + "/season/" + season_id + "/video";
          var view = new EditSeason.EditVideoFormItemView ({
            model: model
          });

          view.on("video:delete", function(model) {
            model.destroy({
              success: function() {
                jQuery.gritter.add({
                  title: 'Video Deleted',
                  class_name: 'growl-success'
                });
                App.modalRegion.close();
                formView.triggerMethod('video:deleted');
              }
            });
          });

          App.modalRegion.show(view);
        });

        formView.on('itemview:video:delete', function (childView, model) {
          model.destroy({
            success: function() {
              jQuery.gritter.add({
                title: 'Video Deleted',
                class_name: 'growl-success'
              });
              formView.triggerMethod('video:deleted');
            }
          });
        });

        formView.on('video:new', function () {
          var index = 0;
          if (videos) {
            index = videos.length + 1;
          }
          var video = new App.Entities.SeasonVideo();
          video.urlRoot = App.apiURL + "admin/series/" + series_id + "/season/" + season_id + "/videos";
          var view = new EditSeason.NewVideoFormItemView ({
            model: video,
            series_id: series_id,
            season_id: season_id,
            video_index: index,
            collection: videos
          });

          view.on("form:cancel", function(data) {
            App.modalRegion.close();
          });

          App.modalRegion.show(view);
        });

        formView.on('itemview:video:publish', function (view) {
          var model = view.model;
          model.urlRoot = App.apiURL + "admin/series/" + series_id + "/season/" + season_id + "/video";
          model.togglePublish();
        });

        App.mainRegion.show(formView);
      }
    };  // Series.EditSeason.Controller
  });   // App.module

  return App.Series.EditSeason.Controller;

});