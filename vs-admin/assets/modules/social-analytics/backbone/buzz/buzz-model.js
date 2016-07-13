define(["backbone", "underscore"],
    function(backbone, _) {

        var Buzz = Backbone.Model.extend({
            crossDomain: true,
            defaults: {
                title: " "
            },
            initialize: function() {
                console.log(this.attributes);
            }
        });

        return Buzz;

    });
