define(["backbone", "moment", "underscore", "jquery", "tpl!./article-template.tpl", "./article-collection"],
    function(backbone, moment, _, $, tpl, Articles) {

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
          }
        });

        return ArticleView;

    });
