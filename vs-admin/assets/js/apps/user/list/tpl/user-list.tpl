<div class="pageheader">
    <h2><i class="fa fa-search"></i> User Search
        <span>Search for users</span></h2>
</div>

<div class="col-sm-12 mt10">
    <div class="panel panel-default">
        <div class="panel-body">
            <h5 class="subtitle mb5">Enter search parameters</h5>

            <div class="row">
                <div class="col-sm-6 form-group">
                    <label class="control-label">User ID</label>
                    <div class="input-group">
                        <input type="text" class="search-user form-control user-id">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    </div>
                </div>

                <div class="col-sm-6 form-group">
                    <label class="control-label">Facebook ID</label>
                    <div class="input-group">
                        <input type="text" class="search-user form-control user-fbid">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-thumbs-up"></i></span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 form-group">
                    <label class="control-label">Unique Device ID</label>
                    <div class="input-group">
                        <input type="text" class="search-user form-control user-udid">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-barcode"></i></span>
                    </div>
                </div>

                <div class="col-sm-6 form-group">
                    <label class="control-label">Email</label>
                    <div class="input-group">
                        <input type="text" class="search-user form-control user-email">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-sm-6 form-group">
                    <label class="control-label">First name</label>
                    <div class="input-group">
                        <input type="text" class="search-user form-control user-first-name">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    </div>
                </div>

                <div class="col-sm-6 form-group">
                    <label class="control-label">Last name</label>
                    <div class="input-group">
                        <input type="text" class="search-user form-control user-last-name">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                    </div>
                </div>
            </div>

            <div class="user-search-buttons row mb20">
                <div class="col-sm-4 date-range-btn">
                    <a href="#user-search" class="btn btn-success js-search-user" title="I don't know who you are. I don't know what you want. If you are looking for videos, I can tell you I don't have any. But what I do have are a very particular set of skills, skills I have acquired over a very long career. Skills that make me a nightmare for people like you. If you stop giving me troubles now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will solve your problems.">Search!</a>
                </div>
                <div class="col-sm-4 date-range-btn">
                    <a href="#user-search" class="btn btn-default js-reset">Clear Fields</a>
                </div>
            </div>

            <div class="js-loading-users text-center">
                <img src="/vs-admin/assets/images/loaders/loader3.gif" />
                Loading users...
            </div>

            <div class="js-user-list hidden">
                <div class="num-of-users mb20"></div>

            </div>

        </div><!-- panel-body -->
    </div><!-- panel -->
</div>
