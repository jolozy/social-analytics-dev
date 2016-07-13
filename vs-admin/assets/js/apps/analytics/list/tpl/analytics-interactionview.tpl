<div class="stats-heading-container mb10">
    <h2 class="stats-title">Engagement Statistics</h2>
</div>

<div class="row">
    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-3">
        <div class="panel-heading">
            <div class="stat">
                <h4>Viddsee</h4>
                <small class="stat-label">Hearts Added</small>
                <h3><%= isNaN(likes) ? '...' : Number(likes).toLocaleString() %></h3>
                <small class="stat-label">as of <%= likes_latest ? likes_latest : '---' %></small>
            </div><!-- stat -->
        </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-3">
        <div class="panel-heading">
            <div class="stat">
                <h4>Viddsee</h4>
                <small class="stat-label">Comments Created</small>
                <h3><%= isNaN(comments['internal']) ? '...' : Number(comments['internal']).toLocaleString() %></h3>
              	<small class="stat-label">as of <%= comments['internal_latest'] ? comments['internal_latest'] : '---' %></small>
            </div><!-- stat -->
        </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-facebook panel-stat copy-to-clipboard col-sm-3">
        <div class="panel-heading">
            <div class="stat">
                <h4>Facebook</h4>
                <small class="stat-label">Comments Created</small>
                <h3><%= isNaN(comments['facebook']) ? '...' : Number(comments['facebook']).toLocaleString() %></h3>
	            <small class="stat-label">as of <%= comments['facebook_latest'] ? comments['facebook_latest'] : '---' %></small>
            </div><!-- stat -->
        </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-3">
        <div class="panel-heading">
            <div class="stat">
                <h4>Buzz</h4>
                <small class="stat-label">Comments Created</small>
                <h3><%= isNaN(comments['buzz']) ? '...' : Number(comments['buzz']).toLocaleString() %></h3>
                <small class="stat-label">as of <%= comments['buzz_latest'] ? comments['buzz_latest'] : '---' %></small>
            </div><!-- stat -->
        </div><!-- panel-heading -->
    </div><!-- panel -->
</div>
