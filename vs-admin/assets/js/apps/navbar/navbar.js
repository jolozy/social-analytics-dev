define(["app",
    "apps/navbar/navbar_controller"
    ],
    function(App, navbarViewTpl){

        App.module("NavBar", function(NavBar, App, Backbone, Marionette, $, _){
            App.on("navbar:show", function(){
                NavBar.Controller.showNavBar();
            });

            App.on("navheader:show", function(){
                NavBar.Controller.showNavHeader();
            });
        });

        return App.NavBar.Controller;
});



