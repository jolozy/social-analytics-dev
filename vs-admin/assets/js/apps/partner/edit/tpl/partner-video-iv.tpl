<td><%= video.title %> (<%= video.directors[0].name %>)</td>
<td class="publish-status">
	<% if(published){ %>
	      Published
	<% }else{ %>
	      Not Published
	<% } %>
</td>
<td class="table-action">
<a class="js-btn-edit"><i class="fa fa-pencil"></i></a>
<a class="delete-row js-btn-delete"><i class="fa fa-trash-o"></i></a>
</td>