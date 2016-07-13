define(["app",
    "apps/tag/list/list_view",
    "entities/tag"],
  function(App) {

    App.module('Tag.List', function (List, App, Backbone, Marionette, $, _) {

      // Controller
      List.Controller = {
        listTags: function (tag_type) {
          var fetchingTags = App.request("tag:entities", tag_type);
          $.when(fetchingTags).done(function (tags) {
            var tagView = new List.TagView({
              collection: tags
            });

            App.mainRegion.show(tagView);
          });

        },  // listTags

        showEditTagModalView: function(id) {
          var tagInfo = new App.Entities.Tag();
          tagInfo.urlRoot = App.apiURL + "admin/tags/" + id;

          var editTagModalView = new List.EditTagModalView({
            model: tagInfo
          });

          tagInfo.on('sync', function() {
            App.modalRegion.show(editTagModalView);
            $('#modal-region .modal').modal('show');
            tagInfo.unbind('sync');
          });

          tagInfo.fetch();
        },

        showEditTagLocalisationModalView: function(id) {
          var editTagLocalisationModalView = new List.EditTagLocalisationModalView({
            id: id
          });
          App.modalRegion.show(editTagLocalisationModalView);
          $('#modal-region .modal').modal('show');
        }

      };  // List.Controller
    });   // App.module

    return App.Tag.List.Controller;

  });
