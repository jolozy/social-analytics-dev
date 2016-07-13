define(["app"], function(App){
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.ChannelPlaylist = Backbone.Model.extend({
      defaults: {
        id: "",
        collection_id: "",
        item_index: "",
        title: "",
        custom_params: "",
        collection: "",
        created_at: "",
        updated_at: "",
        published: "",
        published_date: "",
        description: ""
      },

      togglePublish: function () {
        this.urlRoot = App.apiURL + "admin/channel/" + this.get('channel_id') + "/editions/" + this.get("collection_id") + "/playlists/" + this.get("id");
        var publish = !this.get("published");
        this.save({
          published: publish
        });
      },

      createChannelPlaylist: function (data, callback) {
        var self = this;
        self.set(data);
        var channel_id = self.get("channel_id");
        self.urlRoot = App.apiURL + "admin/channel/"+channel_id+"/editions/" + this.get("edition_id") + "/playlists";
        self.save({}, {
          type: 'POST',
          success: function (obj) {
            callback.success(obj);
          },
          error: function (err) {
            callback.error(err);
          }
        }); // self.save
      },

      submitChannelPlaylist: function (data, callback) {
        var self = this;
        self.set(data);
        var channel_id = self.get("channel_id");
        self.urlRoot = App.apiURL + "admin/channel/"+channel_id+"/editions/" + this.get("edition_id") + "/playlists";
        self.save({}, {
          success: function (obj) {
            callback.success(obj);
          },
          error: function (err) {
            callback.error(err);
          }
        }); // self.save
      },  // submitChannelVideo

      deleteEditionPlaylist: function (channel_id, edition_id, callback) {
        console.log(this);
        if(!callback)
          callback = {};
        this.url = App.apiURL + "admin/channel/" + channel_id + "/editions/" + edition_id + "/playlists/" + this.get("collection").id;
        this.destroy({
          success: callback.success,
          error: callback.error
        });
      }   // deleteChannelVideo
    });

    Entities.ChannelPlaylistCollection = Backbone.Collection.extend({
      model: Entities.ChannelPlaylist
    });

    var channel_playlists;

    var API = {
      getChannelPlaylistEntity: function(channel_id, channel_edition_id, channel_playlist_id){
        var channel_playlist = new Entities.ChannelPlaylist({id: channel_playlist_id});
        channel_playlist.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/" + channel_edition_id + "/playlists/";
        channel_playlist.fetch();
        return channel_playlist;
      },
      getChannelPlaylistEntities: function(channel_id, channel_edition_id){
        channel_playlists = new Entities.ChannelPlaylistCollection();
        channel_playlists.url = App.apiURL + "admin/channel/" + channel_id + "/editions/" + channel_edition_id + "/playlists/";
        channel_playlists.fetch();

        return channel_playlists;
      }

    };

    App.reqres.setHandler("channel_playlist:entities", function(channel_id, channel_edition_id) {
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getChannelPlaylistEntities(channel_id, channel_edition_id);
    });

    App.reqres.setHandler("channel_playlist:entity", function(channel_id, channel_video_id, channel_playlist_id) {
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getChannelPlaylistEntity(channel_id, channel_video_id, channel_playlist_id);
    });
  });
});
