define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection"],
    function(backbone, moment, _, $, tpl, Articles) {

        var ArticleView = Backbone.View.extend({
          el: '#main-region',
          template: tpl,
          // templateHelpers: {
          //   moment: mom // <-- this is the reference to the moment in your view
          // },

          initialize: function(){
            this.render;
          },

          render: function(articleArray, buzzInfoArray){
            this.$el.html(this.template( {articleArray: articleArray, buzzInfoArray: buzzInfoArray} ));
            return this;
          }
        });
        return ArticleView;
    });
