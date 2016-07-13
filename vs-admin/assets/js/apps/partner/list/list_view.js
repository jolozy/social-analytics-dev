define(["app",
  "tpl!apps/partner/list/tpl/partner-itemview.tpl",
  "tpl!apps/partner/list/tpl/partner-listview.tpl"],
function(App, partnerItemViewTpl, partnerListViewTpl) {

  App.module('Partner.List', function (List, App, Backbone, Marionette, $, _) {
    
    List.PartnerItemView = Marionette.ItemView.extend({
        template: partnerItemViewTpl,

    }); //List.PartnerItemView

    List.PartnerListView = Marionette.CompositeView.extend({
        template: partnerListViewTpl,
        
        itemView: List.PartnerItemView,
        itemViewContainer: '.js-partner-list-container',

        initialize: function () {
            this.collection.bind("reset", _.bind(this.render, this));
        },

        onRender: function () {
            
        },

        onShow: function () {
            
        },

        events: {
          'click js-new-partner-btn': 'newPartner'
        },

        newPartner: function () {
          App.Partner.Edit.Controller.newPartner();
        }
    });

  });   // /App.module

  return;

});