define(["app",
    "apps/channel/edition/edition_view",
    "entities/channel-edition",
    "entities/channel-playlist"],
  function(App) {

    App.module('Channel.EditEdition', function (EditEdition, App, Backbone, Marionette, $, _) {
      // Controller
      EditEdition.Controller = {
        newEdition: function(channel_id) {
          this.showEditionEditForm(channel_id);
        },

        showEditionEditForm: function (channel_id, edition_id, channel_url) {
          var edition;
          var edition_playlists;
          if (channel_id && edition_id) {
            edition = App.request('channel_edition:entity', channel_id, edition_id);
            edition_playlists = App.request('channel_playlist:entities', channel_id, edition_id);
          }

          var editionFormView = new EditEdition.EditionFormView({
            model: edition,
            collection: edition_playlists,
            channel_id: channel_id,
            channel_url: channel_url
          });

          editionFormView.on("itemview:edit:playlist", function(childView, channel_id, edition_id, playlist_id, channel_url, edition_url) {
            App.trigger('channel:playlist:edit', channel_id, edition_id, playlist_id, channel_url, edition_url);
          });

          App.mainRegion.show(editionFormView);
        },

        showNewEditionPlaylistView: function (channel_id, edition_id, edition_view) {
          var edition_playlist = new App.Entities.ChannelPlaylist();
          edition_playlist.set('channel_id', channel_id);
          edition_playlist.set('edition_id', edition_id);
          edition_playlist.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/" + edition_id;
          var editionPlaylistView = new EditEdition.NewEditionPlaylistView({
            model: edition_playlist
          });
          editionPlaylistView.edition_view = edition_view;
          App.modalRegion.show(editionPlaylistView);
          $('#modal-region .modal').modal('show');
        }
      };  // Channel.editEdition.Controller
    });   // App.module

    return App.Channel.EditEdition.Controller;

  });
