define(["app",
  "apps/partner/list/list_controller",
  "apps/partner/edit/edit_controller"],
function(App) {

  App.module('Partner', function (Partner, App, Backbone, Marionette, $, _) {
    // Router
    Partner.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'partners': 'listPartners',
          'partner': 'listPartners',
          'partner/new': 'editPartner',
          'partner/:partner_id': 'editPartner'
        }
      });

      var API = {
        listPartners: function () {
          App.Partner.List.Controller.listPartners();
        },

        editPartner: function (partner_id) {
          App.Partner.Edit.Controller.editPartner(partner_id);
        },

        newPartner: function () {
          App.Partner.Edit.Controller.editPartner();
        }
      };

      App.on('partner:list', function () {
        App.navigate('partners');
        API.listPartners();
      });

      App.on('partner:edit', function (partner_id) {
        App.navigate('partner/'+partner_id);
        API.editPartner(partner_id);
      });

      App.on('partner:new', function () {
        App.navigate('partner/new');
        API.newPartner();
      });

      App.addInitializer(function () {
        new Partner.Router({
          controller: API
        });
      }); //Partner.Router

      // Listeners

  }); // App.module

  return;

});