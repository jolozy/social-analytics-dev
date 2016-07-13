<td class="text-center"><%= email_subject %></td>
<td class="text-center">
    <% if (status === 'saved') { %>
        <span class="label label-default">Saved</span>
    <% } else if (status === 'ready') { %>
        <span class="label label-warning">Ready</span>
    <% } else if (status === 'sent') { %>
        <span class="label label-success">Sent</span>
    <% } %>
</td>
<td class="text-center"><%= category %></td>
<td class="text-center"><%= language %></td>
<td class="text-center"><div class="created-at-container"></div></td>
<td class="text-center" style="width: 100px;">
    <a href="#buzz-newsletters" class="js-more-info mr5" data-id="<%= id %>"><i class="fa fa-eye"></i> </a>
    <a href="#buzz-newsletters" class="js-test-send mr5" data-id="<%= id %>"><i class="fa fa-send-o"></i></a>
    <a href="#buzz-newsletters" class="js-delete" data-id="<%= id %>"><i class="fa fa-trash"></i></a>
</td>
