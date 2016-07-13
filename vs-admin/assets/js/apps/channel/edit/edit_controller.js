define(["app",
    "apps/channel/edit/edit_view",
    "select2",
    "entities/channel",
    "entities/channel-video",
    "entities/channel-edition"],
function(App) {

  App.module('Channel.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    // Controller
    Edit.Controller = {
        newChannel: function () {
          this.editChannel();
        },

        editChannel: function(channel_id) {
          var channel;
          var channel_editions;
          if (channel_id) {
            channel = App.request('channel:entity', channel_id);
            channel_editions = App.request('channel_edition:entities', channel_id);
          } else {
            channel = new App.Entities.Channel();
            channel_editions = new App.Entities.ChannelEditionCollection();
          }
          var channelView = new Edit.ChannelView({
            model: channel,
            collection: channel_editions
          });

          channelView.on("itemview:edit:edition", function(childView, channel_id, edition_id, channel_url) {
            App.trigger('channel:edition:edit', channel_id, edition_id, channel_url);
          });

          App.mainRegion.show(channelView);
        },

        showNewChannelEditionView: function (channel_id, channel_url, channel_view) {
          var channel_edition = new App.Entities.ChannelEdition();
          channel_edition.set('channel_id', channel_id);
          channel_edition.set('channel_url', channel_url);
          channel_edition.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions";
          var channelEditionView = new Edit.NewChannelEditionView({
            model: channel_edition
          });
          channelEditionView.channel_view = channel_view;
          App.modalRegion.show(channelEditionView);
          $('#modal-region .modal').modal('show');
        }
    };  // Channel.Edit.Controller
  });   // App.module

  return App.Channel.Edit.Controller;

});
