<h2> Mobile New Downloads</h2>

<div class="row mb20">
    <div class="panel panel-overall panel-stat copy-to-clipboard col-sm-12">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>All Mobile</h4>
                  <small class="stat-label">New Downloads</small>
                  <h3><%= total_new_downloads == '...' ? total_new_downloads: Number(total_new_downloads).toLocaleString() %></h3>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>

<div class="row mb20">
    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>Android</h4>
                  <small class="stat-label">New Downloads</small>
                  <h3><%= android_new_downloads == '...' ? android_new_downloads : Number(android_new_downloads).toLocaleString() %></h3>
                  <small class="stat-label">
                    <%
                    var percentage = parseInt(android_new_downloads) / parseInt(total_new_downloads) * 100;
                    if (total_new_downloads) print(percentage.toFixed(2) + '% of total Web');
                    %>
                  </small>
                   <small class="stat-label">as of <%= android_new_downloads_last_date ? android_new_downloads_last_date : '---' %></small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->

    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>iOS</h4>
                  <small class="stat-label">New Downloads</small>
                  <h3><%= ios_new_downloads == '...' ? ios_new_downloads : Number(ios_new_downloads).toLocaleString() %></h3>
                  <small class="stat-label">
                      <%
                      var percentage = parseInt(ios_new_downloads) / parseInt(total_new_downloads) * 100;
                      if (total_new_downloads) print(percentage.toFixed(2) + '% of total Web');
                      %>
                    </small>
                  <small class="stat-label">as of <%= ios_new_downloads_last_date ? ios_new_downloads_last_date : '---' %></small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>
