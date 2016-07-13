define(["app",
    "apps/carousel/edit/edit_view",
    "entities/carousel"],
function(App) {

  App.module('Carousel.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    // Controller
    Edit.Controller = {
        editCarousel: function (carousel_type, carousel_id) {
          var carousel;
          if(carousel_id)
            carousel = App.request('carousel:entity', carousel_id);
          else{
            carousel = new App.Entities.Carousel();
          }
          carousel.set('carousel_type', carousel_type);
          var carouselView = new Edit.CarouselView({
            model: carousel
          });
          carouselView.carousel_type = carousel_type;

          App.mainRegion.show(carouselView);
        }
    };  // Carousel.Edit.Controller
  });   // App.module

  return App.Carousel.Edit.Controller;

});