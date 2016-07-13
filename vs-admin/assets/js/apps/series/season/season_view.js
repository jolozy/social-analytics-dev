define(["app",
  "tpl!apps/series/season/tpl/video-itemview.tpl",
  "tpl!apps/series/season/tpl/videos-listview.tpl",
  "tpl!apps/series/season/tpl/season-video-edit-modal.tpl",
  "tpl!apps/series/season/tpl/season-video-new-modal.tpl",
  "jquery-ui", "time-picker", "toggles", "select2"],
function(App, videoItemViewTpl, videosListViewTpl, seasonVideoEditModalTpl, seasonVideoNewModalTpl) {

  App.module('Series.EditSeason', function (EditSeason, App, Backbone, Marionette, $, _) {

    EditSeason.NewVideoFormItemView = Marionette.ItemView.extend({
        template: seasonVideoNewModalTpl,
        tagName: 'div',
        className: 'modal fade modal-season-video-new',
        attributes: {
            "data-backdrop": "static"
        },

        initialize: function () {
            
        },
        onShow: function () {
          this.$el.modal('show');
          this.initForm();
        },
        onRender: function () {
          
        },
        events: {
            'click .js-btn-save': 'saveEdit',
            'click .js-btn-cancel': 'cancelEdit'
        },

        initForm: function() {
            var self = this;
            $('.toggle').toggles();
            $('.toggle').on('toggle', function (e, active) {
                if (active) {
                  self.published = true;
                } else {
                  self.published = false;
                }
            });
            $('#video_id').select2({
                placeholder: "Select a video",
                ajax: {
                    url: App.apiURL + "admin/search",
                    data: function (term, page) {
                        return {
                            search_string: term, // search term
                            current_page: 0,
                            per_page: 20
                        };
                    },
                    results: function (data, page) {
                        var results = data.videos.map(function (v){
                            return {id:v.id, text:v.title};
                        });
                        return {results: results};
                    }
                }
            }).on("change", function () {
                self.video_id = this.value;
                $('#title').val($('span.select2-chosen').text());
            });
        },
        saveEdit: function(e) {
            e.preventDefault();
            $('.error').remove();

            var self = this;

            if (!self.video_id) {
                $('#choose_video .col-sm-7').append('<label for="video_id" class="error">This field is required.</label>');
            } else {
                var date = new Date();

                this.model.set({
                    'title': $('#title').val(),
                    'video_id': self.video_id,
                    'video_index': self.options.video_index,
                    'published': this.published,
                    'published_date': date
                });

                this.model.save({}, {
                    success: function(season_video) {
                        jQuery.gritter.add({
                          title: 'Video Added',
                          class_name: 'growl-success'
                        });
                        self.$el.modal('hide');
                        self.$el.on('hidden.bs.modal', function (e) {
                            App.modalRegion.close();
                        });
                        self.options.collection.add(season_video);
                        // App.trigger('series:season:edit', self.options.series_id, self.options.season_id);
                    },
                    error: function() {
                        jQuery.gritter.add({
                          title: 'Error adding video',
                          class_name: 'growl-danger'
                        });
                    }
                });
            }
            // this.trigger("form:submit");
        },
        cancelEdit: function(e) {
            e.preventDefault();
            this.trigger("form:cancel");
        }
    });

    EditSeason.EditVideoFormItemView = Marionette.ItemView.extend({
        template: seasonVideoEditModalTpl,
        tagName: 'div',
        className: 'modal fade modal-season-video',
        attributes: {
            "data-backdrop": "static"
        },

        initialize: function () {
            
        },
        onShow: function () {
          this.$el.modal('show');
          this.initFormData();
        },
        onRender: function () {
          this.initFormData();
        },
        events: {
            'click .js-btn-save': 'saveEdit',
            'click .js-btn-cancel': 'cancelEdit',
            'click .js-btn-delete': 'deleteSeasonVideo',
            'click .js-edit-video': 'editVideo'
        },

        initFormData: function() {
            var self = this;
            $('#title').val(this.model.get('title'));
            $('#description_long').val(this.model.get('description_long'));
            $('.modal #published').toggles({on:this.model.get('published')});
            $('.modal #published').on('toggle', function (e, active) {
                if (active) {
                  self.published = true;
                } else {
                  self.published = false;
                }
            });
        },

        saveEdit: function(e) {
            e.preventDefault();

            this.model.set({
                'title': $('#title').val(),
                'description_long': $('#description_long').val(),
                'published': this.published
            });

            var self = this;
            this.model.save({}, {
                success: function () {
                    jQuery.gritter.add({
                      title: 'Season Video Saved',
                      class_name: 'growl-success'
                    });
                    App.modalRegion.close();
                    self.trigger("video:save");
                }
            });
        },

        cancelEdit: function(e) {
            e.preventDefault();
            App.modalRegion.close();
        },

        deleteSeasonVideo: function(e) {
            e.preventDefault();
            if(confirm('Are you sure you want to delete this?')) {
                this.trigger("video:delete", this.model);
            }
        },

        editVideo: function(e) {
            e.preventDefault();
            var video_id;
            if (this.model.get('video_id') != '') {
                video_id = this.model.get('video_id');
            } else {
                video_id = this.model.get('video').id;
            }
            App.trigger('video:edit', video_id);
            App.modalRegion.close();
        }
    });
    
    EditSeason.VideoItemView = Marionette.ItemView.extend({
        template: videoItemViewTpl,
        tagName: "tr",
        className: "",
        attributes: function () {
          return {
            'data-id': this.model.get('id')
          };
        },

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.listenTo(this.model, 'change', this.render);
        },
        onShow: function () {
          // this.$el.attr('data-id', this.model.get('video').id);
        },
        onRender: function () {
          // this.$el.attr('data-id', this.model.get('video').id);
        },
        events: {
          'click .js-btn-edit': 'editSeasonVideo',
          'click .js-btn-delete': 'deleteSeasonVideo'
        },

        editSeasonVideo: function (e) {
          e.preventDefault();
          this.trigger('video:edit', this.model);
        },

        deleteSeasonVideo: function (e) {
          e.preventDefault();
          var self = this;
          if(confirm('Are you sure you want to delete this?')) {
              this.trigger("video:delete", this.model);
          }
        }

    }); //EditSeason.SeriesItemView

    EditSeason.VideoListView = Marionette.CompositeView.extend({
        template: videosListViewTpl,
        
        itemView: EditSeason.VideoItemView,
        itemViewContainer: '.js-videos-list-container',
        itemViewOptions: function(model,index){
            return{
                 indexInCollection: index
            };
        },

        initialize: function () {
            this.model.bind("change", this.initFormData, this);
            this.listenTo(this.model, 'change', this.initFormData);
        },

        onRender: function () {
            if(this.model.get('id')){
                this.initFormData();
            } else {
                this.initEmptyForm();
            }
        },

        onShow: function () {
            if(this.model.get('id')){
                this.initFormData();
            } else {
                this.initEmptyForm();
            }

            $('.js-season-tabs a:first').tab('show');
        },

        events: {
          'click .js-btn-new': 'newSeasonVideo',
          'click .js-save-btn': 'saveSeasonClicked',
          'click .js-discard-btn': 'discardChanges',
          'click .js-delete-btn': 'deleteSeason'
        },

        initFormData: function() {
            var self = this;
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
            $('#series_link').attr('href', '#series/'+this.model.get('series_id'));
            $('#season_index').val(this.model.get('season_index'));
            var published_date = new Date(this.model.get('published_date'));
            $('.js-published-date').datepicker({dateFormat: "dd/mm/yy"});
            $('.js-published-date').datepicker('setDate', published_date);
            $('.js-published-time').timepicker();

            var hours = published_date.getHours() > 12 ? (published_date.getHours() % 12) : published_date.getHours();
            var ampm = published_date.getHours() >= 12 ? 'PM' : 'AM';
            var minutes = published_date.getMinutes();
            var time_string = hours + ":" + minutes + " " + ampm;
            $('.js-published-time').timepicker('setTime', time_string);

            $('#published').toggles({on:this.model.get('published')});
            $('#published').on('toggle', function (e, active) {
                if (active) {
                  self.published = true;
                } else {
                  self.published = false;
                }
            });
        },

        initEmptyForm: function() {
            var self = this;
            $('.toggle').toggles();
            $('.toggle').on('toggle', function (e, active) {
                if (active) {
                  self.published = true;
                } else {
                  self.published = false;
                }
            });
        },

        onVideoDeleted: function() {
            var data = $('.sortable').sortable("serialize").get();
            if (data[0].length) {
                this.reorderCollection(data[0]);
                this.saveVideosOrder();
            }
        },

        reorderCollection: function(data) {
            this.carousel_order = [];
            for(var i = 0; i < data.length; i++) {
              this.carousel_order.push(data[i].id);
            }
        },

        newSeasonVideo: function(e) {
            e.preventDefault();
            var self = this;
            this.saveSeason(function() {
                self.trigger('video:new');
            });
        },

        discardChanges: function(e) {
            e.preventDefault();
            App.trigger('series:edit', this.model.get('series_id'));
        },

        saveSeasonClicked: function(e) {
            e.preventDefault();
            this.saveSeason();
        },

        saveSeason: function(callback) {
            var self = this;
            var publishedDate = $('.js-published-date').val();
            var date;
            if (publishedDate == "") {
              var date = new Date();
            } else {
              var split = publishedDate.split('/');
              publishedDate = [split[1], split[0], split[2]].join('/');
              date = new Date(publishedDate + " " + $('.js-published-time').val());
            }

            this.model.set({
                'season_index': $('#season_index').val(),
                'published': this.published,
                'published_date': date
            });
            
            this.model.save({}, {
                success: function() {
                    jQuery.gritter.add({
                      title: 'Season Updated',
                      class_name: 'growl-success'
                    });
                    if (callback) {
                        callback();
                    } else {
                        if(self.carousel_order){
                            self.saveVideosOrder();
                        } else {
                            App.trigger('series:season:edit', self.model.get("series_id"), self.model.get("id"));
                        }
                    }
                }
            });
        },

        saveVideosOrder: function() {
            var self = this;
            var data = {
              ids: this.carousel_order.join(",")
            };
            var url = App.apiURL + "admin/series/" + this.model.get("series_id") + "/season/" + this.model.get('id') + "/videos/order";
            $.ajax({
                method: 'POST',
                url: url,
                data: data
            }).done(function(res){
                jQuery.gritter.add({
                  title: 'Episodes Order Saved',
                  text: 'Episodes Order has been updated',
                  class_name: 'growl-success',
                 });
                App.trigger('series:season:edit', self.model.get("series_id"), self.model.get("id"));
            });
        },

        deleteSeason: function(e) {
            e.preventDefault();
            if(confirm('Are you sure you want to delete this?')) {
                var series_id = this.model.get("series_id");
                this.model.urlRoot = App.apiURL + "admin/series/" + series_id + "/season";
                this.model.destroy({
                  success: function () {
                    jQuery.gritter.add({
                      title: 'Season Deleted',
                      class_name: 'growl-success'
                    });
                    App.trigger('series:edit', series_id);
                  }
                });
            }
        }
    });

  });   // /App.module

  return;

});