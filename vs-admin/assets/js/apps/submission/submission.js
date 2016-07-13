define(["app",
  "apps/submission/list/list_controller",
  "apps/submission/edit/edit_controller"],
function(App) {

  App.module('Submission', function (Submission, App, Backbone, Marionette, $, _) {
    // Router
    Submission.Router = Marionette.AppRouter.extend({
        appRoutes: {
          'submissions': 'listSubmissions',
          'submission': 'listSubmissions',
          'submissions/:status': 'listSubmissions',
          'submission/:submission_id': 'editSubmission'
        }
      });

      var API = {
        listSubmissions: function (status) {
          if(!status)
            status = "pending";
          App.Submission.List.Controller.listSubmissions(status);
        },

        editSubmission: function (submission_id) {
          App.Submission.Edit.Controller.showEditForm(submission_id);
        },

        deleteSubmission: function(submission_id) {
          App.Submission.Edit.Controller.deleteSubmission(submission_id);
        }
      };

      App.on('submission:list', function () {
        App.navigate('submissions');
        API.listSubmissions();
      });

      App.on('submission:edit', function (submission_id) {
        App.navigate('submission/'+submission_id);
        API.editSubmission(submission_id);
      });

      App.on('submission:delete', function(submission_id) {
        App.navigate('submission');
        API.deleteSubmission(submission_id);
      });

      App.addInitializer(function () {
        new Submission.Router({
          controller: API
        });
      }); //Submission.Router

      // Listeners

  }); // App.module

  return App.Submission.Router;

});