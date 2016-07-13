define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Carousel = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/carousel",

            defaults:{
                title: "",
                description: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                published: "",
                action_url: "",
                carousel_order: "",
                not_film: ""
            },

            togglePublish: function () {
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            },
            deleteCarouselImage: function (callback) {
                this.destroy({
                    success: callback.success,
                    error: callback.error
                });
            }
        });

        Entities.CarouselCollection = Backbone.Collection.extend({
            url: App.apiURL + "admin/carousels",
            model: Entities.Carousel
        });

        var carousels;

        var API = {
            getCarouselEntity: function(carousel_id){
                var carousel = new Entities.Carousel({id: carousel_id});
                carousel.fetch();
                return carousel;
            },
            getCarouselEntities: function(type){
                carousels = new Entities.CarouselCollection();
                carousels.fetch({
                    data: {type:type}
                });

                return carousels;
            }
                
        };

        App.reqres.setHandler("carousel:entities", function(type){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getCarouselEntities(type);
        });

        App.reqres.setHandler("carousel:entity", function(carousel_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getCarouselEntity(carousel_id);
        });

    });

    return ;
});