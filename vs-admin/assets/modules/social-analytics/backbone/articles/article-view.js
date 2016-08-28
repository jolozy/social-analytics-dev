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
              myArticles: myArticles,
              myBuzzInfo: myBuzzInfo,
              moment: moment
              //empty out the table? then render into view!
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


        //   showArticles: function(data){
        //     console.log(data);
        //     console.log(this.url);
        //     //console.log(myArticles); //returns me a function???
        //
        //     //$('#social-analytics-results').empty();
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
        // }//end showArticles

      }); //end ArticleView

        return ArticleView;

    }); //end define
