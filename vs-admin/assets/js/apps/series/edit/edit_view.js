define(["app",
  "tpl!apps/series/edit/tpl/series-view.tpl",
  "tpl!apps/series/edit/tpl/season-itemview.tpl",
  "redactor", "jquery-ui", "time-picker", "toggles"],
function(App, seriesEditFormTpl, seasonItemViewTpl) {

  App.module('Series.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    
    // Views
    Edit.SeasonItemView = Marionette.ItemView.extend({
      tagName: "tr",
      className: "",
      // id: this.model.get('id'),
      template: seasonItemViewTpl,

      initialize: function () {
  	    this.model.bind("change", this.render, this);
  	    this.listenTo(this.model, 'change', this.render);
  	  },  //  /initialize

  	  events: {
  	    'click .js-btn-edit': 'editSeason',
        'click .js-btn-delete': 'deleteSeason'
  	  },  // /events

      editSeason: function (e) {
        e.preventDefault();
        this.trigger("edit:season", this.model.get("series_id"), this.model.get('id'));
      },

      deleteSeason: function (e) {
        e.preventDefault();
        if(confirm('Are you sure you want to delete this?')) {
          this.model.urlRoot = App.apiURL + "admin/series/" + this.model.get("series_id") + "/season";
          this.model.destroy({
            success: function () {
              jQuery.gritter.add({
                title: 'Season Deleted',
                class_name: 'growl-success'
              });
            }
          });
        }
      }

    }); // Edit.SeasonItemView

    Edit.FormView = Marionette.CompositeView.extend({
      template: seriesEditFormTpl,
      itemView: Edit.SeasonItemView,
      itemViewContainer: '.js-seasons-list-container',

      initialize: function () {
        this.model.bind("change", this.initFormData, this);
        this.listenTo(this.model, 'change', this.initFormData);
      },  //  /initialize

      onRender: function () {
        if(this.model.get('id')){
          this.initFormData();
        }

        this.initUI();
      },  //  /onRender

      onShow: function () {
        if(!this.model.get('id')){
          this.initEmptyForm();
        }

        this.initUI();
      },

      events: {
        'keyup #series_url': 'seriesUrlKeyUp',
        'keyup #title': 'seriesTitleKeyUp',
        'click .js-upload-photo': 'uploadCoverphoto',
        'click .js-btn-new': 'newSeason',
        'click .js-save-btn': 'saveSeriesClicked',
        'click .js-discard-btn': 'discardChanges',
        'click .js-delete-btn': 'deleteSeries'
      },  // /events

      initUI: function () {
        $('a[href="#basic"]').tab('show');
        $('.wysiwyg').redactor({
          buttons: ['bold', 'italic' ,'|', 'link', 'unorderedlist', 'orderedlist']
        });
        /*var self = this;
        var table = $('.sortable').sortable({
          containerSelector: 'table',
          itemPath: '> tbody',
          itemSelector: 'tr',
          placeholder: '<tr class="placeholder"/>',
          handle: "i.fa-arrows",
          onDrop: function ($item, container, _super, event) {
            $item.removeClass("dragged").removeAttr("style");
            $("body").removeClass("dragging");
            var data = table.sortable("toArray");
            console.log(data);
            // self.reorderCollection(data[0]);
          }
        });*/
      },

      initEmptyForm: function () {
        var self = this;

        $('.datepicker').datepicker({dateFormat: "dd/mm/yy"});
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

      initFormData: function () {
        $('#title').val(this.model.get('title'));
        $('#series_url').val(this.model.get('url'));
        this.updatePreviewURL();

        var published_date = new Date(this.model.get('published_date'));
        $('.js-published-date').datepicker({dateFormat: "dd/mm/yy"});
        $('.js-published-date').datepicker('setDate', published_date);
        $('.js-published-time').timepicker();

        var hours = published_date.getHours() > 12 ? (published_date.getHours() % 12) : published_date.getHours();
        var ampm = published_date.getHours() >= 12 ? 'PM' : 'AM';
        var minutes = published_date.getMinutes();
        var time_string = hours + ":" + minutes + " " + ampm;
        $('.js-published-time').timepicker('setTime', time_string);

        var self = this;
        $('#published').toggles({on:this.model.get('published')});
        $('#published').on('toggle', function (e, active) {
          if (active) {
            self.published = true;
          } else {
            self.published = false;
          }
        });

        $('#description_long').redactor('set',this.model.get('description_long'));
        if (this.model.get('photo_large_url') !== "") {
          $('#coverphoto').attr('src', this.model.get('photo_large_url'));
        }
      },

      updatePreviewURL:function() {
        var channel_url = $('#series_url').val();
        var preview_url = "https://www.viddsee.com/series/" + channel_url;
        $('.js-preview-url').val(preview_url);
      },

      seriesUrlKeyUp: function (e) {
        this.updatePreviewURL();
      },

      seriesTitleKeyUp: function(e) {
        var titleKeyed = $('#title').val();
        var titleStripped = titleKeyed.replace(/[^a-z0-9]+/gi, '').toLowerCase();
        $('#series_url').val(titleStripped);
        this.updatePreviewURL();
      },

      uploadCoverphoto: function(e) {
        var self = this;
        if(this.model.get('id')){
          self.showImageUploaderModal();
        } else {
          self.saveSeries(function(){
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
                self.model.set({
                  'photo_large_url': res.photo_large_url,
                  'photo_medium_url': res.photo_medium_url,
                  'photo_small_url': res.photo_small_url
                });
                self.saveSeries(function() {
                  $('.modal').modal('hide');
                });
              },
              progress: function (file, percentage, bytesent) {
                // console.log("percent: ", percentage);
              }
            };
            App.trigger("imageupload:show", config);

        });
      },

      reorderCollection: function (data) {
        for(var i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
      },

      newSeason: function(e) {
        e.preventDefault();
        var self = this;
        this.saveSeries(function() {
          App.Series.EditSeason.Controller.newSeason(self.model.get('id'));
        });
      },

      discardChanges: function(e) {
        e.preventDefault();
        App.trigger('series:list');
      },

      saveSeriesClicked: function(e) {
        e.preventDefault();
        this.saveSeries();
      },

      saveSeries: function(callback) {
        var publishedDate = $('.js-published-date').val();
        var date;
        if (publishedDate === "") {
          date = new Date();
        } else {
          var split = publishedDate.split('/');
          publishedDate = [split[1], split[0], split[2]].join('/');
          date = new Date(publishedDate + " " + $('.js-published-time').val());
        }

        var series = this.model;

        series.set({
          'url': $('#series_url').val(),
          'title': $('#title').val(),
          'description_long': $('#description_long').val(),
          'published': this.published,
          'published_date': date
        });

        series.save({}, {
          success: function () {
            jQuery.gritter.add({
              title: 'Series Saved',
              class_name: 'growl-success'
            });
            if(callback){
              callback();
            } else {
              App.navigate('series/'+series.get("id"));
            }
          }
        });
      },

      deleteSeries: function(e) {
        e.stopPropagation();
        e.preventDefault();
        if(confirm('Are you sure you want to delete this?')) {
          var series = this.model;
          series.destroy({
            success: function () {
              jQuery.gritter.add({
                title: 'Series Deleted',
                class_name: 'growl-success'
              });
              App.trigger('series:list');
            }
          });
        }
      }    
    }); // /Series.Edit.View
  });   // /App.module

  return;

});