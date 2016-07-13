define(["marionette", 'helpers', 'custom', 'constants'],
    function(Marionette){

    var App = new Marionette.Application();
    var LIVE_API_URL = 'https://www.viddsee.com/v1/';
    var STAGING_API_URL = 'http://blueberry.viddsee.com/v1/';
    var TEST_API_URL = 'http://strawberry.viddsee.com/v1/';
    var LOCAL_API_URL = 'http://strawberry.viddsee.com/v1/';//http://localhost:3000/v1/';

    // var apiURL = TEST_API_URL;
    var apiURL = window.location.protocol + "//" + window.location.hostname + '/v1/';

    switch(window.location.hostname) {
        case "localhost":
            apiURL = LOCAL_API_URL;
        break;
        case "strawberry.viddsee.com":
            apiURL = TEST_API_URL;
        break;
        case "blueberry.viddsee.com":
            apiURL = STAGING_API_URL;
        break;
        case "www.viddsee.com":
            apiURL = LIVE_API_URL;
        break;
    }
    App.apiURL = TEST_API_URL;//apiURL;

    var LIVE_VIDEO_URL = 'https://www.viddsee.com/';
    var STAGING_VIDEO_URL = 'http://blueberry.viddsee.com/';
    var TEST_VIDEO_URL = 'http://strawberry.viddsee.com/';
    var LOCAL_VIDEO_URL = 'http://localhost:3000/';

    // var videoURL = TEST_VIDEO_URL;
    var videoURL = window.location.protocol + "//" + window.location.hostname + '/';

    switch(window.location.hostname) {
        case "localhost":
            videoURL= LOCAL_VIDEO_URL;
            break;
        case "strawberry.viddsee.com":
            videoURL = TEST_VIDEO_URL;
            break;
        case "blueberry.viddsee.com":
            videoURL = STAGING_VIDEO_URL;
            break;
        case "www.viddsee.com":
            videoURL = LIVE_VIDEO_URL;
            break;
    }
    App.videoURL = videoURL;

    var s3Folder = "dev_media/";

    switch(window.location.hostname) {
        case "localhost":
            s3Folder = "dev_media/";
            break;
        case "strawberry.viddsee.com":
            s3Folder = "dev_media/";
            break;
        case "blueberry.viddsee.com":
            s3Folder = "media/";
            break;
        case "www.viddsee.com":
            s3Folder = "media/";
            break;
    }

    App.s3Folder = s3Folder;

    App.addRegions({
        mainRegion: "#main-region",
        navRegion: "#nav-region",
        headerRegion: "#header-region",
        panelRegion: "#panel-region",
        modalRegion: "#modal-region"
    });

    App.navigate = function (route, options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function (){
        return Backbone.history.fragment;
    };

    App.setHeaders = function (){
        var headers = {
            'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
             headers: headers
          });
    };

    App.init = function (){
        $.ajaxSetup({
            statusCode : {
                400: function(res) {
                    console.log("error", res.responseText);
                    if (JSON.parse(res.responseText).error.type === 'OAuthException') {
                        facebookLogin(refreshPage)
                    }
                }
            }
        });

        if(Backbone.history){
            Backbone.history.start({
            });
        }

        var loggedIn = checkAuth();
        if(loggedIn) {
            getUserInfo(App.apiURL, function (){
                require(["apps/navbar/navbar"], function(){
                    App.trigger("navbar:show");
                    App.trigger("navheader:show");
                });

                if(App.getCurrentRoute() === ""){
                    require(["apps/video/video"], function(){
                        App.trigger("video:list");
                    });
                }
            });
        } else {
            require(["apps/account/account"], function () {
                App.trigger("signin:show");
            });
        }
    };

    App.setLayout = function (mode){
        switch (mode) {
            case 'panel':
                $('body').removeClass("fixed");
                $('#panel-region').removeClass("mainpanel");
            break;
            case 'fixed':
                $('body').addClass("fixed");
                $('#panel-region').addClass("mainpanel");
            break;
        }
    };

    App.getLangJson = function() {
        var data = {};
        $.ajax({
            url: '../ISO693-1.json',
            async: false,
            dataType: 'json',
            success: function(result) {
                data = result;
            }
        });
        return data;
    };

    App.on("initialize:after", function(){
        App.init();
        // Page Preloader
        jQuery('#status').fadeOut();
        jQuery('#preloader').delay(350).fadeOut(function(){
           jQuery('body').delay(350).css({'overflow':'visible'});
        });
    });

    return App;
});
