define(["backbone", "backbone.paginator", "underscore", "./buzz-model"],
    function(backbone, paginator, _, Buzz) {

        var BuzzInfo = Backbone.Collection.extend({
            crossDomain: true,
            model: Buzz,
            url: 'http://buzz.viddsee.com/api/buzz/v1/posts',
            initialize: function(){

              var _this = this;

              //pre-processing before fetch and overwriting the fetch function
              //when collection has been successfully synched with the server
              this.on('sync', function(collection){
                var posts = collection.models[0].attributes.posts;

                //manipulate every post and adding a uid
                _.each(posts, function(post, index){
                  posts[index].uid = 'buzz_article_' + post.ID;
                });

                //replace collection with posts
                _this.reset(posts);

              });

            }
        });
        return BuzzInfo;

    });
