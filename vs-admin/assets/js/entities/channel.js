define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){

        Entities.Channel = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/channel",

            defaults:{
                title: "",
                description_long: "",
                description_short: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                published: "",
                published_date: "",
                channel_url: "",
                sponsor_image_url: "",
                sponsors: "",
                website_url: "",
                fb_page_url:"",
                tw_handle: "",
                tw_hashtag: "",
                featured: ""
            },

            togglePublish: function () {
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            }
        });

        Entities.ChannelCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Channel,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/channels"
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                perPage: 20
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;

                return res.channels;
            }
        });

        var channels;

        var API = {

            getChannelEntity: function(channel_id){
                if(localStorage.getItem('access_token')){
                    // Logged in
                    headers = {
                        'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                    };
                    $.ajaxSetup({
                        headers: headers
                    });
                    App.trigger("navbar:desktop");
                    require(["apps/video/video"], function(){
                        if(App.getCurrentRoute() === ""){
                            App.trigger('video:list');
                        }
                    });
                }
                var channel = new Entities.Channel({id: channel_id});
                channel.fetch();
                return channel;
            },
            getChannelEntities: function(){
                channels = new Entities.ChannelCollection();
                channels.fetch();
                
                return channels;
            }
                
        };

        App.reqres.setHandler("channel:entities", function(){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getChannelEntities();
        });

        App.reqres.setHandler("channel:entity", function(channel_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getChannelEntity(channel_id);
        });

    });

    return ;
});
