<div class="panel panel-default widget-photoday">
  <div class="panel-body">
    <a href="seasons.html" class="photoday"><img src="<%= photo_small_url %>" alt="" /></a>
    <div class="photo-details">
      <h4 class="photo-title"><%= title %></h4>
      <small class="text-muted"><%= jQuery(description_long).text().substring(0,120) %>...</small>
    </div><!-- photo-details -->
    <% if(published){ %>
      <div class="publish-status text-center published">
          Published
      </div>
    <% }else{ %>
      <div class="publish-status text-center">
          Not Published
      </div>
    <% } %>
    <ul class="photo-meta">
      <li><a href="#series/<%= id %>"><i class="fa fa-pencil"></i> Edit</a></li>
    </ul>
  </div><!-- panel-body -->
</div><!-- panel -->
