define(["app",
    "apps/buzz/list/list_view",
    "entities/buzz"],
  function(App) {

    App.module('Buzz.List', function (Buzz, App, Backbone, Marionette, $, _) {
      // Controller
      Buzz.Controller = {

        listBuzzNewsletters: function (status, category, language) {
          var fetchingBuzz = App.request("buzz:entities", status, category, language);
          $.when(fetchingBuzz).done(function (buzz) {
            var buzzListView = new Buzz.BuzzListView({
              collection: buzz
            });
            App.mainRegion.show(buzzListView);
          });
        },  // listBuzzNewsletters

        showBuzzNewsletter: function (set_id) {
          var fetchingBuzz = App.request("buzz:entity", set_id);
          $.when(fetchingBuzz).done(function (buzz) {
            var buzzModalView = new Buzz.BuzzModalView({
              model: buzz
            });
            App.modalRegion.show(buzzModalView);
            $('#modal-region .modal').modal('show');
          });
        },

        showSendPreviewModal: function (set_id) {
          var buzzModalView = new Buzz.BuzzSendPreviewModalView({
            id: set_id
          });
          App.modalRegion.show(buzzModalView);
          $('#modal-region .modal').modal('show');
        }
      };  // List.Controller
    });   // App.module

    return App.Buzz.List.Controller;

  });
