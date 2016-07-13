define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Partner = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/partner",

            defaults:{
                title: "",
                description: "",
                photo_large_url: "",
                photo_medium_url: "",
                photo_small_url: "",
                published: "",
                published_date: "",
                uid: ""
            },

            togglePublish: function () {
                var publish = !this.get("published");
                this.save({
                    published: publish
                });
            }
        });

        Entities.PartnerCollection = Backbone.Collection.extend({
            url: App.apiURL + "admin/partners",
            model: Entities.Partner
        });

        var partners;

        var API = {
            getPartnerEntity: function(partner_id){
                var partner = new Entities.Partner({id: partner_id});
                partner.fetch();
                return partner;
            },
            getPartnerEntities: function(){
                partners = new Entities.PartnerCollection();
                partners.fetch();
                
                return partners;
            }
                
        };

        App.reqres.setHandler("partner:entities", function(){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getPartnerEntities();
        });

        App.reqres.setHandler("partner:entity", function(partner_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getPartnerEntity(partner_id);
        });
    });
});