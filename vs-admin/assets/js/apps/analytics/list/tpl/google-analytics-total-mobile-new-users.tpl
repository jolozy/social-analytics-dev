<h2> Mobile New Users</h2>

<div class="row mb20">
    <div class="panel panel-overall panel-stat copy-to-clipboard col-sm-12">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>All Mobile</h4>
                  <small class="stat-label">New Users</small>
                  <h3><%= total_new_users == '...' ? total_new_users: Number(total_new_users).toLocaleString() %></h3>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>

<div class="row mb20">
    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>Android</h4>
                  <small class="stat-label">New Users</small>
                  <h3><%= android_new_users == '...' ? android_new_users : Number(android_new_users).toLocaleString() %></h3>
                  <small class="stat-label">
                    <%
                    var percentage = parseInt(android_new_users) / parseInt(total_new_users) * 100;
                    if (total_new_users) print(percentage.toFixed(2) + '% of total Web');
                    %>
                  </small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->

    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>iOS</h4>
                  <small class="stat-label">New Users</small>
                  <h3><%= ios_new_users == '...' ? ios_new_users : Number(ios_new_users).toLocaleString() %></h3>
                  <small class="stat-label">
                      <%
                      var percentage = parseInt(ios_new_users) / parseInt(total_new_users) * 100;
                      if (total_new_users) print(percentage.toFixed(2) + '% of total Web');
                      %>
                    </small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>
