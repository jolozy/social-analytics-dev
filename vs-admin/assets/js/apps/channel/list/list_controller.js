define(["app",
    "apps/channel/list/list_view",
    "entities/channel"],
function(App) {

  App.module('Channel.List', function (List, App, Backbone, Marionette, $, _) {
    // Controller
    List.Controller = {
      listChannels: function () {
          var fetchingChannels = App.request("channel:entities");
          $.when(fetchingChannels).done(function (channels) {
              var channelListView = new List.ChannelListView({
                  collection: channels
              });

              App.mainRegion.show(channelListView);
          });
      },  // listChannels
    };  // Channel.List.Controller
  });   // App.module

  return App.Channel.List.Controller;

});