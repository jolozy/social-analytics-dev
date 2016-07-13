<div class="modal-dialog">
  <div class="modal-content">
    <div class="panel panel-dark panel-alt">
        <div class="panel-heading">
            <h3 class="panel-title">Video Translation</h3>
            <p>Video Translation Information</p>
        </div>
        <div class="panel-body form form-horizontal">

          <div class="form-group">
            <label class="col-sm-3 control-label">Locale</label>
            <div class="col-sm-6">
              <select class="chosen-select" data-placeholder="Locale" id="locale" name="locale">
              </select>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Title</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Title" id="translated_title" name="translated_title" />
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Description</label>
            <div class="col-sm-7">
              <textarea id="translated_description_long" name="translated_description_long" class="form-control wysiwyg" rows="5"></textarea>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Log Line</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="" id="translated_description_short" name="translated_description_short" />
            </div>
          </div><!-- form-group -->

        </div>
        <div class="panel-footer">
          <button aria-hidden="true" class="pull-right btn btn-success js-video-translation-submit-btn" type="button">Save</button>
          <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
        </div>

    </div>
  </div>
</div>
