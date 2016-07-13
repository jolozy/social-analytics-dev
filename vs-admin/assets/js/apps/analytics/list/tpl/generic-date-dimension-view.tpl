<div class="pageheader">
    <h2><i class="fa fa-bar-chart-o"></i> Analytics
        <span id="page-title"></span>
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
        <div class='col-lg-6 col-md-6'>
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-lg-3 col-md-3 col-sm-3 control-label">Group By:</label>
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        <select class="form-control input-sm mb15" id="dimension-picker">
                            <option value="age">age</option>
                            <option value="country">country</option>
                            <option value="city">city</option>
                            <option value="gender">gender</option>
                            <option value="genre">genre</option>
                            <option value="product">product</option>
                            <option value="video">video</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <div class='col-lg-6 col-md-6'>
            <form class="form-horizontal">
                <div class="row">
                    <label class="col-lg-3 col-md-3 col-sm-3 control-label">Show Top:</label>
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        <select class="form-control input-sm mb15" id="limit-picker">
                            <option value="10">10</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option selected="selected" value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class='row mb10'>
        <div class="table-responsive stats-container"></div>
    </div>
</div>
