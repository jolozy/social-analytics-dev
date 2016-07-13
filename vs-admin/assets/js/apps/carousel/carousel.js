define(["app",
  "apps/carousel/list/list_controller",
  "apps/carousel/edit/edit_controller"],
function(App) {

  App.module('Carousel', function (Carousel, App, Backbone, Marionette, $, _) {
    // Router
    Carousel.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'carousels/:carousel_type': 'listCarousels',
          'carousel/:carousel_type': 'listCarousels',
          'carousel/:carousel_type/new': 'editCarousel',
          'carousel/:carousel_type/:carousel_id': 'editCarousel'
        }
      });

      var API = {
        listCarousels: function (carousel_type) {
          App.Carousel.List.Controller.listCarousels(carousel_type);
        },

        editCarousel: function (carousel_type, carousel_id) {
          App.Carousel.Edit.Controller.editCarousel(carousel_type, carousel_id);
        },

        newCarousel: function (carousel_type) {
          App.Carousel.Edit.Controller.editCarousel(carousel_type);
        }
      };

      App.on('carousel:list', function (carousel_type) {
        App.navigate('carousels');
        API.listCarousels(carousel_type);
      });

      App.on('carousel:edit', function (carousel_type, carousel_id) {
        App.navigate('carousel/'+carousel_type+'/'+carousel_id);
        API.editCarousel(carousel_type, carousel_id);
      });

      App.on('carousel:new', function (carousel_type) {
        App.navigate('carousel/'+carousel_type+'/new');
        API.newCarousel(carousel_type);
      });

      App.addInitializer(function () {
        new Carousel.Router({
          controller: API
        });
      }); //Carousel.Router

      // Listeners

  }); // App.module

  return;

});