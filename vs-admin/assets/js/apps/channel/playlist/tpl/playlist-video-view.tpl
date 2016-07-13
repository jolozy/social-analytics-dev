<div class="modal-dialog">
  <div class="modal-content">
    <div class="panel panel-dark panel-alt">
        <div class="panel-heading">
            <h3 class="panel-title">Playlist Video</h3>
            <p>Playlist Video Information</p>
        </div>
        <div class="panel-body form form-horizontal">

          <div class="form-group">
            <label class="col-sm-3 control-label">Video</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Title" id="playlist-video-title" name="playlist-video-title" readonly/>
            </div>
          </div><!-- form-group -->

          <div class="form-group">
            <label class="col-sm-3 control-label">Published</label>
            <div class="col-sm-7 control-label">
              <div id="playlist-video-published" class="toggle toggle-success"></div>
            </div>
          </div>

        </div>
        <div class="panel-footer">
          <button aria-hidden="true" class="pull-right btn btn-success js-playlist-video-submit-btn" type="button">Save</button>
          <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
        </div>

    </div>
  </div>
</div>
