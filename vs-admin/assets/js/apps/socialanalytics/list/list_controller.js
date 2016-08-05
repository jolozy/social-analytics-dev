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
                  var myArticles = new Articles();
                  var buzzInfo = new BuzzInfo();
                  var view = new ArticleView();

                  //when fetched from both Mock and Buzz, pass both collections to view to render
                  $.when(
                    myArticles.fetch(),
                    buzzInfo.fetch()
                  ).then(function(){
                    view.render(myArticles, buzzInfo, moment);
                  });

                }

            };  // List.Controller
        });   // App.module

        return App.SocialAnalytics.List.Controller;

    });
