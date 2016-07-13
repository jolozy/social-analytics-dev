<div class="modal-dialog">
  <div class="modal-content">
    <div class="panel panel-dark panel-alt">
        <div class="panel-heading">
            <h3 class="panel-title">Partner Video</h3>
            <p>Partner Video Information</p>
        </div>
        <div class="panel-body form form-horizontal">

          <div class="form-group">
            <label class="col-sm-3 control-label">Choose Video</label>
            <div class="col-sm-6">
              <div class="js-select-video" id="partner-video-id" name="partner-video-id">
              </div>
            </div>
          </div><!-- form-group -->

          <img class="dropzone mb15 img-preview img-responsive"/>

          <div class="form-group">
            <label class="col-sm-3 control-label">Title</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Title" id="partner-video-title" name="partner-video-title" />
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Description</label>
            <div class="col-sm-7">
              <textarea id="partner-video-description" name="partner-video-description" class="form-control wysiwyg" rows="5"></textarea>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Publish Date</label>
            <div class="col-sm-6 input-group">
              <input type="text" class="form-control datepicker js-published-date" placeholder="mm/dd/yyyy">
              <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Publish Time</label>
            <div class="col-sm-6 input-group mb15">
              <div class="bootstrap-timepicker"><input type="text" class="form-control timepicker js-published-time"/></div>
              <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Published</label>
            <div class="col-sm-7 control-label">
              <div id="partner-video-new-published" class="toggle toggle-success"></div>
            </div>
          </div>

        </div>
        <div class="panel-footer">
          <button aria-hidden="true" class="pull-right btn btn-success js-new-partner-video-submit-btn" type="button">Save</button>
          <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
        </div>

    </div>
  </div>
</div>a