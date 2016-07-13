<div class="stats-heading-container mb10">
    <h2 class="stats-title"><%= chart_title %></h2>
</div>
<div class='row'>
  <table class='col-lg-12 col-md-12'>
    <tbody>
      <tr>
        <td class="col-lg-9 col-md-9">
          <div class="ct-chart ct-perfect-fourth"></div>
          <div class="row">
          	<div class='col-lg-6 col-md-6'>
          		<span class='pull-left label label-pill label-success' id='total-count'>
          			Total: <%= total_count == 'N/A' ? total_count : Number(total_count).toLocaleString() %>
          		</span>
          	</div>
          	<div class='col-lg-6 col-md-6'>
          		<span class='pull-right label label-pill label-warning' id='unknown-count'>
          			Unknown: <%= unknown_count == 'N/A' ? unknown_count : Number(unknown_count).toLocaleString() %>
                (<%= unknown_percent == 'N/A' ? unknown_percent : Number(unknown_percent).toFixed(2) + '%'%>)
          		</span>
          	</div>
          </div>
        </td>
        <td class="col-lg-3 col-md-3">
          <div class="ct-legend"></div>
        </td>
      <tr>
    </tbody>
  </table>
</div>
