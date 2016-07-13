
<div class="pageheader">
    <h2><i class="fa fa-rss"></i> Buzz Newsletters
        <span>Manage Buzz Newsletters</span></h2>
</div>

<div class="contentpanel list">
    <div class="col-sm-12 mt10 mb20 next-list">
        <h4 class="subtitle mb5">Queued to send</h4>
        <table class="table table-hover mb30">
            <thead>
            <tr>
                <th class="text-center">Subject</th>
                <th class="text-center">List Name</th>
                <th class="text-center">Day of Week</th>
                <th class="text-center">Next Scheduled Date</th>
            </tr>
            </thead>
            <tbody class="js-buzz-next-list buzz-next-list">

            </tbody>
        </table>
    </div>
    <div class="col-sm-12 mt10 all-list">
        <h4 class="subtitle mb5">Newsletter List</h4>
        <div class="panel panel-default">
            <div class="panel-body">
                <h5 class="subtitle mb5">Filter by:</h5>

                <div class="row">
                    <div class="col-sm-4 form-group">
                        <label class="control-label">Status</label>
                        <div class="input-group" style="width:100%;">
                            <select class="form-control input-sm mb15 js-status">
                                <option value="" default>Any</option>
                                <option value="saved">Saved</option>
                                <option value="ready">Ready</option>
                                <option value="sent">Sent</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-sm-4 form-group">
                        <label class="control-label">Category</label>
                        <div class="input-group" style="width:100%;">
                            <select class="form-control input-sm mb15 js-categories">
                                <option value="" default>Any</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-sm-4 form-group">
                        <label class="control-label">Language</label>
                        <div class="input-group" style="width:100%;">
                            <select class="form-control input-sm mb15 js-language">
                                <option value="" default>Any</option>
                                <option value="en">en</option>
                                <option value="zh">zh</option>
                                <option value="id">id</option>
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

        <ul class="pagination pull-right">

        </ul>

        <table class="table table-hover mb30">
            <thead>
            <tr>
                <th class="text-center">Subject</th>
                <th class="text-center">Status</th>
                <th class="text-center">Category</th>
                <th class="text-center">Language</th>
                <th class="text-center">Created at</th>
                <th class="text-center">Options</th>
            </tr>
            </thead>
            <tbody class="js-buzz-list buzz-list">

            </tbody>
        </table>
    </div>
</div>
