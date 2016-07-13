<div class="pageheader">
    <h2><i class="fa fa-bar-chart-o"></i> Analytics
        <span id="page-title">Video comments</span>
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

    <div class='row mb10'>
        <div class='col-lg-12 col-md-12'>
            <div class="form-group">
                <label class="col-sm-2 control-label">Select Video:</label>
                <div class="col-sm-10">
                    <div class="js-select-video" id="video-picker" name="video-picker">
                    </div>
                </div>
            </div><!-- form-group -->
        </div>
       <!--  <div class='col-lg-6 col-md-6'>
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-lg-4 col-md-4 col-sm-4 control-label">Select Source:</label>
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <select class="form-control input-sm mb15" id="source-picker">
                            <option value="all">All</option>
                            <option value="internal">Internal</option>
                            <option value="facebook">Facebook</option>
                            <option value="buzz">Buzz</option>
                        </select>
                    </div>
                </div>
            </form>
        </div> -->
    </div>

    <div class="row">
        <ul class="pagination pull-right">

        </ul>
    </div>

    <div class="row mb10">
        <div class="table-responsive stats-container"></div>
    </div>

    <div class="video-analytics-message row text-center">
        <img src="vs-admin/assets/images/loaders/loader3.gif" /> Loading...
    </div>
</div>
