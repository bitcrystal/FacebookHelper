function main()
{
	window.fbAsyncInit = function(){
		FB.init({ 
			appId: '960054774014256', 
			status: true, 
			cookie: true,
			xfbml: true,
			oauth: true,
			version    : 'v2.3'
		});
		
		FB.provide("UIServer.Methods",
		{ 'permissions.request' : { size : {width: 575, height: 300}, 
			url: 'connect/uiserver.php',
			transform : FB.UIServer.genericTransform }
		} );
		//fbLoginStatus();
		showPermissionDialog();
	};
	
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}


function fbLoginStatus(){
    FB.getLoginStatus(function(response) {
        console.log(response);
        if (response.status === 'connected') {
            var access_token =   FB.getAuthResponse()['accessToken'];
            console.log(access_token);
        } else {
            fblogin();
        }
    });
}

function showPermissionDialog(){        
         FB.ui({
           method: 'permissions.request',
           'perms': 'user_posts,publish_pages,publish_actions,manage_pages',
           'display': 'iframe'
          },
          function(response) {}
    );       
}


function fbLoginStatusAutoClose(){
	var uri = encodeURI("http://smedia.sldc.pl/fuck_facebook');
    FB.getLoginStatus(function(response) {
        console.log(response);
        if (response.status === 'connected') {
           window.location.href=uri;
        } else {
           window.loaction = encodeURI("https://www.facebook.com/dialog/oauth?client_id=960054774014256&redirect_uri="+uri+"&response_type=token");
        }
    });
}

function fblogin(){
    FB.login(function(response) {
        if (response.authResponse) {
            var access_token =   FB.getAuthResponse()['accessToken'];
            console.log(access_token);
        } else {
            console.log('Authorization failed.');
        }
    },{ //permissions
        scope: 'user_posts,publish_pages,publish_actions,manage_pages'
    });
}