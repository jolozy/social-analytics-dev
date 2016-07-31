define(["backbone", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection"],
    function(backbone, _, $, tpl, Articles) {

        var ArticleView = Backbone.View.extend({
          el: '#main-region',
          template: tpl,

          initialize: function(){
            this.render;
          },

          // initialize: function(options) {
          //     _.bindAll(this, 'render');
          //     this.Articles = options.Articles;
          //     this.BuzzInfo = options.BuzzInfo;
          //     this.Articles.on('change', this.render);
          //     this.BuzzInfo.on('change', this.render);
          // },

          render: function(articleArray, buzzInfoArray){
            this.$el.html(this.template( {articleArray: articleArray, buzzInfoArray: buzzInfoArray} ));
            return this;
          }
        });
        return ArticleView;
    });  
