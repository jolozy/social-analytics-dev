define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Newsletter = Backbone.Model.extend({
            defaults:{
                content: "",
                created_at: "",
                id: "",
                meta: "{}",
                lists: "",
                scheduled_date: "",
                status: "",
                subject: "",
                sender_name: "Jian Ho",
                sender_email: "jiajian@viddsee.com",
                template_type: "newsletter",
                updated_at: ""
            }
        });

        Entities.NewsletterCollection = Backbone.Paginator.requestPager.extend({
            model: Entities.Newsletter,
            paginator_core: {
                type: 'GET',
                dataType: 'json',
                url: App.apiURL + "admin/sendy_emails"
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
                var emails = res.emails.map(function(email) {
                    email.language_name = getLocaleName(email.language)
                    return email
                })
                this.reset(emails);
                return emails;
            }
        });

        var API = {

            getNewsletterEntities: function(searchString, filter) {
                var newsletters = new Entities.NewsletterCollection();
                newsletters.search_string = searchString;
                newsletters.filterBy = filter;
                newsletters.fetch({
                    data: {
                        search_string: searchString,
                        filter: filter
                    }
                });

                return newsletters;
            }

        };

        App.reqres.setHandler("newsletter:entities", function(searchString, filter){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                    headers: headers
                });
            }
            return API.getNewsletterEntities(searchString, filter);
        });

    });
});