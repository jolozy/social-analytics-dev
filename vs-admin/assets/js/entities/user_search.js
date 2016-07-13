define(["app", "moment", "apps/config/storage/localstorage"], function(App, moment){
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){

    Entities.UserSearch = Backbone.Model.extend({
      idAttribute: "_id",
      defaults:{
        id: "",
        fbid: "",
        first_name: "",
        last_name: "",
        email: "",
        primary_email: "",
        most_recent_sign_in: "",
        last_country: "",
        devices: "",
        settings: ""
      }
    });

    Entities.UserSearchCollection = Backbone.Collection.extend({
      model: Entities.UserSearch,
      url: App.apiURL + "admin/users/search",
      initialize: function(options) {
        this.id = options.id;
        this.udid = options.udid;
        this.email = options.email;
        this.first_name = options.first_name;
        this.last_name = options.last_name;
        this.fbid = options.fbid;
      },
      parse: function(res) {
        $('.js-user-list').removeClass('hidden');
        $('.js-loading-users').remove();
        if (res.users.length > 0) {
          $('.num-of-users').text('Number of users: ' + res.users.length);
        } else {
          $('.num-of-users').text('No users found');
        }
        return res.users;
      }
    });

    var API = {
      getUserSearch: function(id, fbid, udid, email, first_name, last_name) {
        var analytics = new Entities.UserSearchCollection({
          id: id,
          fbid: fbid,
          udid: udid,
          email: email,
          first_name: first_name,
          last_name: last_name
        });
        analytics.fetch({
          data: {
            id: id,
            fbid: fbid,
            udid: udid,
            email: email,
            first_name: first_name,
            last_name: last_name
          },
          type: 'POST'
        });

        return analytics;
      }
    };

    App.reqres.setHandler("user:entities", function(id, fbid, udid, email, first_name, last_name) {
      if(localStorage.getItem('access_token')) {
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }

      return API.getUserSearch(id, fbid, udid, email, first_name, last_name);
    });

  });
});
