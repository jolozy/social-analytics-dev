define(["app", "tpl!apps/submission/edit/tpl/submission-view.tpl",
  "tpl!apps/submission/edit/tpl/submission-reject-form.tpl", 
  "tpl!apps/submission/edit/tpl/submission-moreinfo-form.tpl",
  "gritter", "pretty-photo"],
  function(App, submissionEditFormTpl, submissionRejectFormTpl, submissionMoreInfoFormTpl) {

    App.module('Submission.Edit', function (Edit, App, Backbone, Marionette, $, _) {
      Edit.RejectFormItemView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'modal fade',
        template: submissionRejectFormTpl,

        initialize: function () {
            
        },
        onShow: function () {
          this.$el.modal('show');

        },
        onRender: function () {
          
        },
        events: {
          'click .js-rejection-message-submit-btn': 'sendRejectMessage',
          'click .js-cancel-rejection-message': 'cancelRejectMessage'
        },

        sendRejectMessage: function() {
          var view = this;
          var message = $('#reject-message').val();
          var submission = this.model;
          var url = App.apiURL + "admin/submitvideo/" + submission.get('id') + "/rejection_message";
          var data = {
            message: message
          };
          $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function () {
              view.$el.modal('hide');
              view.$el.on('hidden.bs.modal', function (e) {
                view.trigger('submission:rejection:sent');
              });
            },
            error: function (err) {
              console.log(err);
              jQuery.gritter.add({
                title: 'Error Saving',
                text: err.responseText,
                class_name: 'growl-danger'
              });
            }
          });
        },

        cancelRejectMessage: function() {
          App.trigger('submission:edit', this.model.get('id'));
        }
      });

      Edit.MoreInfoFormItemView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'modal fade',
        template: submissionMoreInfoFormTpl,

        initialize: function () {
            
        },
        onShow: function () {
          this.$el.modal('show');

        },
        onRender: function () {
          
        },
        events: {
          'click .js-moreinfo-submit-btn': 'sendMoreInfoMessage'
        },

        sendMoreInfoMessage: function() {
          var view = this;
          var message = $('#moreinfo-message').val();
          this.$el.modal('hide');
          this.$el.on('hidden.bs.modal', function (e) {
            view.trigger('submission:moreinfo:send', message);
          });
        }
      });

      Edit.FormView = Marionette.CompositeView.extend({
        template: submissionEditFormTpl,
        tagName: 'div',
        className: '',
        initialize: function () {
            this.model.bind("change", this.render, this);
            this.listenTo(this.model, 'change', this.render);
        },
        onShow: function () {
        },
        onRender: function () {
          if(this.model.get('id')){
            $('form input, form textarea').attr('readonly', 'readonly');
            this.initFormData();
            $('.js-pretty-photo').prettyPhoto({
              social_tools: ''
            });
          }
          
          $('.js-submission-tabs a:first').tab('show');
        },
        events: {
          'click .js-update-status': 'updateSubmissionStatus'
        },

        initFormData: function () {
          this.setstatus();
          //Basic
          $('#video_file_source_url').attr('src', this.model.get('video_file_url'));
          $('#video-download-link').attr('href', this.model.get('video_file_url'));
          // add customised save as name
          var filename = this.model.get('title');
          var re = /(?:\.([^.]+))?$/;
		  var ext = re.exec(this.model.get('video_file_url'))[1];
		  if (ext) {
		  	filename = filename + "." + ext;
		  }
		  $('#video-download-link').attr('download', filename);
          $('#video_file_url_alt').val(this.model.get('video_file_url_alt'));
          $('#alt_file_credentials').val(this.model.get('alt_file_credentials'));

          $('#title').val(_.unescape(this.model.get('title')));
          $('#year').val(this.model.get('year'));
          $('#description_short').val(this.model.get('description_short'));
          $('#description_long').val(this.model.get('description_long'));
          $('#directors').val(this.model.get('directors'));
          $('#cast').val(this.model.get('cast'));
          $('#crew').val(this.model.get('crew'));
          $('#festivals').html(this.model.get('festivals'));

          $('#country').val(this.model.get('country'));
          $('#language').val(this.model.get('language'));
          $('#subtitle-language').val(this.model.get('subtitle_language'));
          $('#genres').val(this.model.get('genres'));
          $('#topics').val(this.model.get('topics'));
          $('#tags').val(this.model.get('meta_tags'));
          $('#period').val(this.model.get('period'));
          $('#content_rating').val(this.model.get('content_rating'));

          $('#website_url').val(this.model.get('website_url'));
          $('#fb_page_url').val(this.model.get('fb_page_url'));
          $('#tw_handle').val(this.model.get('tw_handle'));
          $('#tw_hashtag').val(this.model.get('tw_hashtag'));

          //Images
          if (this.model.get('gallery_images').length == 0) {
            $('.gallery, #images h2:last').hide();
          } else {
            var addGalleryPhoto = function(value, key) {
              var gallery_entry = $('<div class="col-xs-6 col-sm-4 col-md-3 image">' +
                '<div class="thmb">' +
                  '<div class="thmb-prev">' +
                    '<a href="' + value.image.image_file_url + '" data-rel="prettyPhoto" class="js-pretty-photo">' +
                      '<img src="' + value.image.image_file_url + '" class="img-responsive" alt="" />' +
                    '</a>' +
                  '</div>' +
                  '<h5 class="fm-title"><a href="' + value.image.image_file_url + '" class="js-pretty-photo">' + value.image.image_file_url.split("/").pop() + '</a></h5>' +
                  '<small class="text-muted">Added: ' + value.created_at + '</small>' +
                '</div>' +
              '</div>');
              $('.gallery').append(gallery_entry);
            }
            _.each(this.model.get('gallery_images'), addGalleryPhoto);
          }

          //Creator
          $('#creator_name').val(this.model.get('user').name);
          $('#creator_email').val(this.model.get('user').email);
          $('#referral').val(this.model.get('referral'));
          $('#rights_third_party').toggles({on:this.model.get('rights_general'), click: false, drag: false});
          $('#rights_monetisation').toggles({on:this.model.get('rights_advertising'), click: false, drag: false});
          $('#premiere').toggles({on:this.model.get('premiere'), click: false, drag: false});

          //Translation
          if (this.model.get('alt_language')) {
            $('.js-alt-language').val(this.getLanguageFromCode(this.model.get('alt_language')));
          }
        },

        getLanguageFromCode: function(code) {
          var lang = App.getLangJson();
          if (lang[code]) {
            return lang[code].name;
          }
          return 'No Language Found';
        },

        setstatus: function() {
          var status = this.model.get('status');
          if (status === 'approved' || status === 'rejected') {
            $('.js-update-status').hide();
          }

          var statusText;
          switch (status) {
            case 'approved':
              statusText = 'Approved';
              $('.submission-status').addClass('btn-success-alt');
              break;
            case 'moreinfo':
              statusText = 'More info';
              $('.submission-status').addClass('btn-primary-alt');
              break;
            case 'fasttrack':
              statusText = 'Film License Submitted';
              $('.submission-status').addClass('btn-primary-alt');
              break;
            case 'incomplete':
              statusText = 'Incomplete';
              $('.submission-status').addClass('btn-default-alt');
              break;
            case 'rejected':
              statusText = 'Rejected';
              $('.submission-status').addClass('btn-danger-alt');
              break;
            default:
              statusText = 'Under Review';
              $('.submission-status').addClass('btn-warning-alt');
          }

          $('.submission-status').text(statusText);
        },

        updateSubmissionStatus: function(e) {
          e.stopPropagation();
          e.preventDefault();
          var id = this.model.get("id");
          var status = e.target.attributes['href'].value.substring(1);

          if (status === 'approve') {
            var submissionString = localStorage.getItem('readSubmissions');
            if (submissionString) {
              var submissions = JSON.parse(submissionString);
              var index = submissions.indexOf(this.model.get('id'));
              if (index !== -1) {
                submissions.splice(index, 1);
                localStorage.setItem('readSubmissions', JSON.stringify(submissions));
              }
            }
          }

          if (status == 'moreinfo') {
            if(confirm('Request for more information from film maker?')) {
              this.trigger("submission:moreinfo");
            }
          } else if (status == 'reject') {
            if(confirm('Reject this submission?')) {
              this.onUpdateSubmission(status, "");
            }
          } else {
            if (confirm('Approve this submission?')) {
              this.onUpdateSubmission(status, "");
            }
          }
        },

        onUpdateSubmission: function(status, submit_message) {
          jQuery.gritter.add({
            title: 'Updating submission status',
            text: 'This will change the status of this submission to "'+ status + '"'
          });
          var view = this;
          this.trigger("submission:update", status, submit_message, {
            success: function () {
              jQuery.gritter.add({
                title: 'Updating success',
                class_name: 'growl-success'
              });
              if (status == 'reject') {
                view.trigger("submission:reject");
              } else {
                App.trigger('submission:edit', view.model.get('id'));
              }
            },
            error: function () {
              jQuery.gritter.add({
                title: 'Error saving',
                class_name: 'growl-danger'
              });
            }
          });
        }
      }); //Edit.FormView

    }); // App.module

  return ;
});
