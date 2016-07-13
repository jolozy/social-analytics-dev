define(["app",
    "tpl!apps/account/tpl/signin-view.tpl"],
    function(App, signinViewTpl){
    App.module("Account", function(Account, App, Backbone, Marionette, $, _){
        
        // Views
        Account.SigninViewTpl = Marionette.CompositeView.extend({
            tagName: "div",
            template: signinViewTpl,
            className: "signinpanel",

            onShow: function() {
                var d = new Date();
                var n = d.getFullYear();
                $('.year').text(n);
            }
        });

        // Controller
        Account.Controller = {
            showSignIn: function(){
                var signInView = new Account.SigninViewTpl();
                App.setLayout("panel");
                App.panelRegion.show(signInView);
            },  // showSignIn

            validateAccountDetails: function(email, password, callback){
                // Email Field must be Valid
                if (!isEmailValid(email) || email == '') {
                    callback('Please Enter a Valid Email');
                    return;
                }
                // Password Field must be filled
                if (password == '') {
                    callback('  Please enter a Password');
                    return;
                }
                callback();
            },  // validateAccountDetails
        };

        // Listeners

        App.on("signin:show", function(){
            Account.Controller.showSignIn();
        });
        
    });

    return App.Account.Controller;
});



