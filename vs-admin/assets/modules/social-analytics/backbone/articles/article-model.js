define(["backbone", "underscore"],
    function(backbone, _) {

        var Article = Backbone.Model.extend({
            crossDomain: true,
            defaults: {
                title: " "
            },
            initialize: function() {
                //console.log(this.attributes);
                console.log("Initialized Article model!");
            }
        });

        return Article;

    });
