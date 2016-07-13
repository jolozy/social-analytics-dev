<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Partner 
  <span>Edit Partner Information...</span>
    <div class="btn-group mr5 pull-right">
      <button type="button" class="btn btn-default js-save">Save</button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
        <span class="sr-only">More options</span>
      </button>
        <ul class="dropdown-menu" role="menu">
          <li><a class="js-delete">Delete</a></li>
          <li><a href="#partners">Discard</a></li>
        </ul>
    </div>
  </h2>
  
</div>

<div class="contentpanel">
    <div class="row">
        <div class="col-md-12 video-edit">
        <ul class="nav nav-tabs js-video-tabs">
          <li><a data-toggle="tab" href="#basic" class=".js-video-tab">Basic Info</a></li>
          <li><a data-toggle="tab" href="#videos" class=".js-video-tab">Videos</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane" id="basic">
              <h1>Basic Information</h1>
              <form class="form form-horizontal form-bordered">
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">Title</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Title" id="title" name="title" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Feed URL</label>
                  <div class="col-sm-6">
                    <input type="text" placeholder="https://www.viddsee.com/feed/52637" class="form-control" id="feed_url" name="feed_url" disabled/>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Description</label>
                  <div class="col-sm-7">
                    <textarea id="description" name="description" class="form-control wysiwyg" rows="5"></textarea>
                  </div>
                </div><!-- form-group -->

                <h2>Publish Settings</h2>
                  <div class="row mb15">
                    <label class="col-sm-3 control-label">Publish Date</label>
                    <div class="col-sm-6 input-group">
                      <input type="text" class="form-control datepicker js-published-date" placeholder="mm/dd/yyyy">
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

                  <div class="form-group col-sm-6">
                    <label class="col-sm-6 control-label">Published</label>
                    <div class="col-sm-6 control-label">
                      <div name="published" id="published" class="toggle toggle-success"></div>
                    </div>
                  </div>

              </form>
            </div><!-- basic -->
            <div class="tab-pane table-responsive" id="videos">
              <table class="table table-hover table-hidaction sortable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th class="table-action">
                    <a class="js-new-partner-video-btn">
                        <i class="fa fa-plus"></i>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody class="js-partner-videos-container">

              </tbody>
              </table>
            </div><!-- videos -->

        </div><!-- tab-content -->
      </div><!-- video-edit -->
    </div><!-- contentpanel .row -->
</div><!-- contentpanel -->