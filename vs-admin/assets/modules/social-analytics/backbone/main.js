define(["backbone", "underscore", "./article-model"],
    function(backbone, _, Article) {

        var ArticlesCollection = Backbone.Collection.extend({
            crossDomain: true,
            model: Article,
            url: 'http://demo4828724.mockable.io/articles'
        });
        var myArticle = new ArticlesCollection();
        myArticle.fetch();
        console.log(myArticle);

        return ArticlesCollection;

    });

define(["backbone", "underscore"],
    function(backbone, _) {

        var Article = Backbone.Model.extend({
            crossDomain: true,
            // urlRoot: "http://demo4828724.mockable.io",
            defaults: {
                title: " "
            },
            initialize: function() {
                console.log(this.attributes);
            }
        });

        return Article;

    });

define(["backbone", "underscore", "jquery"],
    function(backbone,_,$) {

        var ArticleView = Backbone.View.extend({
            tagName: 'tr',
            //events hash here
            template: _.template('#article-template'),
            render: function() {
                this.$el.html(this.template(this.model.attributes));
                return this;
            },
        });

        var ArticlesView = Backbone.View.extend({
            el: '#table-body',
            initialize: function() {
                this.render();
            },
            render: function() {
                this.$el.html('');
                articles.each(function(model) {
                    var article = new ArticleView({
                        model: model
                    });
                });
            },
        });

    });




