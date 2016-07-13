define(["app",
  "tpl!apps/channel/list/tpl/channel-itemview.tpl",
  "tpl!apps/channel/list/tpl/channel-listview.tpl"],
function(App, channelItemViewTpl, channelListViewTpl) {

  App.module('Channel.List', function (List, App, Backbone, Marionette, $, _) {
    
    List.ChannelItemView = Marionette.ItemView.extend({
        template: channelItemViewTpl,
    }); //List.ChannelItemView

    List.ChannelListView = Marionette.CompositeView.extend({
        template: channelListViewTpl,

        itemView: List.ChannelItemView,
        itemViewContainer: '.js-channel-list-container',

        initialize: function () {
            this.collection.bind("reset", _.bind(this.render, this));
            this.listenTo(this.collection, 'change', this.render);
        },

        onRender: function () {
            
        },

        onShow: function () {
            
        },

        events: {
          'click js-new-channel-btn': 'newChannel'
        },

        newChannel: function () {
          App.Channel.Edit.Controller.newChannel();
        }
    });

  });   // /App.module

  return;

});
