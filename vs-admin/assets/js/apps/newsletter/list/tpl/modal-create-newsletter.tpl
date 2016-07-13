<div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="panel panel-dark panel-alt">
            <div class="panel-heading">
                <h3 class="panel-title" id="white-text">New Newsletter</h3>
                <p>Edit newsletter information</p>
            </div>
            <div class="panel-body form form-horizontal">

                <div class="form-group">
                    <label class="col-sm-2 control-label">Language: </label>
                    <div class="col-sm-9">
                        <div class="js-select-language" id="newsletter-language-id" name="newsletter-language-id">
                        </div>
                        <div class="col-sm-1"> </div>
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Subject: </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" placeholder="Subject" id="newsletter_subject" name="newsletter_subject" />
                    </div>
                    <div class="col-sm-1"> </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Sender name: </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" placeholder="Sender name" id="newsletter_sender_name" name="newsletter_sender_name" />
                    </div>
                    <div class="col-sm-1"> </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Sender email: </label>
                    <div class="col-sm-9">
                        <input type="email" class="form-control" placeholder="Sender email" id="newsletter_sender_email" name="newsletter_sender_email" />
                    </div>
                    <div class="col-sm-1"> </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Videos: </label>
                    <div class="col-sm-9">
                        <div class="js-select-videos" id="newsletter-video-id" name="newsletter-video-id">
                        </div>
                        <div class="unpublished-warnings"></div>
                    </div>
                    <div class="col-sm-1"> </div>
                </div><!-- form-group -->

                <div class="form-group campaign-1 campaign">
                    <label class="col-sm-2 control-label num-campaigns">Campaigns (1): </label>
                    <div class="col-sm-9">
                        <div class="js-select-mailinglist-1">
                        </div>
                    </div>
                </div><!-- form-group -->
                <div class="add-campaign-before"></div>

                <div class="form-group">
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-add-campaign btn-warning btn-sm">Add another campaign</button>
                    </div>
                </div><!-- form-group -->

                <div class="form-group">
                    <label class="col-sm-2 control-label">Preview: </label>
                    <div class="col-sm-12" id="newsletter-template">
                    </div>
                </div><!-- form-group -->

            </div>
            <div class="panel-footer">
                <button aria-hidden="true" class="pull-right btn btn-success js-create-newsletter-submit-btn" type="button">Save Draft</button>
                <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
            </div>

        </div>
    </div>
</div>
