define(["app", "moment",
      "tpl!apps/facebook/list/tpl/facebook-itemview.tpl",
      "tpl!apps/facebook/list/tpl/facebook-listview.tpl",
      "tpl!apps/facebook/list/tpl/facebook-modalView.tpl",
      "tpl!apps/facebook/list/tpl/modal-schedule-post.tpl",
      "tpl!apps/facebook/list/tpl/modal-create-post.tpl"],
    function(App, moment, facebookItemViewTpl, facebookListViewTpl, facebookModalViewTpl,
             modalSchedulePostTpl, modalCreatePostTpl) {
      var currentLink = 'https://www.viddsee.com/'
      var currentPicture = null
      var currentFbPageId = EN_PAGE_ID

      App.module('Facebook.List', function (Facebook, App, Backbone, Marionette, $, _) {
        function getPageAccessToken(fbPageId) {
          var pageAccessToken = ''
          switch (fbPageId) {
            case EN_PAGE_ID:
                pageAccessToken = localStorage.getItem('page_access_token_en')
              break
            case ZH_PAGE_ID:
              pageAccessToken = localStorage.getItem('page_access_token_zh')
              break
            case ID_PAGE_ID:
              pageAccessToken = localStorage.getItem('page_access_token_id')
              break
            case PH_PAGE_ID:
              pageAccessToken = localStorage.getItem('page_access_token_ph')
              break
            default:
              pageAccessToken = localStorage.getItem('page_access_token_en')
          }
          return pageAccessToken
        }

        function initClickEdit() {
          var $postMessage = $('.postMessage')
          var $postName = $('.postName')
          var $postDescription = $('.postDescription')

          $postMessage.click(function() {
            if (!$postMessage.find('#editingpostMessage').length) {
              var text = $('.postMessage > p').text()
              $postMessage.children().replaceWith('<textarea id="editingpostMessage">' + text + '</textarea>')
            }
          })

          $postName.click(function() {
            if (!$postName.find('#editingpostName').length) {
              var text = $('.postName > span').text()
              $postName.children().replaceWith('<textarea maxlength="100" id="editingpostName">' + text + '</textarea>')
            }
          })

          $postDescription.click(function() {
            if (!$postDescription.find('#editingpostDescription').length) {
              var text = $('.postDescription > span').text()
              $postDescription.children().replaceWith('<textarea maxlength="250" id="editingpostDescription">' + text + '</textarea>')
            }
          })

          $(document).mouseup(function (e) {
            if (!$postMessage.is(e.target) // if the target of the click isn't the container...
                && $postMessage.has(e.target).length === 0 // ... nor a descendant of the container
                && $postMessage.find('#editingpostMessage').length) { // and textarea is active
              var descriptionToReplace = $('#editingpostMessage').val()
              $postMessage.children().replaceWith('<p>' + descriptionToReplace + '</p>')
            } else if (!$postName.is(e.target) // if the target of the click isn't the container...
                && $postName.has(e.target).length === 0 // ... nor a descendant of the container
                && $postName.find('#editingpostName').length) { // and textarea is active
              var titleToReplace = $('#editingpostName').val()
              $postName.children().replaceWith('<span>' + titleToReplace + '</span>')
            } else if (!$postDescription.is(e.target) // if the target of the click isn't the container...
                && $postDescription.has(e.target).length === 0 // ... nor a descendant of the container
                && $postDescription.find('#editingpostDescription').length) { // and textarea is active
              var subtitleToReplace = compressCharacters($('#editingpostDescription').val())
              $postDescription.children().replaceWith('<span>' + subtitleToReplace + '</span>')
            }
          });
        }

        function initVideoSelect2() {
          var sel = $('.js-select-film')
          sel.select2({
            placeholder: "Select film",
            minimumInputLength: 2,
            width: '100%',
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
                  var link = 'https://www.viddsee.com/video/' + v.friendly_url + '/' + v.uid
                  if (!v.description_metatext) {
                    v.description_metatext = 'Message'
                  }
                  return {
                    id:v.id,
                    text:v.title + " (" + v.id + ")",
                    long_desc: v.description_long,
                    short_desc: v.description_short,
                    message: v.description_metatext,
                    link: link,
                    title: v.title,
                    img: v.thumbnail_url
                  };
                });
                return {results: results};
              }
            }
          }).on("change", function(e) {
            updateFilmData()
            var $unpublishedWarnings = $('.unpublished-warnings')
            var videoData = sel.select2('data')
            currentLink = videoData.link
            currentPicture = videoData.img

            $unpublishedWarnings.empty()
            testUrl(videoData.link).fail(function() {
              var warning = videoData.title + ' is an unpublished video. Video links will not work.'
              if ($('#unpublished-' + videoData.id).length === 0) {
                $unpublishedWarnings.append('<small class="unpublished" id="unpublished-' + videoData.id + '">' +
                    warning + '<br></small>')
              }
            })
            $('.postMessage > p').replaceWith('<p>' + videoData.message + '</p>')
          });
        }  // initVideoSelect2

        function addImage(imgSrc) {
          return '<img src="' + imgSrc + '" width="470" height="246">';
        }

        function updateFilmData() {
          var film = $('.js-select-film').select2('data')
          var title = film.short_desc.replace(/<(?:.|\n)*?>/gm, '') // strip html tags
          var subtitle = film.long_desc.replace(/<(?:.|\n)*?>/gm, '') // strip html tags
          if (title.replace(/ /g,'') === '') {
            title = 'Title here'
          }
          if (subtitle.replace(/ /g,'') === '') {
            subtitle = 'Subtitle here'
          }
          $('.imageContainer').children().replaceWith(addImage(film.img))

          $('.postName').children().replaceWith('<span>' + title + '</span>')
          $('.postDescription').children().replaceWith('<span>' + subtitle + '</span>')
        }

        function compressCharacters(text) {
          // Reduces character count to the maximum so as to fit into preview section.
          // Also appends three dots behind and remove newlines
          var MAX_CHARS = 250
          var newlinesStripped = text.replace(/\r?\n|\r/g, '')
          if (newlinesStripped.length > MAX_CHARS) {
            return newlinesStripped.slice(0, MAX_CHARS) + '...'
          }
          return newlinesStripped
        }

        function initFacebookPageSelect2() {
          var sel = $('.js-select-page')
          sel.select2({
            placeholder: "Select page",
            width: '100%',
            data: [{id: EN_PAGE_ID, text: 'Viddsee'}, {id: ZH_PAGE_ID, text: 'Viddsee 亞洲微電影'},
              {id: ID_PAGE_ID, text: 'Viddsee Film Pendek'}, {id: PH_PAGE_ID, text: 'Viddsee Philippines'}],
            initSelection: function(element, callback) {
              callback({id: EN_PAGE_ID, text: 'Viddsee'})
            }
          }).on("change", function(e) {
            var data = sel.select2('data')
            currentFbPageId = data.id
            $('.pageName').children().replaceWith('<span>' + data.text + '</span>')
          });

          // force initSelection to be triggered. Need to provide dummy value
          sel.val(-111).trigger('change')
        }  // initFacebookPageSelect2


        // Views
        Facebook.FacebookModalView = Marionette.ItemView.extend({
          tagName: "div",
          className: "modal fade js-modal-email-edit",
          template: facebookModalViewTpl,

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
        Facebook.FacebookCreateModalView = Marionette.ItemView.extend({
          tagName: "div",
          className: "modal fade js-modal-fb-post",
          template: modalCreatePostTpl,

          onShow: function() {
            this.initUI()
            initVideoSelect2.call(this)
            initFacebookPageSelect2.call(this)
            initClickEdit.call(this)
          },

          initUI: function() {
            $('.startdatepicker').datepicker();
            $('.timepicker').timepicker();
          },

          initialize: function() {
          },

          onRender: function () {
          },

          events: {
            'click .js-create-post-submit-btn': 'saveDraft'
          },  // events

          updateVideoInfo: function(videoId, message, name) {
            var payload = {}
            if (message) {
              payload.description_metatext = message
            }
            if (name) {
              payload.description_short = name
            }
            $.ajax({
              url: App.apiURL + "admin/video/" + videoId ,
              type: "PUT",
              data: payload,
              success: function(res) {
              },
              error: function(err) {
                console.log(err)
              }
            });
          },

          saveDraft: function() {
            // Validation
            if (!$('.js-schedule-date').val() || !$('.js-schedule-time').val()) {
              jQuery.gritter.add({
                title: 'Please select a date and time.',
                class_name: 'growl-error'
              });
              return;
            }

            var message = $('.postMessage > p').text()
            var name = $('.postName > span').text()
            var description = $('.postDescription > span').text()
            var datetime = moment($('.js-schedule-date').val() + ' ' + $('.js-schedule-time').val()).format();
            var unixTimestamp = new Date(datetime).getTime() /1000

            this.updateVideoInfo($('.js-select-film').select2('data').id, message, name)

            FB.api(
                "/" + currentFbPageId + "/feed",
                "POST",
                {
                  "access_token": getPageAccessToken(currentFbPageId),
                  "message": message,
                  "link": currentLink,
                  "name": name,
                  "description": description,
                  "picture": currentPicture,
                  published: false,
                  scheduled_publish_time: unixTimestamp
                },
                function (response) {
                  if (response && !response.error) {
                    jQuery.gritter.add({
                      title: 'Draft saved!',
                      class_name: 'growl-success'
                    });
                    $('.js-modal-fb-post').modal('hide');
                    Facebook.Controller.listFacebookPosts();
                  } else {
                    console.log(response)
                    if (response.error.message === "(#100) The specified scheduled publish time is invalid.") {
                      jQuery.gritter.add({
                        title: 'Invalid publish time',
                        class_name: 'growl-error'
                      });
                    } else {
                      facebookLogin(this.saveDraft)
                    }
                  }
                }.bind(this)
            );
          }

        });

        Facebook.FacebookItemView = Marionette.ItemView.extend({
          template: facebookItemViewTpl,
          tagName: 'tr',

          events: {
            'click .js-view': 'viewPost'
          },

          onShow: function() {
            $(this.$el).find('.created-at-container').html(moment(this.model.get('created_at')).format('DD-MM-YYYY hh:mm:ssA'));
          },

          viewPost: function() {
            window.open('https://www.facebook.com/' + this.model.get('id'), '_blank');
          }
        });

        Facebook.FacebookListView = Marionette.CompositeView.extend({
          template: facebookListViewTpl,
          tagName: 'div',
          className: 'facebook-listview-container',

          itemView: Facebook.FacebookItemView,
          itemViewContainer: ".js-facebook-list",

          events: {
            'click .js-filter': 'filterResults',
            'click .js-reset-filter': 'resetFilter',
            'click .js-create-new-post': 'createNewPost',
            'click .js-load-more': 'loadMore'
          },

          onShow: function() {
          },

          onRender: function() {
            // infinite scroll
            $(window).scroll(function() {
              if($(window).scrollTop() === $(document).height() - $(window).height()) {
                this.loadMore()
              }
            }.bind(this));
          },

          initialize: function() {
            this.collection.bind("reset", _.bind(this.render, this));
          },

          loadMore: function() {
            var status = $('.js-status').val();
            var page = $('.js-fb-page').val();
            App.Facebook.List.Controller.loadMore(status, page);
          },

          resetFilter: function() {
            $('.js-status').val('');
            $('.js-fb-page').val('');
            App.Facebook.List.Controller.listFacebookPosts('', '');
          },

          filterResults: function() {
            var status = $('.js-status').val();
            var page = $('.js-fb-page').val();
            App.Facebook.List.Controller.filterFacebookPosts(status, page);
          },

          createNewPost: function(e) {
            e.preventDefault();
            App.Facebook.List.Controller.createPostModalView()
          }

        });

      });

      return ;
    });
