define(["app",
    "tpl!apps/channel/edition/tpl/edition-view.tpl",
    "tpl!apps/channel/edition/tpl/edition-iv.tpl",
    "tpl!apps/channel/edition/tpl/edition-new-playlist.tpl",
    "redactor", "jquery-ui", "time-picker", "toggles"],
  function(App, editionListView, editionItemView, editionNewPlaylistView) {

    App.module('Channel.EditEdition', function (Edit, App, Backbone, Marionette, $, _) {

      Edit.ChannelPlaylistItemView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: editionItemView,
        attributes: function () {
          return {
            'data-id': this.model.get('id')
          };
        },

        initialize: function(options) {
          this.channel_id = options.channel_id;
          this.edition_id = options.edition_id;
          this.model.bind("change", this.render, this);
          this.listenTo(this.model, 'change', this.render);
        },

        events: {
          'click .js-btn-edit': 'editEditionPlaylist',
          'click .js-btn-delete': 'deleteEditionPlaylist'
        },

        editEditionPlaylist: function () {
          var playlist_id = this.model.get("collection").id;
          if (!playlist_id) {
            playlist_id = this.model.id;
          }
          var edition_url = $('#friendly_url').data('edition_url');
          var channel_url = $('#friendly_url').data('channel_url');
          this.trigger("edit:playlist", this.channel_id, this.edition_id, playlist_id, channel_url, edition_url);
        },

        deleteEditionPlaylist: function () {
          if(confirm('Are you sure you want to delete this?')) {
            var edition_playlist = this.model;
            edition_playlist.deleteEditionPlaylist(this.channel_id, this.edition_id);
          }
        }
      });

      // Views
      Edit.EditionFormView = Marionette.CompositeView.extend({
        template: editionListView,
        itemView: Edit.ChannelPlaylistItemView,
        itemViewContainer: '.js-edition-playlists-container',

        initialize: function(options) {
          this.channel_id = options.channel_id;
          this.channel_url = options.channel_url;
          this.model.bind("change", this.initFormData, this);
          this.listenTo(this.model, 'change', this.initFormData);
        },  //  /initialize

        buildItemView: function(item, ItemView){
          var view = new ItemView({
            model: item,
            channel_id: parseInt(this.channel_id),
            channel_url: this.channel_url,
            edition_id: this.model.get('id')
          });
          return view;
        },

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

          // For the new metadata string
          var metaData = {};
          if (this.model.get('metadata')) {
            metaData = JSON.parse(this.model.get('metadata'));
          }

          $('#title').val(this.model.get('title'));
          $('#friendly_url').val(this.model.get('friendly_url'));
          $('#friendly_url').data('channel_url', this.channel_url);
          $('#friendly_url').data('edition_url', this.model.get('friendly_url'));
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

          var links = {};
          if (metaData.links) {
            metaData.links.forEach(function(link) {
              links[link.type] = link.url;
            });
          }

          $('#description_long').redactor('set',this.model.get('description'));
          $('#website_url').val(links.website);
          $('#fb_page_url').val(links.facebook);
          $('#tw_handle').val(links.twitter);
          // $('#tw_hashtag').val(this.model.get('tw_hashtag'));

          // Photos
          $('#coverphoto').attr('src', this.model.get('photo_large_url'));
          var sponsors = metaData.sponsor_images;
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

          // For link back to channel
           $('#channels_link').attr('href', '#channel/'+this.channel_id);

          // For sorting playlists
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
          'keyup #friendly_url': 'friendlyUrlKeyUp',
          'keyup #title': 'editionTitleKeyUp',
          'click .js-new-edition-playlist-btn': 'newEditionPlaylistClicked',
          'click .js-upload-coverphoto': 'uploadCoverphoto',
          'click .js-save': 'saveEdition',
          'click .js-new-sponsor': 'newSponsor',
          'click .js-delete-sponsor': 'deleteSponsor',
          'click .js-delete': 'deleteEdition'
        },  // /events

        friendlyUrlKeyUp: function (e) {
          this.updatePreviewURL();
        },

        editionTitleKeyUp: function(e) {
          var titleKeyed = $('#title').val();
          var titleStripped = titleKeyed.replace(/[^a-z0-9]+/gi, '').toLowerCase();
          $('#friendly_url').val(titleStripped);
          this.updatePreviewURL();
        },

        updatePreviewURL: function () {
          var friendly_url = $('#friendly_url').val();
          var preview_url = "https://www.viddsee.com/" + this.channel_url + "/" + friendly_url;
          $('.js-preview-url').val(preview_url);
        },

        deleteEdition: function (e) {
          if(confirm('Are you sure you want to delete this?')) {
            jQuery.gritter.add({
              title: 'Deleted',
              class_name: 'growl-danger'
            });
            this.model.destroy();
            App.trigger("channelv2:edit", this.channel_id);
          }
        },

        reorderCollection: function(data) {
          this.carousel_order = [];
          for(var i = 0; i < data.length; i++) {
            this.carousel_order.push(data[i].id);
          }
        },

        newEditionPlaylistClicked: function (e) {
          var self = this;
          if(this.model.get('id')){
            Edit.Controller.showNewEditionPlaylistView(this.channel_id ,this.model.get('id'), this);
          } else {
            this.saveEdition(function(){
              Edit.Controller.showNewEditionPlaylistView(self.channel_id, self.model.get('id'), self);
            });
          }
        },

        uploadCoverphoto: function(e) {
          var self = this;
          if(this.model.get('id')){
            self.showImageUploaderModal();
          } else {
            this.saveEdition(function(){
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
          var website = $('#website_url').val();
          var facebook = $('#fb_page_url').val();
          var twitter = $('#tw_handle').val();

          var metadata = this.model.get('metadata');
          if (!metadata) {
            metadata = {};
          } else {
            metadata = JSON.parse(metadata);
          }

          if (!metadata.links) {
            metadata.links = [];
            metadata.links.push({ type: 'website', url: website });
            metadata.links.push({ type: 'facebook', url: facebook });
            metadata.links.push({ type: 'twitter', url: twitter });
          } else {
            var links = {};
            links['website'] = website;
            links['facebook'] = facebook;
            links['twitter'] = twitter;
            metadata.links = [];
            for (type in links) {
              metadata.links.push({ type: type, url: links[type] });
            }
          }

          $('#friendly_url').data('edition_url', $('#friendly_url').val());
          this.model.set({
            'title': $('#title').val().replace(/"/g, '&quot;'),
            'friendly_url': $('#friendly_url').val(),
            'description': $('#description_long').val(),
            'published': this.published,
            'featured': this.featured,
            'published_date': date,
            'metadata': JSON.stringify(metadata)
          });

        },

        saveEdition: function (callback) {
          var self = this;
          jQuery.gritter.add({
            title: 'Saving...',
            class_name: 'growl-warning',
          });
          this.updateModel();
          this.model.save({}, {
            success: function (edition) {
              if (self.carousel_order) {
                self.savePlaylistsOrder();
              }

              jQuery.gritter.add({
                title: 'Saved',
                class_name: 'growl-success',
              });
              App.navigate('edition/'+self.model.get('id'));
              if(callback){
                callback();
              }
            },
            error: function () {
              jQuery.gritter.add({
                title: 'Error',
                text: 'An error has occured while saving',
                class_name: 'growl-danger'
              });
            }
          });
        },

        savePlaylistsOrder: function() {
          var self = this;
          var data = {
            ids: this.carousel_order.join(",")
          };
          var url = App.apiURL + "admin/channel/" + this.channel_id + "/editions/" + this.model.get('id') + "/playlists/order";
          $.ajax({
            method: 'POST',
            url: url,
            data: data
          }).done(function(res){
            jQuery.gritter.add({
              title: 'Playlists Order Saved',
              text: 'Playlists Order has been updated',
              class_name: 'growl-success'
            });
          });
        },

        // Sponsor Images
        newSponsor: function (e) {
          if(this.model.get('id')){
            this.showSponsorUploaderModal();
          } else {
            this.saveEdition(function(){
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
              url: App.apiURL + "upload",
              success: function (data, res) {

                var metadata = self.model.get('metadata');
                if (!metadata) {
                  metadata = {};
                } else {
                  metadata = JSON.parse(metadata);
                }
                if (metadata.sponsor_images == undefined) {
                  metadata.sponsor_images = [];
                }
                metadata.sponsor_images.push({url: res.url});

                self.model.set('metadata', JSON.stringify(metadata));
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
            var image_url = $(e.target).attr('data-image-url');
            var substring_image_url = image_url.substring(image_url.lastIndexOf('/') + 1, image_url.lastIndexOf('.'));
            var self = this;
            $.ajax({
              method: 'DELETE',
              url: App.apiURL + "admin/channel/" + this.channel_id + "/editions/" + self.model.get('id') + "/sponsor/" + substring_image_url,
            }).done(function(res){
              jQuery.gritter.add({
                title: 'Sponsor Deleted',
                class_name: 'growl-success'
              });
              var metadata = self.model.get('metadata');
              metadata = JSON.parse(metadata);
              for (var i = 0; i < metadata.sponsor_images.length; i++) {
                  if (metadata.sponsor_images[i].url == image_url) {
                      metadata.sponsor_images.splice(i, 1);
                  }
              }
              self.model.set('metadata', JSON.stringify(metadata));
              self.model.save();
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
          html += '          <li><a class="js-delete-sponsor" data-image-url="' + sponsor.url + '"><i class="fa fa-trash-o"></i> Delete</a></li>';
          html += '        </ul>';
          html += '    </div><!-- btn-group -->';
          html += '    <div class="thmb-prev">';
          html += '      <a href="' + sponsor.url + '" data-rel="prettyPhoto">';
          html += '        <img src="' + sponsor.url + '" class="img-responsive" alt="" />';
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

      Edit.NewEditionPlaylistView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade modal-edition-playlist-new js-modal-edition-playlist-new",
        template: editionNewPlaylistView,

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
          $('#edition-playlist-new-published').toggles({on:self.published});
          $('#edition-playlist-new-published').on('toggle', function (e, active) {
            if (active) {
              self.published = true;
            } else {
              self.published = false;
            }
          });
        },

        events: {
          'click .js-new-edition-playlist-submit-btn': 'submitBtnClicked'
        },  // events

        submitBtnClicked: function (e) {
          e.preventDefault();
          var self = this;
          var data = {
            title: $('#playlist-name').val(),
            published: self.published
          };
          this.model.createChannelPlaylist(data, {
            success: function (edition_playlist) {
              console.log(edition_playlist);
              $('.js-modal-edition-playlist-new').modal('hide');
              self.edition_view.collection.add(edition_playlist);
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
