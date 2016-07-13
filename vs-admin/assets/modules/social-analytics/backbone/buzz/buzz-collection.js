define(["backbone", "underscore", "./buzz-model"],
    function(backbone, _, Buzz) {

        var BuzzInfo = Backbone.Collection.extend({
            crossDomain: true,
            model: Buzz,
            url: 'http://starfish.viddsee.com/api/buzz/v1/posts'
        });

        return BuzzInfo;

    });
