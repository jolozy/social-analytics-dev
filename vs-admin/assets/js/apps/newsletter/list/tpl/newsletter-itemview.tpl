<li class="email-row">
    <div class="row">
        <div class="col-sm-6">
            <strong>
                <% if (subject) { %>
                    <%= subject %>
                <% } else { %>
                    Untitled
                <% } %>
            </strong>
            <br />
            <small>
                <% var campaigns = JSON.parse(lists) %>
                <% if (campaigns.length === 1) { %>
                    <% var text = "1 campaign in " + language_name %>
                    <%= text %>
                <% } else if (campaigns.length > 1) { %>
                    <% var text = campaigns.length + " campaigns in " + language_name%>
                    <%= text %>
                <% } else { %>
                    No campaigns yet
                <% } %>
            </small>
        </div>
        <div class="col-sm-6">
            <div class="col-sm-4">
                <!--<a href="#" class="btn btn-danger">Delete</a>-->
            </div>
            <div class="col-sm-8 text-right">
                <div class="newsletter-status">
                    <% if (status === 'draft') { %>
                        <a href="#" class="email-edit"><i class="fa fa-pencil email-options"></i></a>
                        <a href="#" class="email-delete"><i class="fa fa-trash-o email-options"></i></a>
                        <a href="#" class="email-schedule"><i class="fa fa-calendar email-options"></i></a>
                        <a href="#" class="email-preview"><i class="fa fa-send-o email-options"></i></a>
                        <span class="label label-default">Draft</span> <br />
                            <% if (created_at === updated_at) { %>
                                <small>Created </small>
                            <% } else { %>
                                <small>Updated </small>
                            <% } %>
                    <% } else if (status === 'scheduled') { %>
                        <a href="#" class="email-edit"><i class="fa fa-pencil email-options"></i></a>
                        <a href="#" class="email-delete"><i class="fa fa-trash-o email-options"></i></a>
                        <a href="#" class="email-schedule"><i class="fa fa-calendar email-options"></i></a>
                        <a href="#" class="email-preview"><i class="fa fa-send-o email-options"></i></a>
                        <span class="label label-warning">Scheduled</span> <br />
                        <small>Scheduled </small>
                    <% } else if (status === 'sent') { %>
                        <a href="#" class="email-view"><i class="fa fa-eye email-options"></i></a>
                        <span class="label label-success">Sent</span> <br />
                        <small>Sent </small>
                    <% } %>
                </div>
            </div>
        </div>
    </div>
</li>
