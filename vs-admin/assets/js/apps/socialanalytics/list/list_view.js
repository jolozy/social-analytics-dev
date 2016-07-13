define(["app", "moment",
        "tpl!apps/comment/list/tpl/comment-listview.tpl",
        "tpl!apps/comment/list/tpl/comment-itemview.tpl",
        "tpl!apps/comment/list/tpl/comment-reply-itemview.tpl",
        "time-picker"],
    function(App, moment, commentListViewTpl, commentItemViewTpl, commentReplyItemViewTpl) {

        App.module('Comment.List', function (List, App, Backbone, Marionette, $, _) {
            // Views
            List.CommentView = Marionette.Layout.extend({

            });

            List.CommentReplyItemView = Marionette.ItemView.extend({
                template: commentReplyItemViewTpl,
                tagName: 'div',
                className: 'reply',

                initialize: function() {

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
                            $(this.$el).find('.js-reply-container').append(this.generateReplyHtml(replies[i],
                                this.model.get('video_id'),
                                this.model.get('host'),
                                this.model.get('page'),
                                this.model.get('video_title')));
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

                events: {
                    "click .js-select-date-range": "selectDateRange",
                    "click .js-filter-by-title": "filterByTitle",
                    "click .js-filter-by-commenter": "filterByCommenter"
                },

                onRender: function () {
                    this.initUI();
                    this.attachLoadMore();
                },

                initUI: function () {
                    var view = this;
                    $('.startdatepicker').datepicker({
                        dateFormat: 'M d, yy',
                        maxDate: new Date()
                    }).datepicker('setDate', new Date(this.collection.startDate));
                    $('.enddatepicker').datepicker({
                        dateFormat: 'M d, yy',
                        maxDate: new Date()
                    }).datepicker('setDate', new Date(this.collection.endDate));
                    $('.js-filter-search-string').val(this.collection.searchString);
                    if (this.collection.filterType === 'user') {
                        this.filterByCommenter();
                    } else if (this.collection.filterType === 'title') {
                        this.filterByTitle();
                    }

                    $('.js-filter-search-string').on('keydown', function(key) {
                        if (key.which === 13) {
                            view.selectDateRange();
                        }
                    });
                },

                filterByTitle: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    $('.js-filter-button').val('title');
                    $('.js-filter-button').html('Filter by title  <span class="caret"></span>');
                },

                filterByCommenter: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    $('.js-filter-button').val('user');
                    $('.js-filter-button').html('Filter by commenter\'s name  <span class="caret"></span>');
                },

                selectDateRange: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    var startDate  = $.datepicker.formatDate("yy-mm-dd", $('.js-start-date').datepicker("getDate"));
                    var endDate    = $.datepicker.formatDate("yy-mm-dd", $('.js-end-date').datepicker("getDate"));
                    var searchTerm = $('.js-filter-search-string').val();
                    var filterType = $('.js-filter-button').val();
                    App.trigger('comment:listWithRange', startDate, endDate, filterType, searchTerm);
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
        });
        return ;
    });
