define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection", "../../../../../assets/modules/social-analytics/backbone/buzz/buzz-collection"],
    function(backbone, moment, _, $, tpl, Articles, buzzInfo) {

        var ArticleView = Backbone.View.extend({

          //collections
          myArticles: Articles,
          myBuzzInfo: buzzInfo,

          el: '#main-region',
          template: tpl,

          initialize: function(){
            this.myArticles = new Articles;
            this.myBuzzInfo = new buzzInfo;
            this.render;
            this.bindEvents();
          },

          render: function(myArticles, myBuzzInfo, moment){
            this.$el.html(this.template({
              myArticles: this.myArticles,
              myBuzzInfo: this.myBuzzInfo
              moment: moment
            } ));
            return this;
          },

          /////TRIES AARON'S RECOMMENDATION/////
          bindEvents: function(e){
            var _this = this

            $(document).on('click', '.paginated-page', function(e){
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
            var _this = this;
            var PER_PAGE = 10;
            var OFFSET = $el.attr('data-value');
            _this.myBuzzInfo.url = 'http://buzz.viddsee.com/api/buzz/v1/posts?offset=' + OFFSET + '&per_page=' + PER_PAGE; //change buzz collection's URL

            //Check AJAX calls
            $.when( _this.myBuzzInfo.fetch(), _this.myArticles.fetch() ).done(function(buzzData, articleData){
             _this.render();
            });


          // fetchAll: function(){
          //   var that = this;
          //
          //   $.when( fetchMyBuzzInfo(), fetchMyArticles() ).done(function(buzzData, articleData){
          //     //posts from Buzz Viddsee
          //     that.myBuzzInfo = buzzData[0].posts
          //     _.each((buzzData[0].posts), function(post, index){
          //       (buzzData[0].posts)[index].uid = 'buzz_article_' + post.ID;
          //     });
          //     //posts from Mock API
          //     that.myArticles = articleData[0]
          //
          //     that.render();
          //     }); //ends both checks for AJAX calls
          //
          //   function fetchMyBuzzInfo(){ //AJAX call for Buzz Viddsee
          //       var PER_PAGE = 5;
          //       var OFFSET = ( $(event.target).data('value') -1) *PER_PAGE +1;
          //       var paginatedURL = 'http://buzz.viddsee.com/api/buzz/v1/posts?offset=' + OFFSET + '&per_page=' + PER_PAGE; //change buzz collection's URL
          //       console.log(paginatedURL);
          //       return $.ajax({
          //         url: paginatedURL,
          //         data: {
          //           format: 'json'
          //         },
          //         //current_page: event.target.innerHTML,
          //         //total: 2180,
          //         error: function(){
          //           console.log("error!");
          //         },
          //         //dataType: 'jsonp',
          //         success: function(data){
          //           console.log('successful!');
          //         },
          //         type: 'GET'
          //       });
          //     }
          //   function fetchMyArticles(){ //AJAX call for Mock API
          //     return $.ajax({
          //       url: 'https://demo4828724.mockable.io/articles',
          //       data: {
          //         format: 'json'
          //       },
          //       error: function(){
          //         console.log("error!");
          //         $
          //       },
          //       //dataType: 'jsonp',
          //       success: function(data){
          //         console.log('successful!');
          //       },
          //       type: 'GET'
          //     });
          //   }
          //
          } //end fetchAll

      }); //end ArticleView

        return ArticleView;

    });
