define(["app",
      "apps/facebook/list/list_view",
      "entities/facebook"],
    function(App) {

      App.module('Facebook.List', function (Facebook, App, Backbone, Marionette, $, _) {
        // Controller
        Facebook.Controller = {

          listFacebookPosts: function (status, page) {
            var fetchingFacebook = App.request("facebook:entities", status, page);
            $.when(fetchingFacebook).done(function (facebook) {
              var facebookListView = new Facebook.FacebookListView({
                collection: facebook
              }, function(err) {
                console.log(err)
              });
              App.mainRegion.show(facebookListView);
              $('.js-status').val(status);
              $('.js-fb-page').val(page);
            });
          },  // listFacebookPosts

          filterFacebookPosts: function(status, page) {
            var filtered = App.request("facebook:filter", status, page);
            var facebookListView = new Facebook.FacebookListView({
              collection: filtered
            }, function(err) {
              console.log(err)
            });
            App.mainRegion.show(facebookListView);
            $('.js-status').val(status);
            $('.js-fb-page').val(page);
          },

          loadMore: function(status, page) {
            var fetchingFacebook = App.request("facebook:loadMore", status, page);
            $.when(fetchingFacebook).done(function (facebook) {
              var facebookListView = new Facebook.FacebookListView({
                collection: facebook
              }, function(err) {
                console.log(err)
              });
              App.mainRegion.show(facebookListView);
              $('.js-status').val(status);
              $('.js-fb-page').val(page);
              this.filterFacebookPosts(status,page)
            }.bind(this));
          },

          createPostModalView: function() {
            var facebookModalView = new Facebook.FacebookCreateModalView();
            App.modalRegion.show(facebookModalView);
            $('#modal-region .modal').modal('show');
          }
        };  // List.Controller
      });   // App.module

      return App.Facebook.List.Controller;

    });