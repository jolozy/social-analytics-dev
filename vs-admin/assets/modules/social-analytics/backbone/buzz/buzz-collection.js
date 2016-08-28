define(["app", "underscore", "./buzz-model"],
    function(App, _, Buzz) {

        var BuzzInfo = Backbone.Collection.extend({
            crossDomain: true,
            model: Buzz,
            url: 'http://buzz.viddsee.com/api/buzz/v1/posts',

            initialize: function(){
              // var _this = this;
              // //pre-processing before fetch
              // this.on('sync', function(collection){
              //   var posts = collection.models[0].attributes.posts;
              //   //manipulate every post and add a uid
              //   _.each(posts, function(post, index){
              //     posts[index].uid = 'buzz_article_' + post.ID;
              //   });
              //   //replace collection with posts
              //   _this.reset(posts);
              // });
            }

        });

        return BuzzInfo;

    });
