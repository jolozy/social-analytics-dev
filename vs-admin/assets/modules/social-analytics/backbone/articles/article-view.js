define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection", "../../../../../assets/modules/social-analytics/backbone/buzz/buzz-collection"],
    function(backbone, moment, _, $, tpl, Articles, buzzInfo) {

        var ArticleView = Backbone.View.extend({

          //collections
          myArticles: Articles,
          myBuzzInfo: buzzInfo,

          el: '#main-region',
          template: tpl,

          initialize: function(){
            this.render;
          },

          render: function(myArticles, myBuzzInfo, moment){
            this.$el.html(this.template({
              //myArticles: myArticles,
              myArticles: myArticles,
              myBuzzInfo: myBuzzInfo,
              moment: moment
            } ));
            //console.log('ArticlesCollection',myArticles);
            //console.log('buzztoJSON',myBuzzInfo.toJSON());
            return this;
          },

          //pagination
          events: {
            'click .paginated-page': 'callArticles'
          },
          callArticles: function(event){
            event.preventDefault();

            //START AJAX
            $.ajax({
              url: 'http://buzz.viddsee.com/api/buzz/v1/posts',
              data: {
                //current_page: event.target.innerHTML,
                //total: 2180,
                offset: ((event.target.innerHTML) -1) *10 +1,
                per_page: 10
              },
              error: function(){
                console.log("ERROR!");
                $
              },
              //dataType: 'jsonp',
              success: function(data){
                this.showArticles(data);
              },
              showArticles: function(data){
                //console.log(data);
                //console.log(this.url);
                //console.log(myArticles); //returns me a function???

                $('#social-analytics-results').empty();
                  // _.each(data, function(post, index){
                  //   if(typeof Articles.get(post.uid) != 'undefined'){
                  //     $('#social-analytics-results').append('<tr><td>'+ post.post_title +'</td></tr>');
                  //
                  //     //console.log(Articles.get(post.uid))
                  //     // (Articles.get(post.uid).attributes.facebook.shares).toLocaleString();
                  //     // (Articles.get(post.uid).attributes.facebook.comments).toLocaleString();
                  //     // (Articles.get(post.uid).attributes.facebook.shares + Articles.get(post.uid).attributes.facebook.comments).toLocaleString();
                  //     // (Articles.get(post.uid).attributes.overall.shares).toLocaleString();
                  //     // moment(Articles.get(post.uid).attributes.updated_at).format('MMMM Do, h:mm a');
                  //   }
                  // });//end loop to match Buzz with Articles

            },//end showArticles
              type: 'GET'
            }); //end AJAX

          }

        });

        return ArticleView;

    });
