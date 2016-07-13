<td class="text-center"><%= videoName %></td>
<td class="text-center">
    <% if (is_published) { %>
        <span class="label label-success">Published</span>
    <% } else if (scheduled_publish_time) { %>
        <span class="label label-warning">Scheduled</span><br>
        <span class="small"><%= scheduled_publish_time %></span>
    <% } %>
</td>
<td class="text-center"><%= pageName %></td>
<td class="text-center"><%= updated_time %></td>
<td class="text-center" style="width: 100px;">
    <a href="#" class="js-view"><i class="fa fa-eye email-options"></i></a>
</td>
