define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.PartnerVideo = Backbone.Model.extend({
            defaults: {
                video: "",
                published: "",
                video_id: "",
                partner_id: "",
                published_date: "",
                description: "",
                title: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                
            },

            togglePublish: function () {
                this.urlRoot = App.apiURL + "admin/partner/" + this.get('partner_id') + "/video";
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            },

            submitPartnerVideo: function (data, callback) {
              var self = this;
              self.set(data);
              var partner_id = self.get("partner_id");
              self.urlRoot = App.apiURL + "admin/partner/"+partner_id+"/video";
              self.save({}, {
                success: function (obj) {
                    callback.success(obj);
                },
                error: function (err) {
                    callback.error(err);
                }
              }); // self.save
            },  // submitPartnerVideo

            deletePartnerVideo: function () {
                this.urlRoot = App.apiURL + "admin/partner/" + this.get("partner_id") + "/video";
                this.destroy();
            }   // deletePartnerVideo
        });

        Entities.PartnerVideoCollection = Backbone.Collection.extend({
            model: Entities.PartnerVideo
        });

        var partner_videos;

        var API = {
            getPartnerVideoEntity: function(partner_id, partner_video_id){
                var partner_video = new Entities.PartnerVideo({id: partner_video_id});
                partner_video.urlRoot = App.apiURL + "admin/partner/" + partner_id + "/video";
                partner_video.fetch();
                return partner_video;
            },
            getPartnerVideoEntities: function(partner_id){
                partner_videos = new Entities.PartnerVideoCollection();
                partner_videos.url = App.apiURL + "admin/partner/" + partner_id + "/videos";
                partner_videos.fetch();
                
                return partner_videos;
            }
                
        };

        App.reqres.setHandler("partner_video:entities", function(partner_id){
            return API.getPartnerVideoEntities(partner_id);
        });

        App.reqres.setHandler("partner_video:entity", function(partner_id, partner_video_id){
            return API.getPartnerVideoEntity(partner_id, partner_video_id);
        });
    });
});