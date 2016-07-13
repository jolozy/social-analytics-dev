define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.ChannelVideo = Backbone.Model.extend({
            defaults: {
                video: "",
                published: "",
                video_id: "",
                channel_id: "",
                published_date: ""
            },

            togglePublish: function () {
                this.urlRoot = App.apiURL + "admin/channel/" + this.get('channel_id') + "/video";
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            },

            submitChannelVideo: function (data, callback) {
              var self = this;
              self.set(data);
              var channel_id = self.get("channel_id");
              self.urlRoot = App.apiURL + "admin/channel/"+channel_id+"/video";
              self.save({}, {
                success: function (obj) {
                    callback.success(obj);
                },
                error: function (err) {
                    callback.error(err);
                }
              }); // self.save
            },  // submitChannelVideo

            deleteChannelVideo: function (callback) {
                if(!callback)
                    callback = {};
                this.urlRoot = App.apiURL + "admin/channel/" + this.get("channel_id") + "/video";
                this.destroy({
                    success: callback.success,
                    error: callback.error
                });
            }   // deleteChannelVideo
        });

        Entities.ChannelVideoCollection = Backbone.Collection.extend({
            model: Entities.ChannelVideo
        });

        Entities.ChannelVideoV2 = Backbone.Model.extend({
            defaults: {
                video: "",
                published: "",
                video_id: "",
                published_date: "",
                item_index: "",
                id: "",
                collection_id: "",
                channel_id: "",
                edition_id: "",
                playlist_id: ""
            },

            togglePublish: function () {
                this.urlRoot = App.apiURL + "admin/channel/" + this.get('channel_id') + "/video";
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            },

            createChannelVideoV2: function (data, callback) {
                var self = this;
                self.set(data);
                self.urlRoot = App.apiURL + "admin/channel/"+this.get('channel_id')+"/editions/"+this.get('edition_id')+"/playlists/"+this.get('playlist_id')+"/videos";
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

            submitChannelVideo: function (data, callback) {
                var self = this;
                self.set(data);
                self.urlRoot = App.apiURL + "admin/channel/"+this.get('channel_id')+"/editions/"+this.get('edition_id')+"/playlists/"+this.get('playlist_id')+"/videos";
                self.save({}, {
                    success: function (obj) {
                        callback.success(obj);
                    },
                    error: function (err) {
                        callback.error(err);
                    }
                }); // self.save
            },  // submitChannelVideo

            deleteChannelVideo: function (channel_id, edition_id, playlist_id, callback) {
                if(!callback)
                    callback = {};
                this.urlRoot = App.apiURL + "admin/channel/"+channel_id+"/editions/"+edition_id+"/playlists/"+playlist_id+"/videos";
                this.destroy({
                    success: callback.success,
                    error: callback.error
                });
            }   // deleteChannelVideo
        });

        Entities.ChannelVideoV2Collection = Backbone.Collection.extend({
            model: Entities.ChannelVideoV2,
            
            comparators: {
                asc: function (item) {
                    var date = new Date(item.get("video").published_date);
                    return date.getTime();
                },
                desc: function (item) {
                    var date = new Date(item.get("video").published_date);
                    return -date.getTime();
                },
            },

            setComparator: function (key) {
                this.comparator = this.comparators[key];
                return this;
            }
        });

        var channel_videos;

        var API = {
            getChannelVideoEntity: function(channel_id, channel_video_id){
                var channel_video = new Entities.ChannelVideo({id: channel_video_id});
                channel_video.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/video";
                channel_video.fetch();
                return channel_video;
            },
            getChannelVideoEntities: function(channel_id){
                channel_videos = new Entities.ChannelVideoCollection();
                channel_videos.url = App.apiURL + "admin/channel/" + channel_id + "/videos";
                channel_videos.fetch();

                return channel_videos;
            },
            getChannelVideoV2Entity: function(channel_id, edition_id, playlist_id, video_id) {
                var channel_video = new Entities.ChannelVideoV2({id: video_id});
                channel_video.urlRoot = App.apiURL + "admin/channel/" + channel_id + "/editions/"+edition_id+"/playlists/"+playlist_id+"/videos/";
                channel_video.fetch();
                return channel_video;
            },
            getChannelVideoV2Entities: function(channel_id, edition_id, playlist_id) {
                var channel_video = new Entities.ChannelVideoV2Collection();
                channel_video.url = App.apiURL + "admin/channel/" + channel_id + "/editions/"+edition_id+"/playlists/"+playlist_id+"/videos/";
                channel_video.fetch();
                return channel_video;
            }

        };

        App.reqres.setHandler("channel_video:entities", function(channel_id){
            return API.getChannelVideoEntities(channel_id);
        });

        App.reqres.setHandler("channel_video:entity", function(channel_id, channel_video_id){
            return API.getChannelVideoEntity(channel_id, channel_video_id);
        });

        App.reqres.setHandler("channel_video_v2:entities", function(channel_id, edition_id, playlist_id){
            return API.getChannelVideoV2Entities(channel_id, edition_id, playlist_id);
        });

        App.reqres.setHandler("channel_video_v2:entity", function(channel_id, edition_id, playlist_id, video_id){
            return API.getChannelVideoV2Entity(channel_id, edition_id, playlist_id, video_id);
        });
    });
});
