define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection", "../../../../../assets/modules/social-analytics/backbone/buzz/buzz-collection"],
    function(backbone, moment, _, $, tpl, Articles, buzzInfo) {

        var ArticleView = Backbone.View.extend({

          el: '#main-region',
          template: tpl,

          initialize: function(){
            this.myArticles = new Articles;
            this.myBuzzInfo = new buzzInfo;
            this.bindEvents();
          },

          render: function(){
            this.$el.html(this.template({
              myArticles: this.myArticles,
              myBuzzInfo: this.myBuzzInfo,
              moment: moment
            } ));
            // return this;
          },

          bindEvents: function(e){
            var _this = this;

            $(document).on('click', '.paginated-page', function(e){
              e.preventDefault();
              _this.setSelectedPaginatedPage( $(this) ); //gives selected page button an active class
              _this.fetchAll( $(this).attr('data-value') ); //fetch all from Mock and Buzz
            });
          },

          setSelectedPaginatedPage: function($el){
            $('.paginated-page.selected').removeClass('selected');
            $el.addClass('selected'); //DO: have to write a CSS class that makes a page button active!!
          },

          fetchAll: function(OFFSET, NO_OF_POSTS=10){
            var _this = this;
            _this.myBuzzInfo.url = 'http://buzz.viddsee.com/api/buzz/v1/posts?offset=' + OFFSET*NO_OF_POSTS + '&number_of_posts=' + NO_OF_POSTS; //change buzz collection's URL

            //Check AJAX calls
            $.when( _this.myBuzzInfo.fetch(), _this.myArticles.fetch() ).done(function(buzzData, articleData){
             _this.render();
            });
          } //end fetchAll

      }); //end ArticleView

        return ArticleView;

    });
