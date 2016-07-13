<div class="modal-dialog">
    <div class="modal-content">
        <div class="panel panel-dark panel-alt">
            <div class="panel-heading">
                <h3 class="panel-title">Trackers for <%= title %></h3>
                <p>From <%= start_date %> to <%= end_date %></p>
            </div>
            <div class="panel-body form form-horizontal">

            <div class="row tracker-table">

                <%

                var getData = function(platform, source) {
                    	var obj = _.find(res, function(item) {
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

                var viddsee_player_desktop = null;
                if (getData('desktop', 'viddsee') && getData('desktop', 'player')) {
                    viddsee_player_desktop = (Number(getData('desktop', 'viddsee')) + Number(getData('desktop', 'player'))).toLocaleString();
                } else if (getData('desktop', 'viddsee')) {
                    viddsee_player_desktop = Number(getData('desktop', 'viddsee')).toLocaleString();
                } else if (getData('desktop', 'player')) {
                    viddsee_player_desktop = Number(getData('desktop', 'player')).toLocaleString();
                }

                var viddsee_player_mobile = null;
                if (getData('mobile', 'viddsee') && getData('mobile', 'player')) {
                    viddsee_player_mobile = (Number(getData('mobile', 'viddsee')) + Number(getData('mobile', 'player'))).toLocaleString();
                } else if (getData('mobile', 'viddsee')) {
                    viddsee_player_mobile = Number(getData('mobile', 'viddsee')).toLocaleString();
                } else if (getData('mobile', 'player')) {
                    viddsee_player_mobile = Number(getData('mobile', 'player')).toLocaleString();
                }

                %>

                <div class="row">
                    <div class="col-sm-5 desktop-container">
                        <h4><strong>Desktop</strong></h4>
                    </div>

                    <div class="col-sm-2"></div>

                    <div class="col-sm-5 mobile-container">
                        <h4><strong>Mobile</strong></h4>
                    </div>
                </div>

                <div class="row tracker-row">
                    <div class="col-sm-5 tracker-value-container"><%= viddsee_player_desktop ? viddsee_player_desktop : '-' %></div>
                    <div class="col-sm-2 tracker-name-container">Viddsee Player</div>
                    <div class="col-sm-5 tracker-value-container"><%= viddsee_player_mobile ? viddsee_player_mobile : '-' %></div>
                </div>

                <div class="row tracker-row">
                    <div class="col-sm-5 tracker-value-container"><%= getData('desktop', 'embed') ? Number(getData('desktop', 'embed')).toLocaleString() : (getData('desktop', 'embed-buzz') ? Number(getData('desktop', 'embed-buzz')).toLocaleString():'-') %></div>
                    <div class="col-sm-2 tracker-name-container">Embed</div>
                    <div class="col-sm-5 tracker-value-container"><%= getData('mobile', 'embed') ? Number(getData('mobile', 'embed')).toLocaleString() : (getData('mobile', 'embed-buzz') ? Number(getData('mobile', 'embed-buzz')).toLocaleString() : '-') %></div>
                </div>

                <div class="row tracker-row">
                    <div class="col-sm-5 tracker-value-container"><%= getData('desktop', 'embed-others') ? Number(getData('desktop', 'embed-others')).toLocaleString() : '-' %></div>
                    <div class="col-sm-2 tracker-name-container">Embed (Others)</div>
                    <div class="col-sm-5 tracker-value-container"><%= getData('mobile', 'embed-others') ? Number(getData('mobile', 'embed-others')).toLocaleString() : '-' %></div>
                </div>

                <div class="row tracker-row mobile-row">
                        <div class="col-sm-5 tracker-value-container invisible-row"></div>
                        <div class="col-sm-2 tracker-name-container mobile-row"><div class="overlay">iOS</div></div>
                        <div class="col-sm-5 tracker-value-container visible-row"><%= getData('mobile', 'ios') ? Number(getData('mobile', 'ios')).toLocaleString() : '-' %></div>
                    </div>

                <div class="row tracker-row mobile-row">
                    <div class="col-sm-5 tracker-value-container invisible-row"></div>
                    <div class="col-sm-2 tracker-name-container mobile-row"><div class="overlay">Android</div></div>
                    <div class="col-sm-5 tracker-value-container visible-row"><%= getData('mobile', 'android') ? Number(getData('mobile', 'android')).toLocaleString() : '-' %></div>
                </div>

                <div class="row tracker-row total">
                    <strong><div class="col-sm-5 tracker-value-container"><%= Number(totalDesktopTracks).toLocaleString() %></div></strong>
                    <div class="col-sm-2 tracker-name-container"><strong>TOTAL</strong></div>
                    <strong><div class="col-sm-5 tracker-value-container"><%= Number(totalMobileTracks).toLocaleString() %></div></strong>
                </div>
            </div>

            </div>
            <div class="panel-footer">
                <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Close</button>
            </div>

        </div>
    </div>
</div>
