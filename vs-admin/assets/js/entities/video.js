define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Video = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/video",

            defaults:{
                uid: "",
                title: "",
                friendly_url: "",
                year: "",
                description_long: "",
                description_short: "",
                directors: "",
                duration: "",
                country: "",
                genres: "",
                topics: "",
                channels: "",
                embed_url: "",
                video_file_url: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                published: "",
                excluded: "",
                published_date: "",
                republished_date: "",
                links: "",
                cast: "",
                crew: "",
                period: "",
                festivals: "",
                website_url: "",
                fb_page_url:"",
                tw_handle: "",
                tw_hashtag: "",
                language: "",
                subtitle_language: "",
                content_rating: "",
                do_not_show: "",
                meta_tags: "",
                credits_start: "",
                thumbnail_url: "",
                featured: "",
                advertising: "",
                creator_name: "",
                creator_email: "",
                rights_general: "",
                rights_advertising: "",
                transcoding_jobs: "",
                sources: "",
                bucket: "",
                vimeo_ids: ""
            },

            parse: function (res) {
                var video = res;
                var directors = video.directors;
                var director_names = [];
                if(directors){
                    directors.forEach(function(director){
                        director_names.push(director.name);
                    });
                    video.directors = director_names;
                }
                return video;
            },

            togglePublish: function () {
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            },

            saveSource: function (source_type, source_url, status, callback) {
                var video = this;
                var url = App.apiURL + "admin/video/" + this.get('uid') + "/source/" + source_type;
                var data = {
                    url: source_url,
                    status: status
                };
                $.ajax({
                  type: "POST",
                  url: url,
                  data: data,
                  success: function (res) {
                    var sources = video.get('sources');
                    for(var i = 0; i < sources.length; i++){
                        var source = sources[i];
                        if(source.source_type == source_type){
                            sources[i] = res;
                        }
                    }
                    video.set('sources', sources);
                    if(callback)
                        callback();
                  },
                  error: function (err) {
                    console.log(err);
                    if(callback)
                        callback(err);
                  }
                });
            },

            transcodeVideo: function (should_watermark) {
                var video = this;
                var url = App.apiURL + "admin/video/" + video.get('uid') + "/transcode";
                $.ajax({
                    url: url,
                    data: {
                      watermark: should_watermark
                    }
                }).done(function(res){
                  video.fetch();
                });
            },

            getVideoUploadPolicy: function (callback) {
                var video = this;
                var policy_url = App.apiURL + 'admin/video/' + video.get('uid') + '/upload_policy';
                $.ajax({
                    url: policy_url
                }).done(function(res){
                    $.ajaxSetup({
                        headers: {
                            'Authorization': ''
                        }
                    });
                    var data = {};
                    data.policy = res.policy;
                    data.signature = res.signature;
                    data.AWSAccessKeyId = "AKIAIZM3RQRE5XANYRAA";
                    data.key = video.get('uid') + "/${filename}";
                    data.acl = "public-read";

                    callback(data);
                });
            },

            uploadVideoFile: function (file, callback) {
                var video = this;
                var url = "https://viddsee-sg-trans-in.s3.amazonaws.com";
                var file_url = url + "/" + video.get('uid') + "/" + file.name;

                this.getVideoUploadPolicy(function (data) {
                    var fd = new FormData();
                    fd.append( 'AWSAccessKeyId', data.AWSAccessKeyId );
                    fd.append( 'policy', data.policy );
                    fd.append( 'signature', data.signature );
                    fd.append( 'key', data.key );
                    fd.append( 'acl', data.acl );
                    fd.append( 'file', file );

                    $.ajax({
                      xhr: function () {
                          var xhr = new window.XMLHttpRequest();
                          //Download progress
                          xhr.upload.addEventListener("progress", callback.progress, false);
                          return xhr;
                      },
                      url: url,
                      data: fd,
                      processData: false,
                      contentType: false,
                      type: 'POST',
                      success: function(err, res){
                        if(!err){
                            callback.success(file_url);
                            if(localStorage.getItem('access_token')){
                              $.ajaxSetup({
                                    headers: {
                                        'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                                    }
                                });
                            }
                            video.saveSource("source", file_url, "published");
                        }
                        
                      },
                    });
                });
            },  //uploadVideoFile

            deleteVideo: function (callback) {
                if(!callback){
                    callback = {};
                }
                this.destroy({
                    success: callback.success,
                    error: callback.error
                });
            },  // deleteVideo
        });

        Entities.VideoMedia = Backbone.Model.extend({
            defaults: {
                created_at: '',
                description: '',
                file_url: '',
                id: '',
                mimetype: '',
                multiupload_info: '',
                name: '',
                updated_at: ''
            }
        });

        Entities.VideoMediaLibrary = Backbone.Paginator.requestPager.extend({
            model: Entities.VideoMedia,
            initialize: function(options) {
                this.video_id = options.video_id;
                this.paginator_core.url = App.apiURL + 'admin/video/' + this.video_id + '/media';
            },
            paginator_core: {
                type: 'GET',
                dataType: 'json',
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 10,
                pagesInRange: 2
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'search_string' : function () {return this.search_string;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;
                this.reset(res.items);
                return res.items;
            }
        });

        Entities.VideoCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Video,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/videos",
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 24,
                pagesInRange: 2
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'search_string' : function () {return this.search_string;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;

                this.reset(res.videos);
                return res.videos;
            }
        });

        Entities.VideoSearchCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Video,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/search"
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 24
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'search_string' : function () {return this.search_string;},
                'filter': function() {return this.filterBy;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;

                this.reset(res.videos);
                return res.videos;
            }
        });

        Entities.VideoNote = Backbone.Model.extend({
            defaults: {
                id: '',
                note: '',
                created_at: '',
                updated_at: ''
            },

            initialize: function(options) {
                this.video_id = options.video_id;
                this.url = App.apiURL + 'admin/video/' + this.video_id + '/note';
            },

            saveVideoNote: function(note) {
                var view = this;
                var data = {
                    note: note
                };
                $.ajax({
                    url: App.apiURL + 'admin/video/' + this.video_id + '/note',
                    dataType: 'json',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                }).done(function(res) {
                    view.fetch();
                });
            }
        });

        var videos;

        var API = {
            getVideoEntity: function(video_id){
                var video = new Entities.Video({id: video_id});
                video.fetch();
                return video;
            },
            getVideoEntities: function(){
                videos = new Entities.VideoCollection();
                videos.fetch();
                return videos;
            },
            getVideoSearchEntities: function (search_string, filterBy) {
                videos = new Entities.VideoSearchCollection();
                videos.fetch({
                    data: {
                        search_string: search_string,
                        filter: filterBy
                    }
                });
                return videos;
            },
            getMediaLibrary: function(video_id) {
                var media = new Entities.VideoMediaLibrary({video_id: video_id});
                media.fetch();
                return media;
            },
            getVideoNoteEntity: function(video_id) {
                var video_note = new Entities.VideoNote({video_id: video_id});
                video_note.fetch();

                return video_note;
            }
        };

        App.reqres.setHandler("video:entities", function(){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getVideoEntities();
        });

        App.reqres.setHandler("video:entity", function(id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getVideoEntity(id);
        });

        App.reqres.setHandler("video:search", function(search_string, filterBy){
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
            return API.getVideoSearchEntities(search_string, filterBy);
        });


        App.reqres.setHandler("video:media_library", function(video_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getMediaLibrary(video_id);
        });

        App.reqres.setHandler("video:note", function(video_id) {
            if(localStorage.getItem('access_token')) {
                // Logged in
                headers = {
                    'Authorization': 'Token token="' + localStorage.getItem('access_token') + '"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getVideoNoteEntity(video_id);
        });
    });
});

