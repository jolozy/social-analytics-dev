define(["app",
    "apps/user/list/list_view",
    "entities/user_search"],
  function(App) {

    App.module('User.List', function (User, App, Backbone, Marionette, $, _) {
      // Controller
      User.Controller = {

        listUsers: function (id, fbid, udid, email, first_name, last_name) {
          var fetchingUsers = App.request("user:entities", id, fbid, udid, email, first_name, last_name);
          $.when(fetchingUsers).done(function (users) {
            var userListView = new User.UserListView({
              collection: users
            });
            App.mainRegion.show(userListView);
          });
        }  // listUsers
      };  // List.Controller
    });   // App.module

    return App.User.List.Controller;

  });
