function checkAuth(){
     var params = getParams();
     if(params.access_token){
         // Store access token
         localStorage.setItem('access_token', params.access_token);
         var location = window.location;
         window.location.href = location.protocol + '//' + location.host + location.pathname;
         return true;
     } else if(localStorage.getItem('first_name')){
         // Logged in
         return true;
     } else if(localStorage.getItem('access_token')){
         return true;
     }
     return false;
 }

 function getUserInfo(apiURL, callback){
      setHeaders();
      // Get User Profile
      $.ajax({
          method: 'GET',
          url: apiURL + "me"
      }).done(function(res){
          if(res.admin_access){
              storeUserInfo(res);
              callback();
          } else {
              localStorage.clear();
              window.location.href = '/logout';
          }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        if(jqXHR.status == 401) {
          localStorage.clear();
          window.location.href = '/logout';
        }
      });
  }

  function storeUserInfo(res){
      localStorage.setItem('first_name', res.first_name);
      localStorage.setItem('last_name', res.last_name);
      localStorage.setItem('profile_image_url', res.profile_image_url);
      localStorage.setItem('social', res.social);
      localStorage.setItem('fb_id', res.fb_id);
      localStorage.setItem('user_id', res.id);
  }

  function setHeaders(){
      var headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
      };
      $.ajaxSetup({
           headers: headers
        });
  }

function facebookLogin(callback) {
    FB.login(function(response) {
            if (response.authResponse) {
                localStorage.setItem('fb_access_token', response.authResponse.accessToken)
                FB.api(
                    "/me/accounts",
                    "GET",
                    function (response) {
                        if (response && !response.error) {
                            response.data.forEach(function(page) {
                                switch (page.id) {
                                    case EN_PAGE_ID:
                                        localStorage.setItem('page_access_token_en', page.access_token)
                                        break
                                    case ZH_PAGE_ID:
                                        localStorage.setItem('page_access_token_zh', page.access_token)
                                        break
                                    case ID_PAGE_ID:
                                        localStorage.setItem('page_access_token_id', page.access_token)
                                        break
                                    case PH_PAGE_ID:
                                        localStorage.setItem('page_access_token_ph', page.access_token)
                                        break
                                }
                            })
                            if (callback) {
                                callback()
                            }
                        }
                    }
                );
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        },
        {scope: 'manage_pages, publish_pages'}
    )
}