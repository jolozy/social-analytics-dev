define(["backbone", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection"],
    function(backbone, _, $, tpl, Articles) {

        var ArticleView = Backbone.View.extend({
          el: '#main-region',
          template: tpl,

          initialize: function(){
            this.render;
          },

          render: function(finalArray){
            this.$el.html(this.template( {finalArray: finalArray} ));
            return this;
          }

        });
        return ArticleView;
    });
