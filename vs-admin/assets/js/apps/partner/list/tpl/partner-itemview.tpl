<div class="col-md-4 col-sm-6 itemview-partner">
<div class="panel panel-default widget-photoday">
    <div class="panel-body">
      <a href="#partner/<%= id %>" class="photoday"><img src="<%= photo_small_url %>" alt="" /></a>
      <div class="photo-details">
        <h4 class="photo-title"><%= title %></h4>
        <small class="text-muted"> <%= description %> </small>
      </div><!-- photo-details -->
      <!-- <ul class="photo-meta">
        <li><span><i class="fa fa-eye"></i> 0</span></li>
        <li><i class="fa fa-heart"></i> 0</li>
      </ul> -->
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
        <li><a href="#partner/<%= id %>"><i class="fa fa-pencil"></i> Edit</a></li>
      </ul>
    </div><!-- panel-body -->
  </div><!-- panel -->
</div>