define(["app",
    "apps/submission/edit/edit_view",
    "entities/submission"],
function(App) {

  App.module('Submission.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    // Controller
    Edit.Controller = {
        showEditForm: function (submission_id) {
          var submission;
          if(submission_id)
            submission = App.request('submission:entity', submission_id);
          else
            submission = new App.Entities.Submission();
          var formView = new Edit.FormView({
            model: submission
          });

          formView.on('submission:update', function(status, message, callback){
            submission.updateStatus(status, message, callback);
          });

          formView.on('submission:reject', function() {
            var view = new Edit.RejectFormItemView({
              model: submission
            });

            view.on('submission:rejection:sent', function() {
              App.modalRegion.close();
              App.trigger('submission:edit', submission_id);
            });

            App.modalRegion.show(view);
          });

          formView.on("submission:moreinfo", function() {
            var view = new Edit.MoreInfoFormItemView({

            });

            view.on('submission:moreinfo:send', function(message) {
              App.modalRegion.close();
              formView.triggerMethod('update:submission', "moreinfo", message);
            });

            App.modalRegion.show(view);
          })

          App.mainRegion.show(formView);

        },

        deleteSubmission: function(submission_id) {
          App.setHeaders();
          $.ajax({
            url: App.apiURL + 'submitvideo/' + submission_id,
            type: 'DELETE',
            success: function(result) {
              jQuery.gritter.add({
                title: 'Submission deleted!',
                class_name: 'growl-success'
              });
            },
            error: function(err) {
              jQuery.gritter.add({
                title: 'Error saving',
                class_name: 'growl-danger'
              });
            }
          });
        }
    };  // Submission.List.Controller
  });   // App.module

  return App.Submission.Edit.Controller;

});