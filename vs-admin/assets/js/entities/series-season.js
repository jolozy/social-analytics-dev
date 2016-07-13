define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.SeriesSeason = Backbone.Model.extend({
            defaults: {
                season_index: "",
                published: "",
                series_id: "",
                published_date: "",
                season_index: ""
            },

            togglePublish: function () {
                this.urlRoot = App.apiURL + "admin/series/" + this.get('series_id') + "/season";
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            }
        });

        Entities.SeriesSeasonCollection = Backbone.Collection.extend({
            model: Entities.SeriesSeason
        });

        var seasons;

        var API = {
            getSeriesSeasonEntity: function(series_id, season_id){
                var season = new Entities.SeriesSeason({id: season_id});
                season.urlRoot = App.apiURL + "admin/series/" + series_id + "/season";
                season.fetch();
                return season;
            },
            getSeriesSeasonEntities: function(series_id){
                seasons = new Entities.SeriesSeasonCollection();
                seasons.url = App.apiURL + "admin/series/" + series_id + "/seasons";
                seasons.fetch();
                
                return seasons;
            }
                
        };

        App.reqres.setHandler("series:season:entities", function(series_id){
            return API.getSeriesSeasonEntities(series_id);
        });

        App.reqres.setHandler("series:season:entity", function(series_id, season_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getSeriesSeasonEntity(series_id, season_id);
        });
    });
});