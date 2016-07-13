define(["app",
        "apps/comment/list/list_controller"],
    function(App) {

        App.module('Comment', function (Comment, App, Backbone, Marionette, $, _) {
            // Router
            Comment.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    'comments': 'listComment'
                }
            });

            var API = {
                listComment: function () {
                    App.Comment.List.Controller.listComments();
                },
                listCommentWithRange: function(start, end, filterType, searchString) {
                    App.Comment.List.Controller.listComments(start, end, filterType, searchString);
                }
            };

            App.on('comment:list', function () {
                App.navigate('comments');
                API.listComment();
            });

            App.on('comment:listWithRange', function (start, end, filterType, searchString) {
                App.navigate('comments');
                API.listCommentWithRange(start, end, filterType, searchString);
            });

            App.addInitializer(function () {
                new Comment.Router({
                    controller: API
                });
            }); //Submission.Router

            // Listeners

        }); // App.module

        return App.Comment.Router;

    });
