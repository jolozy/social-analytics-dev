<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Submission 
    <div class="mr5 pull-right submissions-btn-container js-submission-status">
      <a href="#silent_approve" class="btn btn-sm btn-success js-update-status">Silent approve</a>
      <a href="#reject" class="btn btn-sm btn-danger js-update-status">Reject</a>
      <a href="#moreinfo" class="btn btn-sm btn-primary submission-moreinfo-btn js-update-status">Need more Info</a>
      <a href="#approve" class="btn btn-sm btn-success js-update-status">Approve</a>
      <a href="#" class="btn btn-sm btn-default-alt submission-status">-</a>
    </div>
  </h2>
</div>
<div class="contentpanel">
  <div class="row">
    <div class="col-md-12 video-edit">
      <ul class="nav nav-tabs js-submission-tabs">
        <li><a data-toggle="tab" href="#basic" class=".js-submission-tab">Film Info</a></li>
        <li><a data-toggle="tab" href="#images" class=".js-submission-tab">Images</a></li>
        <li><a data-toggle="tab" href="#translation" class=".js-submission-tab">Translation</a></li>
        <li><a data-toggle="tab" href="#creator" class=".js-submission-tab">Creator/License Info</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" id="basic">
          <div class="row">
            <div class="col-md-10"><h1>Video</h1></div>
            <div class="col-md-2">
              <a href="#" id="video-download-link" class="btn btn-primary btn-block" download>Download</a>
            </div>
          </div>
          <div class="video-player mb30">
            <video id="video_file_source_url" controls></video>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Alternate Video Source URL</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="URL" id="video_file_url_alt" name="video_file_url_alt" readonly/>
            </div>
          </div><!-- form-group -->
          <div class="form-group">
            <label class="col-sm-3 control-label">Alternate Video Source Password</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="URL" id="alt_file_credentials" name="alt_file_credentials" readonly/>
            </div>
          </div><!-- form-group -->
          <h1>Film Information</h1>
          <form class="form form-horizontal form-bordered">
            <div class="form-group">
              <label class="col-sm-3 control-label">Title</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Title" id="title" name="title" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Year</label>
              <div class="col-sm-6">
                <div class="input-group mb15">
                  <input type="text" placeholder="yyyy" id="year" name="year" class="form-control" />
                </div>
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Log Line</label>
              <div class="col-sm-7">
                <textarea id="description_short" name="description_short" class="form-control wysiwyg" rows="5"></textarea>
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Description</label>
              <div class="col-sm-7">
                <textarea id="description_long" name="description_long" class="form-control wysiwyg" rows="5"></textarea>
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Directors</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Directors" id="directors" name="directors" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Cast</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Cast" id="cast" name="cast" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Crew</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Crew" id="crew" name="crew" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Festivals</label>
              <div class="col-sm-7">
                <div id="festivals" name="festivals" class=""></div>
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Country</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Country" id="country" name="country" />
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">Language</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Language" id="language" name="language" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Subtitle Language</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Subtitle Language" id="subtitle-language" name="subtitle-language" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Genre</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Genre" id="genres" name="genres" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Topic</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Topic" id="topics" name="topics" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Tags</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Tags" id="tags" name="tags" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Period</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Period" id="preriod" name="preriod" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Content Rating</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Content Rating" id="content_rating" name="content_rating" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Website</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Website" id="website_url" name="website_url" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Facebook Page</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Facebook Page" id="fb_page_url" name="fb_page_url" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Twitter Handle</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Twitter Handle" id="tw_handle" name="tw_handle" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Twitter Hashtag</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Twitter Hashtag" id="tw_hashtag" name="tw_hashtag" />
              </div>
            </div><!-- form-group -->
          </form>
        </div>
        <div class="tab-pane" id="images">
          <h1>Images</h1>
          <h2>Gallery</h2>
          <div class="gallery row filemanager">
            
          </div>
        </div>

        <div class="tab-pane" id="translation">
          <h1>Translation</h1>

          <div class="form-group">
            <label class="col-sm-3 control-label">Language Code</label>
            <div class="col-sm-6">
              <input class="form-control js-alt-language" placeholder="No language chosen" disabled />
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label">Title</label>
            <div class="col-sm-6">
              <input class="form-control" value="<%= alt_title %>" disabled />
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label">Sypnosis</label>
            <div class="col-sm-6">
              <textarea class="form-control" disabled><%= alt_description_long %></textarea>
            </div>
          </div>
        </div>

        <div class="tab-pane" id="creator">
          <h1>Basic Information</h1>
          <form class="form form-horizontal form-bordered">
            <div class="form-group">
              <label class="col-sm-3 control-label">Name</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="Name" id="creator_name" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Email</label>
              <div class="col-sm-6">
                <input type="text" placeholder="Email" class="form-control" id="creator_email" />
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Referral</label>
              <div class="col-sm-6">
                <input type="text" placeholder="Name of Referral" class="form-control" id="referral" />
              </div>
            </div><!-- form-group -->
              
            <h2>Rights</h2>

            <div class="form-group col-sm-6">
              <label class="col-sm-6 control-label">3rd Party Rights</label>
              <div class="col-sm-6 control-label">
                <div class="toggle toggle-success" id="rights_third_party"></div>
              </div>
            </div>

            <div class="form-group col-sm-6">
              <label class="col-sm-6 control-label">Monetisation</label>
              <div class="col-sm-6 control-label">
                <div class="toggle toggle-success" id="rights_monetisation"></div>
              </div>
            </div>

            <div class="form-group col-sm-6">
              <label class="col-sm-6 control-label">Premiere</label>
              <div class="col-sm-6 control-label">
                <div class="toggle toggle-success" id="premiere"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
