define(["app",
    "apps/partner/list/list_view",
    "entities/partner"],
function(App) {

  App.module('Partner.List', function (List, App, Backbone, Marionette, $, _) {
    // Controller
    List.Controller = {
      listPartners: function () {
          var fetchingPartners = App.request("partner:entities");
          $.when(fetchingPartners).done(function (partners) {
              var partnersListView = new List.PartnerListView({
                  collection: partners
              });

              App.mainRegion.show(partnersListView);
          });
      },  // listPartners
    };  // Partner.List.Controller
  });   // App.module

  return App.Partner.List.Controller;

});