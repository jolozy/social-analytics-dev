define(["app", "moment",
    "tpl!apps/buzz/list/tpl/buzz-itemview.tpl",
    "tpl!apps/buzz/list/tpl/buzz-listview.tpl",
    "tpl!apps/buzz/list/tpl/buzz-modalView.tpl",
    "tpl!apps/buzz/list/tpl/buzz-sendEmailModalView.tpl"],
  function(App, moment, buzzItemViewTpl, buzzListViewTpl, buzzModalViewTpl, buzzSendEmailModalViewTpl) {

    App.module('Buzz.List', function (Buzz, App, Backbone, Marionette, $, _) {
      // Views
      Buzz.BuzzModalView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade js-modal-email-edit",
        template: buzzModalViewTpl,

        initialize: function() {
          this.model.bind("sync", _.bind(this.render, this));
        },

        onRender: function () {
          var iframe = document.getElementById('preview-container');
          if (iframe) {
            var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
            iframedoc.body.innerHTML = this.model.get('content');
          }
        },

        initUI: function () {
        },

        events: {
        }  // events

      });

      Buzz.BuzzSendPreviewModalView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal fade js-modal-email-send",
        template: buzzSendEmailModalViewTpl,

        initialize: function() {
        },

        onRender: function () {
        },

        initUI: function () {
        },

        events: {
          'click .js-send-preview-email': 'sendPreviewEmail',
          'keypress #email_to': 'enterPressed'
        },  // events

        enterPressed: function(e) {
          if ( e.which === 13 ) {
            this.sendPreviewEmail();
          }
        },

        sendPreviewEmail: function() {
          var id = this.id;
          var recipient = $('#email_to').val();

          if (!recipient) {
            jQuery.gritter.add({
              title: 'Please enter in something.',
              class_name: 'growl-danger'
            });
            return;
          }

          var data = {
            recipient: recipient
          };

          $.ajax({
            url: App.apiURL + 'admin/buzz/queued_email/' + id + '/preview_email',
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function(reply) {
              jQuery.gritter.add({
                title: 'Preview Email sent!',
                class_name: 'growl-success'
              });
              $('.js-modal-email-send').modal('hide');
            },
            error: function() {

            }
          });
        }

      });

      Buzz.BuzzItemView = Marionette.ItemView.extend({
        template: buzzItemViewTpl,
        tagName: 'tr',

        events: {
          'click .js-delete': 'deleteNewsletter',
          'click .js-test-send': 'sendTestEmail'
        },

        onShow: function() {
          $(this.$el).find('.created-at-container').html(moment(this.model.get('created_at')).format('DD-MM-YYYY hh:mm:ssA'));
        },

        deleteNewsletter: function() {
          if (confirm('Are you sure you want to delete this newsletter?')) {
            this.model.url = App.apiURL + "admin/buzz/queued_email/" + this.model.get('id');
            console.log(this.model);
            this.model.destroy();
          }
        },

        sendTestEmail: function() {
          App.Buzz.List.Controller.showSendPreviewModal(this.model.get('id'));
        }
      });

      Buzz.BuzzListView = Marionette.CompositeView.extend({
        template: buzzListViewTpl,
        tagName: 'div',
        className: 'buzz-listview-container',

        itemView: Buzz.BuzzItemView,
        itemViewContainer: ".js-buzz-list",

        events: {
          'click .js-filter': 'filterResults',
          'click .js-reset-filter': 'resetFilter',
          'click .js-more-info': 'showMoreInfo'
        },

        onShow: function() {
        },

        onRender: function() {
          var total_pages = this.collection.totalPages;
          var current_page = this.collection.currentPage;
          var pages_in_range = this.collection.pagesInRange;
          this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
          if (this.collection.length !== 0) {
            this.loadCategories();
            this.getNextNewsletters();
          }
        },

        initialize: function() {
          this.collection.bind("reset", _.bind(this.render, this));
        },

        goToPageClicked: function (e) {
          e.stopPropagation();
          e.preventDefault();
          // $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
          var page = e.target.attributes['data-page'].value;
          this.goToPage(page);
        },

        goToPage: function (page) {

          // Update Pagination
          var total_pages = this.collection.totalPages;
          var current_page = parseInt(page, 10);
          var pages_in_range = this.collection.pagesInRange;
          this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
          $('.js-analytics-grid').html("");

          var view = this;
          this.collection.goTo(page, {
            update: true,
            remove: true,
            success: function () {
              view.isLoading = false;
            }
          });
        },

        showRangeCenteredOnPage: function (current_page, total_pages, pages_in_range) {
          // Forces pagination to only show maximum 5 page button
          $('ul.pagination').html('');
          pages_in_range = 2;
          var html = "", start, end, prev_html, next_html, first_html, last_html;
          if (total_pages > 1) {
            if (total_pages > 9) {
              if ((current_page - pages_in_range - 1) < 0) {
                start = 0;
                end = pages_in_range * 2 + 1;
                prev_html = '<li class="disabled"><a>&laquo;</a></li>';
                next_html = '<li><a class="js-page" data-page="' + (end) + '">&raquo;</a></li>';
                first_html = '';
                last_html = '<li><a class="js-page" data-page="' + (total_pages - 1) + '">Last</a></li>';
              } else if ((current_page + pages_in_range + 1) > total_pages) {
                start = total_pages - ((pages_in_range * 2) + 1);
                end = total_pages;
                prev_html = '<li><a class="js-page" data-page="' + (start - 1) + '">&laquo;</a></li>';
                next_html = '<li class="disabled"><a>&raquo;</a></li>';
                first_html = '<li><a class="js-page" data-page="0">First</a></li>';
                last_html = '';

              } else {
                start = current_page - pages_in_range;
                end = current_page + pages_in_range;
                prev_html = '<li><a class="js-page" data-page="' + (start - 1) + '">&laquo;</a></li>';
                next_html = '<li><a class="js-page" data-page="' + (end) + '">&raquo;</a></li>';
                first_html = '<li><a class="js-page" data-page="0">First</a></li>';
                last_html = '<li><a class="js-page" data-page="' + (total_pages - 1) + '">Last</a></li>';
              }
              html += first_html;
              html += prev_html;
              for (var i = start; i < end; i++) {
                if (i == current_page)
                  html += '<li class="active"><a data-page="' + i + '">' + (i + 1) + '</a></li>';
                else
                  html += '<li><a class="js-page" data-page="' + i + '">' + (i + 1) + '</a></li>';
              }
              html += next_html;
              html += last_html;
            } else {
              start = 0;
              end = total_pages;
              for (var i = start; i < end; i++) {
                if (i == current_page)
                  html += '<li class="active"><a data-page="' + i + '">' + (i + 1) + '</a></li>';
                else
                  html += '<li><a class="js-page" data-page="' + i + '">' + (i + 1) + '</a></li>';
              }
            }
            $('ul.pagination').html(html);

            var view = this;
            $('.js-page').on('click', function (e) {
              view.goToPageClicked(e);
            });
          }
        },

        loadCategories: function() {
          var _this = this;
          $.ajax({
            url: App.apiURL + 'admin/buzz/categories',
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function(categories) {
              var html = '';
              for (var i in categories) {
                var category = categories[i];
                html += '<option value="' + category +'">' + category +'</option>';
              }
              $('.js-categories').append(html);

              // Prefill filters only after categories are fetched
              _this.prefillFilters();
            },
            error: function() {

            }
          });
        },

        getNextNewsletters: function() {
          var _this = this;
          $.ajax({
            url: App.apiURL + 'admin/buzz/queued_emails/next',
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function(newsletters) {
              var html = '';
              for (var i in newsletters) {
                var newletter = newsletters[i];
                html += '<tr>';
                html += '<td>' + newletter.subject + '</td>';
                html += '<td>' + newletter.list_name + '</td>';
                html += '<td>' + moment().day(newletter.day_of_week).format('dddd') + '</td>';
                html += '<td>' + moment(newletter.next_scheduled_date).format('DD-MM-YYYY hh:mm:ssA') + '</td>';
                html += '</tr>';
              }
              $('.js-buzz-next-list').html(html);
            },
            error: function() {

            }
          });
        },

        prefillFilters: function() {
          if (this.collection.status) {
            $('.js-status').val(this.collection.status);
          }
          if (this.collection.category) {
            $('.js-categories').val(this.collection.category);
          }
          if (this.collection.language) {
            $('.js-language').val(this.collection.language);
          }
        },

        resetFilter: function() {
          $('.js-status').val('');
          $('.js-categories').val('');
          $('.js-language').val('');
          App.Buzz.List.Controller.listBuzzNewsletters('', '', '');
        },

        filterResults: function() {
          var status = $('.js-status').val();
          var category = $('.js-categories').val();
          var language = $('.js-language').val();

         App.Buzz.List.Controller.listBuzzNewsletters(status, category, language);
        },

        showMoreInfo: function(e) {
          App.Buzz.List.Controller.showBuzzNewsletter($(e.currentTarget).closest('a').data('id'));
        }

      });

    });

    return ;
  });
