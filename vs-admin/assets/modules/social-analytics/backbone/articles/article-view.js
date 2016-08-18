define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection", "../../../../../assets/modules/social-analytics/backbone/buzz/buzz-collection"],
    function(backbone, moment, _, $, tpl, Articles, buzzInfo) {

        var ArticleView = Backbone.View.extend({
          el: '#main-region',
          template: tpl,

          initialize: function(){
            this.render;
          },

          render: function(myArticles, buzzInfo, moment){
            this.$el.html(this.template({
              myArticles: myArticles,
              buzzInfo: buzzInfo,
              moment: moment
            } ));
            return this;
          },

          //pagination
          events: {
            'click .paginated-page': 'loadMore'
          },
          loadMore: function(event){
            event.preventDefault();
            console.log(buzzInfo.fetch({data: {offset: 20}}));
          }

        });

        return ArticleView;

    });







    // if (event.target.innerHTML == "1"){
    //   //console.log(Articles);
    //   //how do we pass attributes like per_page and offset to the collection?
    //   console.log("HELLO I AM HERE I EXIST AS 1");
    // }
    //
    // else if (event.target.innerHTML == "2"){
    //   console.log("HELLO I AM HERE I EXIST AS 2");
    // }
    //
    // else if (event.target.innerHTML == "3"){
    //   console.log("HELLO I AM HERE I EXIST AS 3");
    // }
    //
    // else if {
    //   console.log("HELLO I AM HERE I EXIST AS 4");
    // }
    //
    // else {
    //   console.log("HELLO I AM HERE I EXIST AS 5");
    // }
