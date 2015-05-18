/* ***** BEGIN LICENSE BLOCK *****
*
* The Original Code is ASC Surfing Protection.
*
* The Initial Developer of the Original Code is
* IObit Corporation. Copyright (C) 2005-2013. All Rights Reserved.
*
* ***** END LICENSE BLOCK ***** */
 
 
 /*
 * Used by ascsurfingprotection.js
 */


var ProtectPage = {

    m_originalUrl: null,

    openProtectPage: function(targetDocument, originalUrl)
    {
        if (targetDocument && originalUrl)
        {
            this.m_originalUrl = originalUrl;

            var warningPageHtmlString = null;

            var imgWarningBgURI = ImageMgr.generateLocalImgBase64URI("wraningBg.png");
            var imgBoxTop = ImageMgr.generateLocalImgBase64URI("box_top.png");
            var imgBoxBottom = ImageMgr.generateLocalImgBase64URI("box_bottom.png");
            var imgBoxBg = ImageMgr.generateLocalImgBase64URI("box_bg.png");
            var warningPageReport = LanguageMgr.m_warningPageReport;
            var warningPageContinue = LanguageMgr.m_warningPageContinue;
            if (myExtension.m_ScannerFunc) 
            {
            	var scanResult = myExtension.m_ScannerFunc(originalUrl);
            	if (scanResult == 7)
            	{
            		warningPageReport = '';
            		warningPageContinue = '';
            	}
            }          

            warningPageHtmlString = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml">' +
                '<head>' +
                '<EMBED id="pluginIdTFPU" TYPE="application/x-asc-plugin" ALIGN=CENTER WIDTH=0 HEIGHT=0 speed=10 autostart=true loop=true name ="ps">' +
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
                '<title>Warning</title>' +
                '<style>' +
                'html{color:#000;background:#810000}' +
                'body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,select,p,blockquote,th,td{margin:0;padding:0 ;font:14px arial; }' +
                'table{border-collapse:collapse;border-spacing:0}' +
                'fieldset,img{border:0}' +
                'address,button,caption,cite,code,dfn,em,input,optgroup,option,select,strong,textarea,th,var{font:inherit}' +
                'del,ins{text-decoration:none}' +
                'li{list-style:none}' +
                'caption,th{text-align:left}' +
                'h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}' +
                'q:before,q:after{content:""}' +
                'abbr,acronym{border:0;font-variant:normal}' +
                'sup{vertical-align:baseline}' +
                'sub{vertical-align:baseline}' +
                'legend{color:#000}' +
                'a{color:#0000ff;}' +
                '/*********/' +
                '#errmain{width:740px; height:340px; margin:0 auto; margin-top:6%; background:url('+imgWarningBgURI+') 0 0 no-repeat;}' +
                ';#errmain .boxtop{height:10px; display:block; background:url('+imgBoxTop+') 0 0 no-repeat;}' +
                ';#errmain .boxbottom{height:10px; display:block; background:url('+imgBoxBottom+') 0 0 no-repeat;}' +
                ';#errmain .boxmain{ height:300px; padding:0 10px;background:url('+imgBoxBg+') 0 0 repeat-y;}' +
                '#errmain .boxmain dl{margin-top:38px; margin-left:38px; margin-right:8px; width:635px; display:inline-block;}' +
                '#errmain .boxmain dl dt{float:left; width:141px; margin-right:45px;}' +
                '#errmain .boxmain dl dd{line-height:40px; margin-left:185px;}' +
                '#errmain .boxmain dl dd.redtext{font-size:18px; margin-top:38px; font-weight:bold; color:#cc0000;}' +
                '#errmain .boxmain dl dd.bowntext{font-size:12px; line-height:18px; max-height:70px; min-height:30px; margin-bottom:10px; width:416px; overflow:hidden; font-weight:bold; color:#666;}' +
                '#errmain .boxmain dl dd.bowntext a{color:#666;}' +
                '#errmain .boxmain dl dd.bottomline{height:1px; background:#ccc;}' +
                '#errmain .boxmain dl dd.link{text-align:right; font-size:12px; color:#666;}' +
                '#errmain .boxmain dl dd.link a{}' +
                '#errmain .boxmain dl dd.moredetail{margin-left:561px; text-align:right; font-size:12px; line-height:20px; text-decoration:underline; color:#666; position:relative; cursor:pointer;}' +
                '#errmain .boxmain dl dd.moredetail:hover span{display:block;}' +
                '#errmain .boxmain dl dd.moredetail span{width:82px; height:64px; display:none; background:url('+ImageMgr.m_tipDetailImgURI+') 0  no-repeat; position:absolute; right:-5px; top:-70px; padding-top:15px;}' +
                '#errmain .boxmain dl dd.moredetail span a{display:block; text-align:center; line-height:18px;}' +
                '#errmain .boxmain dl dd.operate a{margin-right:40px;}' +
                '.goback{font-size:28px; font-weight:bold;}' +
                '</style>' +
                '</head>' +
                '<body>' +
                '<div id="errmain">' +
                '<div class="boxtop"></div>' +
                '<div class="boxmain">' +
                '<dl>' +
                '<dt></dt>' +
                '<dd id="title" class="redtext">'+LanguageMgr.m_warningPageTitle+'</dd>' +
                '<dd class="bowntext"><a id="sourceURL" title="'+originalUrl+'">'+originalUrl+'</a></dd>' +
                '<dd class="moredetail">' +
                ''+LanguageMgr.m_details+'' +
                '<span>' +
                '<a href="#" onClick="window.open('+AntiPhishingUrlWithQuot+')">Anti-phishing</a>' +
                '<a href="#" onClick="window.open('+StopBadwareUrlWithQuot+')">Adware</a>' +
                '</span>' +
                '</dd>' +            
                '<dd class="bottomline"></dd>' +
                '<dd id="recommend" >'+LanguageMgr.m_warningPageRecommand+'</dd>' +
                '<dd class="operate">' +
                '<div>' +
                '<a id="goBack" href="#" class="goback" onClick="window.location.href=&quot;about:blank&quot;">Cancel</a>' +
                '<a id="continueAway" href="' + originalUrl + '">' + warningPageContinue + '</a>' +
                '<a id="report" href="mailto:feedback@iobit.com?subject=Report false alarm&Body=Webpage:'+originalUrl+'%0d%0aVersion:V7%0d%0aComment:">'+warningPageReport+'</a>' +				
                '</div>' +
                '</dd>' +
                '<dd class="link">' +			
                ''+LanguageMgr.m_advisory+'<a style="color:#666; text-decoration:underline; cursor:pointer;" href="#" onClick="window.open('+GoogleDbUrlWithQuot+')">Google</a> & IObit' +
                '</dd>' +
                '</dl>' +
                '</div>' +
                '<div class="boxbottom"></div>' +
                '</div>' +
                '</body>' +
                '</html>';

            var newDoc = targetDocument.implementation.createHTMLDocument("");
            newDoc.documentElement.innerHTML = warningPageHtmlString;

            var newNode = targetDocument.importNode(newDoc.documentElement, true);
            if (targetDocument.documentElement)
            {
                //targetDocument.documentElement.innerHTML = htmlString;
                targetDocument.replaceChild(newNode, targetDocument.documentElement);
            }
            else
            {
                targetDocument.appendChild(newNode);
            }

            var continueElement = targetDocument.getElementById("continueAway");
            if (continueElement)
            {
                continueElement.addEventListener("mousedown", this.continueMouseDown, true);
            }
        }
    },

    continueMouseDown: function()
    {
        myExtension.m_AddIgnoreUrlFunc(ProtectPage.m_originalUrl);
    },
};
