<td>
	<i class="fa fa-arrows"></i>&nbsp;
	<% if (collection.title) { %> <%= collection.title %> <% } else { %> <%= title %> <% } %> </td>
<td class="publish-status">
	<% if(collection.published || published){ %>
	      Published
	<% }else{ %>
	      Not Published
	<% } %>
</td>
<td class="table-action">
	<a class="js-btn-edit"><i class="fa fa-pencil"></i></a>
	<a class="delete-row js-btn-delete"><i class="fa fa-trash-o"></i></a>
</td>
