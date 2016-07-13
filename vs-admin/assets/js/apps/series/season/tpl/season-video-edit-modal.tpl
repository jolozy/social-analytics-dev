<div class="modal-dialog">
  <div class="modal-content">
    <div class="panel panel-dark panel-alt">
        <div class="panel-heading">
            <div class="panel-btns">
              <a href="#" class="js-edit-video" data-dismiss="modal"><div class="btn btn-primary">Edit Video</div></a>
            </div><!-- panel-btns -->
            <h3 class="panel-title">Season Video</h3>
            <p>Edit Season Video Information</p>
        </div>
        <div class="panel-body form form-horizontal">

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
              <div class="toggle toggle-success" id="published"></div>
            </div>
          </div>

        </div>
        <div class="panel-footer">
          <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-success js-btn-save" type="button">Save</button>
          <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5 js-btn-cancel" type="button">Cancel</button>
          <button aria-hidden="true" data-dismiss="modal" class="pull-left btn btn-danger js-btn-delete" type="button">Delete</button>
        </div>

    </div>
  </div>
</div>
