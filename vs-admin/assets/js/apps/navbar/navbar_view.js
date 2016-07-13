define(["app",
    "tpl!apps/navbar/tpl/navbar-view.tpl",
    "tpl!apps/navbar/tpl/navheader-view.tpl",],
    function(App, navbarViewTpl, navHeaderViewTpl){

        App.module("NavBar", function(NavBar, App, Backbone, Marionette, $, _){
            NavBar.View = Marionette.CompositeView.extend({
                tagName: "nav",
                template: navbarViewTpl,
                className: "leftpanel",

                // Events
                events:{
                },

                onShow: function () {
                    var selected;
                    var currentRoute = App.getCurrentRoute().split('/');
                    if (currentRoute.length > 1) {
                      selected = currentRoute[0] + 's';
                    } else {
                      selected = currentRoute[0];
                    }
                    jQuery('.leftpanel li a[href="#' + selected + '"]').parent().addClass('active');
                    jQuery('.leftpanel .nav-parent > a').on('click', function() {
                       $('.leftpanel li').removeClass("active");
                       var parent = jQuery(this).parent();
                       var sub = parent.find('> ul');
                       
                       // Dropdown works only when leftpanel is not collapsed
                       if(!jQuery('body').hasClass('leftpanel-collapsed')) {
                          if(sub.is(':visible')) {
                             sub.slideUp(200, function(){
                                parent.removeClass('nav-active');
                                jQuery('.mainpanel').css({height: ''});

                             });
                          } else {
                             closeVisibleSubMenu();
                             parent.addClass('nav-active');
                             sub.slideDown(200, function(){

                             });
                          }
                       }
                       return false;
                    });

                    jQuery('.leftpanel li > a').not('.nav-parent > a').on('click', function() {
                      var parent = jQuery(this).parent();
                      $('.leftpanel li').removeClass("active");
                      parent.addClass("active");
                    });

                    function closeVisibleSubMenu() {
                       jQuery('.leftpanel .nav-parent').each(function() {
                          var t = jQuery(this);
                          if(t.hasClass('nav-active')) {
                             t.find('> ul').slideUp(200, function(){
                                t.removeClass('nav-active');
                             });
                          }
                       });
                    }
                }

            }); // NavBar.View

            NavBar.HeaderView = Marionette.CompositeView.extend({
                tagName: "div",
                template: navHeaderViewTpl,
                className: "headerbar",

                // Events
                events:{
                    "click .js-menutoggle": "toggleMenu",
                    "click .js-logout": "logout",
                },

                onShow: function () {
                  if (this.model.get('first_name') == 'Nikki' && this.model.get('last_name') == 'Loke') {
                    this.$el.find('.dropdown-toggle').append('<span class="member-gold-badge" title="This member has Viddsee Admin Gold."></span>');
                  }
                },

                toggleMenu: function () {
                    var body = jQuery('body');
                    var bodypos = body.css('position');

                    if(bodypos != 'relative') {
                      
                      if(!body.hasClass('leftpanel-collapsed')) {
                        body.addClass('leftpanel-collapsed');
                        jQuery('.nav-bracket ul').attr('style','');
                         
                        jQuery(this).addClass('menu-collapsed');
                         
                      } else {
                        body.removeClass('leftpanel-collapsed chat-view');
                        jQuery('.nav-bracket li.active ul').css({display: 'block'});
                         
                        jQuery(this).removeClass('menu-collapsed');
                         
                      }
                    } else {
                      
                      if(body.hasClass('leftpanel-show'))
                         body.removeClass('leftpanel-show');
                      else
                         body.addClass('leftpanel-show');
                      
                      // adjustmainpanelheight();         
                    }
                },  // toggleMenu()

                logout: function () {
                    localStorage.clear();
                    window.location.href = '/logout';
                }
            }); //NavBar.HeaderView
        });

        return App.NavBar.Controller;
});



