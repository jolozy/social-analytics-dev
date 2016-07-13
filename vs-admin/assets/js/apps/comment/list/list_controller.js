define(["app","moment",
        "apps/comment/list/list_view",
        "entities/comment"],
    function(App, moment) {

        App.module('Comment.List', function (List, App, Backbone, Marionette, $, _) {
            // Controller
            List.Controller = {
                listComments: function (start, end, filterType, searchString) {
                    var fetchingComments = App.request("comment:comment:entities", start, end, filterType, searchString);
                    $.when(fetchingComments).done(function (comments) {
                        comments.startDate    = start;
                        comments.endDate      = end;
                        comments.filterType   = filterType;
                        comments.searchString = searchString;
                        var CommentListView = new List.CommentListView({
                            collection: comments
                        });
                        App.mainRegion.show(CommentListView);
                        CommentListView.on('render', function(){
                            if (comments.numComments === 0) {
                                $('.js-num-of-comments').text('No comments are found.');
                            } else {
                                $('.js-num-of-comments').text('Showing ' + comments.models.length + ' out of ' + comments.total + ' comment threads:');
                            }
                            if (comments.hasMore) {
                                $('#load-more').removeClass('hidden');
                            } else {
                                $('#load-more').addClass('hidden');
                            }
                            $('.js-comment-list').removeClass('hidden');
                            $('.js-loading-comments').remove();
                            });
                        });
                }  // listComments
            };  // List.Controller
        });   // App.module

        return App.Comment.List.Controller;

    });
