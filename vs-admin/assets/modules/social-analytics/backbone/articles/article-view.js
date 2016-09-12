define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection", "../../../../../assets/modules/social-analytics/backbone/buzz/buzz-collection"],
    function(backbone, moment, _, $, tpl, Articles, buzzInfo) {

        var ArticleView = Backbone.View.extend({

          //collections
          myArticles: Articles,
          myBuzzInfo: buzzInfo,

          el: '#main-region',
          template: tpl,

          initialize: function(){
            //this.render;
            this.bindEvents();
          },

          render: function(myArticles, myBuzzInfo, moment){
            this.$el.html(this.template({
              myArticles: this.myArticles,
              myBuzzInfo: this.myBuzzInfo,
              moment: moment
            } ));
            return this;
          },

          //pagination
          // events: {
          //   'click .paginated-page': 'fetchAll'
          // },
          bindEvents: function(){
            var _this = this;

            $('.paginated-page').on("click",function(e){
              e.preventDefault();
              _this.setSelectedPaginatedPage( $(this) ); //gives selected page button an active class
              _this.fetchAll( $(this) ); //fetch all from Mock and Buzz
            });

            // //tried the below method too, but didn't work:
            //$('.paginated-page').on("click", this.setSelectedPaginatedPage);
            //$('.paginated-page').on("click",_this.fetchAll);

          },

          setSelectedPaginatedPage: function($el){
            $('.paginated-page.selected').removeClass('selected');
            $el.addClass('selected'); //DO: have to write a CSS class that makes a page button active!!
          },

          fetchAll: function($el){
            $el.preventDefault();

            var _this = this;
            var PER_PAGE = 10;
            var OFFSET = $el.attr('data-value');
            _this.myBuzzInfo.url = 'http://buzz.viddsee.com/api/buzz/v1/posts?offset' + OFFSET + '&per_page' + PER_PAGE; //change buzz collection's URL

            //Check AJAX calls
            $.when( _this.myBuzzInfo.fetch(), _this.myArticles.fetch() ).done(function(buzzData, articleData){
              console.log("OOOHYEAHH")//should be this >> _this.render();
            });

            // $.when( fetchMyBuzzInfo(), fetchMyArticles() ).done(function(buzzData, articleData){
              // //x = posts from Buzz Viddsee
              // var x = buzzData[0].posts
              // _.each(x, function(post, index){
              //   x[index].uid = 'buzz_article_' + post.ID;
              // });
              // //console.log(x);
              //
              // //y = posts from Mock API
              // var y = articleData[0]
              // //console.log(y);

              // //match posts from both API
              // _.each( x, function(buzz, index){
              //   _.each( y, function(mock, index){
              //     if( buzz.uid == mock.id ){
              //       console.log(buzz.post_title);
              //       console.log((mock.facebook.shares).toLocaleString());
              //       console.log((mock.facebook.comments).toLocaleString());
              //       console.log((mock.facebook.shares + mock.facebook.comments).toLocaleString());
              //       console.log((mock.overall.shares).toLocaleString());
              //       console.log(moment(mock.updated_at).format('MMMM Do, h:mm a'));
              //     }
              //   });
              // });
              //}); //ends both checks for AJAX calls

            // function fetchMyBuzzInfo(){
              // return $.ajax({
              //   url: 'http://buzz.viddsee.com/api/buzz/v1/posts',
              //   data: {
              //     //current_page: event.target.innerHTML,
              //     //total: 2180,
              //     offset: ((event.target.innerHTML) -1) *10 +1,
              //     per_page: 10
              //   },
              //   error: function(){
              //     console.log("error!");
              //   },
              //   //dataType: 'jsonp',
              //   success: function(data){
              //     console.log('successful!');
              //     //return (this.url);
              //   },
              //   type: 'GET'
              // });
            // }
            // function fetchMyArticles(){
            //   return $.ajax({
            //     url: 'https://demo4828724.mockable.io/articles',
            //     data: {
            //       format: 'json'
            //     },
            //     error: function(){
            //       console.log("error!");
            //       $
            //     },
            //     //dataType: 'jsonp',
            //     success: function(data){
            //       console.log('successful!');
            //       //return (data);
            //     },
            //     type: 'GET'
            //   });
            // }

          } //end fetchAll

      }); //end ArticleView

        return ArticleView;

    });
