define(["app", "moment", "apps/config/storage/localstorage", "backbone.paginator"], function(App, moment){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
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
                'filter_string': function() {return this.searchString;}
            },

            parse: function(response) {
                this.perPage      = response.per_page;
                this.currentPage  = response.current_page;
                this.totalPages   = response.total_pages;
                this.total        = response.total;
                this.startDate    = response.start_date;
                this.endDate      = response.end_date;
                this.searchString = response.filter_string;
                this.filterType   = response.filter_type;
                this.numComments  = response.num_comments;
                this.hasMore      = response.has_more;
                
                return response.comments;
            }
        });

        var API = {
            getCommentEntities: function(startDate, endDate, filterType, searchString) {
                if (!startDate) {
                    startDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
                }
                if (!endDate) {
                    endDate = moment().subtract(1, 'd').format('YYYY-MM-DD');
                }
                var comments = new Entities.CommentCollection();
                comments.fetch({
                    reset: true,
                    data: {
                        start_date   : startDate,
                        end_date     : endDate,
                        filter_string: searchString,
                        filter_type  : filterType,
                    }
                });
                return comments;
            }
        };

        App.reqres.setHandler("comment:comment:entities", function(startDate, endDate, filterType, searchString){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getCommentEntities(startDate, endDate, filterType, searchString);
        });

    });
});
