define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Email = Backbone.Model.extend({
            defaults:{
                bcc: "",
                cc: "",
                created_at: "",
                date_to_send: "",
                id: "",
                message_body: "",
                recipient: "",
                sender: "",
                status: "",
                subject: "",
                tags: "",
                updated_at: "",
                video_id: ""
            }
        });

        Entities.EmailCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Email,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/scheduled_emails"
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
                'filter': function () {return this.filterBy;}
            },
            parse: function (res){
                this.perPage = res.per_page;
                this.currentPage = res.current_page;
                this.totalPages = res.total_pages;

                this.reset(res.videos);

                return res.videos;
            }
        });

        var users;

        var API = {

            getEmailEntities: function(searchString, filter) {
                emails = new Entities.EmailCollection();
                emails.search_string = searchString;
                emails.filterBy = filter;
                emails.fetch({
                    data: {
                        search_string: searchString,
                        filter: filter
                    }
                });

                return emails;
            }

        };

        App.reqres.setHandler("email:entities", function(searchString, filter){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getEmailEntities(searchString, filter);
        });

    });
});