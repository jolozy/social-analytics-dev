define(["app",
    "apps/channel/playlist/playlist_view",
    "entities/channel-playlist",
    "entities/channel-video"],
  function(App) {

    App.module('Channel.EditPlaylist', function (EditPlaylist, App, Backbone, Marionette, $, _) {
      // Controller
      EditPlaylist.Controller = {
        newPlaylist: function(channel_id) {
          this.showPlaylistEditForm(channel_id);
        },

        showPlaylistEditForm: function (channel_id, edition_id, playlist_id, channel_url, edition_url) {
          var playlist;
          var playlist_videos;
          if (channel_id && edition_id && playlist_id) {
            playlist = App.request('channel_playlist:entity', channel_id, edition_id, playlist_id);
            playlist_videos = App.request('channel_video_v2:entities', channel_id, edition_id, playlist_id);
          }

          var playlistFormView = new EditPlaylist.PlaylistFormView({
            model: playlist,
            collection: playlist_videos,
            channel_id: channel_id,
            edition_id: edition_id,
            channel_url: channel_url,
            edition_url: edition_url
          });

          App.mainRegion.show(playlistFormView);
        },

        showChannelVideoView: function (channel_id, edition_id, playlist_id, playlist_video) {
          playlist_video.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/" + edition_id + "/playlists/" + playlist_id;
          playlist_video.set('channel_id', channel_id);
          playlist_video.set('edition_id', edition_id);
          playlist_video.set('playlist_id', playlist_id);
          var playlistVideoView = new EditPlaylist.PlaylistVideoView({
            model: playlist_video,
            channel_id: channel_id,
            edition_id: edition_id,
            playlist_id: playlist_id
          });

          App.modalRegion.show(playlistVideoView);
          $('#modal-region .modal').modal('show');
        },

        showNewPlaylistVideoView: function (channel_id, edition_id, playlist_id, playlist_view) {
          var playlist_video = new App.Entities.ChannelVideoV2();
          playlist_video.set('channel_id', channel_id);
          playlist_video.set('edition_id', edition_id);
          playlist_video.set('playlist_id', playlist_id);
          playlist_video.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/" + edition_id + "/playlists/" + playlist_id;
          var playlistVideoView = new EditPlaylist.NewPlaylistVideoView({
            model: playlist_video,
          });
          playlistVideoView.playlist_view = playlist_view;
          App.modalRegion.show(playlistVideoView);
          $('#modal-region .modal').modal('show');
        }
      };  // Channel.editEdition.Controller
    });   // App.module

    return App.Channel.EditPlaylist.Controller;

  });
