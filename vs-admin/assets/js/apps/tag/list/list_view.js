define(["app",
    "tpl!apps/tag/list/tpl/tag-view.tpl",
    "tpl!apps/tag/list/tpl/tag-itemview.tpl",
    "tpl!apps/tag/list/tpl/modal-edit-tag.tpl",
    "tpl!apps/tag/list/tpl/modal-edit-localisations.tpl", "chosen"],
  function(App, tagViewTpl, tagItemViewTpl, editTagModalTpl, editTagLocalisationModalTpl) {

    App.module('Tag.List', function (List, App, Backbone, Marionette, $, _) {
      // Views
      List.TagItemView = Marionette.ItemView.extend({
        template: tagItemViewTpl,
        tagName: 'tr',

        events: {

        },

        onShow: function() {

        }
      }); //List.SubmissionItemView

      List.TagView = Marionette.CompositeView.extend({
        template: tagViewTpl,

        itemView: List.TagItemView,
        itemViewContainer: '.js-tag-list',

        initialize: function () {
          if (this.collection) {
            this.collection.bind("reset", _.bind(this.render, this));
          }
        },

        onRender: function () {
          if (this.collection) {
            this.initUI();
          }
        },

        onShow: function () {
          if (this.collection) {
            this.initUI();
          }
        },

        initUI: function () {
          var total_pages = this.collection.totalPages;
          var current_page = this.collection.currentPage;
          var pages_in_range = this.collection.pagesInRange;
          this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);

          switch(this.collection.tag_type){
            case 'genre':
              $('.js-tab-genre').addClass('active');
              break;
            case 'topic':
              $('.js-tab-topic').addClass('active');
              break;
            case 'country':
              $('.js-tab-country').addClass('active');
              break;
            case 'badge':
              $('.js-tab-badge').addClass('active');
              break;
            case 'language':
              $('.js-tab-language').addClass('active');
              break;
            case 'all':
              $('.js-tab-all').addClass('active');
              break;
            default:
              $('.js-tab-all').addClass('active');
          }
        },

        events: {
          'click .js-page': 'goToPageClicked',
          'click .js-submission-tab': 'goToSubmissionStatusTabClicked',
          'click .js-tag-edit': 'showEditModal',
          'click .js-tag-edit-localisation': 'showLocalisationModal'
        },

        showEditModal: function(e) {
          e.preventDefault();
          List.Controller.showEditTagModalView($(e.currentTarget).data('id'));
        },

        showLocalisationModal: function(e) {
          e.preventDefault();
          List.Controller.showEditTagLocalisationModalView($(e.currentTarget).data('id'));
        },

        goToSubmissionStatusTabClicked: function(e) {
          e.stopPropagation();
          e.preventDefault();
          var tab = e.target.attributes['href'].value.substring(1);
          List.Controller.listTags(tab);
        },

        goToPageClicked: function (e) {
          e.stopPropagation();
          e.preventDefault();
          var page = e.target.attributes['data-page'].value;
          this.goToPage(page);
        },

        goToPage: function (page) {
          // Update Pagination
          var total_pages = this.collection.totalPages;
          var current_page = parseInt(page,10);
          var pages_in_range = this.collection.pagesInRange;
          this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
          // $('.js-submission-grid').html("");

          var view = this;
          this.collection.goTo(page,{
            update: true,
            remove: true,
            success: function () {
              view.isLoading = false;
            }
          });
        },

        showRangeCenteredOnPage: function (current_page, total_pages, pages_in_range) {
          var html = '';
          var start;
          var end;
          var prev_html;
          var next_html;
          var first_html;
          var last_html;
          if(total_pages > 1){
            if(total_pages > 9){
              if((current_page - pages_in_range - 1) < 0){
                start = 0;
                end = pages_in_range * 2 + 1;
                prev_html = '<li class="disabled"><a>&laquo;</a></li>';
                next_html = '<li><a class="js-page" data-page="'+(end)+'">&raquo;</a></li>';
                first_html = '';
                last_html = '<li><a class="js-page" data-page="'+(total_pages - 1)+'">Last</a></li>';
              }else if ((current_page + pages_in_range + 1) > total_pages){
                start = total_pages - ((pages_in_range * 2) + 1);
                end = total_pages;
                prev_html = '<li><a class="js-page" data-page="'+(start - 1)+'">&laquo;</a></li>';
                next_html = '<li class="disabled"><a>&raquo;</a></li>';
                first_html = '<li><a class="js-page" data-page="0">First</a></li>';
                last_html = '';

              }else{
                start = current_page - pages_in_range;
                end = current_page + pages_in_range;
                prev_html = '<li><a class="js-page" data-page="'+(start - 1)+'">&laquo;</a></li>';
                next_html = '<li><a class="js-page" data-page="'+(end)+'">&raquo;</a></li>';
                first_html = '<li><a class="js-page" data-page="0">First</a></li>';
                last_html = '<li><a class="js-page" data-page="'+(total_pages - 1)+'">Last</a></li>';
              }
              html += first_html;
              html += prev_html;
              for (var i = start; i < end; i++){
                if(i == current_page)
                  html += '<li class="active"><a data-page="'+i+'">'+(i + 1)+'</a></li>';
                else
                  html += '<li><a class="js-page" data-page="'+i+'">'+(i + 1)+'</a></li>';
              }
              html += next_html;
              html += last_html;
            }else{
              start = 0;
              end = total_pages;
              for (var i = start; i < end; i++){
                if(i == current_page)
                  html += '<li class="active"><a data-page="'+i+'">'+(i + 1)+'</a></li>';
                else
                  html += '<li><a class="js-page" data-page="'+i+'">'+(i + 1)+'</a></li>';
              }
            }
            $('ul.pagination').html(html);
          }
        }

      });

      List.EditTagModalView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade js-modal-tag-edit",
        template: editTagModalTpl,

        onShow: function () {
          $('#description').val(this.model.get('description'));
        },

        initUI: function () {

        },

        events: {
          'click .js-edit-tag-submit-btn': 'saveBtnClicked'
        },  // events

        saveBtnClicked: function(e) {
          var self = this;
          this.model.urlRoot = App.apiURL + "admin/tags/";
          this.model.save({
            description: $('#description').val()
          }, {
            success: function() {
              jQuery.gritter.add({
                title: 'Tag updated',
                class_name: 'growl-success'
              });
              $('.js-modal-tag-edit').modal('hide');
              var tab = $(".submissions .nav-tabs li.active a").attr('href').substring(1);
              List.Controller.listTags(tab);
            },
            error: function(err) {
              jQuery.gritter.add({
                title: 'Error',
                class_name: 'growl-error'
              });
            }
          });
        }

      }); // List.EditTagModalView

      List.EditTagLocalisationModalView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade js-modal-tag-localisation-edit",
        template: editTagLocalisationModalTpl,

        onShow: function () {
          this.fetchAndDisplayLocalisations();
        },

        fetchAndDisplayLocalisations: function () {
          var self = this;
          $.ajax({
            url: App.apiURL + 'admin/tags/'+this.id+'/localizations',
            type: "GET",
            success: function(res) {
              self.insertHTML(res);
            },
            error: function(err) {
              console.log(err);
            }
          });
        },

        getLanguageFromCode: function(lang, code) {
          if (lang[code]) {
            return lang[code].name;
          }
          return 'No Language Found';
        },

        insertHTML: function(res) {

          var lang = App.getLangJson();

          for (var i in res) {
            var locale = res[i];

            var localeHTML = '';
            localeHTML += '<div class="form-group col-sm-5">';
            localeHTML += '<label class="col-sm-2 control-label">Locale </label>';
            localeHTML += '<div class="col-sm-10">';
            localeHTML += '<input type="text" disabled class="form-control" placeholder="Locale" id="'+locale.locale+'" name="locale" />';
            localeHTML += '</div>';
            localeHTML += '</div>';

            var contentHTML = '';
            contentHTML += '<div class="form-group col-sm-5">';
            contentHTML += '<label class="col-sm-2 control-label">Content </label>';
            contentHTML += '<div class="col-sm-10">';
            contentHTML += '<input type="text" class="form-control" placeholder="Content" id="'+locale.locale+'-content" name="content" />';
            contentHTML += '</div>';
            contentHTML += '</div>';

            var saveBtn = '';
            saveBtn += '<button data-locale="'+locale.locale+'" aria-hidden="true" class="col-sm-2 pull-right btn btn-success js-edit-tag-localisation-submit-btn" type="button">Save</button>';

            $('.js-existing-locales').append(localeHTML);
            $('.js-existing-locales').append(contentHTML);
            $('.js-existing-locales').append(saveBtn);

            $('#' + locale.locale).val(this.getLanguageFromCode(lang, locale.locale) + ' (' + locale.locale + ')');
            $('#' + locale.locale + '-content').val(locale.content);
          }
        },

        events: {
          'click .js-edit-tag-localisation-submit-btn': 'saveBtnClicked',
          'click .js-edit-tag-localisation-add-btn': 'addNewLocaleClicked',
          'click .js-new-tag-submit': 'saveNewTag'
        },  // events

        saveBtnClicked: function(e) {
          var locale = $(e.currentTarget).data('locale');
          $.ajax({
            url: App.apiURL + 'admin/tags/'+this.id+'/localizations/' + locale,
            type: "PUT",
            data: {
              content: $('#' + locale + '-content').val()
            },
            success: function(res) {
              jQuery.gritter.add({
                title: 'Localisation updated',
                class_name: 'growl-success'
              });
            },
            error: function(err) {
              jQuery.gritter.add({
                title: 'Failed to save localisation',
                class_name: 'growl-error'
              });
            }
          });
        },

        saveNewTag: function(e) {
          var self = this;
          var locale = $('#new-locale').val();
          $.ajax({
            url: App.apiURL + 'admin/tags/'+this.id+'/localizations/' + locale,
            type: "PUT",
            data: {
              content: $('#new-locale-content').val()
            },
            success: function(res) {
              jQuery.gritter.add({
                title: 'Localisation added',
                class_name: 'growl-success'
              });

              // Reload contents of modal
              $('.js-existing-locales').html('');
              self.fetchAndDisplayLocalisations();
              $('.js-edit-tag-localisation-add-btn').prop('disabled', false);

            },
            error: function(err) {
              jQuery.gritter.add({
                title: 'Failed to save localisation',
                class_name: 'growl-error'
              });
            }
          });
        },

        addNewLocaleClicked: function(e) {
          $('.js-edit-tag-localisation-add-btn').prop('disabled', true);

          var locales = App.getLangJson();

          var localeHTML = '';

          localeHTML += '<div class="form-group col-sm-5">';
          localeHTML += '<label class="col-sm-2 control-label">Locale </label>';
          localeHTML += '<div class="col-sm-10">';
          localeHTML += '<select class="chosen-select" data-placeholder="Locale" id="new-locale" name="locale">';
          localeHTML += '</div>';
          localeHTML += '</div>';

          var contentHTML = '';
          contentHTML += '<div class="form-group col-sm-5">';
          contentHTML += '<label class="col-sm-2 control-label">Content </label>';
          contentHTML += '<div class="col-sm-10">';
          contentHTML += '<input type="text" class="form-control" placeholder="Content" id="new-locale-content" name="content" />';
          contentHTML += '</div>';
          contentHTML += '</div>';

          var addBtn = '';
          addBtn += '<button aria-hidden="true" class="col-sm-2 pull-right btn btn-success js-new-tag-submit" type="button">Add</button>';

          $('.js-existing-locales').append(localeHTML);
          $('.js-existing-locales').append(contentHTML);
          $('.js-existing-locales').append(addBtn);

          var lang = App.getLangJson();
          $('.chosen-select').append('<option value="">Select locale...</option>');
          for (var key in lang) {
            $('.chosen-select').append('<option value="' + key + '">' + lang[key].name + ' (' + key + ')' + '</option>');
          }

          $('.chosen-select').chosen({'width': '100%', 'white-space': 'nowrap'});
        }

      }); // List.EditTagLocalisationModalView

    });
    return ;
  });
