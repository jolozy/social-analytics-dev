define(["backbone", "underscore", "jquery", "tpl!./articleSearch-template.tpl", "./article-collection"],
    function(backbone, _, $, searchTpl, Articles) {

        var SearchView = Backbone.View.extend({
            el: '#search', //need to change?
            template: searchTpl,

            initialize: function() {
                this.render;
            },

            render: function(finalArray) {
                this.$el.html(this.template({
                    finalArray: finalArray
                }));
                return this;
            },

            getArticles: function(){
              var title = this.$el.find('input').val();
              var articles =
            }

        });
        return SearchView;
    });
