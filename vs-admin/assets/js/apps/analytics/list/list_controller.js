define(["app",
    "apps/analytics/list/list_view",
    "entities/analytics"],
function(App) {

  App.module('Analytics.List', function (List, App, Backbone, Marionette, $, _) {
    // Controller

    var analyticsLayoutView;
    var videoCommentsListView;

    List.Controller = {
        startDate : new Date(new Date().setDate(new Date().getDate()-7)),
        endDate   : new Date(new Date().setDate(new Date().getDate()-1)),
        dateRange : 'last7days',
      getOverallAnalytics: function (start_date, end_date) {
          analyticsLayoutView = new List.AnalyticsLayoutView();

          App.mainRegion.show(analyticsLayoutView);

          //var analyticsOverallView = new List.AnalyticsOverallView();

          var fetching = App.request("overall_analytics:entity", start_date, end_date);
          $.when(fetching).done(function (data) {
              var analyticsOverallView = new List.AnalyticsOverallView({
                  model: data
              });

              var analyticsSubscribersView = new List.AnalyticsSubscribersView({
	              model: data
              });

              var analyticsInteractionView = new List.AnalyticsInteractionView({
	              model: data
              });

              var analyticsTrackerView = new List.AnalyticsTrackerView({
                  model: data
              });

              analyticsLayoutView.overallStats.show(analyticsOverallView);
              analyticsLayoutView.subscriptionStats.show(analyticsSubscribersView);
              analyticsLayoutView.interactionStats.show(analyticsInteractionView);
              analyticsLayoutView.trackerStats.show(analyticsTrackerView);

              var trends = new App.Entities.OverallAnalyticsTrends();
              trends.start_date = start_date;
              trends.end_date = end_date;
              trends.fetch({
                  data: {
                      start_date: start_date,
                      end_date: end_date
                  },
                  type: 'POST'
              });

              var overallTrendsView = new List.AnalyticsOverallViewTrends({
                  model: trends
              });
              analyticsLayoutView.overallTrends.show(overallTrendsView);
          });

      },

        getVideoTrends: function(start_date, end_date, video_id, video_title, e) {
            var trends = new App.Entities.VideoAnalyticsTrends();
            trends.start_date = start_date;
            trends.end_date = end_date;
            trends.video_id = video_id;
            trends.fetch({
                data: {
                    start_date: start_date,
                    end_date: end_date,
                    video_id: video_id
                },
                type: 'POST',
                success: function(data) {
                    $('<tr class="extra-row"><td colspan="7"><div style="font-size: 1.2em; position: absolute;">'+video_title+'</div><div class="close-trend">X</div><div class="video-trend-container ct-chart ct-perfect-fourth"></div></td></tr>').insertAfter(e.currentTarget);
                    $('.close-trend').click(function() {
                        $('.extra-row').remove();
                    });

                    var overallTrendsView = new List.VideoAnalyticsTrends({
                        model: data
                    });

                    App.modalRegion.show(overallTrendsView);
                }
            });

            return trends;
        },

      updateOverallAnalytics: function(start_date, end_date) {

        var fetching = App.request("overall_analytics:entity", start_date, end_date);
        $.when(fetching).done(function (data) {
            var analyticsOverallView = new List.AnalyticsOverallView({
                model: data
            });

            analyticsLayoutView.overallStats.show(analyticsOverallView);

            var analyticsSubscribersView = new List.AnalyticsSubscribersView({
	            model: data
            });

            analyticsLayoutView.subscriptionStats.show(analyticsSubscribersView);

            var analyticsInteractionView = new List.AnalyticsInteractionView({
                model: data
            });

            analyticsLayoutView.interactionStats.show(analyticsInteractionView);

            var analyticsTrackerView = new List.AnalyticsTrackerView({
                model: data
            });

            analyticsLayoutView.trackerStats.show(analyticsTrackerView);

            var trends = new App.Entities.OverallAnalyticsTrends();
            trends.start_date = start_date;
            trends.end_date = end_date;
            trends.fetch({
                data: {
                    start_date: start_date,
                    end_date: end_date
                },
                type: 'POST'
            });

            var overallTrendsView = new List.AnalyticsOverallViewTrends({
                model: trends
            });
            analyticsLayoutView.overallTrends.show(overallTrendsView);
        });
      },

        getVideoAnalytics: function(startDate, endDate, pivot) {
            analyticsLayoutView = new List.VideoAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("video_analytics:entities", startDate, endDate, pivot);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                data.pivot = pivot;
                var videoAnalyticsListView = new List.VideoAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(videoAnalyticsListView);

                videoAnalyticsListView.on('render', function() {
                    if (data.length === 0) {
                        $('.video-analytics-message').html('No data present');
                    } else {
                        $('.video-analytics-message').html('');
                    }

                    $('.js-pivot.active').removeClass('active');
                    $('.'+ data.pivot + '-pivot').addClass('active');
                });
            });
        },

        updateVideoAnalytics: function(startDate, endDate, pivot, searchString) {
            var fetching = App.request("video_analytics:entities", startDate, endDate, pivot, searchString);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                data.pivot = pivot;
                data.search_string = searchString;
                var videoAnalyticsListView = new List.VideoAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(videoAnalyticsListView);

                videoAnalyticsListView.on('render', function() {
                    if (data.length === 0) {
                        $('.video-analytics-message').html('No data present');
                    } else {
                        $('.video-analytics-message').html('');
                    }

                    $('.js-pivot.active').removeClass('active');
                    $('.'+ data.pivot + '-pivot').addClass('active');
                });
            });
        },
        
        getVideoComments: function(start_date, end_date, video_uid, pivot) {
            analyticsLayoutView = new List.VideoCommentsView();
            App.mainRegion.show(analyticsLayoutView);
            
            var fetching = App.request("video_comments:entities", start_date, end_date, video_uid, pivot);
            $.when(fetching).done(function (data) {
                data.start_date = start_date;
                data.end_date   = end_date;
                data.video_uid  = video_uid;
                data.pivot      = pivot;
                videoCommentsListView = new List.VideoCommentsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(videoCommentsListView);

                videoCommentsListView.on('render', function() {
                    if (data.length === 0) {
                        $('.video-analytics-message').html('No data present');
                    } else {
                        $('.video-analytics-message').html('');
                    }

                    $('.js-pivot.active').removeClass('active');
                    $('.'+ data.pivot + '-pivot').addClass('active');
                });
            });
        },
        
        updateVideoComments: function(start_date, end_date, video_uid, pivot) {
            var fetching = App.request("video_comments:entities", start_date, end_date, video_uid, pivot);
            $.when(fetching).done(function(data){
                data.start_date = start_date;
                data.end_date   = end_date;
                data.video_uid  = video_uid;
                data.pivot      = pivot;
                videoCommentsListView = new List.VideoCommentsListView({
                    collection: data
                });

                analyticsLayoutView.videoStats.show(videoCommentsListView);
                videoCommentsListView.on('render', function() {
                    if (data.length === 0) {
                        $('.video-analytics-message').html('No data present');
                    } else {
                        $('.video-analytics-message').html('');
                    }
                    $('.js-pivot.active').removeClass('active');
                    $('.'+ data.pivot + '-pivot').addClass('active');
                });
            });
        },

        getCommentsForVideo: function(start_date, end_date, video_uid, source, e) {
            var filterType = 'uid';
            var fetching = App.request("comment:entities", start_date, end_date, filterType, video_uid, source);
            $.when(fetching).done(function (data) {
                $('<tr class="extra-row"><td colspan="6"><div style="font-size: 1.2em; position: absolute"></div><div class="close-trend">X</div><div class="comments-container"></div></td></tr>').insertAfter($(e.currentTarget).parent());
                $('.close-trend').click(function() {
                    $('.extra-row').remove();
                });
                // Very important that you add a new region because analyticsLayoutView does not have this region at instantiation
                analyticsLayoutView.addRegion('commentsContainer', ".comments-container");

                var commentListView = new List.CommentListView({
                    collection: data
                });
                analyticsLayoutView.commentsContainer.show(commentListView);
                commentListView.on('render', function(){
                    if (data.numComments === 0) {
                        $('.js-num-of-comments').text('No comments are found.');
                    } else {
                        $('.js-num-of-comments').text('Showing ' + data.models.length + ' out of ' + data.total + ' comment threads:');
                    }
                    if (data.hasMore) {
                        $('#load-more').removeClass('hidden');
                    } else {
                        $('#load-more').addClass('hidden');
                    }
                    $('.js-comment-list').removeClass('hidden');
                    $('.js-loading-comments').remove();
                });
            });
        },

        getPlaycount: function(start_date, end_date, dimension, limit){
            analyticsLayoutView = new List.GenericDateDimensionView();
            App.mainRegion.show(analyticsLayoutView);
            
            this.updatePlaycount(start_date, end_date, dimension, limit);
        },

        updatePlaycount: function(start_date, end_date, dimension, limit){
            var fetching = App.request("video_playcount:entities", start_date, end_date, dimension, limit);
            $.when(fetching).done(function(data){
                var analyticsBreakdownView = new List.VideoPlaycountDataView({
                    model: data
                });
                analyticsLayoutView.chartRegion.show(analyticsBreakdownView);
                
            });
        },

        getVideoCompletion: function(start_date, end_date, video_id, dimension, limit) {
            analyticsLayoutView = new List.GenericDateVideoDimensionView();
            App.mainRegion.show(analyticsLayoutView);
            this.updateVideoCompletion(start_date, end_date, video_id, dimension, limit);
        },

        updateVideoCompletion: function(start_date, end_date, video_id, dimension, limit) {
            var fetching = App.request("video_completion:entity", start_date, end_date, video_id, dimension, limit);
            $.when(fetching).done(function(data){
                var completion        = new App.Entities.VideoCompletion();
                var videoCompletionView = new List.VideoCompletionDataView({
                    model: data
                });
                analyticsLayoutView.chartRegion.show(videoCompletionView);
            });
        },

        getDomainAnalytics: function(startDate, endDate) {
            analyticsLayoutView = new List.DomainAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("domain_analytics:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var domainAnalyticsListView = new List.DomainAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(domainAnalyticsListView);
            });
        },

        updateDomainAnalytics: function(startDate, endDate) {
            var fetching = App.request("domain_analytics:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var domainAnalyticsListView = new List.DomainAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(domainAnalyticsListView);
            });
        },

        getDomainsByVideoAnalytics: function(startDate, endDate, videoID) {
            analyticsLayoutView = new List.DomainsByVideoAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("domains_by_video_analytics:entities", startDate, endDate, videoID);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var domainsByVideoAnalyticsListView = new List.DomainsByVideoAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(domainsByVideoAnalyticsListView);
            });
        },

        updateDomainsByVideoAnalytics: function(startDate, endDate, videoID) {
            var fetching = App.request("domains_by_video_analytics:entities", startDate, endDate, videoID);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var domainsByVideoAnalyticsListView = new List.DomainsByVideoAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(domainsByVideoAnalyticsListView);
            });
        },

        getTrackerAnalytics: function(startDate, endDate) {
            analyticsLayoutView = new List.TrackerAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("tracker_analytics:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var trackerAnalyticsListView = new List.TrackerAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(trackerAnalyticsListView);

                trackerAnalyticsListView.on('render', function() {
                    if (data.length === 0) {
                        $('.video-analytics-message').html('No data present');
                    } else {
                        $('.video-analytics-message').html('');
                    }
                });
            });
        },

        updateTrackerAnalytics: function(startDate, endDate, searchString) {
            var fetching = App.request("tracker_analytics:entities", startDate, endDate, searchString);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                data.search_string = searchString;
                var trackerAnalyticsListView = new List.TrackerAnalyticsListView({
                    collection: data
                });
                analyticsLayoutView.videoStats.show(trackerAnalyticsListView);

                trackerAnalyticsListView.on('render', function() {
                    if (data.length === 0) {
                        $('.video-analytics-message').html('No data present');
                    } else {
                        $('.video-analytics-message').html('');
                    }
                });
            });
        },

        trackerModalView: function(title, start_date, end_date, res) {
            var trackerInfo = new App.Entities.TrackerAnalytics();
            trackerInfo.set('title', title);
            trackerInfo.set('start_date', start_date);
            trackerInfo.set('end_date', end_date);
            trackerInfo.set('res', res);
            var totalMobileTracks = 0;
            var totalDesktopTracks = 0;
            for (var i in res) {
                var platform = res[i].platform;
                var totalPlays = res[i].total_plays;
                if (platform === 'desktop') {
                    totalDesktopTracks += totalPlays;
                } else {
                    totalMobileTracks += totalPlays;
                }
            }
            trackerInfo.set('totalMobileTracks', totalMobileTracks);
            trackerInfo.set('totalDesktopTracks', totalDesktopTracks);

            var trackerModalView = new List.TrackerAnalyticsModalView({
                model: trackerInfo
            });

            App.modalRegion.show(trackerModalView);
            $('#modal-region .modal').modal('show');
        },

        getContentAnalyticsOld: function(startDate, endDate) {
            analyticsLayoutView = new List.ContentAnalyticsViewOld();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("content_analytics_old:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var contentAnalyticsListView = new List.ContentAnalyticsListViewOld({
                    model: data
                });
                analyticsLayoutView.contentStats.show(contentAnalyticsListView);
            });
        },

        getContentAnalytics: function(startDate, endDate, pivot) {
            analyticsLayoutView = new List.ContentAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("content_analytics:entities", startDate, endDate, pivot);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var contentAnalyticsListView = new List.ContentAnalyticsListView({
                    model: data
                });
                analyticsLayoutView.contentStats.show(contentAnalyticsListView);
            });
        },

        updateContentAnalyticsOld: function(startDate, endDate) {
            var fetching = App.request("content_analytics_old:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var contentAnalyticsListView = new List.ContentAnalyticsListViewOld({
                    model: data
                });
                analyticsLayoutView.contentStats.show(contentAnalyticsListView);
            });
        },

        updateContentAnalytics: function(startDate, endDate, pivot) {
            var fetching = App.request("content_analytics:entities", startDate, endDate, pivot);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var contentAnalyticsListView = new List.ContentAnalyticsListView({
                    model: data
                });
                analyticsLayoutView.contentStats.show(contentAnalyticsListView);
            });
        },

        getGAMauAnalytics: function(startDate, endDate, segment) {
            analyticsLayoutView = new List.GAMauAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            $('.js-loading-container').removeClass('hidden');

            var fetching = App.request("ga_mau_analytics:entities", startDate, endDate, segment);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                data.segment  = segment;
                var gaAnalyticsListView = new List.GAMauAnalyticsListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);
                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });

            });
        },

        updateGAMauAnalytics: function(startDate, endDate, segment) {
            var fetching = App.request("ga_mau_analytics:entities", startDate, endDate, segment);

            $('.js-loading-container').removeClass('hidden');

            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                data.segment  = segment;
                var gaAnalyticsListView = new List.GAMauAnalyticsListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);
                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        getGAMobileAnalytics: function(startDate, endDate) {
            analyticsLayoutView = new List.GAMobileAnalyticsView();
            App.mainRegion.show(analyticsLayoutView);

            $('.js-loading-container').removeClass('hidden');

            var fetching = App.request("ga_mobile_analytics:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMobileAnalyticsListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);
                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });

            });
        },

        updateGAMobileAnalytics: function(startDate, endDate) {
            var fetching = App.request("ga_mobile_analytics:entities", startDate, endDate);

            $('.js-loading-container').removeClass('hidden');

            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMobileAnalyticsListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);
                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        getGAMauTotalAnalytics: function(startDate, endDate) {
            analyticsLayoutView = new List.GAMauTotalView();
            App.mainRegion.show(analyticsLayoutView);

            var fetching = App.request("ga_mau_total_analytics:entities", startDate, endDate);

            $('.js-loading-container').removeClass('hidden');

            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMauTotalItemView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);

                var gaMobileNewUsersView = new List.GAMauMobileNewUsersView({
                    model: data
                });
                analyticsLayoutView.mobileNewUsersStats.show(gaMobileNewUsersView);

                var gaMobileNewDownloadsView = new List.AppFiguresItemView({
                    model: data
                });
                analyticsLayoutView.mobileNewDownloadsStats.show(gaMobileNewDownloadsView);

                var gaMobileWebRatio = new List.MobileWebRatioView({
                    model: data
                });
                analyticsLayoutView.mobileWebRatio.show(gaMobileWebRatio);

                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        updateGAMauTotalAnalytics: function(startDate, endDate) {
            var fetching = App.request("ga_mau_total_analytics:entities", startDate, endDate);

            $('.js-loading-container').removeClass('hidden');

            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMauTotalItemView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);

                var gaMobileNewUsersView = new List.GAMauMobileNewUsersView({
                    model: data
                });
                analyticsLayoutView.mobileNewUsersStats.show(gaMobileNewUsersView);

                var gaMobileNewDownloadsView = new List.AppFiguresItemView({
                    model: data
                });
                analyticsLayoutView.mobileNewDownloadsStats.show(gaMobileNewDownloadsView);

                var gaMobileWebRatio = new List.MobileWebRatioView({
                    model: data
                });
                analyticsLayoutView.mobileWebRatio.show(gaMobileWebRatio);

                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        getGAMobileDailyActiveUsers: function(startDate, endDate) {
            analyticsLayoutView = new List.GAMobileDailyActiveUsersView();
            App.mainRegion.show(analyticsLayoutView);

            $('.js-loading-container').removeClass('hidden');

            var fetching = App.request("ga_mobile_daily_active_users:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMobileDailyActiveUsersListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);

                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        updateGAMobileDailyActiveUsers: function(startDate, endDate) {
            var fetching = App.request("ga_mobile_daily_active_users:entities", startDate, endDate);

            $('.js-loading-container').removeClass('hidden');

            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMobileDailyActiveUsersListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);
                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        getGAMobileWeeklyActiveUsers: function(startDate, endDate) {
            analyticsLayoutView = new List.GAMobileWeeklyActiveUsersView();
            App.mainRegion.show(analyticsLayoutView);

            $('.js-loading-container').removeClass('hidden');

            var fetching = App.request("ga_mobile_weekly_active_users:entities", startDate, endDate);
            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMobileWeeklyActiveUsersListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);

                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        updateGAMobileWeeklyActiveUsers: function(startDate, endDate) {
            var fetching = App.request("ga_mobile_weekly_active_users:entities", startDate, endDate);

            $('.js-loading-container').removeClass('hidden');

            $.when(fetching).done(function (data) {
                data.start_date = startDate;
                data.end_date = endDate;
                var gaAnalyticsListView = new List.GAMobileWeeklyActiveUsersListView({
                    model: data
                });
                analyticsLayoutView.mauStats.show(gaAnalyticsListView);
                gaAnalyticsListView.on('render', function() {
                    $('.js-loading-container').addClass('hidden');
                });
            });
        },

        getVideoRelatedPostAnalytics: function(videoID) {
          analyticsLayoutView = new List.VideoRelatedPostAnalyticsView();
          App.mainRegion.show(analyticsLayoutView);

          var fetching = App.request("video_related_post_analytics:entities", videoID);

          $.when(fetching).done(function (data) {
            var listView = new List.VideoRelatedPostAnalyticsListView({
              collection: data
            });
            analyticsLayoutView.videoStats.show(listView);
          });
        },

        updateVideoRelatedPostAnalytics: function(videoID) {
          var fetching = App.request("video_related_post_analytics:entities", videoID);
          $.when(fetching).done(function (data) {
            var listView = new List.VideoRelatedPostAnalyticsListView({
              collection: data
            });
            analyticsLayoutView.videoStats.show(listView);
          });
        },

    };  // Analytics.List.Controller
  });   // App.module

  return App.Analytics.List.Controller;

});
