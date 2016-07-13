define(["app"], function(App){
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.ChannelEdition = Backbone.Model.extend({
      defaults: {
        id: "",
        title: "",
        description: "",
        coverphoto_id: "",
        created_at: "",
        updated_at: "",
        collection_type: "",
        metadata: "",
        published: "",
        friendly_url: "",
        display_order: "",
        published_date: "",
        photo_large_url: "",
        photo_medium_url: "",
        photo_small_url: "",
        items: "",
        channel_url: ""
      },

      togglePublish: function () {
        this.urlRoot = App.apiURL + "admin/channel/" + this.get('channel_id') + "/editions/";
        var publish = !this.get("published");
        this.save({
          published: publish
        });
      },

      createChannelEdition: function (data, callback) {
        var self = this;
        self.set(data);
        var channel_id = self.get("channel_id");
        self.urlRoot = App.apiURL + "admin/channel/"+channel_id+"/editions";
        self.save({}, {
          type: 'POST',
          success: function (obj) {
            callback.success(obj);
          },
          error: function (err) {
            callback.error(err);
          }
        }); // self.save
      },  // createChannelVideo

      submitChannelEdition: function (data, callback) {
        var self = this;
        self.set(data);
        var channel_id = self.get("channel_id");
        self.urlRoot = App.apiURL + "admin/channel/"+channel_id+"/editions/" + this.get("id");
        self.save({}, {
          success: function (obj) {
            callback.success(obj);
          },
          error: function (err) {
            callback.error(err);
          }
        }); // self.save
      },  // submitChannelEdition

      deleteChannelEdition: function (channel_id, callback) {
        if(!callback)
          callback = {};
        this.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/";
        this.destroy({
          success: callback.success,
          error: callback.error
        });
      }   // deleteChannelEdition
    });

    Entities.ChannelEditionCollection = Backbone.Collection.extend({
      model: Entities.ChannelEdition
    });

    var channel_editions;

    var API = {
      getChannelEditionEntity: function(channel_id, channel_edition_id){
        var channel_edition = new Entities.ChannelEdition({id: channel_edition_id});
        channel_edition.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/";
        channel_edition.fetch();
        return channel_edition;
      },
      getChannelEditionEntities: function(channel_id){
        channel_editions = new Entities.ChannelEditionCollection();
        channel_editions.url = App.apiURL + "admin/channel/" + channel_id + "/editions";
        channel_editions.fetch();

        return channel_editions;
      }

    };

    App.reqres.setHandler("channel_edition:entities", function(channel_id) {
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getChannelEditionEntities(channel_id);
    });

    App.reqres.setHandler("channel_edition:entity", function(channel_id, channel_video_id) {
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getChannelEditionEntity(channel_id, channel_video_id);
    });
  });
});
