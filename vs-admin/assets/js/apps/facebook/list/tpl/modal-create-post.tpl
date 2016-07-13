<div class="modal-dialog">
    <div class="modal-content">
        <div class="panel panel-dark panel-alt">
            <div class="panel-heading">
                <h3 class="panel-title" id="white-text">New facebook post</h3>
            </div>
            <div class="panel-body form form-horizontal">

                <div class="form-group">
                    <label class="col-sm-2 control-label">Page: </label>
                    <div class="col-sm-10">
                        <div class="js-select-page" id="post-page-id">
                        </div>
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Film: </label>
                    <div class="col-sm-10">
                        <div class="js-select-film" id="post-film-id">
                        </div>
                        <div class="unpublished-warnings"></div>
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Select Date/Time</label>
                    <div class="col-sm-5">
                        <div class="input-group">
                            <input type="text" class="form-control startdatepicker js-schedule-date" placeholder="mm/dd/yyyy">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        </div>
                    </div>
                    <div class="col-sm-5 input-group">
                        <div class="bootstrap-timepicker"><input type="text" class="form-control timepicker js-schedule-time"/></div>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <div class="col-sm-12" id="post-template">

                        <div class="container">
                            <div class="post">
                                <div class="content">
                                    <div class="head">
                                        <div class="profPic">
                                            <img src="https://scontent-sin1-1.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/1002297_625975384087173_1725052126_n.jpg?oh=2718f9297b57b6795ffcc3d0d7375cc6&oe=57080FD5" height="40" width="40">
                                        </div>
                                        <div class="topic">
                                            <div class="pageName important"><span>Viddsee</span></div>
                                            <div class="postData">Writing now</div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="body">
                                        <div class="postContent">
                                            <div class="postMessage">
                                                <p>Message</p>
                                            </div>
                                            <div class="filmInformation">
                                                <div class="imageContainer">
                                                    <img src="" alt="No preview available" width="470" height="246">
                                                </div>
                                                <div class="bottomWrapper">
                                                    <div class="postName"><span></span></div>
                                                    <div class="postDescription"><span></span></div>
                                                    <div>
                                                        <div class="videoDomain">viddsee.com</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div><!-- form-group -->

            </div>
            <div class="panel-footer">
                <button aria-hidden="true" class="pull-right btn btn-success js-create-post-submit-btn" type="button">Schedule Post</button>
                <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
            </div>

        </div>
    </div>
</div>
