define(["app",
    "apps/submission/list/list_view",
    "entities/submission"],
function(App) {

  App.module('Submission.List', function (List, App, Backbone, Marionette, $, _) {

    // Controller
    List.Controller = {
        listSubmissions: function (status) {
            var fetchingSubmissions = App.request("submission:entities", status);
            $.when(fetchingSubmissions).done(function (submissions) {
                submissions.status = status;
                var submissionGridView = new List.SubmissionGridView({
                    collection: submissions
                });

                submissionGridView.on("itemview:submission:edit", function (childView, model) {
                    App.trigger('submission:edit', model.get('uid'));
                });

                App.mainRegion.show(submissionGridView);
                submissionGridView.on('render', function() {
                    $('.js-videos-loading').remove();
                    if (submissions.length === 0) {
                        $('.js-submission-grid').html('<div style="text-align: center;">No videos matched search results.</div>');
                    }
                });
            });
        },  // listSubmissions 
        searchSubmissions: function (search_string, submissionGridView) {
            var fetchingSubmissions;
            var status = submissionGridView.collection.status;
            if(search_string === "")
                fetchingSubmissions = App.request("submission:entities", status);
            else
                fetchingSubmissions = App.request("submission:search", search_string, status);
            $.when(fetchingSubmissions).done(function (submissions) {
                var submissionGridView = new List.SubmissionGridView({
                    collection: submissions
                });
                submissions.search_string = search_string;
                submissions.status = status;
                submissionGridView.on("itemview:submission:edit", function (childView, model) {
                    App.trigger('submission:edit', model.get('uid'));
                });

                App.mainRegion.show(submissionGridView);
                submissionGridView.on('render', function () {
                    switch(status){
                        case 'pending':
                            $('.js-tab-pending').addClass('active');
                        break;
                        case 'approved':
                            $('.js-tab-approved').addClass('active');
                        break;
                        case 'rejected':
                            $('.js-tab-rejected').addClass('active');
                        break;
                        case 'all':
                            $('.js-tab-all').addClass('active');
                        break;
                    }
                    $('.js-videos-loading').remove();
                    if (submissions.length === 0) {
                        $('.js-submission-grid').html('<div style="text-align: center;">No videos matched search results.</div>');
                    }
                });

            });
        }
    };  // List.Controller
  });   // App.module

  return App.Submission.List.Controller;

});