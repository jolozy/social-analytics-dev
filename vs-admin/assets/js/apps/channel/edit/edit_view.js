define(["app",
  "tpl!apps/channel/edit/tpl/channel-view.tpl",
  "tpl!apps/channel/edit/tpl/channel-edition-iv.tpl",
  "tpl!apps/channel/edit/tpl/channel-edition-new-view.tpl",
  "redactor", "jquery-ui", "chosen", "time-picker",
        "toggles"],
function(App, channelView, channelEditionItemView, channelEditionNewView) {

  App.module('Channel.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    
    // Views
    Edit.ChannelEditionItemView = Marionette.ItemView.extend({
      tagName: 'tr',
      template: channelEditionItemView,
      attributes: function () {
        return {
          'data-id': this.model.get('id')
        };
      },

      initialize: function(options) {
        this.channel_id = options.channel_id;
        this.model.bind("change", this.render, this);
        this.listenTo(this.model, 'change', this.render);
      },

      onRender: function() {
      },

      events: {
        'click .js-btn-edit': 'editChannelEdition',
        'click .js-btn-delete': 'deleteChannelEdition'
      },

      editChannelEdition: function () {
        var channel_id = this.channel_id;
        var edition_id = this.model.get("id");
        var channel_url = $('#channel_url').data('channel_url');
        this.trigger("edit:edition", channel_id, edition_id, channel_url);
      },

      deleteChannelEdition: function() {
        if(confirm('Are you sure you want to delete this?')) {
          var channel_edition = this.model;
          channel_edition.deleteChannelEdition(this.channel_id);
        }
      }
    });

    Edit.ChannelView = Marionette.CompositeView.extend({
      template: channelView,
      itemView: Edit.ChannelEditionItemView,
      itemViewContainer: '.js-channel-editions-container',

      buildItemView: function(item, ItemView){
        var view = new ItemView({
          model: item,
          channel_id: this.model.get('id'),
        });
        return view;
      },

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

      initEmptyForm: function () {
        var self = this;

        $('.datepicker').datepicker();
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
        $('#featured').toggles({on:false});
        $('#featured').on('toggle', function (e, active) {
          if (active) {
            self.featured = true;
          } else {
            self.featured = false;
          }
        });
        var sponsor_html = "";
        sponsor_html += self.getSponsorAddBtnHtml();
        $('.js-gallery').html(sponsor_html);
      },

      initFormData: function () {
        var self = this;
        $('#title').val(this.model.get('title'));
        $('#channel_url').val(this.model.get('channel_url'));
        $('#channel_url').data('channel_url', this.model.get('channel_url'));
        this.updatePreviewURL();

        $('#published').toggles({on:this.model.get('published')});
        $('#published').on('toggle', function (e, active) {
          if (active) {
            self.published = true;
          } else {
            self.published = false;
          }
        });

        $('#featured').toggles({on:this.model.get('featured')});
        $('#featured').on('toggle', function (e, active) {
          if (active) {
            self.featured = true;
          } else {
            self.featured = false;
          }
        });

        var published_date = new Date(this.model.get('published_date'));
        $('.js-published-date').datepicker();
        $('.js-published-date').datepicker('setDate', published_date);
        $('.js-published-time').timepicker();

        var hours = published_date.getHours() > 12 ? (published_date.getHours() % 12) : published_date.getHours();
        var ampm = published_date.getHours() >= 12 ? 'PM' : 'AM';
        var minutes = published_date.getMinutes();
        var time_string = hours + ":" + minutes + " " + ampm;
        $('.js-published-time').timepicker('setTime', time_string);

        $('#description_long').redactor('set',this.model.get('description_long'));
        $('#website_url').val(this.model.get('website_url'));
        $('#fb_page_url').val(this.model.get('fb_page_url'));
        $('#tw_handle').val(this.model.get('tw_handle'));
        $('#tw_hashtag').val(this.model.get('tw_hashtag'));

        // Photos
        $('#coverphoto').attr('src', this.model.get('photo_large_url'));
        var sponsors = this.model.get('sponsors');
        var sponsor_html = "";
        if(sponsors){
          sponsors.forEach(function (sponsor) {
            sponsor_html += self.getSponsorImageHtml(sponsor);
          });
        }
        sponsor_html += self.getSponsorAddBtnHtml();
        $('.js-gallery').html(sponsor_html);

        jQuery('.thmb').hover(function(){
          var t = jQuery(this);
          t.find('.fm-group').show();
        }, function() {
          var t = jQuery(this);
          if(!t.closest('.thmb').hasClass('checked')) {
            t.find('.fm-group').hide();
          }
        });

        // For sorting editions
        var table = $('.sortable').sortable({
          containerSelector: 'table',
          itemPath: '> tbody',
          itemSelector: 'tr',
          placeholder: '<tr class="placeholder"/>',
          handle: "i.fa-arrows",
          onDrop: function ($item, container, _super, event) {
            $item.removeClass("dragged").removeAttr("style");
            $("body").removeClass("dragging");
            var data = table.sortable("serialize").get();
            self.reorderCollection(data[0]);
          }
        });
      },

      events: {
        'keyup #channel_url': 'channelUrlKeyUp',
        'keyup #title': 'channelTitleKeyUp',
        'click .js-new-channel-edition-btn': 'newChannelEditionClicked',
        'click .js-upload-coverphoto': 'uploadCoverphoto',
        'click .js-save': 'saveChannel',
        'click .js-new-sponsor': 'newSponsor',
        'click .js-delete-sponsor': 'deleteSponsor',
        'click .js-delete': 'deleteChannel'
      },  // /events

      channelUrlKeyUp: function (e) {
        this.updatePreviewURL();
      },

      channelTitleKeyUp: function(e) {
        var titleKeyed = $('#title').val();
        var titleStripped = titleKeyed.replace(/[^a-z0-9]+/gi, '').toLowerCase();
        $('#channel_url').val(titleStripped);
        this.updatePreviewURL();
      },

      updatePreviewURL: function () {
        var channel_url = $('#channel_url').val();
        var preview_url = "https://www.viddsee.com/" + channel_url;
        $('.js-preview-url').val(preview_url);
      },

      deleteChannel: function (e) {
        if(confirm('Are you sure you want to delete this?')) {
          jQuery.gritter.add({
            title: 'Deleted',
            class_name: 'growl-danger',
          });
          this.model.destroy();
          App.trigger("channel:list");
        }
      },

      reorderCollection: function(data) {
        this.carousel_order = [];
        for(var i = 0; i < data.length; i++) {
          this.carousel_order.push(data[i].id);
        }
      },

      newChannelEditionClicked: function (e) {
        var self = this;
        if(this.model.get('id')){
          Edit.Controller.showNewChannelEditionView(this.model.get('id'), this.model.get('friendly_url'), this);
        } else {
          this.saveChannel(function(){
            Edit.Controller.showNewChannelEditionView(self.model.get('id'), this.model.get('friendly_url'), self);
          });
        }
      },

      uploadCoverphoto: function(e) {
        var self = this;
        if(this.model.get('id')){
          self.showImageUploaderModal();
        } else {
          this.saveChannel(function(){
            self.showImageUploaderModal();
          });
        }
      },

      showImageUploaderModal: function () {
        var self = this;
        require(["apps/modal/image-upload/image-upload"], function(){
          var config = {
            url: App.apiURL + "video/photo/upload",
            success: function (data, res) {
              $('#coverphoto').attr('src', res.photo_large_url);
              self.model.set('photo_large_url', res.photo_large_url);
              self.model.set('photo_medium_url', res.photo_medium_url);
              self.model.set('photo_small_url', res.photo_small_url);
              self.model.save();
              $('.modal').modal('hide');
            },
            progress: function (file, percentage, bytesent) {
              // console.log("percent: ", percentage);
            }
          };
          App.trigger("imageupload:show", config);

        });
      },

      updateModel: function () {
        var date = new Date($('.js-published-date').val() + " " + $('.js-published-time').val());
        $('#channel_url').data('channel_url', $('#channel_url').val());
        this.model.set({
          'title': $('#title').val().replace(/"/g, '&quot;'),
          'channel_url': $('#channel_url').val(),
          'description_long': $('#description_long').val(),
          'website_url': $('#website_url').val(),
          'fb_page_url': $('#fb_page_url').val(),
          'tw_handle': $('#tw_handle').val(),
          'tw_hashtag': $('#tw_hashtag').val(),
          'published': this.published,
          'featured': this.featured,
          'published_date': date,
        });

      },

      saveChannel: function (callback) {
        var self = this;
        jQuery.gritter.add({
          title: 'Saving...',
          class_name: 'growl-warning',
        });
        this.updateModel();
        this.model.save({}, {
          success: function (channel) {
            if (self.carousel_order) {
              self.saveEditionsOrder();
            }

            jQuery.gritter.add({
              title: 'Saved',
              class_name: 'growl-success',
            });
            App.navigate('channel/'+self.model.get('id'));
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

      saveEditionsOrder: function() {
        var self = this;
        var data = {
          ids: this.carousel_order.join(",")
        };
        var url = App.apiURL + "admin/channel/" + this.model.get('id') + "/editions/order";
        $.ajax({
          method: 'POST',
          url: url,
          data: data
        }).done(function(res){
          jQuery.gritter.add({
            title: 'Editions Order Saved',
            text: 'Editions Order has been updated',
            class_name: 'growl-success'
          });
        });
      },

      // Sponsor Images
      newSponsor: function (e) {
        if(this.model.get('id')){
          this.showSponsorUploaderModal();
        } else {
          this.saveChannel(function(){
            this.showSponsorUploaderModal();
          });
        }
      },

      showSponsorUploaderModal: function () {
        var self = this;
        require(["apps/modal/image-upload/image-upload"], function(){
          var headers = {
            'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
          };
          var config = {
            headers: headers,
            url: App.apiURL + "admin/channel/" + self.model.get('id') + "/sponsor",
            success: function (data, res) {
              var sponsor = res;
              var sponsors = self.model.get('sponsors');
              sponsors.push(sponsor);
              self.model.set('sponsors', sponsors);
              self.initFormData();
              jQuery.gritter.add({
                title: 'Sponsor Uploaded',
                class_name: 'growl-success',
              });
              $('.modal').modal('hide');
            },
            progress: function (file, percentage, bytesent) {
              // console.log("percent: ", percentage);
            }
          };
          App.trigger("imageupload:show", config);

        });
      },

      deleteSponsor: function (e) {
        if(confirm('Are you sure you want to delete this?')) {
          var sponsor_id = $(e.currentTarget).attr('data-sponsor-id');
          var self = this;
          $.ajax({
            method: 'DELETE',
            url: App.apiURL + "admin/channel/" + self.model.get('id') + "/sponsor/" + sponsor_id,
          }).done(function(res){
            jQuery.gritter.add({
              title: 'Sponsor Deleted',
              class_name: 'growl-success'
            });
            var sponsors = self.model.get('sponsors');
            for (var i = 0; i < sponsors.length; i++){
              if(sponsors[i].id == sponsor_id)
                sponsors.splice(i,1);
            }
            self.model.set('sponsors', sponsors);
            // self.model.save();
            self.initFormData();
          });
        }
      },

      getSponsorImageHtml: function (sponsor) {
        var html = '';
        html += '<div class="col-xs-6 col-sm-4 col-md-3 image">';
        html += '  <div class="thmb">';
        html += '    <div class="btn-group fm-group">';
        html += '        <button type="button" class="btn btn-default dropdown-toggle fm-toggle" data-toggle="dropdown">';
        html += '          <span class="caret"></span>';
        html += '        </button>';
        html += '        <ul class="dropdown-menu fm-menu" role="menu">';
        html += '          <li><a class="js-delete-sponsor" data-sponsor-id="'+sponsor.id+'"><i class="fa fa-trash-o"></i> Delete</a></li>';
        html += '        </ul>';
        html += '    </div><!-- btn-group -->';
        html += '    <div class="thmb-prev">';
        html += '      <a href="'+sponsor.original_image_url+'" data-rel="prettyPhoto">';
        html += '        <img src="'+sponsor.original_image_url+'" class="img-responsive" alt="" />';
        html += '      </a>';
        html += '    </div>';
        html += '  </div><!-- thmb -->';
        html += '</div><!-- col-xs-6 -->';

        return html;
      },

      getSponsorAddBtnHtml: function () {
        var html = ' <a class="col-lg-3 col-md-4 col-sm-6">';
        html    += '   <div class="card-new itemview-image js-new-sponsor">';
        html    += '     <i class="fa fa-plus"></i>';
        html    += '   </div>';
        html    += ' </a>';

        return html;
      }
    });

    Edit.NewChannelEditionView = Marionette.ItemView.extend({
      tagName: "div",
      className: "modal fade modal-channel-edition-new js-modal-channel-edition-new",
      template: channelEditionNewView,

      onShow: function () {
        this.initUI();
      },

      initUI: function () {
        var self = this;
        self.published = false;
        self.initPublishToggle();
      },  // initUI

      initPublishToggle: function () {
        var self = this;
        $('#channel-edition-new-published').toggles({on:self.published});
        $('#channel-edition-new-published').on('toggle', function (e, active) {
          if (active) {
            self.published = true;
          } else {
            self.published = false;
          }
        });
      },

      events: {
        'click .js-new-channel-edition-submit-btn': 'submitBtnClicked'
      },  // events

      submitBtnClicked: function (e) {
        e.preventDefault();
        var self = this;
        var data = {
          title: $('#edition-name').val(),
          published: self.published
        };
        this.model.createChannelEdition(data, {
          success: function (channel_edition) {
            $('.js-modal-channel-edition-new').modal('hide');
            self.channel_view.collection.add(channel_edition);
          },
          error: function (err) {
            console.log("Error", err);
          }
        });
      } // submitBtnClicked

    });


  });   // /App.module

  return;

});
