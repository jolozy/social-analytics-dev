<div class="stats-heading-container mb10">
    <h2 class="stats-title">Tracker Statistics</h2>
</div>

<div class="row tracker-table">
    <div class="row">
        <div class="col-sm-5 desktop-container">
            <h4><strong>Desktop</strong></h4>
        </div>

        <div class="col-sm-2"></div>

        <div class="col-sm-5 mobile-container">
            <h4><strong>Mobile</strong></h4>
        </div>
    </div>

    <%
    var NO_DATA = 'No data';
    var getData = function(platform, source) {
    	var obj = _.find(tracker, function(item) {
            return item.platform == platform && item.source == source;
        });
        if (obj) {
        	return obj.total_plays;
        }
        else 
        {
        	return null;
        }
    };

    var getMobileTotal = function() {
        var total = 0;
        for (var i = 0; i < tracker.length; i++) {
            if (tracker[i].platform === 'mobile') {
                total += tracker[i].total_plays;
            }
        }
        return total;
    };

    var getDesktopTotal = function() {
        var total = 0;
        for (var i = 0; i < tracker.length; i++) {
            if (tracker[i].platform === 'desktop') {
                total += tracker[i].total_plays;
            }
        }
        return total;
    };

    var getDesktopPercentage = function(source) {
        return (Number(getData('desktop',source)) / Number(getDesktopTotal()) * 100).toFixed(2);
    };

    var getMobilePercentage = function(source) {
        return (Number(getData('mobile',source)) / Number(getMobileTotal()) * 100).toFixed(2);
    };

    var isTrackerDefined = function() {
        if (typeof tracker !== 'undefined' && tracker.length > 0) {
            return true;
        }
        return false;
    };

    %>

    <div class="row tracker-row">
        <div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA :
            (Number(getData('desktop','player')) + Number(getData('desktop','viddsee'))).toLocaleString() + ' (' + ((Number(getData('desktop','player')) + Number(getData('desktop','viddsee'))) / Number(getDesktopTotal()) * 100).toFixed(2) + '%)' %></div>
        <div class="col-sm-2 tracker-name-container">Viddsee Player</div>
        <div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA :
            (Number(getData('mobile','player')) + Number(getData('mobile','viddsee'))).toLocaleString() + ' (' + ((Number(getData('mobile','player')) + Number(getData('mobile','viddsee'))) / Number(getMobileTotal()) * 100).toFixed(2) + '%)' %></div>
    </div>

    <div class="row tracker-row">
        <div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA : Number(getData('desktop','embed-buzz')).toLocaleString() + ' (' + getDesktopPercentage('embed-buzz') + '%)' %></div>
        <div class="col-sm-2 tracker-name-container">Embed (Buzz)</div>
        <div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA : Number(getData('mobile','embed-buzz')).toLocaleString() + ' (' + getMobilePercentage('embed-buzz') + '%)' %></div>
    </div>

    <div class="row tracker-row">
        <div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA : Number(getData('desktop','embed-others')).toLocaleString() + ' (' + getDesktopPercentage('embed-others') + '%)' %></div>
        <div class="col-sm-2 tracker-name-container">Embed (Others)</div>
        <div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA : Number(getData('mobile','embed-others')).toLocaleString() + ' (' + getMobilePercentage('embed-others') + '%)' %></div>
    </div>

    <div class="row tracker-row mobile-row">
            <div class="col-sm-5 tracker-value-container invisible-row"></div>
            <div class="col-sm-2 tracker-name-container mobile-row"><div class="overlay">iOS</div></div>
            <div class="col-sm-5 tracker-value-container visible-row"><%= !isTrackerDefined() ? NO_DATA : Number(getData('mobile','ios')).toLocaleString() + ' (' + getMobilePercentage('ios') + '%)' %></div>
        </div>

    <div class="row tracker-row mobile-row">
        <div class="col-sm-5 tracker-value-container invisible-row"></div>
        <div class="col-sm-2 tracker-name-container mobile-row"><div class="overlay">Android</div></div>
        <div class="col-sm-5 tracker-value-container visible-row"><%= !isTrackerDefined() ? NO_DATA : Number(getData('mobile','android')).toLocaleString() + ' (' + getMobilePercentage('android') + '%)' %></div>
    </div>

    <div class="row tracker-row total">
        <strong><div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA : Number(getDesktopTotal()).toLocaleString() %></div></strong>
        <div class="col-sm-2 tracker-name-container"><strong>TOTAL</strong></div>
        <strong><div class="col-sm-5 tracker-value-container"><%= !isTrackerDefined() ? NO_DATA : Number(getMobileTotal()).toLocaleString() %></div></strong>
    </div>
</div>
