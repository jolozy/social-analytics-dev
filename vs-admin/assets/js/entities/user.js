define(["app"], function(App){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.User = Backbone.Model.extend({
            urlRoot: App.apiURL + "admin/user",

            defaults:{
                first_name: "",
                last_name: "",
                profile_image_url: ""
            }
        });

        Entities.UserCollection = Backbone.Collection.extend({
            url: App.apiURL + "admin/users",
            model: Entities.User
        });

        var users;

        var API = {
            getUserEntity: function(user_id){
                var user = new Entities.User({id: user_id});
                user.fetch();
                return user;
            },
            getUserEntities: function(){
                users = new Entities.UserCollection();
                users.fetch();
                
                return users;
            }
                
        };

        App.reqres.setHandler("user:entities", function(){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getUserEntities();
        });

        App.reqres.setHandler("user:entity", function(user_id){
            if(localStorage.getItem('access_token')){
                // Logged in
                headers = {
                    'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
                };
                $.ajaxSetup({
                     headers: headers
                  });
            }
            return API.getUserEntity(user_id);
        });
    });
});