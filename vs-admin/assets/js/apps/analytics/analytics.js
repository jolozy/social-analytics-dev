define(["app", "moment",
        "apps/analytics/list/list_controller"],
    function (App, moment) {

        App.module('Analytics', function (Analytics, App, Backbone, Marionette, $, _) {
            // Router
            Analytics.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    'analytics': 'getOverallAnalytics',
                    'analytics/:start_date/:end_date': 'updateOverallAnalytics',
                    'video-analytics': 'getVideoAnalytics',
                    'video-analytics/:start_date/:end_date': 'updateVideoAnalytics',
                    'video-comments': 'getVideoComments',
                    'video-stats': 'getPlaycount',
                    'video-completion': 'getVideoCompletion',
                    'domain-analytics': 'getDomainsAnalytics',
                    'domain-analytics/:start_date/:end_date': 'updateDomainsAnalytics',
                    'domains-by-video-analytics': 'getDomainsByVideoAnalytics',
                    'domains-by-video-analytics/:start_date/:end_date': 'updateDomainsByVideoAnalytics',
                    'tracker-analytics': 'getTrackerAnalytics',
                    'tracker-analytics/:start_date/:end_date': 'updateTrackerAnalytics',
                    'content-analytics-old': 'getContentAnalyticsOld',
                    'content-analytics': 'getContentAnalytics',
                    'ga-mau-analytics-by-country': 'getGAMauAnalytics',
                    'ga-mobile-analytics-by-country': 'getGAMobileAnalytics',
                    'ga-mau-analytics': 'getGAMauTotal',
                    'ga-mobile-daily-active-users': 'getGAMobileDailyActiveUsers',
                    'ga-mobile-weekly-active-users': 'getGAMobileWeeklyActiveUsers',
                    'video-related-post-analytics': 'getVideoRelatedPostAnalytics'
                }
            });

            var API = {
                getOverallAnalytics: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getOverallAnalytics(startDate, endDate);
                },

                updateOverallAnalytics: function (start_date, end_date) {
                    App.Analytics.List.Controller.getOverallAnalytics(start_date, end_date);
                },

                getVideoComments: function () {
                    var today = new Date();

                    var yesterday = new Date();
                    yesterday.setDate(today.getDate() - 1);
                    var yesterdayString = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate();

                    var lastWeek = new Date();
                    lastWeek.setDate(today.getDate() - 7);
                    var lastWeekString = lastWeek.getFullYear() + "-" + (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate();
                    var video_uid  = "";
                    var pivot      = "total";
                    App.Analytics.List.Controller.getVideoComments(lastWeekString, yesterdayString, video_uid, pivot);
                },

                getVideoCompletion: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getVideoCompletion(startDate, endDate, "", "All", "All");
                },

                getPlaycount: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getPlaycount(startDate, endDate, "age", "5");
                },

                getVideoAnalytics: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getVideoAnalytics(startDate, endDate);
                },

                updateVideoAnalytics: function (start_date, end_date) {
                    App.Analytics.List.Controller.getVideoAnalytics(start_date, end_date);
                },


                getDomainsAnalytics: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getDomainAnalytics(startDate, endDate);
                },

                updateDomainsAnalytics: function (start_date, end_date) {
                    App.Analytics.List.Controller.getDomainAnalytics(start_date, end_date);
                },

                getDomainsByVideoAnalytics: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getDomainsByVideoAnalytics(startDate, endDate);
                },

                updateDomainsByVideoAnalytics: function (start_date, end_date) {
                    App.Analytics.List.Controller.getDomainsByVideoAnalytics(start_date, end_date);
                },

                getTrackerAnalytics: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getTrackerAnalytics(startDate, endDate);
                },

                updateTrackerAnalytics: function (start_date, end_date) {
                    App.Analytics.List.Controller.getTrackerAnalytics(start_date, end_date);
                },

                getContentAnalyticsOld: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getContentAnalyticsOld(startDate, endDate);
                },

                getContentAnalytics: function () {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    var pivot     = 'country';
                    App.Analytics.List.Controller.getContentAnalytics(startDate, endDate, pivot);
                },

                getGAMauAnalytics: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    var segment = "all";
                    App.Analytics.List.Controller.getGAMauAnalytics(startDate, endDate, segment);
                },

                getGAMobileAnalytics: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getGAMobileAnalytics(startDate, endDate);
                },

                getGAMauTotal: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getGAMauTotalAnalytics(startDate, endDate);
                },

                getGAMobileDailyActiveUsers: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getGAMobileDailyActiveUsers(startDate, endDate);
                },

                getGAMobileWeeklyActiveUsers: function() {
                    var startDate = new moment(App.Analytics.List.Controller.startDate).format('YYYY-MM-DD');
                    var endDate   = new moment(App.Analytics.List.Controller.endDate).format('YYYY-MM-DD');
                    App.Analytics.List.Controller.getGAMobileWeeklyActiveUsers(startDate, endDate);
                },

                getVideoRelatedPostAnalytics: function () {
                    App.Analytics.List.Controller.getVideoRelatedPostAnalytics();
                },

                updateVideoRelatedPostAnalytics: function (video_uid) {
                    App.Analytics.List.Controller.getVideoRelatedPostAnalytics(video_uid);
                }

            };

            App.addInitializer(function () {
                new Analytics.Router({
                    controller: API
                });
            }); //Analytics.Router

            // Listeners

        }); // App.module

        return;

    });
