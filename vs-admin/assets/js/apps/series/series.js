define(["app",
  "apps/series/list/list_controller",
  "apps/series/edit/edit_controller",
  "apps/series/season/season_controller"],
function(App) {

  App.module('Series', function (Series, App, Backbone, Marionette, $, _) {
    // Router
    Series.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'series': 'listSeries',
          'series/new': 'editSeries',
          'series/:series_id': 'editSeries',
          'series/:series_id/season/new': 'editSeason',
          'series/:series_id/season/:season_id': 'editSeason'
        }
      });

      var API = {
        listSeries: function () {
          App.Series.List.Controller.listSeries();
        },

        editSeries: function (series_id) {
          App.Series.Edit.Controller.editSeries(series_id);
        },

        newSeries: function () {
          App.Series.Edit.Controller.editSeries();
        },

        editSeason: function (series_id, season_id) {
          App.Series.EditSeason.Controller.showSeasonEditForm(series_id, season_id);
        }
      };

      App.on('series:list', function () {
        App.navigate('series');
        API.listSeries();
      });

      App.on('series:edit', function (series_id) {
        App.navigate('series/'+series_id);
        API.editSeries(series_id);
      });

      App.on('series:new', function () {
        App.navigate('series/new');
        API.newSeries();
      });

      App.on('series:season:edit', function (series_id, season_id) {
        App.navigate('series/'+series_id+'/season/'+season_id);
        API.editSeason(series_id, season_id);
      });

      App.addInitializer(function () {
        new Series.Router({
          controller: API
        });
      }); //Series.Router

      // Listeners

  }); // App.module

  return;

});