define(["app",
  "tpl!apps/series/list/tpl/series-itemview.tpl",
  "tpl!apps/series/list/tpl/series-listview.tpl"],
function(App, seriesItemViewTpl, seriesListViewTpl) {

  App.module('Series.List', function (List, App, Backbone, Marionette, $, _) {
    
    List.SeriesItemView = Marionette.ItemView.extend({
      template: seriesItemViewTpl,
      tagName: "div",
      className: "col-md-4 col-sm-6 itemview-series",

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
          $('.publish-status').removeClass('published').addClass('pending');
          $('.publish-status').html('<i class="fa fa-clock-o"></i> ' + published_date.toDateString() + ' ' + published_date.toLocaleTimeString('en-SG'));
        }
      }

    }); //List.SeriesItemView

    List.SeriesListView = Marionette.CompositeView.extend({
        template: seriesListViewTpl,
        
        itemView: List.SeriesItemView,
        itemViewContainer: '.js-series-list-container',

        initialize: function () {
            this.collection.bind("reset", _.bind(this.render, this));
        },

        onRender: function () {
            this.initUI();
        },

        onShow: function () {
            this.initUI();
        },

        events: {
          'click .js-new-series-btn': 'newSeries'
        },

        initUI: function() {
          var total_pages = this.collection.totalPages;
          var current_page = this.collection.currentPage;
          var pages_in_range = this.collection.pagesInRange;
          this.showRangeCenteredOnPage(current_page, total_pages, pages_in_range);
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
        },

        newSeries: function (e) {
          e.preventDefault();
          App.Series.Edit.Controller.newSeries();
        }
    });

  });   // /App.module

  return;

});