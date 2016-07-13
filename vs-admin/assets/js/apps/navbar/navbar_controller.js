define(["app",
    "apps/navbar/navbar_view",
    "entities/user"],
    function(App, navbarViewTpl){

        App.module("NavBar", function(NavBar, App, Backbone, Marionette, $, _){
            NavBar.Controller = {
                showNavBar: function(){
                    var navBarView = new NavBar.View();
                    App.setLayout("fixed");
                    App.navRegion.show(navBarView);
                },

                showNavHeader: function(){
                    if(localStorage.getItem('first_name') && localStorage.getItem('access_token')){
                        var user = new App.Entities.User();
                        user.set('first_name', localStorage.getItem('first_name'));
                        user.set('last_name', localStorage.getItem('last_name'));
                        user.set('profile_image_url', localStorage.getItem('profile_image_url'));
                        user.set('access_token', localStorage.getItem('access_token'));
                        var navHeaderView = new NavBar.HeaderView({
                            model:user
                        });
                        App.headerRegion.show(navHeaderView);
                    }
                }

            };
            
        });

        return App.NavBar.Controller;
});



