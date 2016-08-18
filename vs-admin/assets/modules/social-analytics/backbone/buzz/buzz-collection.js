define(["app", "underscore", "./buzz-model"],
    function(App, _, Buzz) {

        var BuzzInfo = Backbone.Collection.extend({
            crossDomain: true,
            model: Buzz,
            url: 'http://buzz.viddsee.com/api/buzz/v1/posts',
            //url: 'http://buzz.viddsee.com/api/buzz/v1/posts?offset=10',

            initialize: function(){
              var _this = this;
              //pre-processing before fetch and overwriting the fetch function
              //when collection has been successfully synched with the server
              this.on('sync', function(collection){
                console.log(collection);
                var posts = collection.models[0].attributes.posts;
                //manipulate every post and adding a uid
                _.each(posts, function(post, index){
                  posts[index].uid = 'buzz_article_' + post.ID;
                });
                //replace collection with posts
                _this.reset(posts);
              });
            },

            //called whenever a collection's models are returned with a fetch from server - returns array of model attributes to be added to collection
            // parse: function(response){
            //   this.offset = response.offset;
            //   this.per_page = response.per_page;
            // },

        });

        return BuzzInfo;

    });
