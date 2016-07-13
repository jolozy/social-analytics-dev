define(["app",
    "tpl!apps/channel/playlist/tpl/playlist-view.tpl",
    "tpl!apps/channel/playlist/tpl/playlist-iv.tpl",
    "tpl!apps/channel/playlist/tpl/playlist-new-video-view.tpl",
    "tpl!apps/channel/playlist/tpl/playlist-video-view.tpl",
    "redactor", "jquery-ui", "time-picker", "toggles"],
  function(App, playlistListView, playlistItemView, playlistNewVideoView, playlistVideoView) {

    App.module('Channel.EditPlaylist', function (Edit, App, Backbone, Marionette, $, _) {

      Edit.ChannelVideoItemView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: playlistItemView,
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
          'click .js-btn-edit': 'editPlaylistVideo',
          'click .js-btn-delete': 'deletePlaylistVideo'
        },

        editPlaylistVideo: function () {
          var playlist_id = this.model.get("collection_id");
          if (!playlist_id) {
            playlist_id = this.model.get("playlist_id");
          }
          Edit.Controller.showChannelVideoView(this.channel_id, this.edition_id, playlist_id, this.model);
        },

        deletePlaylistVideo: function () {
          if(confirm('Are you sure you want to delete this?')) {
            var edition_playlist = this.model;
            var playlist_id = this.model.get("collection_id");
            if (!playlist_id) {
              playlist_id = this.model.get("playlist_id");
            }
            edition_playlist.deleteChannelVideo(this.channel_id, this.edition_id, playlist_id);
          }
        }
      });

      Edit.PlaylistFormView = Marionette.CompositeView.extend({
        template: playlistListView,
        itemView: Edit.ChannelVideoItemView,
        itemViewContainer: '.js-playlist-videos-container',

        initialize: function(options) {
          this.channel_id = options.channel_id;
          this.edition_id = options.edition_id;
          this.channel_url = options.channel_url;
          this.edition_url = options.edition_url;
          this.model.bind("change", this.initFormData, this);
          this.listenTo(this.model, 'change', this.initFormData);

          this.order = null;
        },  //  /initialize

        onRender: function () {
        },  //  /onRender

        buildItemView: function(item, ItemView){
          var view = new ItemView({
            model: item,
            channel_id: parseInt(this.channel_id),
            edition_id: parseInt(this.edition_id),
            playlist_id: this.model.get('id')
          });
          return view;
        },

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
          $('#friendly_url').val(this.model.get('friendly_url'));
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

          if (this.model.get('description')) {
            $('#description_long').redactor('set', this.model.get('description'));
          }

          // For link back to channel
          $('#editions_link').attr('href', '#channel/'+this.channel_id+'/editions/'+this.edition_id);

          // For sorting videos
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
              self.order = null;
              $('.js-sort-published-date').removeClass('fa-sort-asc');
              $('.js-sort-published-date').removeClass('fa-sort-desc');
              $('.js-sort-published-date').addClass(' fa-sort')
            }
          });

        },

        events: {
          'keyup #friendly_url': 'friendlyUrlKeyUp',
          'keyup #title': 'playlistTitleKeyUp',
          'click .js-new-playlist-video-btn': 'newPlaylistVideoClicked',
          'click .js-upload-coverphoto': 'uploadCoverphoto',
          'click .js-save': 'savePlaylist',
          'click .js-new-sponsor': 'newSponsor',
          'click .js-delete-sponsor': 'deleteSponsor',
          'click .js-delete': 'deletePlaylist',
          'click .js-publish-all': 'publishAllVideo',
          'click .js-sort-published-date': 'sortPublishedDate',
        },  // /events

        friendlyUrlKeyUp: function (e) {
          this.updatePreviewURL();
        },

        playlistTitleKeyUp: function(e) {
          var titleKeyed = $('#title').val();
          var titleStripped = titleKeyed.replace(/[^a-z0-9]+/gi, '').toLowerCase();
          $('#friendly_url').val(titleStripped);
          this.updatePreviewURL();
        },

        updatePreviewURL: function () {
          var friendly_url = $('#friendly_url').val();
          var preview_url = "https://www.viddsee.com/" + this.channel_url + '/' + this.edition_url + "#" + friendly_url;
          $('.js-preview-url').val(preview_url);
        },

        deletePlaylist: function (e) {
          if(confirm('Are you sure you want to delete this?')) {
            jQuery.gritter.add({
              title: 'Deleted',
              class_name: 'growl-danger'
            });
            this.model.destroy();
            App.trigger("channelv2:edition:edit", this.channel_id, this.edition_id);
          }
        },

        publishAllVideo: function () {
            this.collection.each(function(video) {
                video.set({
                    'published': true
                });
                video.save();
            })
        },

        sortPublishedDate: function () {
            var self = this;
            self.carousel_order = [];
            if (self.order === null) {
                this.collection.setComparator('asc').sort();
                self.order = 'asc';
                $('.js-sort-published-date').removeClass('fa-sort');
                $('.js-sort-published-date').addClass(' fa-sort-asc')
            } else if (self.order === 'asc') {
                this.collection.setComparator('desc').sort();
                self.order = 'desc';
                $('.js-sort-published-date').removeClass('fa-sort-asc');
                $('.js-sort-published-date').addClass(' fa-sort-desc')
            } else if (self.order === 'desc') {
                this.collection.setComparator('asc').sort();
                self.order = 'asc';
                $('.js-sort-published-date').removeClass('fa-sort-desc');
                $('.js-sort-published-date').addClass(' fa-sort-asc')
            }
            this.collection.each(function(video) {
                self.carousel_order.push(video.get('id'));
            });
            this.collection.trigger('reset');
        },

        reorderCollection: function(data) {
          this.carousel_order = [];
          for(var i = 0; i < data.length; i++) {
            this.carousel_order.push(data[i].id);
          }
        },

        newPlaylistVideoClicked: function (e) {
          var self = this;
          if(this.model.get('id')){
            Edit.Controller.showNewPlaylistVideoView(this.channel_id, this.edition_id, this.model.get('id'), this);
          } else {
            this.savePlaylist(function(){
              Edit.Controller.showNewPlaylistVideoView(self.channel_id, self.edition_id, self.model.get('id'), self);
            });
          }
        },

        updateModel: function () {
          var date = new Date($('.js-published-date').val() + " " + $('.js-published-time').val());
          this.model.set({
            'title': $('#title').val().replace(/"/g, '&quot;'),
            'friendly_url': $('#friendly_url').val(),
            'description': $('#description_long').val(),
            'published': this.published,
            'featured': this.featured,
            'published_date': date,
          });

        },

        savePlaylist: function (callback) {
          var self = this;
          jQuery.gritter.add({
            title: 'Saving...',
            class_name: 'growl-warning',
          });
          this.updateModel();
          this.model.save({}, {
            success: function (playlist) {
              if (self.carousel_order) {
                self.saveVideosOrder();
              }

              jQuery.gritter.add({
                title: 'Saved',
                class_name: 'growl-success',
              });
              App.navigate('playlist/'+self.model.get('id'));
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

        saveVideosOrder: function() {
          var self = this;
          var data = {
            ids: this.carousel_order.join(",")
          };
          var url = App.apiURL + "admin/channel/" + this.channel_id + "/editions/" + this.edition_id + "/playlists/" + this.model.get('id') + "/videos/order";
          $.ajax({
            method: 'POST',
            url: url,
            data: data
          }).done(function(res){
            jQuery.gritter.add({
              title: 'Videos Order Saved',
              text: 'Videos Order has been updated',
              class_name: 'growl-success'
            });
          });
        },

      });

      Edit.NewPlaylistVideoView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade modal-playlist-video-new js-modal-playlist-video-new",
        template: playlistNewVideoView,

        onShow: function () {
          this.initUI();
        },

        initUI: function () {
          var self = this;
          self.initVideoSelect2();
          self.published = false;
          self.initPublishToggle();
        },  // initUI

        initPublishToggle: function () {
          var self = this;
          $('#playlist-video-new-published').toggles({on:self.published});
          $('#playlist-video-new-published').on('toggle', function (e, active) {
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
          'click .js-new-playlist-video-submit-btn': 'submitBtnClicked'
        },  // events

        submitBtnClicked: function (e) {
          e.preventDefault();
          var self = this;
          if (!self.video_id) {
            alert("Please Select a Video before submitting!");
          } else {
            var channel_id = self.model.get('channel_id');
            var data = {
              video_id: self.video_id,
              published: self.published
            };
            self.model.createChannelVideoV2(data, {
              success: function (channel_video) {
                $('.js-modal-playlist-video-new').modal('hide');
                self.playlist_view.collection.reset();
                self.playlist_view.collection.fetch();
              },
              error: function (err) {
                console.log("Error", err);
              }
            });
          }
        } // submitBtnClicked

      }); // Edit.NewChannelVideoView

      Edit.PlaylistVideoView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade modal-playlist-video js-modal-playlist-video",
        template: playlistVideoView,

        onShow: function () {
          this.initUI();
        },

        initialize: function(options) {
          // console.log(options);
        },

        initUI: function () {
          var self = this;
          var video = self.model.get('video');
          self.published = self.model.get('published');
          self.video_id = video.uid;
          self.initPublishToggle();
          $('#playlist-video-title').val(video.title);
        },

        initPublishToggle: function () {
          var self = this;
          $('#playlist-video-published').toggles({on:self.published});
          $('#playlist-video-published').on('toggle', function (e, active) {
            if (active) {
              self.published = true;
            } else {
              self.published = false;
            }
          });
        },

        events: {
          'click .js-playlist-video-submit-btn': 'submitBtnClicked'
        },  // events

        submitBtnClicked: function (e) {
          var self = this;
          e.preventDefault();
          var data = {
            video_id: this.video_id,
            published: this.published
          };
          self.model.submitChannelVideo(data, {
            success: function (channel_video) {
              $('.js-modal-playlist-video').modal('hide');
            },
            error: function (err) {
              console.log("Error", err);
            }
          });
        }, // submitBtnClicked

      });

    });   // /App.module

    return;

  });
