define(["app",
    "apps/carousel/list/list_view",
    "entities/carousel"],
function(App) {

  App.module('Carousel.List', function (List, App, Backbone, Marionette, $, _) {
    // Controller
    List.Controller = {
      listCarousels: function (carousel_type) {
          var fetchingCarouselImages = App.request("carousel:entities", carousel_type);
          $.when(fetchingCarouselImages).done(function (carousel_images) {
              var carouselListView = new List.CarouselListView({
                  collection: carousel_images
              });
              carouselListView.carousel_type = carousel_type;

              App.mainRegion.show(carouselListView);
          });
      },  // listCarousels
    };  // Carousel.List.Controller
  });   // App.module

  return App.Carousel.List.Controller;

});