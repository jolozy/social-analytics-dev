<div class="modal-dialog">
    <div class="modal-content">
        <div class="panel panel-dark panel-alt">
            <div class="panel-heading">
                <h3 class="panel-title">Schedule Post</h3>
                <p>Schedule a date for post to be sent</p>
            </div>
            <div class="panel-body form form-horizontal">

                <div class="form-group">
                    <label class="col-sm-2 control-label">Select Date/Time</label>
                    <div class="col-sm-5">
                        <div class="input-group">
                            <input type="text" class="form-control startdatepicker js-schedule-date" placeholder="mm/dd/yyyy">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        </div>
                    </div>
                    <div class="col-sm-5 input-group">
                        <div class="bootstrap-timepicker"><input type="text" class="form-control timepicker js-schedule-time"/></div>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                </div><!-- form-group -->

            </div>
            <div class="panel-footer">
                <button aria-hidden="true" class="pull-right btn btn-success js-schedule-post-submit-btn" type="button">Schedule Post</button>
                <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
            </div>

        </div>
    </div>
</div>