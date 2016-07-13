define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Series = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/series",

            defaults:{
                title: "",
                description_long: "",
                description_short: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                published: "",
                published_date: "",
                url: ""
            },

            togglePublish: function () {
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            }
        });

        Entities.SeriesCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Series,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/series",
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 20
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;

                return res.series;
            }
        });

        var series;

        var API = {
            getSeriesEntity: function(series_id){
                if(localStorage.getItem('access_token')){
                    // Logged in
                    headers = {
                        'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                    };
                    $.ajaxSetup({
                         headers: headers
                      });
                    App.trigger("navbar:desktop");
                    require(["apps/video/video"], function(){
                        if(App.getCurrentRoute() === ""){
                            App.trigger('video:list');
                        }
                    });
                }
                var series = new Entities.Series({id: series_id});
                series.fetch();
                return series;
            },
            getSeriesEntities: function(){
                series = new Entities.SeriesCollection();
                series.fetch();
                
                return series;
            }
                
        };

        App.reqres.setHandler("series:entities", function(){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getSeriesEntities();
        });

        App.reqres.setHandler("series:entity", function(series_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getSeriesEntity(series_id);
        });

    });

    return ;
});