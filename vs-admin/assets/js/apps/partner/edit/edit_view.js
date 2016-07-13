define(["app",
  "tpl!apps/partner/edit/tpl/partner-view.tpl",
  "tpl!apps/partner/edit/tpl/partner-video-iv.tpl",
  "tpl!apps/partner/edit/tpl/partner-video-view.tpl",
  "tpl!apps/partner/edit/tpl/partner-video-new-view.tpl",
  "dropzone", "jquery-ui", "time-picker"],
function(App, PartnerViewTpl, partnerVideoItemView, partnerVideoView, partnerVideoNewView) {

  App.module('Partner.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    
    Edit.PartnerVideoItemView = Marionette.ItemView.extend({
      tagName: 'tr',
      template: partnerVideoItemView,

      initialize: function () {
          this.model.bind("change", this.render, this);
          this.listenTo(this.model, 'change', this.render);
      },

      events: {
        'click .js-btn-edit': 'editPartnerVideo',
        'click .js-btn-delete': 'deletePartnerVideo'
      },

      editPartnerVideo: function () {
        var partner_id = this.model.get("partner_id");
        var partner_video = this.model;
        Edit.Controller.showPartnerVideoView(partner_id, partner_video);
      },

      deletePartnerVideo: function () {
        if(confirm('Are you sure you want to delete this?')) {
          var partner_video = this.model;
          partner_video.deletePartnerVideo();
        }
      }
    });

    // Views
    Edit.PartnerView = Marionette.CompositeView.extend({
        template: PartnerViewTpl,
        itemView: Edit.PartnerVideoItemView,
        itemViewContainer: '.js-partner-videos-container',

        initialize: function () {
          this.model.bind("change", this.initFormData, this);
          this.listenTo(this.model, 'change', this.initFormData);
        },  //  /initialize

        onRender: function () {

        },  //  /onRender

        onShow: function () {
          if(!this.model.get('id')){
            this.initEmptyForm();
          }
            this.initUI();
        },

        initUI: function () {
          $('a[href="#basic"]').tab('show');
          $('.wysiwyg').redactor({
            buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist']
          });
          $('.chosen-select').chosen({'width':'100%','white-space':'nowrap'});
        },

        initFormData: function () {
          var self = this;
          $('#title').val(self.model.get('title'));
          $('#feed_url').val("https://www.viddsee.com/feed/"+self.model.get('uid'));
          $('#description').redactor('set',this.model.get('description'));
          if(this.model.get('photo_large_url')){
            $('#coverphoto').attr('src', this.model.get('photo_large_url'));
          }
          $('#published').toggles({on:self.model.get('published')});
          $('#published').on('toggle', function (e, active) {
            if (active) {
              self.published = true;
            } else {
              self.published = false;
            }
          });

          var published_date = new Date(self.model.get('published_date'));
          $('.js-published-date').datepicker();
          $('.js-published-date').datepicker('setDate', published_date);
          $('.js-published-time').timepicker();

          var hours = published_date.getHours() > 12 ? (published_date.getHours() % 12) : published_date.getHours();
          var ampm = published_date.getHours() >= 12 ? 'PM' : 'AM';
          var minutes = published_date.getMinutes();
          var time_string = hours + ":" + minutes + " " + ampm;
          $('.js-published-time').timepicker('setTime', time_string);

        },

        initEmptyForm: function () {
          var self = this;
          $('.js-published-date').datepicker();
          $('.js-published-date').datepicker('setDate', new Date());
          $('.timepicker').timepicker();
          $('#published').toggles({on:false});
          $('#published').on('toggle', function (e, active) {
            if (active) {
              self.published = true;
            } else {
              self.published = false;
            }
          });
        },

        events: {
          'click .js-save': 'savePartner',
          'click .js-new-partner-video-btn': 'newPartnerVideoClicked',
          'click .js-delete': 'deletePartner'
        },  // /events

        updateModel: function () {
          var date = new Date($('.js-published-date').val() + " " + $('.js-published-time').val());
          this.model.set({
            'title': $('#title').val(),
            'description': $('#description').val(),
            'published': this.published,
            'published_date': date
          });
        },

        savePartner: function (e) {
          var self = this;
          this.updateModel();
          this.model.save({}, {
            success: function (partner) {
                jQuery.gritter.add({
                  title: 'Saved',
                  class_name: 'growl-success',
                 });
                App.navigate('partner/'+self.model.get('id'));
                if(callback){
                  callback();
                }
              },
              error: function () {
                jQuery.gritter.add({
                  title: 'Error',
                  text: 'An error has occured while saving',
                  class_name: 'growl-danger',
                 });
              }
          });
        },

        deletePartner: function (e) {
          if(confirm('Are you sure you want to delete this?')) {
            jQuery.gritter.add({
              title: 'Deleted',
              class_name: 'growl-danger',
             });
            this.model.destroy();
            App.trigger("partner:list");
          }
        },

        newPartnerVideoClicked: function () {
          var self = this;
          if(self.model.get('id')){
            Edit.Controller.showNewPartnerVideoView(self.model.get('id'), self);
          } else {
            self.savePartner(function(){
              Edit.Controller.showNewPartnerVideoView(self.model.get('id'), self);
            });
          }
          
        },
    
    }); // /Partner.Edit.View

    Edit.PartnerVideoView = Marionette.ItemView.extend({
      tagName: "div",
      className: "modal fade modal-partner-video js-modal-partner-video",
      template: partnerVideoView,

      onShow: function () {
        $('.wysiwyg').redactor({
            buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist', 'html']
          });

        this.initUI();
      },

      initUI: function () {
        var self = this;
        var video = self.model.get('video');
        self.published = self.model.get('published');
        self.video_id = video.uid;
        self.initPublishToggle();
        $('#partner-video-id').val(video.title + " (" + video.directors[0].name + ")");
        $('#partner-video-title').val(self.model.get('title'));
        $('#partner-video-description').redactor('set', self.model.get('description'));
        $('.img-preview').attr('src', self.model.get('photo_large_url'));

        $('.dropzone').dropzone({
          url: App.apiURL + "video/photo/upload",
          method: "POST",
          maxFiles: 1,
          paramName: "file",
          init: function () {
            this.on("success", function (data, res){
              $('.img-preview').attr('src', res.photo_large_url);
              self.model.set({
                'photo_large_url': res.photo_large_url,
                'photo_medium_url': res.photo_medium_url,
                'photo_small_url': res.photo_small_url
              });
            });
            // this.on("uploadprogress", config.progress);
          }
        });

        var published_date = new Date(self.model.get('published_date'));
        self.$el.find('.js-published-date').datepicker();
        self.$el.find('.js-published-date').datepicker('setDate', published_date);
        self.$el.find('.js-published-time').timepicker();

        var hours = published_date.getHours() > 12 ? (published_date.getHours() % 12) : published_date.getHours();
        var ampm = published_date.getHours() >= 12 ? 'PM' : 'AM';
        var minutes = published_date.getMinutes();
        var time_string = hours + ":" + minutes + " " + ampm;
        self.$el.find('.js-published-time').timepicker('setTime', time_string);
      },

      initPublishToggle: function () {
        var self = this;
        $('#partner-video-published').toggles({on:self.published});
        $('#partner-video-published').on('toggle', function (e, active) {
          if (active) {
            self.published = true;
          } else {
            self.published = false;
          }
        });
      },

      events: {
        'click .js-partner-video-submit-btn': 'submitBtnClicked'
      },  // events

      submitBtnClicked: function (e) {
        var self = this;
        e.preventDefault();
        var date = new Date(self.$el.find('.js-published-date').val() + " " + self.$el.find('.js-published-time').val());
        var data = {
          video_id: this.video_id,
          published: this.published,
          title: $('#partner-video-title').val(),
          description: $('#partner-video-description').val(),
          published_date: date
        };
        self.model.submitPartnerVideo(data, {
          success: function (partner_video) {
            $('.js-modal-partner-video').modal('hide');
          },
          error: function (err) {
            console.log("Error", err);
          }
        });
      }, // submitBtnClicked

    }); // Edit.PartnerVideoView

    Edit.NewPartnerVideoView = Marionette.ItemView.extend({
      tagName: "div",
      className: "modal fade modal-partner-video-new js-modal-partner-video-new",
      template: partnerVideoNewView,

      onShow: function () {
        this.initUI();
      },

      initUI: function () {
        var self = this;
        self.initVideoSelect2();
        self.published = false;
        self.initPublishToggle();

        
        $('.wysiwyg').redactor({
            buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist', 'html']
          });

        $('.dropzone').dropzone({
          url: App.apiURL + "video/photo/upload",
          method: "POST",
          maxFiles: 1,
          paramName: "file",
          init: function () {
            this.on("success", function (data, res){
              $('.img-preview').attr('src', res.photo_large_url);
              self.model.set({
                'photo_large_url': res.photo_large_url,
                'photo_medium_url': res.photo_medium_url,
                'photo_small_url': res.photo_small_url
              });
            });
            // this.on("uploadprogress", config.progress);
          }
        });

        self.$el.find('.datepicker').datepicker();
        self.$el.find('.datepicker').datepicker('setDate', new Date());
        self.$el.find('.timepicker').timepicker();
      },  // initUI

      initPublishToggle: function () {
        var self = this;
        $('#partner-video-new-published').toggles({on:false});
        $('#partner-video-new-published').on('toggle', function (e, active) {
          if (active) {
            self.published = true;
          } else {
            self.published = false;
          }
        });
      },

      initVideoSelect2: function () {
        var self = this;
        $('.js-select-video').select2({
            placeholder: "Select a video",
            minimumInputLength: 2,
            ajax: {
                url: App.apiURL + "admin/search",
                quietMillis: 500,
                data: function (term, page) {
                    return {
                        search_string: term, // search term
                        current_page: 0,
                        per_page: 20
                    };
                },
                results: function (data, page) {
                    var results = data.videos.map(function (v){
                        return {id:v.id, text:v.title + " (" + v.id + ")"};
                    });
                    return {results: results};
                }
            }
        }).on("change", function () {
            self.video_id = this.value;
        });
      },  // initVideoSelect2

      events: {
        'click .js-new-partner-video-submit-btn': 'submitBtnClicked'
      },  // events

      submitBtnClicked: function (e) {
        e.preventDefault();
        var self = this;
        if(!self.video_id){
          alert("Please Select a Video before submitting!");
        } else {
          var partner_id = self.model.get('partner_id');
          var date = new Date(self.$el.find('.js-published-date').val() + " " + self.$el.find('.js-published-time').val());
          var data = {
            video_id: self.video_id,
            published: self.published,
            title: $('#partner-video-title').val(),
            description: $('#partner-video-description').val(),
            published_date: date
          };
          self.model.submitPartnerVideo(data, {
            success: function (partner_video) {
              $('.js-modal-partner-video-new').modal('hide');
              self.partner_view.collection.add(partner_video);
            },
            error: function (err) {
              console.log("Error", err);
            }
          });
        }
      }, // submitBtnClicked

    }); // Edit.NewPartnerVideoView
  });   // /App.module

  return;

});
