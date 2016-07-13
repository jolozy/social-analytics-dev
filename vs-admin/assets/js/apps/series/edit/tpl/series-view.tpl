<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Series 
  <span>Edit Series Information...</span>
  <div class="btn-group mr5 pull-right">
    <button type="button" class="btn btn-default js-save-btn">Save</button>
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <span class="caret"></span>
      <span class="sr-only">More options</span>
    </button>
      <ul class="dropdown-menu" role="menu">
        <li><a href="#" class="js-discard-btn">Discard Changes</a></li>
        <li><a href="#" class="js-delete-btn">Delete</a></li>
      </ul>
  </div>
  </h2>
</div>
<div class="contentpanel">
  <div class="row">
    <div class="col-md-12 series-edit">
      <ul class="nav nav-tabs js-channel-tabs">
        <li><a data-toggle="tab" href="#basic">Basic Info</a></li>
        <li><a data-toggle="tab" href="#advanced">Series Info</a></li>
        <li><a data-toggle="tab" href="#seasons">Seasons</a></li>
        <li><a data-toggle="tab" href="#images">Images</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" id="basic">
          <h1>Basic Information</h1>
          <form class="form form-horizontal form-bordered">
            <div class="form-group">
              <div class="row">
                <label class="col-sm-3 control-label" for="title">Title</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="Title" id="title" name="title"/>
                  <span class="help-block"></span>
                </div>
              </div>

              <div class="row">
                <label class="col-sm-3 control-label" for="url">Series Vanity URL</label>
                <div class="col-sm-6">
                  <input type="text" placeholder="Friendly URL" class="form-control" id="series_url" name="url"/>
                  <span class="help-block">A url friendly version of the series title...</span>
                </div>  
              </div>
              <div class="row">
                <label class="col-sm-3 control-label" for="channel_url">Preview</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control js-preview-url" readonly onClick="this.select()"/>
                  <span class="help-block">Click to highlight URL</span>
                </div>
              </div>
            </div><!-- form-group -->

            <h2>Publish Settings</h2>
            <div class="form-group">
              <div class="row mb15">
                <label class="col-sm-3 control-label">Publish Date</label>
                <div class="col-sm-6 input-group">
                  <input type="text" class="form-control datepicker js-published-date" placeholder="dd/mm/yyyy">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                </div>
              </div><!-- form-group -->

              <div class="row mb15">
                <label class="col-sm-3 control-label">Publish Time</label>
                <div class="col-sm-6 input-group mb15">
                  <div class="bootstrap-timepicker"><input type="text" class="form-control timepicker js-published-time"/></div>
                  <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                </div>
              </div><!-- form-group -->

              <div class="col-sm-6">
                <label class="col-sm-6 control-label">Published</label>
                <div class="col-sm-6 control-label">
                  <div name="published" id="published" class="toggle toggle-success"></div>
                </div>
              </div>
            </div>
          </form>
        </div><!-- basic -->

        <div class="tab-pane" id="advanced">
          <h1>Film Information</h1>
          <form class="form form-horizontal form-bordered">

            <div class="form-group">
              <label class="col-sm-3 control-label">Description</label>
              <div class="col-sm-7">
                <textarea id="description_long" name="description_long" class="form-control wysiwyg" rows="10"></textarea>
              </div>
            </div><!-- form-group -->
          </form>
        </div><!-- advanced -->

        <div class="tab-pane" id="seasons">
          <table class="table table-hover table-hidaction sortable">
            <thead>
              <tr>
                <th>Season Number</th>
                <th>Status</th>
                <th class="table-action">
                  <a href="#" class="js-btn-new">
                      <i class="fa fa-plus"></i>
                  </a>
                </th>
              </tr>
            </thead>
            <tbody class="js-seasons-list-container">
              
            </tbody>
          </table>
        </div><!-- seasons -->

        <div class="tab-pane" id="images">
          <h1>Images</h1>

          <h2>Coverphoto</h2>
          <div class="coverphoto js-upload-coverphoto">
            <img src="assets/images/photos/photo5.png" class="img-responsive" alt="" id="coverphoto">
            <a class="js-upload-photo"></a>
          </div>
        </div><!-- images -->
      </div>
    </div>
  </div>
</div>