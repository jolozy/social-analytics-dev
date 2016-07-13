<div class="modal-dialog">
  <div class="modal-content">
    <div class="panel panel-dark panel-alt">
        <div class="panel-heading">
            <h3 class="panel-title">Season Video</h3>
            <p>Season Video Information</p>
        </div>
        <div class="panel-body form form-horizontal">

          <div class="form-group" id="choose_video">
            <label class="col-sm-3 control-label">Choose Video</label>
            <div class="col-sm-7">
              <!-- <select class="chosen-select" id="video_id" name="video_id"> -->
              <!-- </select> -->
              <input type="text" class="form-control chosen-select" id="video_id" name="video_id">
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Video Title</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" placeholder="Title" id="title" name="title" />
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Description</label>
            <div class="col-sm-7">
              <textarea id="description_long" name="description_long" class="form-control wysiwyg" rows="5"></textarea>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Published</label>
            <div class="col-sm-7 control-label">
              <div class="toggle toggle-success"></div>
            </div>
          </div>

        </div>
        <div class="panel-footer">
          <button aria-hidden="true" class="pull-right btn btn-success js-btn-save" type="button">Save</button>
          <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5 js-btn-cancel" type="button">Cancel</button>
        </div>
    </div>
  </div>
</div>