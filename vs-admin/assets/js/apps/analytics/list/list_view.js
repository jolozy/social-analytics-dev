define(["app",
        "tpl!apps/analytics/list/tpl/generic-date-video-dimension-view.tpl",
        "tpl!apps/analytics/list/tpl/generic-date-dimension-view.tpl",
        "tpl!apps/analytics/list/tpl/generic-chart-view.tpl",
        "tpl!apps/analytics/list/tpl/analytics-itemview.tpl",
        "tpl!apps/analytics/list/tpl/analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/analytics-overallview.tpl",
        "tpl!apps/analytics/list/tpl/analytics-overallview-trends.tpl",
        "tpl!apps/analytics/list/tpl/analytics-subscriberview.tpl",
        "tpl!apps/analytics/list/tpl/analytics-interactionview.tpl",
        "tpl!apps/analytics/list/tpl/video-analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/video-analytics-itemview.tpl",
        "tpl!apps/analytics/list/tpl/video-analytics-view.tpl",
        "tpl!apps/analytics/list/tpl/video-comments-listview.tpl",
        "tpl!apps/analytics/list/tpl/video-comments-itemview.tpl",
        "tpl!apps/analytics/list/tpl/video-comments-view.tpl",
        "tpl!apps/analytics/list/tpl/comment-itemview.tpl",
        "tpl!apps/analytics/list/tpl/comment-listview.tpl",
        "tpl!apps/analytics/list/tpl/domain-analytics-view.tpl",
        "tpl!apps/analytics/list/tpl/domain-analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/domain-analytics-itemview.tpl",
        "tpl!apps/analytics/list/tpl/analytics-trackerview.tpl",
        "tpl!apps/analytics/list/tpl/tracker-analytics-view.tpl",
        "tpl!apps/analytics/list/tpl/tracker-analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/tracker-analytics-itemview.tpl",
        "tpl!apps/analytics/list/tpl/tracker-modal-view.tpl",
        "tpl!apps/analytics/list/tpl/domains-by-video-analytics-itemview.tpl",
        "tpl!apps/analytics/list/tpl/domains-by-video-analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/domains-by-video-analytics-view.tpl",
        "tpl!apps/analytics/list/tpl/content-analytics-view-old.tpl",
        "tpl!apps/analytics/list/tpl/content-analytics-listview-old.tpl",
        "tpl!apps/analytics/list/tpl/content-analytics-view.tpl",
        "tpl!apps/analytics/list/tpl/content-analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-web-view.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-web-listview.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-mobile-view.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-mobile-listview.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-total-view.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-total-itemview.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-total-mobile-new-users.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-mobile-daily-active-users-view.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-mobile-daily-active-users-itemview.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-mobile-weekly-active-users-view.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-mobile-weekly-active-users-itemview.tpl",
        "tpl!apps/analytics/list/tpl/google-analytics-total-mobile-web-ratio.tpl",
        "tpl!apps/analytics/list/tpl/appfigures-new-downloads.tpl",
        "tpl!apps/analytics/list/tpl/video-related-post-analytics-itemview.tpl",
        "tpl!apps/analytics/list/tpl/video-related-post-analytics-listview.tpl",
        "tpl!apps/analytics/list/tpl/video-related-post-analytics-view.tpl",
        "moment", "chosen"],
    function (App,
                genericDateVideoDimensionViewTpl, genericDateDimensionViewTpl, genericChartViewTpl,
                analyticsItemViewTpl, analyticsListViewTpl, analyticsOverallViewTpl,
                analyticsOverallViewTrendsTpl, analyticsSubscriberViewTpl, analyticsInteractionViewTpl,
                videoAnalyticsListViewTpl, videoAnalyticsItemViewTpl, videoAnalyticsViewTpl,
                videoCommentsListViewTpl, videoCommentsItemViewTpl, videoCommentsViewTpl,
                commentItemViewTpl, commentListViewTpl,
                domainAnalyticsViewTpl, domainAnalyticsListViewTpl, domainAnalyticsItemViewTpl,
                analyticsTrackerViewTpl,
                trackerAnalyticsViewTpl, trackerAnalyticsListViewTpl, trackerAnalyticsItemViewTpl, trackerAnalyticsModalView,
                domainsByVideoItemViewTpl, domainsByVideoListViewTpl, domainsByVideoViewTpl,
                contentAnalyticsViewTplOld, contentAnalyticsListViewTplOld,
                contentAnalyticsViewTpl, contentAnalyticsListViewTpl,
                GAMauAnalyticsViewTpl, GAMauAnalyticsListViewTpl, GAMobileAnalyticsViewTpl,
                GAMobileAnalyticsListViewTpl, GAMauTotalViewTpl, GAMauTotalItemViewTpl,
                GAMobileNewUsersTpl, GAMobileDailyActiveUserView, GAMobileDailyActiveUserItemView,
                GAMobileWeeklyActiveUserView, GAMobileWeeklyActiveUserItemView, GAMauTotalMobileWebRatioTpl,
                appfiguresTpl,
                videoRelatedPostItemViewTpl, videoRelatedPostListViewTpl, videoRelatedPostViewTpl,
                moment) {

        App.module('Analytics.List', function (List, App, Backbone, Marionette, $, _) {
            List.GenericLayoutView = Marionette.Layout.extend({
                // Put all commonly used widgets initializers here. Do not attach events and event handlers here.
                // Extend from this class, declare templates and regions and init only those functions that you need from the child class
                // Implement refreshStat function specific to child view in the child view itself.
                initDatePickers: function (callback) {
                    // maintain reference to this
                    var thisView = this;
                    // Start Date Picker
                    $('#datepicker-start').datepicker({
                        dateFormat: 'M d, yy',
                        maxDate: new Date(),
                        onClose: function (selectedDate) {
                            $('#datepicker-end').datepicker("option", "minDate", selectedDate);
                            $('#date-range-picker').val('custom');
                            List.Controller.startDate = new Date(selectedDate);
                            List.Controller.dateRange = 'custom';
                            thisView.refreshStats();
                        }
                    }).datepicker("setDate", List.Controller.startDate);

                    // End Date Picker
                    $('#datepicker-end').datepicker({
                        dateFormat: 'M d, yy',
                        maxDate: new Date(),
                        onClose: function (selectedDate) {
                            $('#datepicker-start').datepicker("option", "maxDate", selectedDate);
                            $('#date-range-picker').val('custom');
                            List.Controller.endDate   = new Date(selectedDate);
                            List.Controller.dateRange = 'custom';
                            thisView.refreshStats();
                        }
                    }).datepicker("setDate", List.Controller.endDate);

                    // Date Range Dropdown
                    $("#date-range-picker").val(List.Controller.dateRange);

                    if (typeof(callback) === 'function') {
                        callback();
                    }
                },

                setDateRange: function (e) {
                    selectedRange = $(e.target).val();

                    // reset the min and max dates
                    $('#datepicker-start').datepicker("option", "maxDate", new Date()).datepicker("option", "minDate", null);
                    $('#datepicker-end').datepicker("option", "maxDate", new Date()).datepicker("option", "minDate", null);

                    switch (selectedRange) {
                        case 'yesterday':
                            $('#datepicker-start').datepicker("setDate", "-1d");
                            $('#datepicker-end').datepicker("setDate", "-1d");
                            this.refreshStats();
                            break;

                        case 'last7days':
                            $('#datepicker-start').datepicker("setDate", "-7d");
                            $('#datepicker-end').datepicker("setDate", "-1d");
                            this.refreshStats();
                            break;

                        case 'lastweek':
                            var dateNow = new Date();
                            dayToday = dateNow.getDay();

                            $('#datepicker-start').datepicker("setDate", "-" + (dayToday + 6) + "d");
                            $('#datepicker-end').datepicker("setDate", "-" + dayToday + "d");
                            this.refreshStats();
                            break;

                        case 'lastmonth':
                            var dateNow = new Date();

                            $('#datepicker-start').datepicker("setDate", new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 1));

                            var firstDayThisMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
                            var lastDayLastMonth = new Date();
                            lastDayLastMonth.setDate(firstDayThisMonth.getDate() - 1);
                            $('#datepicker-end').datepicker("setDate", lastDayLastMonth);
                            this.refreshStats();
                            break;

                        case 'monthtodate':
                            var dateNow = new Date();
                            $('#datepicker-start').datepicker("setDate", new Date(dateNow.getFullYear(), dateNow.getMonth(), 1));
                            $('#datepicker-end').datepicker("setDate", new Date());
                            this.refreshStats();
                            break;

                        case 'yeartodate':
                            var dateNow = new Date();
                            $('#datepicker-start').datepicker("setDate", new Date(dateNow.getFullYear(), 0, 1));
                            $('#datepicker-end').datepicker("setDate", new Date());
                            this.refreshStats();
                            break;

                        case 'alltime':
                            var dateNow = new Date();
                            $('#datepicker-start').datepicker("setDate", new Date(2012, 0, 1));
                            $('#datepicker-end').datepicker("setDate", new Date());
                            this.refreshStats();
                            break;

                        case 'custom':
                        default:
                            break;
                    }
                    // Save new dates to controller
                    List.Controller.startDate = new Date($('#datepicker-start').datepicker('getDate'));
                    List.Controller.endDate = new Date($('#datepicker-end').datepicker('getDate'));
                    List.Controller.dateRange = selectedRange;
                    // reset the min and max dates
                    $('#datepicker-start').datepicker("option", "maxDate", $('#datepicker-end').datepicker("getDate"));
                    $('#datepicker-end').datepicker("option", "minDate", $('#datepicker-start').datepicker("getDate"));
                },

                initVideoSelect2: function () {
                    var self = this;
                    $('.js-select-video').select2({
                        allowClear: true,
                        placeholder: "Select video",
                        width: '100%',
                        minimumInputLength: 2,
                        ajax: {
                            url: App.apiURL + "admin/search",
                            quietMillis: 500,
                            data: function(term, page) {
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
                        self.value = this.value;
                        self.refreshStats();
                    });
                }
            });

            List.AnalyticsLayoutView = List.GenericLayoutView.extend({
                template: analyticsListViewTpl,
                regions: {
                    overallStats: '.overall-stats-container',
                    overallTrends: '.overall-trends-container',
                    trackerStats: '.tracker-stats-container',
                    subscriptionStats: '.growth-stats-container',
                    interactionStats: '.engagement-stats-container',
                    listView: 'table.table-analytics thead'
                },
                onShow: function () {
                    this.initDatePickers();
                },

                refreshStats: function () {
                    startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateOverallAnalytics(startDate, endDate);
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                }
            });

            List.GenericDateVideoDimensionView = List.GenericLayoutView.extend({
                template: genericDateVideoDimensionViewTpl,

                initialize: function(){},

                onShow: function(){
                    this.initDatePickers();
                    this.initVideoSelect2();
                },

                events: {
                    'change #date-range-picker': 'setDateRange',
                    'change #dimension-picker': 'refreshStats',
                    'change #limit-picker': 'refreshStats'
                },

                regions: {
                    chartRegion: '.stats-container'
                },

                refreshStats: function() {
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate   = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var limit     = $("#limit-picker").val();
                    var dimension = $("#dimension-picker").val();
                    var video_id  = $("#email-video-id").val();
                
                    List.Controller.updateVideoCompletion(startDate, endDate, video_id, dimension, limit);   
                }
            });

            List.GenericDateDimensionView = List.GenericLayoutView.extend({
                template: genericDateDimensionViewTpl,

                initialize: function () {},

                onShow: function () {
                    this.initDatePickers();
                },
                
                events: {
                    'change #date-range-picker': 'setDateRange',
                    'change #dimension-picker': 'refreshStats',
                    'change #limit-picker': 'refreshStats'
                },

                regions: {
                    chartRegion: '.stats-container'
                },

                // Implement your own version of refreshStats here
                refreshStats: function () {
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate   = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var limit     = $("#limit-picker").val();
                    var dimension = $("#dimension-picker").val();
                    var self = this;
                
                    List.Controller.updatePlaycount(startDate, endDate, dimension, limit);
                }
            });

            List.VideoCommentsView = List.GenericLayoutView.extend({
                template: videoCommentsViewTpl,
                
                onShow: function () {
                    this.initDatePickers();
                    this.initVideoSelect2();
                },
                
                events: {
                    'change #date-range-picker': 'setDateRange',
                    'change #video-picker': 'refreshStats',
                    'click .js-pivot': 'changePivot'
                },

                regions: {
                    'videoStats': '.stats-container'
                },

                changePivot: function (e) {
                    $('.js-pivot.active').removeClass('active');
                    $(e.target).addClass('active');
                    this.refreshStats();
                },

                refreshStats: function() {
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate   = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var video_uid = $("#video-picker").val();
                    var pivot = $('.js-pivot.active').data('pivot');
                    List.Controller.updateVideoComments(startDate, endDate, video_uid, pivot);
                }
            });

            List.VideoCommentsItemView = Marionette.ItemView.extend({
                template: videoCommentsItemViewTpl,
                tagName: 'tr',
                
                onRender: function() {
                    this.attachUidToRow();
                    this.attachClickEvent();
                },

                attachUidToRow: function() {
                    $(this.$el).attr('data-uid', this.model.get('uid'));
                    $(this.$el).attr('data-title', this.model.get('title'));
                },

                attachClickEvent: function() {
                    var _this = this;
                    $(this.$el).children('td').each(function(index) {
                        $(this).click(function(e) {
                            var video_id    = ($(e.currentTarget).parent().data('uid') == '-') ? '' : $(e.currentTarget).parent().data('uid');
                            var source      = $(e.currentTarget).data('source');
                            var start_date  = moment($('#datepicker-start').datepicker("getDate")).format('YYYY-MM-DD');
                            var end_date    = moment($('#datepicker-end').datepicker("getDate")).format('YYYY-MM-DD');
                            $('.extra-row').remove();
                            List.Controller.getCommentsForVideo(start_date, end_date, video_id, source, e);
                        });
                    });
                }
            });

            List.VideoCommentsListView = Marionette.CompositeView.extend({
                template: videoCommentsListViewTpl,

                itemView: List.VideoCommentsItemView,

                itemViewContainer: '.js-analytics-grid',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                onRender: function() {
                    var total_pages = this.collection.totalPages;
                    var current_page = this.collection.currentPage;
                    var pages_in_range = this.collection.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
                },

                goToPageClicked: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
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
                }
            });

            List.CommentItemView = Marionette.ItemView.extend({
                template: commentItemViewTpl,
                tagName: 'tr',
                className: 'unread',

                onShow: function() {
                    if (this.model.get('replies').length > 0) {    
                        var replies = this.model.get('replies');
                        for (var i in replies) {
                            if (replies[i].is_new) {
                                $(this.$el).find('.js-reply-container').append(this.generateReplyHtml(replies[i],
                                    this.model.get('video_id'),
                                    this.model.get('host'),
                                    this.model.get('page'),
                                    this.model.get('video_title')));
                            }
                        }
                    }
                },

                generateReplyHtml: function(reply, videoID, host, page, video_title) {
                    var replyDOM = $('.reply-html').clone();
                    $(replyDOM).find('.commenter-name').prepend(reply.user.first_name + " " + reply.user.last_name);
                    $(replyDOM).find('.comment-body').append(reply.body + '<br/>');
                    $(replyDOM).find('.comment-date').append(moment(reply.created_at).calendar());             
                    if (reply.deleted) {
                        $(replyDOM).children().addClass('deleted');
                        $(replyDOM).find('.comment-date').append(' (DELETED)');
                    } else {
                        $(replyDOM).children().attr('data-video-id', videoID);
                        $(replyDOM).children().attr('data-parent-id', reply.parent_id);
                        $(replyDOM).find('.comment-body').append('<small class="js-reply-links"><a href="#" class="js-admin-reply">Reply</a> . <a href="#" class="js-admin-delete" data-comment-id="' + reply.id + '">Delete</a></small>');
                    }
                    $(replyDOM).find('.comment-date').append(' - <a href="'+ host + page+'" target="_blank">' + video_title +'</a>');
                    $(replyDOM).find('.fb-profile-pic').attr('src', reply.user.profile_image_url);
                    return replyDOM.html();
                },

                events: {
                    'click .js-admin-reply': 'adminReplies',
                    'click .js-admin-delete': 'adminDeletes',
                    'click .js-admin-cancel-reply': 'adminCancelReply',
                    'click .js-admin-submit-reply': 'adminSubmitReply'
                },

                adminReplies: function(e) {
                    e.preventDefault();
                    $('a.disable-link').removeClass('disable-link');
                    $(e.target).addClass('disable-link');
                    $('.admin-reply-box.active').remove();

                    var commentBodyDOM = $(e.target).closest('.media-body');
                    var videoID= commentBodyDOM.data('video-id');
                    var parentID = commentBodyDOM.data('parent-id');

                    var adminReplyBoxDOM = $('.admin-reply-box-template').clone();
                    adminReplyBoxDOM.children().addClass('active');
                    adminReplyBoxDOM.find('.js-admin-submit-reply').attr('data-video-id', videoID);
                    if (parentID) {
                        adminReplyBoxDOM.find('.js-admin-submit-reply').attr('data-parent-id', parentID);
                    }
                    if (!$(e.target).hasClass('is-parent')) {
                        adminReplyBoxDOM.children().addClass('replies-admin-reply-box');
                    }

                    commentBodyDOM.append(adminReplyBoxDOM.html());
                },

                adminSubmitReply: function(e) {
                    e.preventDefault();
                    var view = this;
                    var replyMessage = $(e.target).parent().siblings().val();
                    var videoID = $(e.target).data('video-id');
                    var parentID = $(e.target).data('parent-id');

                    var data;
                    if (parentID) {
                        data = {
                            body: replyMessage,
                            in_reply_to: parentID
                        };
                    } else {
                        data = {
                            body: replyMessage
                        };
                    }

                    $.ajax({
                        url: App.apiURL + 'admin/video/' + videoID + '/comment',
                        dataType: 'json',
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(data),
                        success: function(reply) {
                            jQuery.gritter.add({
                                title: 'Reply successfully posted.',
                                class_name: 'growl-success'
                            });
                            view.addReplyToView(reply, videoID);

                            // Remove text-area
                            $('a.disable-link').removeClass('disable-link');
                            $('.admin-reply-box.active').remove();
                        },
                        error: function() {
                            jQuery.gritter.add({
                                title: 'Error.',
                                class_name: 'growl-warning'
                            });
                        }
                    });
                },

                adminDeletes: function(e) {
                    var view = this;
                    e.preventDefault();
                    var commentID = $(e.target).data('comment-id');
                    var videoID = $(e.target).closest('.media-body').data('video-id');
                    if (confirm("Are you sure you want to silence this comment?")) {
                        $.ajax({
                            url: App.apiURL + 'admin/video/' + videoID + '/comment/' + commentID,
                            type: "DELETE",
                            success: function() {
                                jQuery.gritter.add({
                                    title: 'Comment deleted.',
                                    class_name: 'growl-success'
                                });
                                view.markCommentAsDeleted($(e.target).closest('.media-body'));
                            },
                            error: function() {
                                jQuery.gritter.add({
                                    title: 'Unable to delete comment.',
                                    class_name: 'growl-warning'
                                });
                            }
                        });
                    }
                },

                adminCancelReply: function(e) {
                    e.preventDefault();
                    $('a.disable-link').removeClass('disable-link');
                    $('.admin-reply-box.active').remove();
                },

                addReplyToView: function(reply, videoID) {
                    var host = this.model.get('host');
                    var page = this.model.get('page');
                    var video_title = this.model.get('video_title');
                    $(this.$el).find('.js-reply-container').append(this.generateReplyHtml(reply, videoID, host, page, video_title));
                },

                markCommentAsDeleted: function(commentDOM) {
                    $(commentDOM).find('.js-reply-links').remove();
                    $(commentDOM).addClass('deleted');
                    $(commentDOM).find('.comment-date').append(' (DELETED)');
                }
            }); //List.CommentItemView

            List.CommentListView = Marionette.CompositeView.extend({
                template: commentListViewTpl,

                itemView: List.CommentItemView,
                itemViewContainer: '.js-comment-list',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                events: {},

                onRender: function () {
                    this.attachLoadMore();
                },

                attachLoadMore: function() {
                    var view = this;
                    if (this.collection.currentPage < this.collection.totalPages-1) {
                        $('#load-more').removeClass('hidden');
                        $('#load-more').on('click', function(e){
                            e.preventDefault();
                            $('.js-paginate-comments').removeClass('hidden');
                            $('#load-more').addClass('hidden');
                            view.collection.nextPage({
                                remove: false,
                                success: function(data, status, jqXHR) {
                                    // This is a hack to get around Backbone.Paginator v1's lack of support for infinite mode
                                    var prevModels   = (view.collection.models.length == 0) ? [] : view.collection.models;
                                    view.collection.reset(prevModels.concat(data.models));
                                    $('.js-paginate-comments').addClass('hidden');
                                    if (data.has_more) $('#load-more').removeClass('hidden');
                                }
                            });
                        });
                    } else {
                        // Do not show the button
                        $('#load-more').addClass('hidden');
                    }
                }
            });

            List.VideoCompletionDataView = Marionette.ItemView.extend({
                template: genericChartViewTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                },

                onRender: function() {
                    this.initChart();
                    this.initParentView();
                },
                
                // Render child view's data to parent LayoutView's attribute
                initParentView: function() {
                    $("#page-title").text(this.model.get('page_title'));
                },

                padAndConvertToPercent: function(data, labels, name) { 
                // Takes an array of values arranged in desc order, 
                // convert to percentage, and pad to length 121 with 0's
                    if (data.length == 0) return [];
                    var max = data[0];
                    var res = new Array(121).fill(0);
                    res = res.map(function(x, index){
                        var obj = {
                            'value' : (index < data.length) ? (data[index]/max * 100).toPrecision(2) : 0,
                            'meta'  : labels[index],
                            'name'  : name,
                            'abs'   : data[index]
                        };
                        return obj;
                    });
                    return res;
                },

                initChartLegend: function(data) {
                    var legend = $('.ct-legend');

                    if (data.series.length > 0) {
                        legend.addClass('ct-legend-border');
                    } else {
                        legend.removeClass('ct-legend-border');
                    }

                    $.each(data.series, function(i, val) {
                        var listItem = $('<li />')
                            .addClass('ct-series-' + i)
                            .html('<strong>' + val[0]['name'] + '</strong> : ' + val[0]['abs'])
                            .appendTo(legend);
                    });
                },

                initChart: function() {
                    var self = this;
                    require(['chartist', 'chartist-tooltip'], function(Chartist) {
                        var labels = new Array(121).fill(0).map(function(x, i) {
                            return i;
                        });
                        var series = self.model.get('series').map(function(elem, i, arr){
                            return self.padAndConvertToPercent(elem.data, labels, elem.name);
                        });
                        var data = {
                            labels: labels,
                            series: series
                        };

                        self.initChartLegend(data);

                        var chart = new Chartist.Line('.ct-chart', data, {
                            // Remove this configuration to see that chart rendered with cardinal spline interpolation
                            // Sometimes, on large jumps in data values, it's better to use simple smoothing.
                            lineSmooth: Chartist.Interpolation.simple({
                                divisor: 5
                            }),
                            //fullWidth: true,
                            chartPadding: {
                                right: 20
                            },
                            low: 0,
                            showPoint: true,
                            axisX : {
                                labelInterpolationFnc : function(value, index) {
                                    return (index % 10 == 0) ? value + '%' : null;
                                }
                            },
                            axisY : {
                                type  : Chartist.FixedScaleAxis,
                                ticks : [0,10,20,30,40,50,60,70,80,90,100],
                                labelInterpolationFnc : function(value, index) {
                                    return value + '%';
                                }
                            },
                            plugins: [
                                Chartist.plugins.tooltip()
                            ]
                        });
                    });
                }
            });

            List.VideoPlaycountDataView = Marionette.ItemView.extend({
                template: genericChartViewTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                    // this.model.bind("change", _.bind(this.initCopyStat, this));
                },

                onRender: function() {
                    // Ensure the models are updated first
                    if (this.model.get('series')) {
                        this.initChart();
                        this.initParentView();
                    }
                },
                
                initParentView: function() {
                    $('#page-title').text(this.model.get('page_title'));
                },

                initChart: function() {
                    var self = this;
                    var sum = function(a, b) { return a + b; };
                    require(['chartist', 'chartist-tooltip'], function(Chartist) {
                        var data = {
                            labels: self.model.get('labels'),
                            series: self.model.get('series')
                        };
                        var options = {
                            chartPadding: 40,
                            labelOffset: 110,
                            labelDirection: 'explode',
                            labelInterpolationFnc: function(label) {
                                return Math.round(label['value'] / data.series.reduce(sum) * 100) + '%';
                            }
                        };
                        var responsiveOptions = [
                            ['screen and (min-width: 640px)', {
                                chartPadding: 40,
                                labelOffset: 110,
                                labelDirection: 'explode',
                                labelInterpolationFnc: function(label) {
                                    return Math.round(label['value'] / data.series.reduce(sum) * 100) + '%';
                                }
                            }],
                            ['screen and (min-width: 1024px)', {
                                chartPadding: 40,
                                labelOffset: 110,
                                labelDirection: 'explode'
                            }]
                        ];
                        var legend = $('.ct-legend');

                        if (data.labels.length > 0) {
                            legend.addClass('ct-legend-border');
                        } else {
                            legend.removeClass('ct-legend-border');
                        }

                        $.each(data.labels, function(i, val) {
                            var listItem = $('<li />')
                                .addClass('ct-series-' + i)
                                .html('<strong>' + val['meta'] + '</strong>: ' + data.series[i])
                                .appendTo(legend);
                        });

                        var chart = new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
                    });
                },
            });

            List.AnalyticsOverallView = Marionette.ItemView.extend({
                template: analyticsOverallViewTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                    // this.model.bind("change", _.bind(this.initCopyStat, this));
                },

                events: {
                },

                onRender: function () {
                },

                onShow: function () {
                    // this.initCopyStat();
                },

                showTrendsModal: function() {
                    List.Controller.showOverallTrends(this.model.get('start_date'), this.model.get('end_date'));
                },

                initCopyStat: function() {
                    var copyStat = document.querySelectorAll('.panel-stat');
                    for (var i = 0; i < copyStat.length; i++) {
                        $(copyStat[i]).click(function(e) {
                            copyTextToClipboard($(e.currentTarget).find('h3').html());
                        });
                    }
                }

            });

            List.AnalyticsOverallViewTrends = Marionette.ItemView.extend({
                template: analyticsOverallViewTrendsTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                    // this.model.bind("change", _.bind(this.initCopyStat, this));
                },

                onRender: function() {
                    // Ensure the models are updated first
                    if (this.model.get('hosted')) {
                        this.initChart();
                    }
                },

                onShow: function() {
                    this.fixChartistHiddenNodeProblem();
                },

                initChart: function() {
                    var self = this;
                    var numberOfDays = this.diffInDays(this.model.end_date, this.model.start_date) + 1;
                    var labels = this.getLabels(numberOfDays);
                    require(['chartist', 'chartist-tooltip'], function(Chartist) {
                        var data = {
                            labels: labels,
                            series: [
                                self.processData('total', numberOfDays),
                                self.processData('hosted', numberOfDays),
                                self.processData('youtube', numberOfDays),
                                self.processData('vimeo', numberOfDays),
                                self.processData('yahoo', numberOfDays)
                            ]
                        };

                        var chart = new Chartist.Line('.ct-chart', data, {
                            // Remove this configuration to see that chart rendered with cardinal spline interpolation
                            // Sometimes, on large jumps in data values, it's better to use simple smoothing.
                            lineSmooth: Chartist.Interpolation.simple({
                                divisor: 5
                            }),
                            fullWidth: true,
                            chartPadding: {
                                right: 20
                            },
                            low: 0,
                            showPoint: true,
                            plugins: [
                                Chartist.plugins.tooltip()
                            ]
                        });
                    });
                },

                // This is to fix Chartist not rendering the chart properly
                // as the parent was hidden and had no height or width.
                // We update Chartist manually after the modal is completely shown.
                // See: https://github.com/gionkunz/chartist-js/issues/119
                fixChartistHiddenNodeProblem: function() {
                    $('.js-modal-overall-trends').on('shown.bs.modal', function () {
                        document.querySelector('.ct-chart').__chartist__.update();
                    });
                },

                // Pads any missing values with null
                // And formats the data points fot Chartist tooltip plugin
                processData: function(type, supposedNumberOfDataPoints) {
                    var self = this;
                    var startDate = self.model.start_date;

                    var obj = self.model.get(type);
                    type = type.charAt(0).toUpperCase() + type.slice(1);
                    var newValues = [];
                    if (obj) {
                        // The data set starts from the starting date range, need
                        // to pad the back with nulls if there are missing dates, vice versa
                        if (self.diffInDays(obj.dates[0], startDate) === 0) {
                            for (var i = 0; i < supposedNumberOfDataPoints; i++) {
                                if (i < obj.dates.length) {
                                    newValues[i] = {
                                        meta: type + ' - ' + moment(obj.dates[i]).format('dddd, MMMM Do YYYY'),
                                        value: obj.values[i]
                                    };
                                } else {
                                    newValues[i] = null;
                                }
                            }
                        } else {
                            for (var i = self.diffInDays(obj.dates[0], startDate); i < supposedNumberOfDataPoints; i++) {
                                newValues[i] = {
                                    meta: type + ' - ' + moment(obj.dates[i]).format('dddd, MMMM Do YYYY'),
                                    value: obj.values[i]
                                };
                            }
                        }

                    }

                    return newValues;
                },

                // Checks if any two dates are on the same day
                diffInDays: function(dayX, dayY) {
                    var x = moment(dayX);
                    var y = moment(dayY);
                    return x.diff(y, 'days')
                },

                getLabels: function(numOfDays) {
                    var startDate = this.model.start_date;
                    var labels = [];

                    // Custom filtering for dates on the x-axis
                    // If the x-axis has more than 31 days, then we only show the months on
                    // 1st of each month
                    if (numOfDays > 31) {
                        for (var i = 0; i < numOfDays; i++) {
                            var currDateTime = moment(startDate).add(i, 'days');
                            var currDate = currDateTime.date();
                            if (currDate === 1) {
                                labels.push(currDateTime.format('MMMM YYYY'));
                            } else {
                                labels.push('');
                            }
                        }
                    } else {
                        for (var i = 0; i < numOfDays; i++) {
                            labels.push(moment(startDate).add(i, 'days').format('DD/MM'));
                        }
                    }

                    return labels;
                }

            });

            List.AnalyticsTrackerView = Marionette.ItemView.extend({
                template: analyticsTrackerViewTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                    this.model.bind("change", _.bind(this.initCopyStat, this));
                },

                onRender: function () {
                },

                onShow: function () {
                    this.initCopyStat();
                },

                initCopyStat: function() {
                    var copyStat = document.querySelectorAll('.tracker-value-container');
                    for (var i = 0; i < copyStat.length; i++) {
                        $(copyStat[i]).click(function(e) {
                            copyTextToClipboard($(e.currentTarget).html());
                        });
                    }
                }
            });

            List.AnalyticsSubscribersView = Marionette.ItemView.extend({
                template: analyticsSubscriberViewTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                },

                onRender: function () {
                },

                onShow: function () {
                },

                initCopyStat: function() {
                    var copyStat = document.querySelectorAll('.panel-stat.special-copy');
                    for (var i = 0; i < copyStat.length; i++) {
                        $(copyStat[i]).click(function(e) {
                            copyTextToClipboard($(e.currentTarget).find('h3').html());
                        });
                    }
                }
            });

            List.AnalyticsInteractionView = Marionette.ItemView.extend({
                template: analyticsInteractionViewTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                    this.model.bind("change", _.bind(this.initCopyStat, this));
                },

                onRender: function () {
                },

                onShow: function () {
                    this.initCopyStat();
                },

                initCopyStat: function() {
                    var copyStat = document.querySelectorAll('.panel-stat.copy-to-clipboard');
                    for (var i = 0; i < copyStat.length; i++) {
                        $(copyStat[i]).click(function(e) {
                            copyTextToClipboard($(e.currentTarget).find('h3').html());
                        });
                    }
                }
            });

            List.AnalyticsItemView = Marionette.ItemView.extend({
                template: analyticsItemViewTpl
            });

            List.AnalyticsListView = Marionette.CompositeView.extend({
                template: analyticsListViewTpl,

                //itemView: List.AnalyticsItemView,
                //itemViewContainer: '.js-analytics-list-container',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                onRender: function () {
                },

                events: {}
            });

            List.VideoAnalyticsTrends = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-overall-trends modal-overall-trends",
                template: analyticsOverallViewTrendsTpl,

                initialize: function () {
                    this.model.bind("change", _.bind(this.render, this));
                    // this.model.bind("change", _.bind(this.initCopyStat, this));
                },

                onRender: function() {
                    // Ensure the models are updated first
                    if (this.model.get('total')) {
                        this.initChart();
                    }
                },

                onShow: function() {
                    this.fixChartistHiddenNodeProblem();
                },

                initChart: function() {
                    var self = this;
                    var numberOfDays = this.diffInDays(this.model.end_date, this.model.start_date) + 1;
                    var labels = this.getLabels(numberOfDays);
                    require(['chartist', 'chartist-tooltip'], function(Chartist) {
                        var data = {
                            labels: labels,
                            series: [
                                self.processData('total', numberOfDays),
                                self.processData('hosted', numberOfDays),
                                self.processData('youtube', numberOfDays),
                                self.processData('vimeo', numberOfDays),
                                self.processData('yahoo', numberOfDays)
                            ]
                        };

                        var chart = new Chartist.Line('.ct-chart', data, {
                            // Remove this configuration to see that chart rendered with cardinal spline interpolation
                            // Sometimes, on large jumps in data values, it's better to use simple smoothing.
                            lineSmooth: Chartist.Interpolation.simple({
                                divisor: 5
                            }),
                            //fullWidth: true,
                            chartPadding: {
                                right: 20
                            },
                            low: 0,
                            showPoint: true,
                            plugins: [
                                Chartist.plugins.tooltip()
                            ]
                        });
                    });
                },

                // This is to fix Chartist not rendering the chart properly
                // as the parent was hidden and had no height or width.
                // We update Chartist manually after the modal is completely shown.
                // See: https://github.com/gionkunz/chartist-js/issues/119
                fixChartistHiddenNodeProblem: function() {
                    $('.js-modal-overall-trends').on('shown.bs.modal', function () {
                        document.querySelector('.ct-chart').__chartist__.update();
                    });
                },

                // Pads any missing values with null
                // And formats the data points fot Chartist tooltip plugin
                processData: function(type, supposedNumberOfDataPoints) {
                    var self = this;
                    var startDate = self.model.start_date;

                    var obj = self.model.get(type);
                    type = type.charAt(0).toUpperCase() + type.slice(1);
                    var newValues = [];
                    if (obj) {
                        // The data set starts from the starting date range, need
                        // to pad the back with nulls if there are missing dates, vice versa
                        if (self.diffInDays(obj.dates[0], startDate) === 0) {
                            for (var i = 0; i < supposedNumberOfDataPoints; i++) {
                                if (i < obj.dates.length) {
                                    newValues[i] = {
                                        meta: type + ' - ' + moment(obj.dates[i]).format('dddd, MMMM Do YYYY'),
                                        value: obj.values[i]
                                    };
                                } else {
                                    newValues[i] = null;
                                }
                            }
                        } else {
                            var diffInDays = self.diffInDays(obj.dates[0], startDate);
                            for (var i = 0; i < diffInDays; i++) {
                                newValues[i] = null;
                            }
                            for (var i = diffInDays; i < supposedNumberOfDataPoints; i++) {
                                newValues[i] = {
                                    meta: type + ' - ' + moment(obj.dates[i - diffInDays]).format('dddd, MMMM Do YYYY'),
                                    value: obj.values[i - diffInDays]
                                };
                            }
                        }

                    }

                    return newValues;
                },

                // Checks if any two dates are on the same day
                diffInDays: function(dayX, dayY) {
                    var x = moment(dayX);
                    var y = moment(dayY);
                    return x.diff(y, 'days')
                },

                getLabels: function(numOfDays) {
                    var startDate = this.model.start_date;
                    var labels = [];

                    // Custom filtering for dates on the x-axis
                    // If the x-axis has more than 31 days, then we only show the months on
                    // 1st of each month
                    if (numOfDays > 31) {
                        for (var i = 0; i < numOfDays; i++) {
                            var currDateTime = moment(startDate).add(i, 'days');
                            var currDate = currDateTime.date();
                            if (currDate === 1) {
                                labels.push(currDateTime.format('MMMM YYYY'));
                            } else {
                                labels.push('');
                            }
                        }
                    } else {
                        for (var i = 0; i < numOfDays; i++) {
                            labels.push(moment(startDate).add(i, 'days').format('DD/MM'));
                        }
                    }

                    return labels;
                }

            });

            List.VideoAnalyticsItemView = Marionette.ItemView.extend({
                template: videoAnalyticsItemViewTpl,
                tagName: 'tr',

                events: {
                    "click .js-show-video-trends": 'showTrend'
                },

                onRender: function() {
                    this.attachUidToRow();
                    this.attachClickEvent();
                },

                attachUidToRow: function() {
                    $(this.$el).attr('data-uid', this.model.get('uid'));
                    $(this.$el).attr('data-title', this.model.get('title'));
                },

                attachClickEvent: function() {
                    var _this = this;
                    $(this.$el).click(function(e) {
                        var video_id = $(e.currentTarget).data('uid');
                        var video_title = $(e.currentTarget).data('title');
                        var start_date = moment($('#datepicker-start').datepicker("getDate")).format('YYYY-MM-DD');
                        var end_date= moment($('#datepicker-end').datepicker("getDate")).format('YYYY-MM-DD');

                        $('.extra-row').remove();
                        List.Controller.getVideoTrends(start_date, end_date, video_id, video_title, e);
                    });
                }
            });

            List.VideoAnalyticsListView = Marionette.CompositeView.extend({
                template: videoAnalyticsListViewTpl,
                regions: {
                    trendArea: '.video-trend-container'
                },

                itemView: List.VideoAnalyticsItemView,
                itemViewContainer: '.js-analytics-grid',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                onRender: function () {
                    var total_pages = this.collection.totalPages;
                    var current_page = this.collection.currentPage;
                    var pages_in_range = this.collection.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
                },

                onShow: function () {

                },

                goToPageClicked: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
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
                }
            });

            List.VideoAnalyticsView = List.GenericLayoutView.extend({
                template: videoAnalyticsViewTpl,

                initialize: function () {
                    this.pivot = '';
                },

                regions: {
                    'videoStats': '.table-responsive.videos-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange',
                    'keypress .js-tf-search': 'searchByTitle',
                    'click .js-reset-search': 'resetTitleSearch',
                    'click .js-pivot': 'changePivot'
                },

                searchByTitle: function (e) {
                    if (e.which === 13) {
                        $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');

                        var searchString = $(e.target).val();
                        if (searchString === '') return;

                        var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                        var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                        var pivot = $('.js-pivot.active').data('pivot');
                        List.Controller.updateVideoAnalytics(startDate, endDate, pivot, searchString);
                    }
                },

                changePivot: function (e) {
                    $('.js-pivot.active').removeClass('active');
                    $(e.target).addClass('active');
                    this.refreshStats();
                },

                resetTitleSearch: function (e) {
                    e.preventDefault();
                    $('.js-tf-search').val('');
                    this.refreshStats();
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var searchString = $('.js-tf-search').val();
                    var pivot = $('.js-pivot.active').data('pivot');

                    List.Controller.updateVideoAnalytics(startDate, endDate, pivot, searchString);
                }
            });

            List.DomainAnalyticsItemView = Marionette.ItemView.extend({
                template: domainAnalyticsItemViewTpl,
                tagName: 'tr',

                onShow: function () {
                    this.attachExpandEvent();
                },

                attachExpandEvent: function() {
                    var self = this;
                    $(this.$el).click(function () {
                        var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                        var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                        var domain = $($(self.$el).find('td').get()[1]).html();

                        var data = {
                            start_date: startDate,
                            end_date: endDate,
                            domain: domain
                        };

                        $.ajax({
                            url: App.apiURL + 'admin/analytics/videos_for_domain',
                            dataType: 'json',
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(data),
                            success: function(reply) {
                                $(self.$el).unbind('click');
                                self.showVideoBreakdown(reply.results);
                            },
                            error: function() {

                            }
                        });
                    });
                },

                showVideoBreakdown: function(res) {
                    var videoBreakdown = '';
                    for (var i in res) {
                        var video = res[i];
                        var title = video.title;
                        var totalPlays = video.total_plays;
                        var uid = video.uid;

                        var self = this;
                        videoBreakdown += '<small class="breakdown-container"><br />'+title+' - '+totalPlays+'</small>';
                    }
                    var videoBreakdownObject = $(videoBreakdown);
                    $($(this.el).find('td').get()[1]).append(videoBreakdownObject);
                    $(this.$el).click(function() {
                        videoBreakdownObject.remove();
                        $(self.$el).unbind('click');
                        self.attachExpandEvent();
                    });
                }
            });

            List.DomainAnalyticsListView = Marionette.CompositeView.extend({
                template: domainAnalyticsListViewTpl,

                itemView: List.DomainAnalyticsItemView,
                itemViewContainer: '.js-analytics-grid',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                }
            });

            List.DomainAnalyticsView = List.GenericLayoutView.extend({
                template: domainAnalyticsViewTpl,

                regions: {
                    'videoStats': '.table-responsive.domains-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateDomainAnalytics(startDate, endDate);
                }
            });

            List.DomainsByVideoAnalyticsItemView = Marionette.ItemView.extend({
                template: domainsByVideoItemViewTpl,
                tagName: 'tr',
            });

            List.DomainsByVideoAnalyticsListView = Marionette.CompositeView.extend({
                template: domainsByVideoListViewTpl,

                itemView: List.DomainsByVideoAnalyticsItemView,
                itemViewContainer: '.js-analytics-grid',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                }
            });

            List.DomainsByVideoAnalyticsView = List.GenericLayoutView.extend({
                template: domainsByVideoViewTpl,

                regions: {
                    'videoStats': '.table-responsive.domains-table'
                },

                onShow: function () {
                    this.initDatePickers();
                    this.initVideoSelect2();
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateDomainsByVideoAnalytics(startDate, endDate, this.value);
                }
            });

            List.TrackerAnalyticsItemView = Marionette.ItemView.extend({
                template: trackerAnalyticsItemViewTpl,
                tagName: 'tr',

                onShow: function () {
                    this.attachExpandEvent();
                },

                attachExpandEvent: function() {
                    var self = this;
                    $(this.$el).click(function () {
                        var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                        var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                        var uid = $($(self.$el).find('td').get()[0]).data('uid');

                        var data = {
                            start_date: startDate,
                            end_date: endDate,
                            video_id: uid
                        };

                        $.ajax({
                            url: App.apiURL + 'admin/analytics/tracker_for_video',
                            dataType: 'json',
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(data),
                            success: function(reply) {
                                self.showVideoBreakdown(reply.start_date, reply.end_date, reply.results);
                            },
                            error: function() {

                            }
                        });
                    });
                },

                showVideoBreakdown: function(start_date, end_date, res) {
                    List.Controller.trackerModalView(this.model.get('title'), start_date, end_date, res);
                }
            });

            List.TrackerAnalyticsListView = Marionette.CompositeView.extend({
                template: trackerAnalyticsListViewTpl,

                itemView: List.TrackerAnalyticsItemView,
                itemViewContainer: '.js-analytics-grid',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                onRender: function () {
                    var total_pages = this.collection.totalPages;
                    var current_page = this.collection.currentPage;
                    var pages_in_range = this.collection.pagesInRange;
                    this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
                },

                onShow: function () {

                },

                goToPageClicked: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
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
                }
            });

            List.TrackerAnalyticsView = List.GenericLayoutView.extend({
                template: trackerAnalyticsViewTpl,

                initialize: function () {
                },

                regions: {
                    'videoStats': '.table-responsive.videos-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange',
                    'keypress .js-tf-search': 'searchByTitle',
                    'click .js-reset-search': 'resetTitleSearch'
                },

                searchByTitle: function (e) {
                    if (e.which === 13) {
                        $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');

                        var searchString = $(e.target).val();
                        if (searchString === '') return;

                        var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                        var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                        List.Controller.updateTrackerAnalytics(startDate, endDate, searchString);
                    }
                },

                resetTitleSearch: function (e) {
                    e.preventDefault();
                    $('.js-tf-search').val('');
                    this.refreshStats();
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var searchString = $('.js-tf-search').val();

                    List.Controller.updateTrackerAnalytics(startDate, endDate, searchString);
                }
            });

            List.TrackerAnalyticsModalView = Marionette.ItemView.extend({
                tagName: "div",
                className: "modal fade js-modal-tracker tracker-modal-container",
                template: trackerAnalyticsModalView,

                onShow: function () {
                }

            }); // Email.CreateEmailModalView

            List.ContentAnalyticsViewOld = List.GenericLayoutView.extend({
                template: contentAnalyticsViewTplOld,

                regions: {
                    'contentStats': '.table-responsive.content-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateContentAnalyticsOld(startDate, endDate);
                }
            });

            List.ContentAnalyticsView = List.GenericLayoutView.extend({
                template: contentAnalyticsViewTpl,

                regions: {
                    'contentStats': '.table-responsive.content-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange',
                    'change #pivot-picker' : 'refreshStats'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var pivot   = $('#pivot-picker').val();

                    List.Controller.updateContentAnalytics(startDate, endDate, pivot);
                }
            });

            List.ContentAnalyticsListViewOld = Marionette.CompositeView.extend({
                template: contentAnalyticsListViewTplOld,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                    this.insertRows();
                },

                events: {
                    'click .content-tabs': 'attachTabEvents'
                },

                onShow: function () {
                },

                attachTabEvent: function(e) {
                    var tab = e.target.attributes['href'].value.substring(1);
                    $('.tab-pane').removeClass('active');
                    $('#' + tab).addClass('active');
                },

                insertRows: function() {
                    var publishedHTML = '';
                    for (var i in this.model.get('published_countries')) {
                        var country = this.model.get('published_countries')[i];
                        publishedHTML += '<tr><td>' + country.country + '</td><td>' + country.total + '</td></tr>';
                    }
                    publishedHTML += '<tr><td><strong>TOTAL</strong></td><td><strong>' + this.model.get('published') + '</strong></td></tr>';
                    $('#published_countries > tbody').html(publishedHTML);

                    var submittedHTML = '';
                    var approvedTotal = 0, rejectedTotal = 0, pendingTotal = 0, moreinfoTotal = 0, fasttrackTotal = 0,
                        referralsTotal = 0;
                    for (var i in this.model.get('submitted_countries')) {
                        var country = this.model.get('submitted_countries')[i];
                        var approved = (country.approved) ? country.approved : 0;
                        var rejected = (country.rejected) ? country.rejected : 0;
                        var pending = (country.pending) ? country.pending : 0;
                        var moreinfo = (country.moreinfo) ? country.moreinfo : 0;
                        var fasttrack = (country.fasttrack) ? country.fasttrack : 0;

                        approvedTotal += approved;
                        rejectedTotal += rejected;
                        pendingTotal += pending;
                        moreinfoTotal += moreinfo;
                        fasttrackTotal += fasttrack;

                        submittedHTML += '<tr><td>' + country.country + '</td>';
                        submittedHTML += '<td>' + country.total + '</td>';
                        submittedHTML += '<td>' + approved + '</td>';
                        submittedHTML += '<td>' + rejected + '</td>';
                        submittedHTML += '<td>' + pending + '</td>';
                        submittedHTML += '<td>' + fasttrack + '</td>';
                        submittedHTML += '<td>' + moreinfo + '</td>';
                        submittedHTML += '</tr>';
                    }
                    submittedHTML += '<tr><td><strong>TOTAL</strong></td>';
                    submittedHTML += '<td><strong>' + this.model.get('submissions') + '</strong></td>';
                    submittedHTML += '<td><strong>' + approvedTotal + '</strong></td>';
                    submittedHTML += '<td><strong>' + rejectedTotal + '</strong></td>';
                    submittedHTML += '<td><strong>' + pendingTotal + '</strong></td>';
                    submittedHTML += '<td><strong>' + fasttrackTotal + '</strong></td>';
                    submittedHTML += '<td><strong>' + moreinfoTotal + '</strong></td>';
                    submittedHTML += '</tr>';
                    $('#submitted_countries > tbody').html(submittedHTML);

                    var referralHTML = '';
                    var totalReferrals = 0;
                    for (var i in this.model.get('approved_referrals')) {
                        var referral = this.model.get('approved_referrals')[i];
                        totalReferrals += referral.referrals;
                        referralHTML += '<tr><td>' + referral.referral + '</td><td>' + referral.referrals + '</td></tr>';
                    }
                    if (this.model.get('approved_referrals')) {
                        referralHTML += '<tr><td><strong>TOTAL</strong></td><td><strong>' + totalReferrals + '</strong></td></tr>';
                    }
                    $('#referrals > tbody').html(referralHTML);

                    var processedHTML = '';
                    var procApprovedTotal = 0, procRejectedTotal = 0;
                    for (var i in this.model.get('processed_countries')) {
                        var country = this.model.get('processed_countries')[i];
                        var approved = (country.approved) ? country.approved : 0;
                        var rejected = (country.rejected) ? country.rejected : 0;

                        procApprovedTotal += approved;
                        procRejectedTotal += rejected;

                        processedHTML += '<tr><td>' + country.country + '</td>';
                        processedHTML += '<td>' + country.total + '</td>';
                        processedHTML += '<td>' + approved + '</td>';
                        processedHTML += '<td>' + rejected + '</td>';
                        processedHTML += '</tr>';
                    }
                    processedHTML += '<tr><td><strong>TOTAL</strong></td>';
                    processedHTML += '<td><strong>' + this.model.get('processed') + '</strong></td>';
                    processedHTML += '<td><strong>' + procApprovedTotal + '</strong></td>';
                    processedHTML += '<td><strong>' + procRejectedTotal + '</strong></td>';
                    processedHTML += '</tr>';
                    $('#processed_countries > tbody').html(processedHTML);

                    var processedReferralHTML = '';
                    var totalProcessedReferrals = 0;
                    for (var i in this.model.get('processed_approved_referrals')) {
                        var referral = this.model.get('processed_approved_referrals')[i];
                        totalProcessedReferrals += referral.referrals;
                        processedReferralHTML += '<tr><td>' + referral.referral + '</td><td>' + referral.referrals + '</td></tr>';
                    }
                    if (this.model.get('processed_approved_referrals')) {
                        processedReferralHTML += '<tr><td><strong>TOTAL</strong></td><td><strong>' + totalProcessedReferrals + '</strong></td></tr>';
                    }
                    $('#processed_approved_referrals > tbody').html(processedReferralHTML);
                }

            });

            List.ContentAnalyticsListView = Marionette.CompositeView.extend({
                template: contentAnalyticsListViewTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                    this.insertRows();
                },

                events: {
                    'click .content-tabs': 'attachTabEvents'
                },

                onShow: function () {
                },

                attachTabEvent: function(e) {
                    var tab = e.target.attributes['href'].value.substring(1);
                    $('.tab-pane').removeClass('active');
                    $('#' + tab).addClass('active');
                },

                insertRows: function() {
                    var videoSubmissionHTML = '';
                    var videoSubmissions    = this.model.get('video_submissions');
                    var videos              = this.model.get('videos');

                    var submittedTotal         = 0;
                    var processedTotalTotal    = 0;
                    var processedApprovedTotal = 0;
                    var processedRejectedTotal = 0;
                    var publishedTotal         = 0;
                    var programmedTotal        = 0;

                    for (var key in videoSubmissions) {
                        if(videoSubmissions.hasOwnProperty(key)) {
                            var submittedCount         = (typeof(videoSubmissions[key]['submitted']) == 'undefined') ? 0 : videoSubmissions[key]['submitted'];
                            var processedApprovedCount = (typeof(videoSubmissions[key]['processed_approved']) == 'undefined') ? 0 : videoSubmissions[key]['processed_approved'];
                            var processedRejectedCount = (typeof(videoSubmissions[key]['processed_rejected']) == 'undefined') ? 0 : videoSubmissions[key]['processed_rejected'];
                            var processedTotalCount    = (typeof(videoSubmissions[key]['processed_total']) == 'undefined') ? 0 : videoSubmissions[key]['processed_total'];
                            
                            submittedTotal             += submittedCount;
                            processedTotalTotal        += processedTotalCount;
                            processedApprovedTotal     += processedApprovedCount;
                            processedRejectedTotal     += processedRejectedCount;

                            videoSubmissionHTML += "<tr><td>" + key + "</td><td>" + submittedCount + "</td><td>" + processedApprovedCount + "</td><td>"
                                                + processedRejectedCount + "</td><td>" + processedTotalCount + "</td></tr>";
                        }
                    }
                    videoSubmissionHTML += '<tr><td><strong>TOTAL</strong></td><td><strong>' + submittedTotal + '</strong></td><td><strong>' 
                                        + processedApprovedTotal + '</strong></td><td><strong>' + processedRejectedTotal + '</strong></td><td><strong>' 
                                        + processedTotalTotal + '</strong></td></tr>';
                    $('#video_submissions > tbody').html(videoSubmissionHTML);

                    var videoHTML = '';
                    for(var key in videos) {
                        if(videos.hasOwnProperty(key)) {
                            var programmedCount = (typeof(videos[key]['programmed']) == 'undefined') ? 0 : videos[key]['programmed'];
                            var publishedCount  = (typeof(videos[key]['published']) == 'undefined') ? 0 : videos[key]['published'];
                            publishedTotal      += publishedCount;
                            programmedTotal     += programmedCount;
                            videoHTML += '<tr><td>' + key + '</td><td>' + publishedCount + '</td><td>' + programmedCount + '</td></tr>';
                        }
                    }
                    videoHTML += '<tr><td><strong>TOTAL</strong></td><td><strong>' + publishedTotal + '</strong></td><td><strong>' + programmedTotal + '</strong></td></tr>';
                    $('#videos > tbody').html(videoHTML);
                }
            });

            List.GAMauAnalyticsView = List.GenericLayoutView.extend({
                template: GAMauAnalyticsViewTpl,

                regions: {
                    'mauStats': '.table-responsive.content-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange',
                    'change #segment-picker': 'refreshStats'
                },
                
                checkAndSetDateRange: function (callback) {
                    var segment = $('#segment-picker').val();

                    if (segment == 'signed in') {
                        var startDate = $('#datepicker-start').datepicker("getDate");
                        var endDate   = $('#datepicker-end').datepicker("getDate");
                        var daydiff   = (endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000 * 24); // Get number of days in between
                        // Set start and end date to a proper date range at most 90 days in between
                        // GA cannot display user segment data for date range of more than 90 days
                        if (daydiff >= 90) {
                            var newEndDate = new Date(startDate.getTime() + (1000 * 60 * 60 * 24 * 89));
                            $('#datepicker-end').datepicker("setDate", newEndDate);
                        }
                    }
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    this.checkAndSetDateRange();
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));
                    var segment = $('#segment-picker').val();
                    List.Controller.updateGAMauAnalytics(startDate, endDate, segment);
                }
            });

            List.GAMauAnalyticsListView = Marionette.CompositeView.extend({
                template: GAMauAnalyticsListViewTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                    this.initCopyStat();
                },

                onRender: function () {
                    this.initCountryHashMap();
                    this.insertRows();
                },

                events: {
                    'click .content-tabs': 'attachTabEvents'
                },

                onShow: function () {
                },

                initCountryHashMap: function(e) {
                    this.countryHashMap = {
                        'viddsee' : {},
                        'buzz'    : {},
                        'zh_buzz' : {},
                        'id_buzz' : {},
                        'embed'   : {},
                        'ios'     : {},
                        'android' : {},
                        'total'   : {}
                    };
                },

                attachTabEvent: function(e) {
                    var tab = e.target.attributes['href'].value.substring(1);
                    $('.tab-pane').removeClass('active');
                    $('#' + tab).addClass('active');
                },

                insertRows: function() {

                    var viddseeHTML = '';
                    var viddseeTotal = 0;
                    for (var i in this.model.get('viddsee')) {
                        var country = this.model.get('viddsee')[i];
                        viddseeTotal += parseInt(country[1]);
                        viddseeHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    viddseeHTML = '<tr><td><strong>Total</strong></td><td><strong>' + viddseeTotal + '</strong></td></tr>' + viddseeHTML;
                    $('#viddsee > tbody').html(viddseeHTML);

                    var buzzHTML = '';
                    var buzzTotal = 0;
                    for (var i in this.model.get('buzz')) {
                        var country = this.model.get('buzz')[i];
                        buzzTotal += parseInt(country[1]);
                        buzzHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    buzzHTML = '<tr><td><strong>Total</strong></td><td><strong>' + buzzTotal + '</strong></td></tr>' + buzzHTML;
                    $('#buzz > tbody').html(buzzHTML);

                    var zh_buzz_html = '';
                    var zh_buzz_total = 0;
                    for (var i in this.model.get('zh_buzz')) {
                        var country = this.model.get('zh_buzz')[i];
                        zh_buzz_total += parseInt(country[1]);
                        zh_buzz_html += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    zh_buzz_html = '<tr><td><strong>Total</strong></td><td><strong>' + zh_buzz_total + '</strong></td></tr>' + zh_buzz_html;
                    $('#zh_buzz > tbody').html(zh_buzz_html);

                    var id_buzz_html = '';
                    var id_buzz_total = 0;
                    for (var i in this.model.get('id_buzz')) {
                        var country = this.model.get('id_buzz')[i];
                        id_buzz_total += parseInt(country[1]);
                        id_buzz_html += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    id_buzz_html = '<tr><td><strong>Total</strong></td><td><strong>' + id_buzz_total + '</strong></td></tr>' + id_buzz_html;
                    $('#id_buzz > tbody').html(id_buzz_html);

                    var embedHTML = '';
                    var embedTotal = 0;
                    for (var i in this.model.get('embed')) {
                        var country = this.model.get('embed')[i];
                        embedTotal += parseInt(country[1]);
                        embedHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    embedHTML = '<tr><td><strong>Total</strong></td><td><strong>' + embedTotal + '</strong></td></tr>' + embedHTML;
                    $('#embed > tbody').html(embedHTML);

                    var iosHTML = '';
                    var iosTotal = 0;
                    for (var i in this.model.get('ios')) {
                        var country = this.model.get('ios')[i];
                        iosTotal += parseInt(country[1]);
                        iosHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    iosHTML = '<tr><td><strong>Total</strong></td><td><strong>' + iosTotal + '</strong></td></tr>' + iosHTML;
                    $('#ios > tbody').html(iosHTML);

                    var androidHTML = '';
                    var androidTotal = 0;
                    for (var i in this.model.get('android')) {
                        var country = this.model.get('android')[i];
                        androidTotal += parseInt(country[1]);
                        androidHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    androidHTML = '<tr><td><strong>Total</strong></td><td><strong>' + androidTotal + '</strong></td></tr>' + androidHTML;
                    $('#android > tbody').html(androidHTML);
                    
                    var platformTotal = {
                        'viddsee' : viddseeTotal,
                        'buzz'    : buzzTotal,
                        'zh_buzz' : zh_buzz_total,
                        'id_buzz' : id_buzz_total,
                        'embed'   : embedTotal,
                        'ios'     : iosTotal,
                        'android' : androidTotal
                    };
                    var total = this.getCountryTotalAcrossAllPlatforms(platformTotal);
                    var totalHTML = "<tr><td><strong>Total</strong></td><td><strong>" + total[0][1] + "</strong></td></tr>";
                    for (var i in total) {
                        if (i > 0) { // Omit first as it has already been done
                            var country = total[i];
                            totalHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                        }
                    }
                    $('#total > tbody').html(totalHTML);
                },

                getCountryTotalAcrossAllPlatforms: function(platformTotal) {
                    var self = this;
                    var viddsee = [['Total', platformTotal['viddsee']]].concat(this.model.get('viddsee'));
                    var buzz    = [['Total', platformTotal['buzz']]].concat(this.model.get('buzz'));
                    var zh_buzz = [['Total', platformTotal['zh_buzz']]].concat(this.model.get('zh_buzz'));
                    var id_buzz = [['Total', platformTotal['id_buzz']]].concat(this.model.get('id_buzz'));
                    var embed   = [['Total', platformTotal['embed']]].concat(this.model.get('embed'));
                    var ios     = [['Total', platformTotal['ios']]].concat(this.model.get('ios'));
                    var android = [['Total', platformTotal['android']]].concat(this.model.get('android'));
                    var total   = [['Total', 0]];
                    var countriesObject = {};
                    var platforms = [viddsee, buzz, zh_buzz, id_buzz, embed, ios, android, total];
                    platforms.forEach(function(platform, i, p_arr) {
                        if (!platform) {
                            return;
                        }
                        var platform_name;
                        switch(i) {
                            case 0:
                                platform_name = 'viddsee';
                                break;
                            case 1:
                                platform_name = 'buzz';
                                break;
                            case 2:
                                platform_name = 'zh_buzz';
                                break;
                            case 3:
                                platform_name = 'id_buzz';
                                break;
                            case 4:
                                platform_name = 'embed';
                                break;
                            case 5:
                                platform_name = 'ios';
                                break;
                            case 6:
                                platform_name = 'android';
                                break;
                            case 7:
                                platform_name = 'total';
                                break;
                            default:
                                platform_name = '';
                        }
                        platform.forEach(function(country, j, c_arr) {
                            var countryName = country[0];
                            var value = country[1];
                            // Create hashmap of country -> value mapping by platform
                            if (platform_name != 'total' && countryName != 'total') {
                                this.countryHashMap[platform_name][countryName] = parseInt(value);
                            }
                            if (countriesObject[countryName]) {
                                countriesObject[countryName] += parseInt(value);
                                this.countryHashMap['total'][countryName] += parseInt(value);
                            } else {
                                countriesObject[countryName] = parseInt(value);
                                this.countryHashMap['total'][countryName] = parseInt(value);
                            }
                        }, this);
                    }, self);
                    
                    return this.sortObjectIntoArray(countriesObject);
                },

                sortObjectIntoArray: function(countriesObject) {
                    var countriesArray = [];
                    for (var country in countriesObject) {
                        countriesArray.push([country, countriesObject[country]]);
                    }
                    countriesArray.sort(function(a, b) {
                        return b[1] - a[1];
                    });
                    return countriesArray;
                },

                initCopyStat: function() {
                    var self = this;
                    $(document).off('mouseover', '.table.table-hover.table-fixed')
                               .on('mouseover', '.table.table-hover.table-fixed', function(e) {
                        $(this).css('cursor', 'pointer');
                    });
                    $(document).off('mouseout', '.table.table-hover.table-fixed')
                               .on('mouseout', '.table.table-hover.table-fixed', function(e) {
                        $(this).css('cursor', 'default');
                    });
                    // Use event delegation to attach handlers on dynamic elements
                    $(document).off('click','.table.table-hover.table-fixed')
                               .on('click', '.table.table-hover.table-fixed', function(e) { 
                        var results = [];
                        // Order of countries is taken from total tab
                        var order     = $('table#total > tbody > tr > td:first-child').toArray();
                        var platforms = ['viddsee', 'buzz', 'zh_buzz', 'id_buzz', 'embed', 'ios', 'android', 'total'];
                        // Headers
                        results.push([platforms.reduce(function(prev,curr){
                            return prev + "\t" + curr;
                        }, '') + '\r\n']);
                        // First row

                        // Rows
                        order.forEach(function(country, i, arr){
                            var countryName = $(country).text();
                            var row = [countryName + '\t'];
                            platforms.forEach(function(platform, j, p_arr) {
                                var value = (typeof(self.countryHashMap[platform][countryName]) == 'undefined') ? 0 : self.countryHashMap[platform][countryName];
                                if (j == p_arr.length-1) {
                                    value = value.toString() + '\r\n' // next row
                                } else {
                                    value = value.toString() + '\t' // next column
                                }
                                row.push(value);
                            });
                            results.push(row);
                        });
                        // flatten arrays
                        results = results.reduce(function(prev, curr) {
                            return prev.concat(curr);
                        }, []);

                        var text = results.reduce(function(acc, curr) {
                            return acc += curr;
                        }, '');
                        
                        copyTextToClipboard(text);
                    });
                }
            });

            List.GAMobileAnalyticsListView = Marionette.CompositeView.extend({
                template: GAMobileAnalyticsListViewTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                    this.insertRows();
                },

                events: {
                    'click .content-tabs': 'attachTabEvents'
                },

                onShow: function () {
                },

                attachTabEvent: function(e) {
                    var tab = e.target.attributes['href'].value.substring(1);
                    $('.tab-pane').removeClass('active');
                    $('#' + tab).addClass('active');
                },

                insertRows: function() {
                    var iosHTML = '';
                    var iosTotal = 0;
                    for (var i in this.model.get('ios')) {
                        var country = this.model.get('ios')[i];
                        iosTotal += parseInt(country[1]);
                        iosHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    iosHTML = '<tr><td><strong>Total</strong></td><td><strong>' + iosTotal + '</strong></td></tr>' + iosHTML;
                    $('#ios > tbody').html(iosHTML);

                    var androidHTML = '';
                    var androidTotal = 0;
                    for (var i in this.model.get('android')) {
                        var country = this.model.get('android')[i];
                        androidTotal += parseInt(country[1]);
                        androidHTML += '<tr><td>' + country[0] + '</td><td>' + country[1] + '</td></tr>';
                    }
                    androidHTML = '<tr><td><strong>Total</strong></td><td><strong>' + androidTotal + '</strong></td></tr>' + androidHTML;
                    $('#android > tbody').html(androidHTML);
                }

            });

            List.GAMobileAnalyticsView = List.GenericLayoutView.extend({
                template: GAMobileAnalyticsViewTpl,

                regions: {
                    'mauStats': '.table-responsive.content-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateGAMobileAnalytics(startDate, endDate);
                }
            });

            List.GAMauTotalView = List.GenericLayoutView.extend({
                template: GAMauTotalViewTpl,

                onShow: function () {
                    this.initDatePickers();
                },

                regions: {
                    'mauStats': '.total-mau-container',
                    'mobileNewUsersStats': '.new-users-container',
                    'mobileNewDownloadsStats': '.new-downloads-container',
                    'mobileWebRatio': '.mobile-web-ratio-container'
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateGAMauTotalAnalytics(startDate, endDate);
                }
            });

            List.AppFiguresItemView = Marionette.CompositeView.extend({
                template: appfiguresTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                },

                onShow: function () {
                }

            });

            List.MobileWebRatioView = Marionette.CompositeView.extend({
                template: GAMauTotalMobileWebRatioTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                },

                onShow: function () {
                },

            });

            List.GAMauTotalItemView = Marionette.CompositeView.extend({
                template: GAMauTotalItemViewTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                },

                onShow: function () {
                },

            });

            List.GAMauMobileNewUsersView = Marionette.CompositeView.extend({
                template: GAMobileNewUsersTpl,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                    if (this.model.get('total_mau')) {
                        this.initCopyStat();
                    }
                },

                onShow: function () {
                },

                initCopyStat: function() {
                    var self = this;
                    $('.panel-stat').click(function() {
                        var results = [
                            "MAU\r\n",
                            "Total MAU\t",
                            self.model.get('total_mau') + '\r\n',
                            "Viddsee MAU\t",
                            self.model.get('viddsee') + '\r\n',
                            "Embed MAU\t",
                            self.model.get('embed') + '\r\n',
                            "Buzz MAU\t",
                            self.model.get('buzz') + '\r\n',
                            "ID Buzz MAU\t",
                            self.model.get('id_buzz') + '\r\n',
                            "ZH Buzz MAU\t",
                            self.model.get('zh_buzz') + '\r\n',
                            "Android MAU\t",
                            self.model.get('android') + '\r\n',
                            "iOS MAU\t",
                            self.model.get('ios') + '\r\n',
                            "\r\nMobile New Downloads\r\n",
                            "Total new downloads\t",
                            self.model.get('total_new_downloads') + '\r\n',
                            "Android new downloads\t",
                            self.model.get('android_new_downloads').downloads + '\r\n',
                            "iOS new downloads\t",
                            self.model.get('ios_new_downloads').downloads + '\r\n',
                            "\r\nMobile New users\r\n",
                            "Total new users\t",
                            self.model.get('total_new_users') + '\r\n',
                            "Android new users\t",
                            self.model.get('android_new_users') + '\r\n',
                            "iOS new users\t",
                            self.model.get('ios_new_users') + '\r\n'
                        ];

                        var string = '';
                        results.forEach(function(value) {
                            string += value;
                        });

                        copyTextToClipboard(string);
                    });

                    // var copyStat = document.querySelectorAll('.panel-stat');
                    /*for (var i = 0; i < copyStat.length; i++) {
                        $(copyStat[i]).click(function(e) {
                            var panels = $('.panel-heading');
                            for (var i = 0; i < panels.length; i++) {
                                var panel = $(panels[i]);
                                console.log(panel.find('h3').html);
                            }

                            copyTextToClipboard($(e.currentTarget).find('h3').html);
                        });
                    }*/
                }

            });

            List.GAMobileDailyActiveUsersListView= Marionette.CompositeView.extend({
                template: GAMobileDailyActiveUserItemView,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                    this.insertRows();
                },

                events: {
                    'click .content-tabs': 'attachTabEvents'
                },

                onShow: function () {
                },

                attachTabEvent: function(e) {
                    var tab = e.target.attributes['href'].value.substring(1);
                    $('.tab-pane').removeClass('active');
                    $('#' + tab).addClass('active');
                },

                insertRows: function() {
                    var iosHTML = '';
                    iosHTML += '<tr><td><strong>Average</strong></td><td><strong>' + this.model.get('ios_average') + '</strong></td></tr>';
                    for (var i in this.model.get('ios')) {
                        var users = this.model.get('ios')[i];
                        iosHTML += '<tr><td>' + i + '</td><td>' + users + '</td></tr>';
                    }
                    $('#ios > tbody').html(iosHTML);

                    var androidHTML = '';
                    androidHTML += '<tr><td><strong>Average</strong></td><td><strong>' + this.model.get('android_average') + '</strong></td></tr>';
                    for (var i in this.model.get('android')) {
                        var users = this.model.get('android')[i];
                        androidHTML += '<tr><td>' + i + '</td><td>' + users + '</td></tr>';
                    }

                    $('#android > tbody').html(androidHTML);
                }

            });

            List.GAMobileDailyActiveUsersView = List.GenericLayoutView.extend({
                template: GAMobileDailyActiveUserView,

                regions: {
                    'mauStats': '.table-responsive.content-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateGAMobileDailyActiveUsers(startDate, endDate);
                }
            });

            List.GAMobileWeeklyActiveUsersListView= Marionette.CompositeView.extend({
                template: GAMobileWeeklyActiveUserItemView,

                initialize: function () {
                    this.listenTo(this.model,'change', this.render);
                },

                onRender: function () {
                    this.insertRows();
                },

                events: {
                    'click .content-tabs': 'attachTabEvents'
                },

                onShow: function () {
                },

                attachTabEvent: function(e) {
                    var tab = e.target.attributes['href'].value.substring(1);
                    $('.tab-pane').removeClass('active');
                    $('#' + tab).addClass('active');
                },

                insertRows: function() {
                    var iosHTML = '';
                    for (var i in this.model.get('ios')) {
                        var users = this.model.get('ios')[i];
                        iosHTML += '<tr><td>' + i + '</td><td>' + users + '</td></tr>';
                    }
                    $('#ios > tbody').html(iosHTML);

                    var androidHTML = '';
                    for (var i in this.model.get('android')) {
                        var users = this.model.get('android')[i];
                        androidHTML += '<tr><td>' + i + '</td><td>' + users + '</td></tr>';
                    }

                    $('#android > tbody').html(androidHTML);
                }

            });

            List.GAMobileWeeklyActiveUsersView = List.GenericLayoutView.extend({
                template: GAMobileWeeklyActiveUserView,

                regions: {
                    'mauStats': '.table-responsive.content-table'
                },

                onShow: function () {
                    this.initDatePickers();
                },

                events: {
                    'change #date-range-picker': 'setDateRange'
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    var startDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-start').datepicker("getDate"));
                    var endDate = $.datepicker.formatDate("yy-mm-dd", $('#datepicker-end').datepicker("getDate"));

                    List.Controller.updateGAMobileWeeklyActiveUsers(startDate, endDate);
                }
            });

            List.VideoRelatedPostAnalyticsItemView = Marionette.ItemView.extend({
                template: videoRelatedPostItemViewTpl,
                tagName: 'tr',
            });

            List.VideoRelatedPostAnalyticsListView = Marionette.CompositeView.extend({
                template: videoRelatedPostListViewTpl,

                itemView: List.VideoRelatedPostAnalyticsItemView,
                itemViewContainer: '.js-analytics-grid',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                }
            });

            List.VideoRelatedPostAnalyticsView = List.GenericLayoutView.extend({
                template: videoRelatedPostViewTpl,

                regions: {
                    'videoStats': '.table-responsive.domains-table'
                },

                onShow: function () {
                    this.initVideoSelect2();
                },

                refreshStats: function () {
                    $('.video-analytics-message').html('<img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...');
                    List.Controller.updateVideoRelatedPostAnalytics(this.value);
                }
            });
        });   // /App.module

        return;

    });
