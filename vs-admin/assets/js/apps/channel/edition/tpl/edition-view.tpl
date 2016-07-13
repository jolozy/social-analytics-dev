<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Edition
  <span><a href="#" id="channels_link">Back to channel...</a></span>
    <div class="btn-group mr5 pull-right">
      <button type="button" class="btn btn-default js-save">Save</button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
        <span class="sr-only">More options</span>
      </button>
        <ul class="dropdown-menu" role="menu">
          <li><a class="js-delete">Delete</a></li>
          <li><a href="#">Discard</a></li>
        </ul>
    </div>
  </h2>
  
</div>

<div class="contentpanel">
    <div class="row">
        <div class="col-md-12 edition-edit">
        <ul class="nav nav-tabs js-edition-tabs">
          <li><a data-toggle="tab" href="#basic" class=".js-edition-tab">Basic Info</a></li>
          <li><a data-toggle="tab" href="#advanced" class=".js-edition-tab">Edition Info</a></li>
          <li><a data-toggle="tab" href="#playlists" class=".js-edition-tab">Playlists</a></li>
          <li><a data-toggle="tab" href="#images" class=".js-edition-tab">Images</a></li>
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
                    <label class="col-sm-3 control-label" for="friendly_url">Friendly URL</label>
                    <div class="col-sm-6">
                      <input type="text" placeholder="Friendly URL" class="form-control" id="friendly_url" name="friendly_url"/>
                      <span class="help-block">A url friendly version of the edition title...</span>
                    </div>  
                  </div>
                  <div class="row">
                    <label class="col-sm-3 control-label" for="edition_url">Preview</label>
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

                  <div class="col-sm-6">
                    <label class="col-sm-6 control-label">Published</label>
                    <div class="col-sm-6 control-label">
                      <div name="published" id="published" class="toggle toggle-success"></div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <label class="col-sm-6 control-label">Featured</label>
                    <div class="col-sm-6 control-label">
                      <div name="featured" id="featured" class="toggle toggle-success"></div>
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
                    <textarea id="description_long" name="description_long" class="form-control wysiwyg" rows="5"></textarea>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Website</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Website (http://www.something.com)" id="website_url" name="website_url" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Facebook Page</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Facebook Page (http://www.facebook.com)" id="fb_page_url" name="fb_page_url" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Twitter Handle</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Twitter Handle (greengoblin)" id="tw_handle" name="tw_handle" />
                  </div>
                </div><!-- form-group -->

                <!--
                <div class="form-group">
                  <label class="col-sm-3 control-label">Twitter Hashtag</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Twitter Hashtag (#viddsee)" id="tw_hashtag" name="tw_hashtag" />
                  </div>

                </div>--><!-- form-group -->

              </form>
            </div><!-- advanced -->

            <div class="tab-pane" id="playlists">
              <table class="table table-hover table-hidaction sortable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th class="table-action">
                    <a class="js-new-edition-playlist-btn">
                        <i class="fa fa-plus"></i>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody class="js-edition-playlists-container">

              </tbody>
              </table>
            </div><!-- videos -->

            <div class="tab-pane" id="images">
              <h1>Images</h1>

              <h2>Coverphoto</h2>
              <div class="coverphoto js-upload-coverphoto">
                <p>Upload an image</p>
                <img src="assets/images/photos/photo5.png" class="img-responsive" alt="" id="coverphoto">
              </div>

              <h2>Sponsors</h2>
              <div class="gallery row filemanager js-gallery">
              </div>

            </div><!-- images -->

        </div><!-- tab-content -->
      </div><!-- video-edit -->
    </div><!-- contentpanel .row -->
</div><!-- contentpanel -->
