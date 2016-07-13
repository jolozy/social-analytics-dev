define(["app",
    "apps/video/list/list_view",
    "entities/video"],
function(App) {

  App.module('Video.List', function (List, App, Backbone, Marionette, $, _) {

    // Controller
    List.Controller = {
        listVideos: function () {
            var fetchingVideos = App.request("video:entities");
            $.when(fetchingVideos).done(function (videos) {
                var videoGridView = new List.VideoGridView({
                    collection: videos
                });

                videoGridView.on("itemview:video:edit", function (childView, model) {
                    App.trigger('video:edit', model.get('uid'));
                });
                App.mainRegion.show(videoGridView);

                videoGridView.on('render', function() {
                    $('.js-videos-loading').remove();
                    // Show no video message if there are no videos.
                    if (videos.length === 0) {
                        $('.js-video-grid').html('<div style="text-align: center;">No videos matched search results.</div>');
                    }
                });
            });
        },  // listVideos

        searchVideos: function (search_string, filterBy, videoGridView) {
            var fetchingVideos = App.request("video:search", search_string, filterBy);
            /*if(search_string === "")
                fetchingVideos = App.request("video:entities");
            else
                fetchingVideos = App.request("video:search", search_string, rights_obj);*/

            $.when(fetchingVideos).done(function (videos) {
                var videoGridView = new List.VideoGridView({
                    collection: videos
                });
                videos.search_string = search_string;
                videos.filterBy = filterBy;
                videoGridView.on("itemview:video:edit", function (childView, model) {
                    App.trigger('video:edit', model.get('uid'));
                });

                App.mainRegion.show(videoGridView);

                videoGridView.on('render', function () {
                    switch(filterBy){
                        case 'unpublished':
                            $('.js-tab-unpublished').addClass('active');
                            break;
                        case 'published':
                            $('.js-tab-published').addClass('active');
                            break;
                        case 'rights_general':
                            $('.js-tab-rights-general').addClass('active');
                            break;
                        case 'rights_advertising':
                            $('.js-tab-rights-advertising').addClass('active');
                            break;
                        case 'rights_all':
                            $('.js-tab-rights-all').addClass('active');
                            break;
                        default:
                            $('.js-tab-all').addClass('active');
                    }
                    $('.js-videos-loading').remove();
                    // Show no video message if there are no videos.
                    if (videos.length === 0) {
                        $('.js-video-grid').html('<div style="text-align: center;">No videos matched search results.</div>');
                    }
                });
            });
        }
        
    };  // List.Controller
  });   // App.module

  return App.Video.List.Controller;

});