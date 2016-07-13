<div class="stats-heading-container mb10">
    <h2 class="stats-title">Growth Statistics</h2>
</div>

<div class="row">
    <div class="panel panel-youtube panel-stat col-sm-8">
        <div class="panel-heading growth">
            <div class="stat">
                <h4>YouTube</h4>
                <table>
                    <tr>
                    <th><small class="stat-label">Subscribers Gained</small></th>
                    <th>&nbsp;</th>
                    <th><small class="stat-label">Tracked Plays</small></th>
                    </tr>
                    <tr>
                    <td><h3><%= youtube_subs == '...' ? youtube_subs : Number(youtube_subs).toLocaleString() %></h3>
                    <small class="stat-label">as of <%= youtube_subs_latest ? youtube_subs_latest : '---'%></small></td>
                    <td>&nbsp;</td>
                    <td><h3><%= youtube == '...' ? youtube : Number(youtube).toLocaleString() %></h3>
                    <small class="stat-label">as of <%= youtube_latest ? youtube_latest : '---'%></small></td>
                    </tr>
                </table>
            </div><!-- stat -->
        </div><!-- panel-heading -->
    </div><!-- panel -->

    <div class="panel panel-viddsee panel-stat copy-to-clipboard col-sm-4">
        <div class="panel-heading">
            <div class="stat">
                <h4>Viddsee</h4>
                <small class="stat-label">Sign-ups</small>
                <h3><%= viddsee_signups == '...' ? viddsee_signups : Number(viddsee_signups).toLocaleString() %></h3>
                <small class="stat-label">as of <%= viddsee_signups_latest ? viddsee_signups_latest : '---' %></small>
            </div><!-- stat -->
        </div><!-- panel-heading -->
    </div><!-- panel -->
</div>
