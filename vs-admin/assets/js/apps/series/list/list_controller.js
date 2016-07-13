define(["app",
    "apps/series/list/list_view",
    "entities/series"],
function(App) {

  App.module('Series.List', function (List, App, Backbone, Marionette, $, _) {
    // Controller
    List.Controller = {
      listSeries: function () {
          var fetchingSeries = App.request("series:entities");
          $.when(fetchingSeries).done(function (series) {
              var seriesListView = new List.SeriesListView({
                  collection: series
              });

              App.mainRegion.show(seriesListView);
          });
      },  // listSeries
    };  // Series.List.Controller
  });   // App.module

  return App.Series.List.Controller;

});