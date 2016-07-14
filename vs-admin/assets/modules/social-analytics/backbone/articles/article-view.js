define(["backbone", "underscore", "jquery", "tpl!./article-template.html", "./article-collection"],
    function(backbone, _, $, tpl, Articles) {

        var ArticleView = Backbone.View.extend({
          template: _.template('tpl'),

          // initialize: function(){
          //   console.log("Your view has been initialized!");
          // },

          render: function(){
            //this.$el.html("your view is showing now!");
            this.$el.html(this.template);
            return ArticleView;
          },

          renderArticles: function(){
            var articles = new Articles({collection: Articles});
            //
          }

        });
    });
