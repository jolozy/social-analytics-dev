<div class="pageheader">
    <h2><i class="fa fa-comment-o"></i> Comments
        <span>List Comments</span></h2>
</div>
<div class="col-sm-12 mt10">
    <div class="panel panel-default">
        <div class="panel-body">
            <h5 class="subtitle mb5">Select a date range</h5>
            <!--<p class="text-muted">Showing comments yo</p>-->
            <div class="row">
                <div class="col-sm-4 form-group">
                    <label class="control-label">From</label>
                    <div class="input-group">
                        <input type="text" class="form-control startdatepicker js-start-date" placeholder="mm/dd/yyyy">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>

                <div class="col-sm-4 form-group">
                    <label class="control-label">To</label>
                    <div class="input-group">
                        <input type="text" class="form-control enddatepicker js-end-date" placeholder="mm/dd/yyyy">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>

                <div class="col-sm-4 date-range-btn">
                    <a href="#" class="btn btn-success js-select-date-range" title="Pikachu! I choose you!">Go!</a>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-8">
                    <label class="control-label">Filter options</label>
                    <div class="input-group">
                        <div class="input-group-btn">
                            <button data-toggle="dropdown" class="btn btn-default dropdown-toggle js-filter-button filter-button" type="button">Choose a filter option <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" class="js-filter-by-title">Film Title</a></li>
                                <li><a href="#" class="js-filter-by-commenter">Commenter's name</a></li>
                            </ul>
                        </div>
                        <input type="text" class="form-control js-filter-search-string">
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <div class="text-center">
                    <small class="js-num-of-comments"></small>
                </div>
                <table class="table table-email">
                    <tbody class="js-comment-list hidden">
                        <div class="js-loading-comments text-center">
                            <img src="/vs-admin/assets/images/loaders/loader3.gif" />
                            Loading comments...
                        </div>
                        <tr class="unread num-comments"></tr>
                    </tbody>
                </table>
            </div><!-- table-responsive -->
            
            <div class="row">
                <div class="text-center col-sm-12">
                    <a id='load-more' class='hidden' href="#">Load more</a>
                    <div class="js-paginate-comments hidden text-center">
                        <img src="/vs-admin/assets/images/loaders/loader3.gif" />
                        Loading comments...
                    </div>
                </div>
            </div>

        </div><!-- panel-body -->
    </div><!-- panel -->
</div>

<div class="comment-clearfix"></div>
