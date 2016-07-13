<!--<td>
    <div class="ckbox ckbox-success">
        <a href="#" target="_blank" class="btn btn-success">Reply</a>
    </div>
</td>-->
<td class="thread-container">
    <div class="media">
        <div class="media-body <% if (deleted) { %>deleted<% } %>" data-video-id="<%= video_id %>" data-parent-id="<% if (parent_id) { %> <%= parent_id %> <% } else { %> <%= id %> <% } %>" >
            <img src="<%= user.profile_image_url %>" class="fb-profile-pic">
            <div class="comment-body">
                <h4 class="commenter-name"><%= user.first_name + " " + user.last_name %>
                    <small class="comment-date">
                        <%= created_at %>
                        <% if (deleted) { %>
                            (DELETED)
                        <% } %>
                         -
                        <a href="<%= host + page %>" target="_blank"><%= video_title %></a>
                    </small>
                </h4>
                <%= body %>
                <br/>
                <% if (!deleted) { %>
                    <small class="js-reply-links"><a href="#" class="js-admin-reply is-parent">Reply</a> . <a href="#" class="js-admin-delete" data-comment-id="<%= id %>">Delete</a></small>
                <% } %>
            </div>
            <div class="comment-video-container">

            </div>
        </div>
        <div class="js-reply-container reply-container"></div>
    </div>

    <div class="reply-html hidden">
        <div class="media-body reply-box">
            <img src="" class="fb-profile-pic reply-display-pic">
            <div class="comment-body reply-comment-body">
                <h4 class="commenter-name"> <small class="comment-date"></small></h4>


            </div>
        </div>
    </div>

    <div class="admin-reply-box-template hidden">
        <div class="admin-reply-box">
            <textarea class="admin-reply-input-box"></textarea>
            <div class="admin-reply-buttons-container">
                <a href="#" class="btn btn-default js-admin-cancel-reply">Cancel</a>
                <a href="#" class="btn btn-success js-admin-submit-reply">Reply</a>
            </div>
        </div>
    </div>
</td>
