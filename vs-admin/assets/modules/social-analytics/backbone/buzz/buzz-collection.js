define(["backbone", "backbone.paginator", "underscore", "./buzz-model"],
    function(backbone, paginator, _, Buzz) { //Not sure if paginator here is required? Doesn't seem to work if I dont put it here

        var BuzzInfo = Backbone.Collection.extend({
            crossDomain: true,
            model: Buzz,
            url: 'http://starfish.viddsee.com/api/buzz/v1/posts',
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

        //Paginated BuzzInfo collection
        var PaginatedBuzzInfo = Backbone.Paginator.requestPager.extend({
          model: Buzz,
          url: 'http://starfish.viddsee.com/api/buzz/v1/posts',
          paginator_ui: {
            firstPage: 0,
            currentPage: 0,
            totalPages: 10,
            perPage: 10,
            pagesInRange: 2
          },
          server_api: {
            'per_page': function () {return this.perPage;},
            'current_page': function () {return this.currentPage;}
          },
          parse: function(results){
            this.perPage      = results.per_page;
            this.currentPage  = results.current_page;
            this.totalPages   = results.total_pages;
            var everything = results;
            console.log(results);
            return results;
          }
        });

    });
