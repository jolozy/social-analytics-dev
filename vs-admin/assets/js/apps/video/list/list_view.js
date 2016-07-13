define(["app",
    "tpl!apps/video/list/tpl/video-itemview.tpl",
    "tpl!apps/video/list/tpl/video-gridview.tpl"],
function(App, videoItemViewTpl, videoGridViewTpl) {

  App.module('Video.List', function (List, App, Backbone, Marionette, $, _) {

    // Views
    List.VideoItemView = Marionette.ItemView.extend({
        template: videoItemViewTpl,
        tagName: 'div',
        className: '',

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.listenTo(this.model, 'change', this.render);
        },  //  /initialize

        onRender: function () {
            this.initUI();
        },  //  /onRender

        onShow: function () {
            this.initUI();
        },

        events: {

        },  // /events

        initUI: function() {
            var published_date = new Date(this.model.get('published_date'));
            var now = new Date();
            if (this.model.get('published') && published_date > now) {
              this.$el.find('.publish-status').removeClass('published').addClass('pending');
              this.$el.find('.publish-status').html('<i class="fa fa-clock-o"></i> ' + published_date.toDateString() + ' ' + published_date.toLocaleTimeString('en-SG'));
            }
        }
    }); //List.VideoItemView

    List.VideoGridView = Marionette.CompositeView.extend({
        template: videoGridViewTpl,
        tagName: 'div',
        className: '',

        itemView: List.VideoItemView,
        itemViewContainer: '.js-video-grid',

        initialize: function () {
            this.collection.bind("reset", _.bind(this.render, this));
        },

        onRender: function () {
            this.initUI();
        },

        onShow: function () {
            this.initUI();
        },

        initUI: function () {
            if (!this.collection.filterBy) {
                $('.js-tab-all').addClass('active');
            }

            // Search String
            if(this.collection.search_string){
                $('.js-tf-search').val(this.collection.search_string);
                $('.js-results-title').html("<br/> Search results for \"" + this.collection.search_string + "\"");
            }

            var total_pages = this.collection.totalPages;
            var current_page = this.collection.currentPage;
            var pages_in_range = this.collection.pagesInRange;
            this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
        },

        events: {
            'click .js-new': 'newVideo',
            'keydown .js-tf-search': 'searchTextFieldKeyDown',
            'click .js-page': 'goToPageClicked',
            'click .js-reset-search': 'resetSearch',
            'click .js-submission-tab': 'goToSubmissionStatusTabClicked'
        },

        newVideo: function (e) {
            // e.stopPropagation();
            // e.preventDefault();
            // App.trigger('video:new');
        },

        resetSearch: function (e) {
            $('.js-tf-search').val("");
            App.trigger('video:list');
        },

        searchTextFieldKeyDown: function (e) {
            if(e.keyCode == 13) {
                this.searchVideos();
            }
        },

        searchVideos: function () {
            var tab = '';
            if (this.collection.filterBy) {
                tab = this.collection.filterBy;
            }
            List.Controller.searchVideos($('.js-tf-search').val(), tab, this);
        },

        goToPageClicked: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var page = e.target.attributes['data-page'].value;
            this.goToPage(page);
        },

        goToSubmissionStatusTabClicked: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var tab = e.target.attributes['href'].value.substring(1);
            List.Controller.searchVideos('', tab, this);
        },

        goToPage: function (page) {

            // Update Pagination
            var total_pages = this.collection.totalPages;
            var current_page = parseInt(page,10);
            var pages_in_range = this.collection.pagesInRange;
            this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
            $('.js-video-grid').html("");

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
            // Forces pagination to only show maximum 5 page button
            pages_in_range = 2;
            var html = "", start, end, prev_html, next_html, first_html, last_html;
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

    }); // List.VideoGridView

  });   // App.module

  return App.Video.List.Controller;

});
