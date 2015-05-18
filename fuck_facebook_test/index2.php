try {
	$session = $helper->getSessionFromRedirect();

	if ($session):
		$_SESSION['facebook'] = $session->getToken();
		header('Location: index.php');
	endif;

	if (isset($_SESSION['facebook'])):
		$session = new FacebookSession($_SESSION['facebook']);
		$page_id = '000000000000';
		// get page access token
		$access_token = (new FacebookRequest( $session, 'GET', '/' . $page_id,  array( 'fields' => 'access_token' ) ))
    ->execute()->getGraphObject()->asArray();
 
			// save access token in variable for later use  
		$access_token = $access_token['access_token'];
		
		$page_post = (new FacebookRequest( $session, 'POST', '/'. $page_id .'/feed', array(
    		'access_token' => $access_token,
		    'name' => 'TITULO DEL ENLACE',
		    'link' => 'http://www.example.com/',
		    'caption' = 'Example text',
		    'message' => 'This is my link!',
  ) ));
		$response = $page_post->execute();
		$graphObjectClass = $response->getGraphObject();
		$facebook_POST = $graphObjectClass;