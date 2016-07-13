define(["app",
  "tpl!apps/carousel/edit/tpl/carousel-view.tpl"],
function(App, carouselViewTpl) {

  App.module('Carousel.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    
    // Views
    Edit.CarouselView = Marionette.ItemView.extend({
        template: carouselViewTpl,

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.listenTo(this.model, 'change', this.render);
        },  //  /initialize

        onRender: function () {
          // if(this.model.get('id')){
            this.initFormData();
            this.initUI();
          // }
          //   this.initUI();
        },  //  /onRender

        onShow: function () {
          if(!this.model.get('id')){
            this.initEmptyForm();
            this.initUI();
          }
        },

        initUI: function () {
          $('a[href="#basic"]').tab('show');
          $('.wysiwyg').redactor({
            buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist']
          });
        },

        initFormData: function () {
          var self = this;
          $('#title').val(self.model.get('title'));
          $('#action_url').val(self.model.get('action_url'));
          $('#description').val(self.model.get('description'));
          if(this.model.get('photo_large_url')){
            $('.js-carousel-image img').attr('src', this.model.get('photo_large_url'));
          }
          $('#published').toggles({on:self.model.get('published')});
          $('#published').on('toggle', function (e, active) {
            if (active) {
              self.published = true;
            } else {
              self.published = false;
            }
          });
          $('#not_film').toggles({on:self.model.get('not_film')});
          $('#not_film').on('toggle', function (e, active) {
            self.not_film = active;
          });
        },

        initEmptyForm: function () {
          var self = this;
          $('#published').toggles({on:false});
          $('#published').on('toggle', function (e, active) {
            if (active) {
              self.published = true;
            } else {
              self.published = false;
            }
          });
          $('#not_film').toggles({on:false});
          $('#not_film').on('toggle', function (e, active) {
            self.not_film = active;
          });
        },

        events: {
          'click .js-carousel-image': 'showImageUploaderModal',
          'click .js-save': 'saveCarousel'
        },  // /events

        showImageUploaderModal: function (e) {
          var self = this;
          self.updateModel();
          require(["apps/modal/image-upload/image-upload"], function(){
              var config = {
                url: App.apiURL + "video/photo/upload",
                success: function (data, res) {
                  $('#coverphoto').attr('src', res.photo_large_url);
                  self.model.set({
                    'photo_large_url': res.photo_large_url,
                    'photo_medium_url': res.photo_medium_url,
                    'photo_small_url': res.photo_small_url
                  });
                  $('.modal').modal('hide');
                },
                progress: function (file, percentage, bytesent) {
                  // console.log("percent: ", percentage);
                }
              };
              App.trigger("imageupload:show", config);

          });
        }, // showImageUploaderModal

        updateModel: function () {
          this.model.set({
            'title': $('#title').val(),
            'description': $('#description').val(),
            'action_url': $('#action_url').val(),
            'published': this.published,
            'not_film': this.not_film
          });
        },  // updateModel

        saveCarousel: function () {
          jQuery.gritter.add({
            title: 'Saving...',
            class_name: 'growl-warning',
          });
          var self = this;
          self.updateModel();
          this.model.save({},{
            success: function () {
              jQuery.gritter.add({
                title: 'Carousel Image Saved',
                class_name: 'growl-success',
               });
              App.navigate('carousel/'+self.carousel_type+'/'+self.model.get('id'));
            },
            error: function () {
              jQuery.gritter.add({
                title: 'Error: Save Carousel Image',
                text: 'An error has occured while saving',
                class_name: 'growl-danger',
               });
            }
          });
        } // saveCarousel
    
    }); // /Carousel.Edit.View
  });   // /App.module

  return;

});