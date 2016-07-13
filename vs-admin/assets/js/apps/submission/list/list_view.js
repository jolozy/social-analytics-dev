define(["app",
    "tpl!apps/submission/list/tpl/submission-itemview.tpl",
    "tpl!apps/submission/list/tpl/submission-gridview.tpl"],
function(App, submissionItemViewTpl, submissionGridViewTpl) {
	
	App.module('Submission.List', function (List, App, Backbone, Marionette, $, _) {
		// Views
	    List.SubmissionItemView = Marionette.ItemView.extend({
	        template: submissionItemViewTpl,
	        tagName: 'div',
	        className: 'col-md-4 col-sm-6 itemview-video',

            triggers: {
                'click .js-delete-submission': 'submission:delete'
            },

            events: {
                'click .js-edit-submission': 'markAsRead',
                'click .reviewed': 'removeRead',
                'mouseenter .reviewed': 'changeReadText',
                'mouseleave .reviewed': 'changeBackReadText'
            },

            markAsRead: function() {
                var submissionString = localStorage.getItem('readSubmissions');
                if (submissionString) {
                    var submissions = JSON.parse(localStorage.getItem('readSubmissions'));
                    if (submissions.indexOf(this.model.get('id')) === -1) {
                        submissions.push(this.model.get('id'));
                        localStorage.setItem('readSubmissions', JSON.stringify(submissions));
                    }
                } else {
                    var submissions = [this.model.get('id')];
                    localStorage.setItem('readSubmissions', JSON.stringify(submissions));
                }

            },

            removeRead: function() {
                var id = $(this.$el).find('.reviewed').data('id');
                $(this.$el).find('.reviewed').remove();
                var submissionString = localStorage.getItem('readSubmissions');
                if (submissionString) {
                    var submissions = JSON.parse(localStorage.getItem('readSubmissions'));
                    var index = submissions.indexOf(id);
                    if (index > -1) {
                        submissions.splice(index, 1);
                        localStorage.setItem('readSubmissions', JSON.stringify(submissions));
                    }
                }
            },

            changeReadText: function() {
                $(this.$el).find('.reviewed').text('(Mark as unread)');
            },

            changeBackReadText: function() {
                $(this.$el).find('.reviewed').text('(Read)');
            },

            onShow: function() {
                var submissionString = localStorage.getItem('readSubmissions');
                if (submissionString) {
                    var submissions = JSON.parse(localStorage.getItem('readSubmissions'));
                    if (submissions.indexOf(this.model.get('id')) !== -1) {
                        $(this.$el).find('.reviewed').removeClass('hidden');
                    }
                }
            }
	    }); //List.SubmissionItemView

	    List.SubmissionGridView = Marionette.CompositeView.extend({
            template: submissionGridViewTpl,
            tagName: 'div',
            className: '',

            itemView: List.SubmissionItemView,
            itemViewContainer: '.js-submission-grid',

            initialize: function () {
                this.collection.bind("reset", _.bind(this.render, this));

                this.on("itemview:submission:delete", function(view, submission) {
                    if (window.confirm("Are you sure you want to delete this submission?")) {
                        App.trigger('submission:delete', submission.model.get('id'));
                        this.collection.remove(submission.model);
                    }
                });
            },

            onRender: function () {
                this.initUI();
            },

            onShow: function () {
                this.initUI();
            },

            initUI: function () {
                // Search String
                if(this.collection.search_string){
                    $('.js-tf-search').val(this.collection.search_string);
                    $('.js-results-title').html("Search results for \"" + this.collection.search_string + "\"");   
                }
                
                var total_pages = this.collection.totalPages;
                var current_page = this.collection.currentPage;
                var pages_in_range = this.collection.pagesInRange;
                this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);

                switch(this.collection.status){
                    case 'pending':
                        $('.js-tab-pending').addClass('active');
                    break;
                    case 'moreinfo':
                        $('.js-tab-moreinfo').addClass('active');
                    break;
                    case 'approved':
                        $('.js-tab-approved').addClass('active');
                    break;
                    case 'rejected':
                        $('.js-tab-rejected').addClass('active');
                    break;
                    case 'all':
                        $('.js-tab-all').addClass('active');
                    break;
                    case 'fasttrack':
                        $('.js-tab-fasttrack').addClass('active');
                    break;
                    case 'incomplete':
                        $('.js-tab-incomplete').addClass('active');
                    break;
                }
            },

            events: {
                'keydown .js-tf-search': 'searchTextFieldKeyDown',
                'click .js-page': 'goToPageClicked',
                'click .js-submission-tab': 'goToSubmissionStatusTabClicked'
            },

            searchTextFieldKeyDown: function (e) {
                if(e.keyCode == 13) {
                    this.searchVideos();
                }
            },

            searchVideos: function () {
                List.Controller.searchSubmissions($('.js-tf-search').val(), this);
            },

            goToSubmissionStatusTabClicked: function (e) {
                e.stopPropagation();
                e.preventDefault();
                var tab = e.target.attributes['href'].value.substring(1);
                List.Controller.listSubmissions(tab);
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
                $('.js-submission-grid').html("");

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
	});
    return ;
});