<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Carousel 
  <span>Edit Carousel Information...</span>
    <div class="btn-group mr5 pull-right">
      <button type="button" class="btn btn-default js-save">Save</button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
        <span class="sr-only">More options</span>
      </button>
        <ul class="dropdown-menu" role="menu">
          <li><a href="#carousel/<%= carousel_type %>">Discard</a></li>
        </ul>
    </div>
  </h2>
  
</div>

<div class="contentpanel">
    <div class="row">
        <div class="col-md-12 video-edit">
        <ul class="nav nav-tabs js-video-tabs">
          <li><a data-toggle="tab" href="#basic" class=".js-video-tab">Basic Info</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane" id="basic">
              <h2>Image</h2>
              <div class="coverphoto js-carousel-image">
                <img src="assets/images/photos/photo5.png" class="img-responsive" alt="" id="coverphoto">
              </div>

              <h2>Basic Information</h2>
              <form class="form form-horizontal form-bordered">
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">Title</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Title" id="title" name="title" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">URL</label>
                  <div class="col-sm-6">
                    <input type="text" placeholder="e.g https://www.viddsee.com/video/ab345" class="form-control" id="action_url" name="action_url"/>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Description</label>
                  <div class="col-sm-7">
                    <textarea id="description" name="description" class="form-control wysiwyg" rows="5"></textarea>
                  </div>
                </div><!-- form-group -->

                

                <h2>Publish Settings</h2>
                  <div class="form-group col-sm-6">
                    <label class="col-sm-6 control-label">Published</label>
                    <div class="col-sm-6 control-label">
                      <div name="published" id="published" class="toggle toggle-success"></div>
                    </div>
                  </div>
                  <div class="form-group col-sm-6">
                    <label class="col-sm-6 control-label">Hide Caption</label>
                    <div class="col-sm-6 control-label">
                      <div class="toggle toggle-success" name="not_film" id="not_film"></div>
                    </div>
                  </div>

              </form>
            </div><!-- basic -->

        </div><!-- tab-content -->
      </div><!-- video-edit -->
    </div><!-- contentpanel .row -->
</div><!-- contentpanel -->