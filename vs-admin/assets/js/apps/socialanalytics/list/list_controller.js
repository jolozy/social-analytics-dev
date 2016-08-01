define(["app","moment",
        "apps/socialanalytics/list/list_view",
        "../../../../../assets/modules/social-analytics/backbone/articles/article-view",
        "../../../../../assets/modules/social-analytics/backbone/articles/article-collection",
        "../../../../../assets/modules/social-analytics/backbone/buzz/buzz-collection"
        /*"entities/socialanalytics"*/],
    function(App, moment, listView, ArticleView, Articles, BuzzInfo) {

        App.module('SocialAnalytics.List', function (List, App, Backbone, Marionette, $, _) {
            // Controller
            List.Controller = {
                listSocialAnalytics: function( start, end, filterType, searchString ){
                  var myArticle = new Articles();
                  var buzzInfo = new BuzzInfo();
                  var view = new ArticleView();
                  var articleArray = [];
                  var buzzInfoArray = [];

                  //fetch from Mock
                  myArticle.fetch({
                    success: function (collection) {
                      articleArray = collection.models;
                      return articleArray;
                    }
                  });

                  //fetch from Buzz
                  buzzInfo.fetch({
                    success: function (collection) {
                      buzzInfoArray = collection.models[0].attributes.posts.map(function (post) {
                        var buzzInfoArray = {
                          id: 'buzz_article_' + post.ID,
                          title: post.post_title,
                          url: post.post_url
                        }
                        return buzzInfoArray;
                      })
                    }
                  });

                  //when fetched, pass both collections to view to render
                  $.when(
                    myArticle.fetch(),
                    buzzInfo.fetch()
                  ).then(function(){
                    view.render(articleArray, buzzInfoArray, moment);
                  });

                }

                /*
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
                */
            };  // List.Controller
        });   // App.module

        return App.SocialAnalytics.List.Controller;

    });
