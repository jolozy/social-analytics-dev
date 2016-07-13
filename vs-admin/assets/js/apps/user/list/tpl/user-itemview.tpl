<%
    var formatString = function(string) {
        if (string) {
            var strArr = string.split(',');
            var newString = '';
            for (var i in strArr) {
                newString += strArr[i] + ', ';
            }
            return newString;
        }
        return string;
    };

    var getDevices = function(devices) {
        if (devices) {
            var html = '';
            for (var i in devices) {
                html += '<tr>';
                html += '<td>' + devices[i].device_type + '</td>';
                html += '<td>' + devices[i].udid + '</td>';
                html += '<td>' + devices[i].push_token + '</td>';
                html += '<td>' + devices[i].user_agent + '</td>';
                html += '<td>' + devices[i].created_at + '</td>';
                html += '<td>' + devices[i].updated_at + '</td>';
                html += '</tr>';
            }
            return html;
        }
        return "<tr><td>No Devices</td><tr>";
    };

    var getSettingsHTML = function(settings) {
        if (settings) {
            var html = '';
            for (var key in settings) {
                html += '<strong>' + key + '</strong>: ';
                html += settings[key] + '<br/>';
            }
            return html;
        }
        return '<strong>No Settings</strong>';
    };
%>

<div class="panel panel-dark">
    <div class="panel-heading">
      <h3 class="panel-title"><%= first_name %> <%= last_name %></h3>
    </div>
    <div class="panel-body" style="background-color: #f5f5f5">
      <h3>Details</h3>
      <strong>User ID</strong>: <%= id %><br/>
      <strong>Facebook ID</strong>: <%= fbid %><br/>
      <strong>Email</strong>: <%= email %><br/>
      <strong>Primary Email</strong>: <%= primary_email %><br/>
      <strong>Last Country</strong>: <%= last_country %><br/>
      <strong>Last signed in</strong>: <%= most_recent_sign_in %><br/>
      <h3>Settings</h3>
      <%= getSettingsHTML(settings) %>
      <h3>Devices</h3>
      <table class="user-search-table">
        <% if (devices.length > 0) { %>
            <tr>
                <th>Device Type</th>
                <th>udid</th>
                <th>Push Token</th>
                <th>User Agent</th>
                <th>Created at</th>
                <th>Updated at</th>
            </tr>
            <%= getDevices(devices) %>
        <% } else { %>
            No devices
        <% } %>
      </table>
    </div>
  </div>
