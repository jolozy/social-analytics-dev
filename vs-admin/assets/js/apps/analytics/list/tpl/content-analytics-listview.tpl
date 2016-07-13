<ul class="nav nav-tabs">
  <li class="active"><a href="#video_submissions" class="content-tabs" data-toggle="tab"><strong>Video Submissions</strong></a></li>
  <li class=""><a href="#videos" class="content-tabs" data-toggle="tab"><strong>Videos</strong></a></li>
</ul>

<div class="tab-content mb30">
    <div class="tab-pane active" id="video_submissions">
        <table id="video_submissions" class="table table-hover table-fixed">
            <thead>
                <tr>
                    <th><%= (typeof(pivot_title) == 'undefined') ? '' : pivot_title %></th>
                    <th>Submitted<sup>*</sup></th>
                    <th>Processed Approved</th>
                    <th>Processed Rejected</th>
                    <th>Processed Total</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <sub>*For pivot by referrals, this shows number of videos that were submitted during the selected date range but eventually processed and approved.</sub>
    </div>
    <div class="tab-pane" id="videos">
        <table id="videos" class="table table-hover table-fixed">
            <thead>
                <tr>
                    <th><%= (typeof(pivot_title) == 'undefined') ? '' : pivot_title %></th>
                    <th>Published</th>
                    <th>Programmed</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
