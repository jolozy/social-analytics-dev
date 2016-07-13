<div class="modal-dialog">
    <div class="modal-content">
        <div class="panel panel-dark panel-alt">
            <div class="panel-heading">
                <h3 class="panel-title">Edit Tag</h3>
                <p>Edit tag information</p>
            </div>
            <div class="panel-body form form-horizontal">

                <h2><%= content %></h2>
                <p>
                    <strong>Tag type: </strong><%= tag_type %><br>
                    <strong>Created at: </strong><%= created_at %><br>
                    <strong>Updated at: </strong><%= updated_at %><br>
                </p>

                <div class="form-group">
                    <label class="col-sm-2 control-label">Description </label>
                    <div class="col-sm-10">
                        <textarea type="text" class="form-control" placeholder="Tag description" id="description" name="description" />
                    </div>
                </div><!-- form-group -->

            </div>
            <div class="panel-footer">
                <button aria-hidden="true" class="pull-right btn btn-success js-edit-tag-submit-btn" type="button">Save</button>
                <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Cancel</button>
            </div>

        </div>
    </div>
</div>
