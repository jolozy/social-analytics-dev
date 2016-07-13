<li class="email-row">
    <div class="row">
        <div class="col-sm-6">
            <strong><%= subject %></strong>
            <br />
            <small><%= recipient %></small>
        </div>
        <div class="col-sm-6">
            <div class="col-sm-4">
                <!--<a href="#" class="btn btn-danger">Delete</a>-->
            </div>
            <div class="col-sm-8 text-right">
                <div class="email-status">
                    <% if (status === 'draft') { %>
                    <a href="#" class="email-edit"><i class="fa fa-pencil email-options"></i></a>
                    <a href="#" class="email-delete"><i class="fa fa-trash-o email-options"></i></a>
                    <a href="#" class="email-schedule"><i class="fa fa-calendar email-options"></i></a>
                    <span class="label label-default">Draft</span> <br />
                    <small>Created </small>
                    <% } else if (status === 'scheduled') { %>
                    <a href="#" class="email-edit"><i class="fa fa-pencil email-options"></i></a>
                    <a href="#" class="email-delete"><i class="fa fa-trash-o email-options"></i></a>
                    <a href="#" class="email-schedule"><i class="fa fa-calendar email-options"></i></a>
                    <span class="label label-warning">Scheduled</span> <br />
                    <small>Scheduled </small>
                    <% } else if (status === 'sent') { %>
                    <span class="label label-success">Sent</span> <br />
                    <small>Sent </small>
                    <% } %>
                </div>
            </div>
        </div>
    </div>
</li>