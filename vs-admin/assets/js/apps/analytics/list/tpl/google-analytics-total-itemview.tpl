<h2> Monthly Active Users</h2>

<div class="row mb20">
    <div class="panel panel-overall panel-stat copy-to-clipboard col-sm-12">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>All</h4>
                  <small class="stat-label">Monthy Active Users</small>
                  <h3><%= total_mau == '...' ? total_mau: Number(total_mau).toLocaleString() %></h3>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>

<div class="row mb20">
    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-6">
      <div class="panel-heading">
        <div class="stat">
              <h4>Viddsee</h4>
              <small class="stat-label">Monthy Active Users</small>
              <h3><%
                var total = parseInt(viddsee);
                print(isNaN(total) ? '0' : Number(total).toLocaleString());
               %>
              </h3>
              <small class="stat-label">
                <%
                var percentage = parseInt(viddsee) / parseInt(total_mau) * 100;
                if (total) print(percentage.toFixed(2) + '% of total MAU');
                %>
              </small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-vimeo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading">
            <div class="stat">
                  <h4>Embed</h4>
                  <small class="stat-label">Monthy Active Users</small>
                  <h3><%
                    var total = parseInt(embed);
                    print(isNaN(embed) ? '0' : Number(embed).toLocaleString());
                   %>
                  </h3>
                  <small class="stat-label">
                      <%
                      var percentage = parseInt(embed) / parseInt(total_mau) * 100;
                      if (total) print(percentage.toFixed(2) + '% of total MAU');
                      %>
                    </small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>

<div class="row mb20">
    <div class="panel panel-youtube panel-stat copy-to-clipboard col-sm-4">
      <div class="panel-heading">
        <div class="stat">
              <h4>Buzz</h4>
              <small class="stat-label">Monthy Active Users</small>
              <h3><%= buzz == '...' ? buzz: Number(buzz).toLocaleString() %></h3>
              <small class="stat-label">
                  <%
                  var percentage = parseInt(buzz) / parseInt(total_mau) * 100;
                  if (total) print(percentage.toFixed(2) + '% of total MAU');
                  %>
                </small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-youtube panel-stat copy-to-clipboard col-sm-4">
      <div class="panel-heading">
        <div class="stat">
              <h4>ID Buzz</h4>
              <small class="stat-label">Monthy Active Users</small>
              <h3><%= id_buzz == '...' ? id_buzz : Number(id_buzz).toLocaleString() %></h3>
              <small class="stat-label">
                  <%
                  var percentage = parseInt(id_buzz) / parseInt(total_mau) * 100;
                  if (total) print(percentage.toFixed(2) + '% of total MAU');
                  %>
                </small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-youtube panel-stat copy-to-clipboard col-sm-4">
      <div class="panel-heading">
        <div class="stat">
              <h4>ZH Buzz</h4>
              <small class="stat-label">Monthy Active Users</small>
              <h3><%= zh_buzz == '...' ? zh_buzz : Number(zh_buzz).toLocaleString() %></h3>
              <small class="stat-label">
                  <%
                  var percentage = parseInt(zh_buzz) / parseInt(total_mau) * 100;
                  if (total) print(percentage.toFixed(2) + '% of total MAU');
                  %>
                </small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->
</div>

<div class="row mb20">
    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>Android</h4>
                  <small class="stat-label">Monthy Active Users</small>
                  <h3><%= android == '...' ? android : Number(android).toLocaleString() %></h3>
                  <small class="stat-label">
                      <%
                      var percentage = parseInt(android) / parseInt(total_mau) * 100;
                      if (total) print(percentage.toFixed(2) + '% of total MAU');
                      %>
                    </small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->

    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading" style="margin: 0px;">
            <div class="stat">
                  <h4>iOS</h4>
                  <small class="stat-label">Monthy Active Users</small>
                  <h3><%= ios == '...' ? ios : Number(ios).toLocaleString() %></h3>
                  <small class="stat-label">
                      <%
                      var percentage = parseInt(ios) / parseInt(total_mau) * 100;
                      if (total) print(percentage.toFixed(2) + '% of total MAU');
                      %>
                    </small>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>
