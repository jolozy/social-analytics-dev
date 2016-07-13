define(["app",
    "apps/series/edit/edit_view",
    "entities/series",
    "entities/series-season"],
function(App) {

  App.module('Series.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    // Controller
    Edit.Controller = {
        newSeries: function () {
          this.editSeries();
        },
        editSeries: function (series_id) {
          var series;
          var seasons;
          if(series_id) {
            series = App.request('series:entity', series_id);
            seasons = App.request('series:season:entities', series_id);
          } else {
            series = new App.Entities.Series();
            App.navigate('series/new');
          }
          var formView = new Edit.FormView({
            model: series,
            collection: seasons
          });

          formView.on("itemview:edit:season", function(childView, series_id, season_id) {
            App.trigger('series:season:edit', series_id, season_id);
          });

          App.mainRegion.show(formView);
        }
    };  // Series.Edit.Controller
  });   // App.module

  return App.Series.Edit.Controller;

});