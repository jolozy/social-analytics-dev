define(["app"], function(App){
	App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
		Entities.VideoChannel = Backbone.Model.extend({
            defaults: {
                id: "",
                channel_url: "",
                title: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                sponsor_image_url: "",
                description_long: "",
                description_short: "",
                published: "",
                published_date: "",
                created_at: "",
                updated_at: "",
                featured: "",
                tw_hashtag: "",
                tw_handle: "",
                fb_page_url: "",
                website_url: "",
                ext_likes: "",
                ext_likes_updated_at: ""
            }
        });

        Entities.VideoChannelCollection = Backbone.Collection.extend({
            model: Entities.VideoChannel
        });

        var video_channels;

        var API = {
            getVideoChannelEntities: function(video_id){
                video_channels = new Entities.VideoChannelCollection();
                video_channels.url = App.apiURL + "admin/video/" + video_id + "/channels";
                video_channels.fetch();
                
                return video_channels;
            }
                
        };

        App.reqres.setHandler("video_channel:entities", function(video_id){
            return API.getVideoChannelEntities(video_id);
        });
	});
});