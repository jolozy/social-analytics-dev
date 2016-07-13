<div class="modal-dialog">
    <div class="modal-content">
        <div class="panel panel-dark panel-alt">
            <div class="panel-heading">
                <h3 class="panel-title">Edit Email</h3>
                <p>Edit email information</p>
            </div>
            <div class="panel-body form form-horizontal">

                <div class="form-group">
                    <label class="col-sm-2 control-label">Language</label>
                    <div class="col-sm-10">
                        <div class="js-select-language" id="email-alt-lang" name="email-alt-lang">
                        </div>
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">To: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="Recipient" id="email_to" name="email_to" />
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Sender: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="Sender" id="sender" name="sender" />
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">cc: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="CC" id="email_cc" name="email_cc" />
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">bcc: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="BCC" id="email_bcc" name="email_bcc" />
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Subject: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="Subject" id="email_subject" name="email_subject" />
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Message: </label>
                    <div class="col-sm-10">
                        <textarea type="text" class="form-control wysiwyg" id="email_message_body" name="email_message_body" rows="5">
                        </textarea>
                    </div>
                </div><!-- form-group -->

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
                <button aria-hidden="true" class="pull-right btn btn-warning js-schedule-email-submit-btn" type="button">Schedule Email</button>
                <button aria-hidden="true" class="pull-right btn btn-success create-email-btn js-create-email-submit-btn" type="button">Save Draft</button>
                <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
            </div>

        </div>
    </div>
</div>
