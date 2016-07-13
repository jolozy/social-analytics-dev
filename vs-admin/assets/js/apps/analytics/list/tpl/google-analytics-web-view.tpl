<div class="pageheader">
    <h2><i class="fa fa-bar-chart-o"></i> Analytics
        <span>Google Analytics - MAU by Country</span>
    </h2>
</div>
<div class="contentpanel">
    <div class="row mb10">
        <div class="col-lg-6 col-md-6 col-sm-6">
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-lg-3 col-md-3 col-sm-3 control-label">Date Range:</label>
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        <select class="form-control input-sm mb15" id="date-range-picker">
                            <option value="custom">Custom</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="lastweek">Last Week (Mon - Sun)</option>
                            <option value="lastmonth">Last Month</option>
                            <option value="monthtodate">Month to Date</option>
                            <option value="yeartodate">Year to Date</option>
                            <option value="alltime">All Time</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">
            <form class="form-horizontal">
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
            </form>
        </div>
    </div>

    <div class="row mb10">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-lg-2 col-md-2 col-sm-2 control-label">Segment:</label>
                    <div class="col-lg-10 col-md-10 col-sm-10">
                        <select class="form-control input-sm mb15" id="segment-picker">
                            <option value="all">All</option>
                            <option value="signed in">Signed in users</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="table-responsive content-table">

    </div>

    <div class="js-loading-container hidden">
    <div class="js-stats-loading text-center">
          <img src="/vs-admin/assets/images/loaders/loader3.gif"/ >
          <small>Loading data from Google... Go have a cup of coffee...</small>
      </div>
  </div>
</div>
