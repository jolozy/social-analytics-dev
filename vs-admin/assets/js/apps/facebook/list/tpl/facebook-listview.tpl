<div class="pageheader">
    <h2><i class="fa fa-facebook-official"></i> Facebook Posts
        <span>Manage Facebook Posts</span></h2>
</div>

<div class="col-sm-12 mt10">
    <div class="panel panel-default">
        <div class="panel-body">
            <h5 class="subtitle mb5">Filter by:</h5>

            <div class="row">
                <div class="col-sm-4 form-group">
                    <label class="control-label">Status</label>
                    <div class="input-group" style="width:100%;">
                        <select class="form-control input-sm mb15 js-status">
                            <option value="all" default>All</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div class="col-sm-4 form-group">
                    <label class="control-label">Facebook Page</label>
                    <div class="input-group" style="width:100%;">
                        <select class="form-control input-sm mb15 js-fb-page">
                            <option value="all" default>All</option>
                            <option value="en">Viddsee English</option>
                            <option value="zh">Viddsee 亞洲微電影</option>
                            <option value="id">Viddsee Film Pendek</option>
                            <option value="ph">Viddsee Philippines</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <button class="btn btn-success js-filter pull-right mr20">Filter</button>
                <button class="btn btn-default js-reset-filter pull-right mr10">Reset Filter</button>
            </div>

        </div>
    </div>
</div>

<div class="col-sm-12 mt10">
    <ul class="pagination pull-right">

    </ul>
</div>

<div class="col-sm-12 mt10">
    <div class="panel-heading">
        <h3 class="panel-title">Facebook Posts</h3>
        <div class="row text-right options-container pull-right">
            <a href="" class="btn btn-default btn-xs js-create-new-post">Create New Post</a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-hover mb30">
            <thead>
            <tr>
                <th class="text-center">Film</th>
                <th class="text-center">Status</th>
                <th class="text-center">Page</th>
                <th class="text-center">Last updated</th>
                <th class="text-center">Options</th>
            </tr>
            </thead>
            <tbody class="js-facebook-list facebook-list">

            </tbody>
        </table>
    </div><!-- table-responsive -->
    <div class="js-loading-posts text-center">
        <img src="/vs-admin/assets/images/loaders/loader3.gif" />
        <small>Loading posts...</small>
    </div>
</div>
<div class="comment-clearfix"></div>