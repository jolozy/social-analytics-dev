define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Submission = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/submitvideo",

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
                allow_embed: "",
                excluded: "",
                published_date: "",
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
                coverphoto: "",
                comments: "",
                rights_general: "",
                rights_advertising: "",
                gallery_images: "",
                premiere: "",
                user: "",
                video_file_url_alt: "",
                alt_file_credentials: "",
                referral: "",
                alt_language: "",
                alt_title: "",
                alt_description_long: ""
            },

            parse: function (res) {
                var submission = res;
                return submission;
            },

            updateStatus: function(status, message, callback) {
            	//SILENT_UPDATE
            	var silent = false;
            	if (status == 'silent_approve') {
            		status = 'approve';
            		silent = true;
            		//console.log("silent_update")
            	}
                var url = App.apiURL + "admin/submitvideo/" + this.get('id') + "/" + status;
                var data = {
                    comments: message,
                    silent: silent
                };
                $.ajax({
                    method: "POST",
                    url: url,
                    data: data,
                    success: function () {
                        callback.success();
                    },
                    error: function () {
                        callback.error();
                    }
                });
            }
        });

        Entities.SubmissionCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Submission,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/submitvideos",
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 20
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'status': function () {return this.status;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;

                this.reset(res.videos);
                return res.videos;
            }
        });

        Entities.SubmissionSearchCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Submission,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/submitvideos/search",
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 12
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'search_string' : function () {return this.search_string;},
                'status': function () {return this.status;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;
                this.reset(res.videos);
                return res.videos;
            }
        });


        var submissions;

        var API = {
            getSubmissionEntity: function(submission_id){
                var submission = new Entities.Submission({id: submission_id});
                submission.fetch();
                return submission;
            },
            getSubmissionEntities: function(status){

                submissions = new Entities.SubmissionCollection();
                submissions.fetch({
                    data: {
                        status: status
                    }
                });
                return submissions;
            },
            getSubmissionSearchEntities: function (search_string,status) {
                submissions = new Entities.SubmissionSearchCollection();
                submissions.fetch({
                    data: {
                        search_string: search_string,
                        status: status
                    }
                });

                return submissions;
            }
                
        };

        App.reqres.setHandler("submission:entities", function(status){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getSubmissionEntities(status);
        });

        App.reqres.setHandler("submission:entity", function(id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getSubmissionEntity(id);
        });

        App.reqres.setHandler("submission:search", function(search_string, status){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
                App.trigger("navbar:desktop");
                require(["apps/submission/submission"], function(){
                    if(App.getCurrentRoute() === ""){
                        App.trigger('submission:list');
                    }
                });
            }
            return API.getSubmissionSearchEntities(search_string, status);
        });

    });
});

