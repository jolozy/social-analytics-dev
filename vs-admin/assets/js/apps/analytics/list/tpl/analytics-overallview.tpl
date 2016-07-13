<div class="stats-heading-container mb10">
    <h2 class="stats-title">
        Overall Statistics
    </h2>
</div>

<div class="row mb20">
    <div class="panel panel-overall panel-stat copy-to-clipboard">
      <div class="panel-heading">
        <div class="stat">
              <h4>Overall</h4>
              <small class="stat-label">Total Plays</small>
              <h3><%
                var total = parseInt(hosted) + parseInt(youtube_channel) + parseInt(vimeo) + parseInt(yahoo) + parseInt(offline);
                print(isNaN(total) ? '...' : Number(total).toLocaleString());
               %>
              </h3>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->
</div>


<div class="row mb20">
    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-6">
      <div class="panel-heading">
        <div class="stat">
              <h4>Hosted</h4>
              <small class="stat-label">Total Plays</small>
              <h3><%= hosted == '...' ? hosted : Number(hosted).toLocaleString() %></h3>
              <small class="stat-label">as of <%= hosted_latest ? hosted_latest : '---' %></small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-6">
          <div class="panel-heading">
            <div class="stat">
                  <h4>Offline</h4>
                  <small class="stat-label">Total Plays</small>
                  <h3><%= offline == '...' ? offline : Number(offline).toLocaleString() %></h3>
            </div><!-- stat -->
          </div><!-- panel-heading -->
        </div><!-- panel -->
</div>

<div class="row">
    <div class="panel panel-youtube panel-stat copy-to-clipboard col-sm-4">
      <div class="panel-heading">
        <div class="stat">
              <h4>YouTube</h4>
              <small class="stat-label">Total Plays</small>
              <h3><%= youtube_channel == '...' ? youtube_channel : Number(youtube_channel).toLocaleString() %></h3>
              <small class="stat-label">as of <%= youtube_channel_latest ? youtube_channel_latest : '---' %></small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-vimeo panel-stat copy-to-clipboard col-sm-4">
      <div class="panel-heading">
        <div class="stat">
              <h4>Vimeo</h4>
              <small class="stat-label">Total Plays</small>
              <h3><%= vimeo == '...' ? vimeo : Number(vimeo).toLocaleString() %></h3>
              <small class="stat-label">as of <%= vimeo_latest ? vimeo_latest : '---' %></small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-yahoo panel-stat copy-to-clipboard col-sm-4">
      <div class="panel-heading">
        <div class="stat">
              <h4>Yahoo</h4>
              <small class="stat-label">Total Plays</small>
              <h3><%= yahoo == '...' ? yahoo : Number(yahoo).toLocaleString() %></h3>
              <small class="stat-label">as of <%= yahoo_latest ? yahoo_latest : '---' %></small>
        </div><!-- stat -->
      </div><!-- panel-heading -->
    </div><!-- panel -->
</div>

