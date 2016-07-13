<div class="topnav">
      <a class="menutoggle js-menutoggle"><i class="fa fa-bars"></i></a>
  </div>

<div class="header-right">
  <ul class="headermenu">
    <li>
      <div class="btn-group">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
          <img src="<%= profile_image_url %>" alt="" />
          <%= first_name %> <%= last_name %>
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
          <li><a class="js-logout"><i class="glyphicon glyphicon-log-out"></i> Log Out</a></li>
        </ul>
      </div>
    </li>
  </ul>
</div><!-- header-right -->