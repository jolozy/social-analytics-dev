<td>
<i class="fa fa-arrows" aria-hidden="true"></i>&nbsp;
<%= video.title %> (<%= video.directors[0].name %>) </td>
<td>
	<% var formatted = $.datepicker.formatDate("M d, yy", new Date(video.published_date)); %>
	<%= formatted %>
</td>
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
