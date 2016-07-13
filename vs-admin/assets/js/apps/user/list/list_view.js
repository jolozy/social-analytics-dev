define(["app", "moment",
    "tpl!apps/user/list/tpl/user-list.tpl",
    "tpl!apps/user/list/tpl/user-itemview.tpl"],
  function(App, moment, userListViewTpl, userItemViewTpl) {

    App.module('User.List', function (User, App, Backbone, Marionette, $, _) {
      // Views
      User.UserItemView = Marionette.ItemView.extend({
        template: userItemViewTpl,

        onShow: function() {

        },

        events: {

        }
      });

      User.UserListView = Marionette.CompositeView.extend({
        template: userListViewTpl,
        tagName: 'div',
        className: 'user-listview-container',

        itemView: User.UserItemView,
        itemViewContainer: ".js-user-list",

        events: {
          'click .js-search-user': 'searchForUsers',
          'click .js-reset': 'resetFields',
          'keypress .search-user' : 'enterPressed'
        },

        onShow: function() {
          $('.user-id').val(this.id);
          $('.user-fbid').val(this.fbid);
          $('.user-udid').val(this.udid);
          $('.user-email').val(this.email);
          $('.user-first-name').val(this.first_name);
          $('.user-last-name').val(this.last_name);
        },

        onRender: function() {

        },

        initialize: function() {
          this.collection.bind("reset", _.bind(this.render, this));
          this.id = this.collection.id;
          this.fbid = this.collection.fbid;
          this.udid = this.collection.udid;
          this.email = this.collection.email;
          this.first_name = this.collection.first_name;
          this.last_name = this.collection.last_name;
        },

        resetFields: function() {
          $('.search-user').val('');
        },

        enterPressed: function(e) {
          if ( e.which === 13 ) {
            this.searchForUsers();
          }
        },

        searchForUsers: function() {
          var id = $('.user-id').val();
          var fbid = $('.user-fbid').val();
          var udid = $('.user-udid').val();
          var email = $('.user-email').val();
          var firstName = $('.user-first-name').val();
          var lastName = $('.user-last-name').val();

          if (id === '' && fbid === '' && udid === '' && email === '' && firstName === '' && lastName === '') {
            alert('Please enter in a search term.');
          } else {
            User.Controller.listUsers(id, fbid, udid, email, firstName, lastName);
          }
        }

      });

    });

    return ;
  });
