<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Season 
  <span><a href="#" id="series_link">Back to series...</a></span>
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
    <div class="col-md-12 video-edit">
    <ul class="nav nav-tabs js-season-tabs">
      <li><a data-toggle="tab" href="#basic">Basic Info</a></li>
      <li><a data-toggle="tab" href="#videos">Videos</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane" id="basic">
        <h1>Basic Information</h1>
        <form class="form form-horizontal form-bordered">
          <div class="form-group">
            <div class="row">
              <label class="col-sm-3 control-label" for="season_index">Season Index</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Season Index" id="season_index" name="season_index"/>
                <span class="help-block"></span>
              </div>
            </div>
          </div><!-- form-group -->
          <h2>Publish Settings</h2>
          <div class="form-group">
            <label class="col-sm-3 control-label">Publish Date</label>
            <div class="col-sm-6 input-group">
              <input type="text" class="form-control datepicker js-published-date" placeholder="dd/mm/yyyy">
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

          <div class="form-group col-sm-6">
            <label class="col-sm-6 control-label">Published</label>
            <div class="col-sm-6 control-label">
              <div class="toggle toggle-success" id="published"></div>
            </div>
          </div>
        </form>
      </div>
      <div class="tab-pane table-responsive" id="videos">
        <table class="table table-hover sortable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th class="table-action">
                <a class="js-btn-new" href="#">
                    <i class="fa fa-plus"></i>
                </a>
              </th>
            </tr>
          </thead>
          <tbody class="js-videos-list-container">
          </tbody>
        </table>
    </div>
    </div>
  </div>
</div>