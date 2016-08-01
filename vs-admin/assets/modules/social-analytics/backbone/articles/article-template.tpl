<div class="pageheader">
    <h2><i class="fa fa-bar-chart-o"></i> Social Analytics
        <!-- <span id="page-title">Video comments</span> -->
    </h2>
</div>
<div class="contentpanel">

    <!-- <div class="row mb10"> -->
        <!-- <div class="col-lg-6 col-md-6 col-sm-6">
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-lg-3 col-md-3 col-sm-3 control-label">Date Range:</label>
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        <select class="form-control input-sm mb15" id="date-range-picker">
                            <option value="custom">Custom</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="lastmonth">Last Week</option>
                            <option value="yeartodate">Last Month</option>
                            <option value="alltime">All Time</option>
                        </select>
                    </div>
                </div>
            </form>
        </div> -->
        <!-- <div class="col-lg-6 col-md-6 col-sm-6"> -->
            <!-- <form class="form-horizontal">
                <div class="row">
                    <div class="col-lg-1 col-md-1 col-sm-1"></div>
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="mm/dd/yyyy" id="datepicker-start">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        </div>
                    </div>
                    <label class="col-lg-1 col-md-1 col-sm-1 control-label">To</label>
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <div class="input-group pull-right">
                            <input type="text" class="form-control" placeholder="mm/dd/yyyy" id="datepicker-end">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        </div>
                    </div>
                </div>
            </form> -->
        <!-- </div> -->
    <!-- </div> -->

    <!-- SEARCH FORM -->
    <div class="row">
    <div class="col-md-12">
        <h4 class="subtitle mb5">Search</h4>
        <input id="search" type="text" value="" class="form-control js-tf-search" placeholder="Title of Article" />
        <div id="search"></div>
        <div class="mb20"></div>
    </div>
  </div>

    <!-- <div class="row">
        <ul class="pagination pull-right">
        </ul>
    </div> -->

    <!-- PAGINATION -->
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6">
                <h4 class="panel-title js-results-title"></h4>
                <p class="js-results-stats"></p>
            </div>
            <div class="col-md-6">
                <ul id="pages" class="pagination pull-right">
                        <li class>
                          <a class="js-page article-page">
                          </a>
                        </li>
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
            <!-- <%          console.log(articleArray); %> -->
              <% var finalArray = []; %>
                <%   for (let i = 0; i < articleArray.length; i++) { %>
                  <%   for (let j = 0; j < buzzInfoArray.length; j++) { %>
                <%     if (buzzInfoArray[j].id === articleArray[i].attributes.id) { %>
                  <%         var temp = articleArray[i].attributes; %>
                  <%          temp.title = buzzInfoArray[j].title; %>
                  <%          temp.url = buzzInfoArray[j].url; %>
                  <%          temp.created_at = articleArray[i].created_at; %>
                  <%          finalArray.push(temp); %>
                <%     } %>
                <%     } %>
                <%   } %>
                <!-- <%          console.log(finalArray); %> -->
            <tbody>
              <% for (var i = 0; i < finalArray.length; i++) { %>
                  <tr>
                      <td>
                          <%= finalArray[i].title %>
                      </td>
                      <td>
                          <%= (finalArray[i].facebook.shares).toLocaleString() %>
                      </td>
                      <td>
                          <%= (finalArray[i].facebook.comments).toLocaleString() %>
                      </td>
                      <td>
                          <%= (finalArray[i].facebook.shares + finalArray[i].facebook.comments).toLocaleString() %>
                      </td>
                      <td>
                          <%= (finalArray[i].overall.shares).toLocaleString() %>
                      </td>
                      <td>
                        <%= moment(finalArray[i].updated_at).format('lll') %>
                      </td>
                  </tr>
                  <% }; %>
            </tbody>

          </table>
        </div>
    </div>

</div>
