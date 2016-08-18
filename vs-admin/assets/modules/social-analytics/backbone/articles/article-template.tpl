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
                  <li><a class="paginated-page">1</a></li>
                  <li><a class="paginated-page">2</a></li>
                  <li><a class="paginated-page">3</a></li>
                  <li><a class="paginated-page">4</a></li>
                  <li><a class="paginated-page">5</a></li>
                  <li><a class="paginated-previous">&raquo;</a></li>
                </ul>
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

            <tbody class="js-analytics-grid">
              <% _.each(buzzInfo.toJSON(), function(post, index){ %>

                <% if(typeof myArticles.get(post.uid) != 'undefined'){ %>
                  <tr>
                    <td><%= post.post_title %></td>
                    <% console.log(myArticles.get(post.uid)) %>
                    <td><%= (myArticles.get(post.uid).attributes.facebook.shares).toLocaleString() %></td>
                    <td><%= (myArticles.get(post.uid).attributes.facebook.comments).toLocaleString() %></td>
                    <td><%= (myArticles.get(post.uid).attributes.facebook.shares + myArticles.get(post.uid).attributes.facebook.comments).toLocaleString() %></td>
                    <td><%= (myArticles.get(post.uid).attributes.overall.shares).toLocaleString() %></td>
                    <td><%= moment(myArticles.get(post.uid).attributes.updated_at).format('MMMM Do, h:mm a') %></td>
                  </tr>
                <% } %>

              <% }) %>
            </tbody>

          </table>
        </div>
    </div>

</div>
