<?php
	$host = 'www.webstylez.net';
	$path = '/GET-und-POST-Requests-absetzen-mit-PHP-und-fsockopen/';
	$data = 'xhpc_message_text='.urlencode('alter');
	$fp = fsockopen($host, 80, $errno, $errstr, 30);
	if (!$fp) {
		$buffer .= "$errstr ($errno)<br />\n";
	} else {
		$out = "POST ".$path." HTTP/1.1\r\n";
		$out .= "Host: ".$host."\r\n";
		$out .= 'User-Agent: Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.2.1) ';
		$out .= "Gecko/20021204\r\n";
		$out .= 'Accept: text/xml,application/xml,application/xhtml+xml,';
		$out .= 'text/html;q=0.9,text/plain;q=0.8,video/x-mng,image/png,';
		$out .= "image/jpeg,image/gif;q=0.2,text/css,*/*;q=0.1\r\n";
		$out .= "Accept-Language: en-us, en;q=0.50\r\n";
		$out .= "Accept-Encoding: gzip, deflate, compress;q=0.9\r\n";
		$out .= "Accept-Charset: ISO-8859-1, utf-8;q=0.66, *;q=0.66\r\n"; 
		$out .= "Content-Type: application/x-www-form-urlencoded; charset=utf-8\r\n";
		$out .= "Content-Length: ".strlen($data)."\r\n";
		$out .= "Connection: Close\r\n\r\n";
		$out .= $data;
		fwrite($fp, $out);
 
		while (!feof($fp)) {
			$buffer .= fgets($fp, 128);
		}
		fclose($fp);
	}
?>