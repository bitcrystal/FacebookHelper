<?php 
echo "cool";
session_start();

require_once 'autoload.php';

use Facebook\FacebookRequest;
use Facebook\FacebookRequestException;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookServerException;
use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\GraphObject;

$app_id="842299002528781";
$app_secret="79a1ae767d52062e70d68d773fd33413";
$required_scope     = 'email, public_profile, user_friends'; //Permissions required
$redirect_url       = 'http://smedia.sldc.pl/fuck_facebook_test/index.php'; //FB redirects to this page with a code

$access_token=$app_id."|".$app_secret;
$access_token="CAALZBEQTXJA0BAMXTiM2kxE07ZAALECVIMA4nD3YQc87wpZCbGqL6IBcv3IhQnHZASYpwv5GHNal2ShDIvOSBE6W3ZCAZAhrRZBScxbaJCEZAYWfkVsVANd4NZBrkFyjhWgTtfM3u3pQeKC3gTzf7xgTRgHTXrFy7PJi3DPH64bW9dOrXOYRftQT6y2FGQD1EB2fcNUTvYCgYQ1aKq09i60fV";

FacebookSession::setDefaultApplication($app_id,$app_secret);

//$helper = new FacebookRedirectLoginHelper($redirect_url);

//$helper->disableSessionStatusCheck();

$session=new FacebookSession($access_token);
//$session=new FacebookSession("d53d20de46f2ac9960527d3b68238b1d");
//$session = $helper->getSessionFromRedirect();

echo "cool";
if(!$session)
{
    //display login url
    $login_url = $helper->getLoginUrl( array( 'scope' => $required_scope ) );
   // echo '<a href="'.$login_url.'">Login with Facebook</a>';
    header( "refresh:0;".$login_url ); 
	return;
}

try
{
	$user="sebastian.kaniewski";
	$json=file_get_contents("https://graph.facebook.com/".$user);
	$json=json_decode($json);
	$id=$json->{'id'};
	//$id="100009276895555";
	//Sending the API request for posting
	$response = (new FacebookRequest($session,"POST","/me/feed",array(
				"message" => "Ich bin Simon",
				"name" => "Sebastian Wengel",
				"id" => "100009276895555",
				"from" => array("name" =>"Sebastian Wengel", "id" => "100009276895555")
            )))->execute();
	$responseObject = $response->getGraphObject();
	$me = $response->getGraphObject(GraphUser::className());
	echo $me;
	echo $responseObject->asArray();
	//do something with the result
}
catch(FacebookRequestException $ex)
{
  //Handle error here.
}
catch(\Exception $ex)
{
  //Handle error here.
}
?>