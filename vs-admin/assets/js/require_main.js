requirejs.config({
    baseUrl: "/vs-admin/assets/js",
    paths: {
        backbone: "vendor/backbone-min",
        jquery: "vendor/jquery",
        "bootstrap": "vendor/bootstrap.min",
        json2: "vendor/json2",
        underscore: "vendor/underscore",
        marionette: "vendor/backbone.marionette",
        localstorage: "vendor/backbone.localStorage-min",
        "backbone.syphon": "vendor/backbone.syphon.min",
        "backbone.paginator": "vendor/backbone.paginator",
        cookies: "vendor/jquery.cookies",
        tpl: "vendor/tpl",
        "redactor": "vendor/redactor.min",
        "jquery-ui": "vendor/jquery-ui-1.10.4.min",
        "masked-input": "vendor/jquery.maskedinput.min",
        "chosen": "vendor/chosen.jquery.min",
        "time-picker": "vendor/bootstrap-timepicker.min",
        "toggles": "vendor/toggles.min",
        "tagsinput": "vendor/bootstrap-tagsinput.min",
        "dropzone": "vendor/dropzone.min",
        "select2": "vendor/select2",
        "gritter": "vendor/jquery.gritter.min",
        "pretty-photo": "vendor/jquery.prettyPhoto",
        "sortable": "vendor/jquery-sortable-min",
        "fileupload": "vendor/bootstrap-fileupload.min",
        "moment": "vendor/moment.min",
        "helpers": "helpers",
        "custom":"custom",
        "chartist": "vendor/chartist",
        "chartist-tooltip": "vendor/chartist-plugin-tooltip"
    },

    shim: {
        underscore :{
            exports: "_"
        },

        backbone: {
            deps: ["jquery", "underscore", "json2", "bootstrap"],
            exports: "Backbone"
        },

        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },

        localstorage: ["backbone"],
        "bootstrap": ['jquery'],
        "backbone.syphon": ["backbone"],
        "backbone.paginator": ["backbone"],
        cookies:["jquery"],
        'helpers': ['jquery'],
        'custom': ['jquery', 'cookies'],
        'gritter': ["jquery"],
        'pretty-photo': ["jquery"],
        'redactor': ["jquery"],
        'select2': ["jquery"],
        'jquery-ui': ["jquery"],
        'masked-input': ["jquery"],
        'chosen': ["jquery"],
        'time-picker': ["jquery"],
        'toggles': ["jquery"]
    }
});

require(["app", "router"], function(App) {
    App.start();
});
