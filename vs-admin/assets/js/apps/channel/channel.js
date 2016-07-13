define(["app",
  "apps/channel/list/list_controller",
  "apps/channel/edit/edit_controller",
  "apps/channel/edition/edition_controller",
  "apps/channel/playlist/playlist_controller"],
function(App) {

  App.module('Channel', function (Channel, App, Backbone, Marionette, $, _) {
    // Router
    Channel.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'channels': 'listChannels',
          'channel': 'listChannels',
          'channel/new': 'editChannel',
          'channel/:channel_id': 'editChannel',
          'channel/:channel_id/editions/:edition_id': 'editEdition',
          'channel/:channel_id/editions/:edition_id/playlists/:playlist_id': 'editPlaylist'
        }
      });

      var API = {
        listChannels: function () {
          App.Channel.List.Controller.listChannels();
        },

        editChannel: function (channel_id) {
          App.Channel.Edit.Controller.editChannel(channel_id);
        },

        newChannel: function () {
          App.Channel.Edit.Controller.editChannel();
        },

        editEdition: function(channel_id, edition_id, channel_url) {
          App.Channel.EditEdition.Controller.showEditionEditForm(channel_id, edition_id, channel_url);
        },

        editPlaylist: function(channel_id, edition_id, playlist_id, channel_url, edition_url) {
          App.Channel.EditPlaylist.Controller.showPlaylistEditForm(channel_id, edition_id, playlist_id, channel_url, edition_url);
        }
      }; // App.Channel.EditEdition.Controller.

      App.on('channel:list', function () {
        App.navigate('channels');
        API.listChannels();
      });

      App.on('channel:edit', function (channel_id) {
        App.navigate('channel/'+channel_id);
        API.editChannel(channel_id);
      });

      App.on('channel:new', function () {
        App.navigate('channel/new');
        API.newChannel();
      });

      App.on('channel:edition:edit', function (channel_id, edition_id, channel_url) {
        App.navigate('channel/'+channel_id+'/editions/'+edition_id);
        API.editEdition(channel_id, edition_id, channel_url);
      });

      App.on('channel:playlist:edit', function (channel_id, edition_id, playlist_id, channel_url, edition_url) {
        App.navigate('channel/'+channel_id+'/editions/'+edition_id+'/playlists/'+playlist_id);
        API.editPlaylist(channel_id, edition_id, playlist_id, channel_url, edition_url);
      });

      App.addInitializer(function () {
        new Channel.Router({
          controller: API
        });
      }); //Channel.Router

      // Listeners

  }); // App.module

  return;

});
