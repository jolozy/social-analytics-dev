<div class="pageheader">
    <h2><i class="fa fa-bar-chart-o"></i> Social Analytics
        <!-- <span id="page-title">Video comments</span> -->
    </h2>
</div>
<div class="contentpanel">

    <!-- SEARCH FORM -->
    <div class="row">
    <div class="col-md-12">
        <h4 class="subtitle mb5">Search</h4>
        <input id="search" type="text" value="" class="form-control js-tf-search" placeholder="Title of Article" />
        <div id="search"></div>
        <div class="mb20"></div>
    </div>
  </div>

    <!-- PAGINATION -->
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6">
                <h4 class="panel-title js-results-title"></h4>
                <p class="js-results-stats"></p>
            </div>
            <div class="col-md-6">
                <ul class="pagination pull-right">
                  <li><a class="paginated-next">&laquo;</a></li>
                  <li><a class="paginated-page" data-value="1">1</a></li>
                  <li><a class="paginated-page" data-value="2">2</a></li>
                  <li><a class="paginated-page" data-value="3">3</a></li>
                  <li><a class="paginated-page" data-value="4">4</a></li>
                  <li><a class="paginated-page" data-value="5">5</a></li>
                  <li><a class="paginated-previous">&raquo;</a></li>
                </ul
            </div>
        </div>
    </div>

    <!-- RESULTS -->
    <div class="row mb10">
        <div class="table-responsive stats-container">
          <table class="table table-hover mb30">
            <thead>
              <tr>
                  <th class="js-pivot analytics-pivot total-pivot active">Article Title</th>
                  <th class="js-pivot analytics-pivot total-pivot active">Facebook Shares</th>
                  <th class="js-pivot analytics-pivot total-pivot active">Facebook Comments</th>
                  <th class="js-pivot analytics-pivot total-pivot active">Facebook Total</th>
                  <th class="js-pivot analytics-pivot total-pivot active">Share Total</th>
                  <th class="js-pivot analytics-pivot total-pivot active">Last Updated</th>
              </tr>
            </thead>

            <tbody id="social-analytics-results" class="js-analytics-grid">

              <% _.each( myBuzzInfo, function(buzz, index){ %>
                <% _.each( myArticles, function(mock, index){ %>
                  <% if( buzz.uid == mock.id ){ %>
                  <tr>
                    <td><%= buzz.post_title %></td>
                    <td><%= (mock.facebook.shares).toLocaleString() %></td>
                    <td><%= (mock.facebook.comments).toLocaleString() %></td>
                    <td><%= (mock.facebook.shares + mock.facebook.comments).toLocaleString() %></td>
                    <td><%= (mock.overall.shares).toLocaleString() %></td>
                    <td><%= mock.updated_at %></td>
                    <!-- <td><#%= moment(mock.updated_at).format('MMMM Do, h:mm a') #%></td> -->
                  </tr>
                  <% } %>
                <% }); %>
              <% }); %>

            </tbody>

          </table>
        </div>
    </div>

</div>
