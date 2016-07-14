define(["backbone", "underscore", "jquery", "tpl!./article-template.html", "./article-collection"],
    function(backbone, _, $, tpl, Articles) {

        var ArticleView = Backbone.View.extend({
          template: _.template('tpl'), //returns Uncaught TypeError: text.replace is not a function

          initialize: function(){
            this.render;
          },

          render: function(){
            this.$el.html(this.template);
            return this;
          }

        });
        return ArticleView;
    });
