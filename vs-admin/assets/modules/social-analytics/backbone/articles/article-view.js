define(["backbone", "underscore", "jquery", "tpl!./article-template.html", "./article-collection"],
    function(backbone, _, $, template, Articles) {

        var ArticleView = Backbone.View.extend({
          //template: _.template(template),
          initialize: function(){
            console.log("Your view has been initialized!");
          },

          render: function(){
            //this.$el.html("your view is showing now!");
            this.$el.html(this.template);
            return ArticleView;
          },

          renderArticles: function(){
            var articles = new Articles();
            //
          }

        });
    });
