<%
    function remove_tags(html){
       var tmp = document.createElement("div");
       tmp.innerHTML = html;
       var scripts = tmp.getElementsByTagName('script');
       var i = scripts.length;
       while (i--) {
            scripts[i].parentNode.removeChild(scripts[i]);
       }
       return tmp.textContent||tmp.innerText;
    }
%>

<div class="col-md-4 col-sm-6 itemview-video">
<div class="panel panel-default widget-photoday">
    <div class="panel-body">
      <a href="#video/<%= uid %>" class="photoday">
          <% if (photo_small_url) { %>
            <img src="<%= photo_small_url %>" alt="" />
          <% } else { %>
              <div class="display-pic-placeholder">
                  <i class="fa fa-2x fa-picture-o"></i>
              </div>
          <% } %>
      </a>
      <div class="photo-details">
        <h4 class="photo-title"><%= title %></h4>
        <small class="text-muted" style="white-space:pre-wrap;"> <%= remove_tags(description_long).substring(0,120) %>... </small>
        <small>By: <%= directors %></small>
      </div><!-- photo-details -->
      <!-- <ul class="photo-meta">
        <li><span><i class="fa fa-eye"></i> 0</span></li>
        <li><i class="fa fa-heart"></i> 0</li>
        <li><i class="fa fa-comments"></i> 0</li>
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
        <li><a href="#video/<%= uid %>"><i class="fa fa-pencil"></i> Edit</a></li>
      </ul>
    </div><!-- panel-body -->
  </div><!-- panel -->
</div>
