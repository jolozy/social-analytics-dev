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
            //this.collection
          },

          render: function(myArticles, myBuzzInfo, moment){
            this.$el.html(this.template({
              myArticles: myArticles,
              myBuzzInfo: myBuzzInfo,
              moment: moment
              //empty out the table? then render into view?
            } ));
            return this;
          },

          //pagination
          events: {
            'click .paginated-page': 'callArticles'
          },
          callArticles: function(event){
            event.preventDefault();

            //START AJAX
            $.when( ajax1(), ajax2() ).done(function(buzzData, articleData){
              //Aaron: do matching here, then save it to collections & trigger render function in view
              //console.log(buzzData[0].paging); //logs the previous & next URL

              //x = posts from Buzz Viddsee
              var x = buzzData[0].posts
              _.each(x, function(post, index){
                x[index].uid = 'buzz_article_' + post.ID;
              });
              console.log(x);

              //y = posts from Mock API
              var y = articleData[0]
              console.log(y);

              //match posts from both API
              _.each( x, function(buzz, index){
                _.each( y, function(mock, index){
                  if( buzz.uid == mock.id ){
                    console.log(buzz.post_title);
                    console.log((mock.facebook.shares).toLocaleString());
                    console.log((mock.facebook.comments).toLocaleString());
                    console.log((mock.facebook.shares + mock.facebook.comments).toLocaleString());
                    console.log((mock.overall.shares).toLocaleString());
                    console.log(moment(mock.updated_at).format('MMMM Do, h:mm a'));

                  }
                });
              });
            }); //ends ajax double checks

            function ajax1(){
              return $.ajax({
                url: 'http://buzz.viddsee.com/api/buzz/v1/posts',
                data: {
                  //current_page: event.target.innerHTML,
                  //total: 2180,
                  offset: ((event.target.innerHTML) -1) *10 +1,
                  per_page: 10
                },
                error: function(){
                  console.log("error!");
                },
                //dataType: 'jsonp',
                success: function(data){
                  console.log('successful!');
                  //return (this.url);
                },
                type: 'GET'
              });
            }
            function ajax2(){
              return $.ajax({
                url: 'https://demo4828724.mockable.io/articles',
                data: {
                  format: 'json'
                },
                error: function(){
                  console.log("error!");
                  $
                },
                //dataType: 'jsonp',
                success: function(data){
                  console.log('successful!');
                  //return (data);
                },
                type: 'GET'
              });
            }
          } //end callArticles

      }); //end ArticleView

        return ArticleView;

    }); //end define
