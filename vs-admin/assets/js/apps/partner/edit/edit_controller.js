define(["app",
    "apps/partner/edit/edit_view",
    "entities/partner",
    "entities/partner-video"],
function(App) {

  App.module('Partner.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    // Controller
    Edit.Controller = {
      newPartner: function () {
        editPartner();
      },

      editPartner: function (partner_id) {
        var partner;
        var partner_videos;
        if(partner_id){
          partner = App.request('partner:entity', partner_id);
          partner_videos = App.request('partner_video:entities', partner_id);
        } else{
          partner = new App.Entities.Partner();
          partner_videos = new App.Entities.PartnerCollection();
        }
        
        var partnerView = new Edit.PartnerView({
          model: partner,
          collection: partner_videos
        });

        App.mainRegion.show(partnerView);
      },

      showPartnerVideoView: function (partner_id, partner_video) {
        partner_video.urlRoot = App.apiURL + "admin/partner/" + partner_id + "/video";
        var partnerVideoView = new Edit.PartnerVideoView({
          model: partner_video
        });

        App.modalRegion.show(partnerVideoView);
        $('#modal-region .modal').modal('show');
      },

      showNewPartnerVideoView: function (partner_id, partner_view) {
        var partner_video = new App.Entities.PartnerVideo();
        partner_video.set('partner_id', partner_id);
        partner_video.urlRoot = App.apiURL + "admin/partner/" + partner_id + "/video";
        var partnerVideoView = new Edit.NewPartnerVideoView({
          model:partner_video
        });
        partnerVideoView.partner_view = partner_view;
        App.modalRegion.show(partnerVideoView);
        $('#modal-region .modal').modal('show');
      }
    };  // Partner.Edit.Controller
  });   // App.module

  return App.Partner.Edit.Controller;

});