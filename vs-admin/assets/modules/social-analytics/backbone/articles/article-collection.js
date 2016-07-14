define(["backbone", "underscore", "./article-model"],
    function(backbone, _, Article) {

        var Articles = Backbone.Collection.extend({
            crossDomain: true,
            model: Article,
            url: 'http://demo4828724.mockable.io/articles'
        });

        return Articles;

    });
