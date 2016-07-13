<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Videos 
    <span>List Videos</span>
    <div class="btn-group mr5 pull-right">
      <a href="#video/new"><button type="button" class="btn btn-default">New</button></a>
    </div>
  </h2>
</div>

<div class="contentpanel videos">
    <ul class="nav nav-tabs js-video-tabs">
        <li class="js-tab-all"><a data-toggle="tab" href="#" class="js-submission-tab">All</a></li>
        <li class="js-tab-unpublished"><a data-toggle="tab" href="#unpublished" class="js-submission-tab">Unpublished</a></li>
        <li class="js-tab-published"><a data-toggle="tab" href="#published" class="js-submission-tab">Published</a></li>
        <li class="js-tab-rights-general"><a data-toggle="tab" href="#rights_general" class="js-submission-tab">Third Party</a></li>
        <li class="js-tab-rights-advertising"><a data-toggle="tab" href="#rights_advertising" class="js-submission-tab">Monetization</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="subtitle mb5">Search</h4>
                    <div class="input-group mb15">
                        <input type="text" class="form-control js-tf-search" placeholder="Search by title, director name and rights holder name..." />
                        <span class="input-group-btn">
                          <button type="button" class="btn btn-default js-reset-search reset-search-btn">Reset</button>
                        </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <h4 class="panel-title js-results-title"></h4>
                                <p class="js-results-stats"></p>
                            </div>
                            <div class="col-md-6">
                                <ul class="pagination pull-right">

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row js-video-grid">
                        <div class="js-videos-loading text-center">
                            <img src="/vs-admin/assets/images/loaders/loader3.gif"/ >
                            <small>Loading videos...</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>