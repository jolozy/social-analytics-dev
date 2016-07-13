<%
    function remove_tags(html){
       var tmp = document.createElement("div");
       tmp.innerHTML = html;
       var scripts = tmp.getElementsByTagName('script');
       var i = scripts.length;
       while (i--) {
            scripts[i].parentNode.removeChild(scripts[i]);
       }
       var result = $('<div/>').text(tmp.textContent||tmp.innerText).html();
       return result;
    }
%>

<div class="panel panel-default widget-photoday">
  <div class="panel-body">
    <a href="#submission/<%= id %>" class="photoday">
        <% if (coverphoto.small_image_url) { %> <!--To support legacy coverphotos-->
            <img src="<%= coverphoto.small_image_url %>" alt="" />
        <% } else if (gallery_images.length > 0) { %>
            <img src="<%= gallery_images[0].image.image_file_url %>" alt="" />
        <% } else { %>
            <div class="display-pic-placeholder">
                <i class="fa fa-2x fa-picture-o"></i>
            </div>
        <% } %>
    </a>
    <div class="photo-details">
      <h4 class="photo-title"><%= title %></h4>
      <small class="text-muted" style="white-space:pre-wrap;"><%= remove_tags(description_long).substring(0,120) %>...</small>
      <small>By: <%= directors %></small>
    </div><!-- photo-details -->
      <% if (status === 'incomplete') {%>
        <div class="incomplete publish-status text-center">
            Incomplete
        </div>
      <% } else if (status === 'moreinfo') {%>
        <div class="moreinfo publish-status text-center">
            Needs More Info
        </div>
      <% } else if (status === 'approved') { %>
        <div class="published publish-status text-center">
            Approved
        </div>
      <% } else if(status === 'rejected') {%>
        <div class="publish-status text-center">
            Rejected
        </div>
      <% } else if(status === 'pending') {%>
        <div class="pending publish-status text-center">
            Under Review <small class="reviewed hidden" data-id="<%= id %>">(Read)</small>
        </div>
      <% } else if(status === 'fasttrack') {%>
      <div class="fasttrack publish-status text-center">
            License Submitted
      </div>
      <% } %>
     <ul class="photo-meta">
        <% if (status === 'pending' || status === 'fasttrack') { %>
            <li><a href="#submission/<%= id %>" class="js-edit-submission"><i class="fa fa-pencil"></i> Edit</a></li>
            <li><a class="js-delete-submission" href="#"><i class="fa fa-trash-o"></i> Delete</a></li>
        <% } else { %>
            <li><a href="#submission/<%= id %>"><i class="fa fa-pencil"></i> Edit</a></li>
        <% } %>
    </ul>
  </div><!-- panel-body -->
</div><!-- panel -->
