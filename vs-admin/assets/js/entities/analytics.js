define(["app", "moment", "apps/config/storage/localstorage", "backbone.paginator"], function(App, moment){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Analytics = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/"
        });

        Entities.AnalyticsCollection = Backbone.Collection.extend({
            url: App.apiURL + "admin/analytics/",
            model: Entities.Analytics
        });

        Entities.OverallAnalytics = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/overall_stats",

            defaults: {
                "start_date": new Date().toString(),
                "end_date": new Date().toString(),
                "hosted": '...',
                "vimeo": '...',
                "youtube": '...',
                "youtube_channel": '...',
                "yahoo": '...',
                "youtube_subs": '...',
                "viddsee_signups": '...',
                "hosted_latest": '-',
                "vimeo_latest": '-',
                "youtube_latest": '-',
                "youtube_channel_latest": '-',
                "yahoo_latest": '-',
                "youtube_subs_latest": '-',
                "viddsee_signups_latest": '-',
                "likes":'-',
                "likes_latest":'-',
                "comments":'-',
                offline: '...'
            }
        });

        Entities.OverallAnalyticsTrends = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/overall_trends",

            defaults: {
                total: '',
                hosted: '',
                vimeo: '',
                youtube: '',
                yahoo: ''
            }
        });

        Entities.VideoAnalytics = Backbone.Model.extend({
            defaults: {
                "rank": '',
                "hosted": '-',
                "vimeo": '-',
                "youtube": '-',
                "yahoo": '-',
                "uid": '',
                "title": '',
                "total": '-',
                "last-updated": ''
            }
        });

        Entities.VideoAnalyticsTrends = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/trends_for_video",

            defaults: {
                total: '',
                hosted: '',
                vimeo: '',
                youtube: '',
                yahoo: ''
            }
        });

        Entities.VideosAnalyticsCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.VideoAnalytics,
            paginator_core: {
                type: 'POST',
                dataType: 'json',
                url: App.apiURL + "admin/analytics/video_play_stats"
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 20,
                pagesInRange: 2
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'search_string' : function () {return this.search_string;},
                'start_date' : function () {return this.start_date;},
                'end_date' : function () {return this.end_date;},
                'pivot' : function () {return this.pivot;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;
                this.pivot = res.pivot;

                this.reset(res.results);

                for (var key in res.results) {
                    res.results[key].rank = (parseInt(key) + 1) + parseInt(this.perPage) * parseInt(this.currentPage);
                }

                return res.results;
            }
        });
        
        Entities.VideoComments  = Backbone.Model.extend({
            defaults : {
                'rank'     : '-',
                'uid'      : '-',
                'title'    : '-',
                'total'    : '',
                'internal' : '',
                'facebook' : '',
                'buzz'     : ''
            }
        });

        Entities.VideosCommentsCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.VideoComments,
            paginator_core: {
                type: 'POST',
                dataType: 'json',
                url: App.apiURL + "admin/analytics/videos_with_comments"
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 20,
                pagesInRange: 2
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'video_uid' : function () {return this.video_uid;},
                'start_date' : function () {return this.start_date;},
                'end_date' : function () {return this.end_date;},
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;
                this.video_uid = res.video_uid;

                this.reset(res.results);

                for (var key in res.results) {
                    res.results[key].rank = (parseInt(key) + 1) + parseInt(this.perPage) * parseInt(this.currentPage);
                }

                return res.results;
            }
        });
        
        Entities.Reply = Backbone.Model.extend({
            idAttribute: "_id",
            defaults: {
                "id": "",
                "title": "",
                "body": "",
                "subject": "",
                "parent_id": "",
                "deleted": "",
                "created_at": "",
                "updated_at": "",
                "user": {},
                "votes": "",
                "likes": "",
                "dislikes": ""
            }
        });

        Entities.Replies = Backbone.Collection.extend({
            model: Entities.Reply
        });

        Entities.Comment = Backbone.Model.extend({
            replies: new Entities.Replies(),
            idAttribute: "_id",
            defaults:{
                "id": "",
                "title": "",
                "body": "",
                "subject": "",
                "parent_id": "",
                "deleted": "",
                "created_at": "",
                "updated_at": "",
                "user": {},
                "votes": "",
                "likes": "",
                "dislikes": "",
                "thread_likes": "",
                "thread_dislikes": "",
                "thread_total_votes": "",
                "video_id": "",
                "video_title": "",
                "host": App.videoURL,
                "page": "",
                "replies": {}
            },
            parse: function(response) {
                for (var i in response.replies) {
                    this.replies.set(response.replies[i]);
                }
                response.created_at = moment(response.created_at).calendar();
                return response;
            }
        });

        Entities.CommentCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Comment,
            
            paginator_core: {
                type: 'POST',
                dataType: 'json',
                url: App.apiURL + 'admin/comments'
            },
            
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 10,
                pagesInRange: 2
            },

            server_api: {
                'per_page'     : function() {return this.perPage;},
                'current_page' : function() {return this.currentPage;},
                'start_date'   : function() {return this.startDate;},
                'end_date'     : function() {return this.endDate;},
                'filter_type'  : function() {return this.filterType;},
                'filter_string': function() {return this.filterString;}
            },

            parse: function(response) {
                this.perPage      = response.per_page;
                this.currentPage  = response.current_page;
                this.totalPages   = response.total_pages;
                this.total        = response.total;
                this.startDate    = response.start_date;
                this.endDate      = response.end_date;
                this.filterString = response.filter_string;
                this.filterType   = response.filter_type;
                this.filterSource = response.filter_source;
                this.numComments  = response.num_comments;
                this.hasMore      = response.has_more;

                for (var i in response.comments) {
                    if (response.comments[i].created_at < response.end_date && response.comments[i].created_at > response.start_date) {
                        // Flag this comment
                        response.comments[i]['is_new'] = true;
                    } else {
                        response.comments[i]['is_new'] = false;
                    }
                    if (typeof(response.comments[i].replies) != 'undefined') {
                        for (var j in response.comments[i].replies) {
                            if (response.comments[i].replies[j].created_at < response.end_date && response.comments[i].replies[j].created_at > response.start_date) {
                                // Flag this reply
                                response.comments[i].replies[j]['is_new'] = true;
                            } else {
                                response.comments[i].replies[j]['is_new'] = false;
                            }
                        }
                    }
                }

                return response.comments;
            }
        });

        Entities.VideoCompletion = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/completion_for_video",

            defaults : {
                page_title: 'Video Completion',
                chart_title: '',
                start_date: new Date().toString(),
                end_date: new Date().toString(),
                dimension: 'All',
                video_id: "pti7v",
                limit: 5,
                labels: [],
                series: [],
                total_count: "N/A",
                unknown_count: "N/A",
                unknown_percent: "N/A"
            }
        })

        Entities.VideoPlaycount = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/overall_playcount_breakdown",

            defaults: {
                page_title: 'Video Breakdown',
                chart_title: '',
                start_date: new Date().toString(),
                end_date: new Date().toString(),
                dimension: 'age',
                limit: 5,
                total_count: "N/A",
                unknown_count: "N/A",
                unknown_percent: "N/A"
            }
        });

        Entities.DomainAnalyticsEntity = Backbone.Model.extend({
            defaults: {
                'rank': '',
                'host': '',
                'plays': ''
            }
        });

        Entities.DomainsAnalyticsCollection = Backbone.Collection.extend({
            model: Entities.DomainAnalyticsEntity,
            url: App.apiURL + "admin/analytics/embed_stats",
            parse: function(res) {
                for (var key in  res.sources) {
                    res.sources[key].rank = parseInt(key) + 1;
                }
                return res.sources;
            }
        });

        Entities.DomainsByVideoAnalyticsEntity = Backbone.Model.extend({
            defaults: {
                'rank': '',
                'host': '',
                'plays': ''
            }
        });

        Entities.DomainsByVideoAnalyticsCollection = Backbone.Collection.extend({
            model: Entities.DomainsByVideoAnalyticsEntity,
            url: App.apiURL + "admin/analytics/domains_for_video",
            parse: function(res) {
                for (var key in  res.results) {
                    res.results[key].rank = parseInt(key) + 1;
                }
                return res.results;
            }
        });

        Entities.TrackerAnalytics = Backbone.Model.extend({
            defaults: {
                "title": '',
                "total_plays": '',
                "uid": ''
            }
        });

        Entities.TrackerAnalyticsCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.TrackerAnalytics,
            paginator_core: {
                type: 'POST',
                dataType: 'json',
                url: App.apiURL + "admin/analytics/tracker_play_stats"
            },
            paginator_ui: {
                firstPage: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 20,
                pagesInRange: 2
            },
            server_api: {
                'per_page': function () {return this.perPage;},
                'current_page': function () {return this.currentPage;},
                'search_string' : function () {return this.search_string;},
                'start_date' : function () {return this.start_date;},
                'end_date' : function () {return this.end_date;},
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;

                this.reset(res.results);

                for (var key in res.results) {
                    res.results[key].rank = (parseInt(key) + 1) + parseInt(this.perPage) * parseInt(this.currentPage);
                }

                return res.results;
            }
        });

        Entities.ContentAnalyticsOld = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/content_stats_old",

            defaults: {
                "published": '',
                "submissions": '',
                "processed": '',
                "published_countries": '',
                "submitted_countries": '',
                "approved_referrals": '',
                "processed_countries":'',
                "processed_approved_referrals":''
            }
        });

        Entities.ContentAnalytics = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/content_stats",

            defaults: {
                "submitted": '',
                "processed": '',
                "published": '',
                "programmed": '',
                "pivot" : 'country',
                "pivot_title" : 'Country'
            }
        });

        Entities.GAMauAnalytics = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/ga_overall",

            defaults: {
                "start_date": "",
                "end_date": "",
                "viddsee": "",
                "buzz": "",
                "zh_buzz": "",
                "id_buzz": "",
                "embed": "",
                "android": "",
                "android_new_users": "",
                "ios": "",
                "ios_new_users": "",
                "total_mau": "",
                "total_new_users": "",
                "ios_new_downloads": "",
                "ios_new_downloads_last_date": "",
                "android_new_downloads": "",
                "android_new_downloads_last_date": "",
                "total_new_downloads": "",
            },

            parse: function(response) {
                response.ios_new_downloads_last_date = moment(response.ios_new_downloads_last_date, 'YYYY-MM-DD').format('DD MMM YYYY');
                response.android_new_downloads_last_date = moment(response.android_new_downloads_last_date, 'YYYY-MM-DD').format('DD MMM YYYY');
                return response;
            }
        });

        Entities.GAMauCountryAnalytics = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/ga_mau_stats_by_country",

            defaults: {
                "start_date": "7daysAgo",
                "end_date": "today",
                "segment" : "all",
                "viddsee": [],
                "buzz": [],
                "zh_buzz": [],
                "id_buzz": [],
                "ios": [],
                "android": [],
                "embed": []
            }
        });

        Entities.GAMobileCountryAnalytics = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/ga_mobile_new_users_by_country",

            defaults: {
                "start_date": "",
                "end_date": "",
                "ios": "",
                "android": ""
            }
        });

        Entities.GAMobileDailyActiveUsers = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/daily_active_users",

            defaults: {
                "start_date": "",
                "end_date": "",
                "ios_average": "",
                "android_average": "",
                "ios": "",
                "android": ""
            }
        });

        Entities.GAMobileWeeklyActiveUsers = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/weekly_active_users",

            defaults: {
                "start_date": "",
                "end_date": "",
                "ios_average": "",
                "android_average": "",
                "ios": "",
                "android": ""
            }
        });

        Entities.VideoRelatedPostEntity = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/analytics/video/related_posts",

            defaults: {
              "video_id": "",
              "language": "",
              "source": "",
              "source_post_id": "",
              "link": "",
              "created_at": ""
            }
        });

        Entities.VideoRelatedPostCollection = Backbone.Collection.extend({
            url: App.apiURL + "admin/analytics/video/related_posts",
            model: Entities.VideoRelatedPostEntity,
            parse: function(res) {
                return res.results;
            }
        });

        var analytics;

        var API = {
            getAnalyticsEntity: function(start_date, end_date, video_id){
                var analytics = new Entities.Analytics({
                    "id": video_id,
                    "start_date": start_date,
                    "end_date": end_date
                });
                analytics.save();
                return analytics;
            },

            getAnalyticsEntities: function(){
                analytics = new Entities.AnalyticsCollection();
                analytics.fetch();

                return analytics;
            },

            getOverallAnalyticsEntity: function(start_date, end_date) {
                var analytics = new Entities.OverallAnalytics({
                    "start_date": start_date,
                    "end_date": end_date
                });
                analytics.save();
                return analytics;
            },

            getVideosAnalyticsEntities: function(startDate, endDate, pivot, searchString) {
                var analytics = new Entities.VideosAnalyticsCollection();
                if (searchString) {
                    analytics.fetch({
                        data: {
                            start_date: startDate,
                            end_date: endDate,
                            search_string: searchString,
                            pivot: pivot
                        }
                    });
                } else {
                    analytics.fetch({
                        data: {
                            start_date: startDate,
                            end_date: endDate,
                            pivot: pivot
                        }
                    });
                }
                return analytics;
            },

            getVideoCommentsEntity: function(start_date, end_date, video_uid, pivot) {
                var analytics = new Entities.VideosCommentsCollection();
                analytics.fetch({
                    data: {
                        start_date: start_date,
                        end_date: end_date,
                        video_uid: video_uid,
                        pivot: pivot
                    }
                });
                return analytics;
            },

            getCommentEntities: function(startDate, endDate, filterType, filterString, filterSource) {
                var analytics = new Entities.CommentCollection();

                analytics.fetch({
                    reset: true,
                    data: {
                        start_date   : startDate,
                        end_date     : endDate,
                        filter_string: filterString,
                        filter_type  : filterType,
                        filter_source: filterSource
                    }
                });
                return analytics;
            },

            getVideoCompletionEntity: function(start_date, end_date, video_id, dimension, limit) {
                var analytics = new Entities.VideoCompletion();
                analytics.fetch({
                    data: {
                        start_date: start_date,
                        end_date: end_date,
                        video_id: video_id,
                        dimension: dimension,
                        limit: limit
                    }
                });
                return analytics;
            },

            getVideoPlaycountEntities: function(start_date, end_date, dimension, limit) {
                var analytics = new Entities.VideoPlaycount()
                analytics.fetch({
                    data: {
                        start_date: start_date,
                        end_date: end_date,
                        dimension: dimension,
                        limit: limit,
                    }
                });
                return analytics;
            },


            getDomainAnalyticsEntities: function(startDate, endDate) {
                var analytics = new Entities.DomainsAnalyticsCollection();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getDomainsByVideoAnalyticsEntities: function(startDate, endDate, videoID) {
                var analytics = new Entities.DomainsByVideoAnalyticsCollection();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate,
                        video_id: videoID
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getTrackerAnalyticsEntities: function(startDate, endDate, searchString) {
                var analytics = new Entities.TrackerAnalyticsCollection();
                if (searchString) {
                    analytics.fetch({
                        data: {
                            start_date: startDate,
                            end_date: endDate,
                            search_string: searchString,
                        }
                    });
                } else {
                    analytics.fetch({
                        data: {
                            start_date: startDate,
                            end_date: endDate,
                        }
                    });
                }
                return analytics;
            },

            getContentAnalyticsEntitiesOld: function(startDate, endDate) {
                var analytics = new Entities.ContentAnalyticsOld();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getContentAnalyticsEntities: function(startDate, endDate, pivot) {
                var analytics = new Entities.ContentAnalytics();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate,
                        pivot: pivot
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getGAMauTotalAnalyticsEntities: function(startDate, endDate) {
                var analytics = new Entities.GAMauAnalytics();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getGAMauAnalyticsEntities: function(startDate, endDate, segment) {
                var analytics = new Entities.GAMauCountryAnalytics();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate,
                        segment: segment
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getGAMobileAnalyticsEntities: function(startDate, endDate) {
                var analytics = new Entities.GAMobileCountryAnalytics();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getGAMobileDailyActiveUsersEntities: function(startDate, endDate) {
                var analytics = new Entities.GAMobileDailyActiveUsers();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getGAMobileWeeklyActiveUsersEntities: function(startDate, endDate) {
                var analytics = new Entities.GAMobileWeeklyActiveUsers();
                analytics.fetch({
                    data: {
                        start_date: startDate,
                        end_date: endDate
                    },
                    type: 'POST'
                });
                return analytics;
            },

            getVideoRelatedPostEntity: function (video_uid) {
                var analytics = new Entities.VideoRelatedPostEntity({
                    "video_uid": video_uid,
                });
                analytics.save();
                return analytics;
            },

            getVideoRelatedPostEntities: function (video_uid) {
                analytics = new Entities.VideoRelatedPostCollection();
                analytics.fetch({
                    data: {
                        video_uid: video_uid
                    }
                });

                return analytics;
            }

        };

        App.reqres.setHandler("analytics:entity", function(start_date, end_date, video_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getAnalyticsEntity(start_date, end_date, video_id);
        });

        App.reqres.setHandler("analytics:entities", function(){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getAnalyticsEntities();
        });

        App.reqres.setHandler("overall_analytics:entity", function(start_date, end_date){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getOverallAnalyticsEntity(start_date, end_date);
        });

        App.reqres.setHandler("video_completion:entity", function(startDate, endDate, video_id, dimension, limit){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getVideoCompletionEntity(startDate, endDate, video_id, dimension, limit);
        });

        App.reqres.setHandler("video_playcount:entities", function(startDate, endDate, dimension, limit){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getVideoPlaycountEntities(startDate, endDate, dimension, limit);
        });

        App.reqres.setHandler("video_analytics:entities", function(startDate, endDate, pivot, searchString){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getVideosAnalyticsEntities(startDate, endDate, pivot, searchString);
        });

        App.reqres.setHandler("comment:entities", function(startDate, endDate, filterType, filterString, filterSource){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getCommentEntities(startDate, endDate, filterType, filterString, filterSource);
        });

        App.reqres.setHandler("video_comments:entities", function(startDate, endDate, video_uid, pivot) {
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="' + localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getVideoCommentsEntity(startDate, endDate, video_uid, pivot);
        });

        App.reqres.setHandler("domain_analytics:entities", function(startDate, endDate){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getDomainAnalyticsEntities(startDate, endDate);
        });

        App.reqres.setHandler("domains_by_video_analytics:entities", function(startDate, endDate, videoID){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getDomainsByVideoAnalyticsEntities(startDate, endDate, videoID);
        });

        App.reqres.setHandler("tracker_analytics:entities", function(startDate, endDate, searchString){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getTrackerAnalyticsEntities(startDate, endDate, searchString);
        });

        App.reqres.setHandler("content_analytics_old:entities", function(startDate, endDate){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getContentAnalyticsEntitiesOld(startDate, endDate);
        });

        App.reqres.setHandler("content_analytics:entities", function(startDate, endDate, pivot){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getContentAnalyticsEntities(startDate, endDate, pivot);
        });

        App.reqres.setHandler("ga_mau_total_analytics:entities", function(startDate, endDate){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getGAMauTotalAnalyticsEntities(startDate, endDate);
        });

        App.reqres.setHandler("ga_mau_analytics:entities", function(startDate, endDate, segment){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getGAMauAnalyticsEntities(startDate, endDate, segment);
        });

        App.reqres.setHandler("ga_mobile_analytics:entities", function(startDate, endDate){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getGAMobileAnalyticsEntities(startDate, endDate);
        });

        App.reqres.setHandler("video_related_post_analytics:entity", function (video_id) {
          if (localStorage.getItem('access_token')) {
            // Logged in
            headers = {
              'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
            };

            $.ajaxSetup({
              headers: headers
            });
          }
          return API.getVideoRelatedPostEntity(video_id);
        });

        App.reqres.setHandler("video_related_post_analytics:entities", function (video_id) {
          if (localStorage.getItem('access_token')) {
            // Logged in
            headers = {
              'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
            };
            $.ajaxSetup({
              headers: headers
            });
          }
          return API.getVideoRelatedPostEntities(video_id);
        });

        App.reqres.setHandler("ga_mobile_daily_active_users:entities", function(startDate, endDate){
          if(localStorage.getItem('access_token')){
            // Logged in
            headers = {
              'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
            };
            $.ajaxSetup({
              headers: headers
            });
          }
          return API.getGAMobileDailyActiveUsersEntities(startDate, endDate);
        });

        App.reqres.setHandler("ga_mobile_weekly_active_users:entities", function(startDate, endDate){
          if(localStorage.getItem('access_token')){
            // Logged in
            headers = {
              'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
            };
            $.ajaxSetup({
              headers: headers
            });
          }
          return API.getGAMobileWeeklyActiveUsersEntities(startDate, endDate);
        });

    });
});
