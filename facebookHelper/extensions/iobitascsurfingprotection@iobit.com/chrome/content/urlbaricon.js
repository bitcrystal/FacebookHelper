/* ***** BEGIN LICENSE BLOCK *****
*
* The Original Code is ASC Surfing Protection.
*
* The Initial Developer of the Original Code is
* IObit Corporation. Copyright (C) 2005-2013. All Rights Reserved.
*
* ***** END LICENSE BLOCK ***** */
 
 
 /*
 * Used by ascurlprotector.js
 */



var UrlBarIcon = {

    m_locationBarImgElement: null,

	init: function()
	{
        // Add event for location bar icon
        this.m_locationBarImgElement = document.getElementById("urlsafeflag-icon");
	},

	updateSafeIconByFlag: function(aBrowser)
    {
        if (aBrowser)
        {
            var safeFlagString = aBrowser.getUserData(UrlSafeFlagAttributeName);
            if (safeFlagString == null)
            {
                if (gBrowser.currentURI.spec == "about:blank" ||
                    gBrowser.currentURI.spec == "about:ntab" ||
                    gBrowser.currentURI.spec == "about:home")
                {
                    safeFlagString = UrlSafeFlagAttributeSafe;
                }
                else
                {
                    if (myExtension.isThreatUrl(gBrowser.currentURI.spec))
                    {   
                        safeFlagString = UrlSafeFlagAttributeUnsafe;
                         
                        // Set the blocked url for user selecting to continue
                        aBrowser.setUserData(BlockedUrlAttributeName, gBrowser.currentURI.spec, null);
                    }
                    else
                    {
                        safeFlagString = UrlSafeFlagAttributeSafe;
                    }
                }
            }

            this.updateSafeStateAndIcon(aBrowser, safeFlagString);
        }
    },

    updateSafeStateAndIcon: function(aBrowser, safeFlagString)
    {
        if (aBrowser && safeFlagString)
        {
            aBrowser.setUserData(UrlSafeFlagAttributeName, safeFlagString, null);

            this.doUpdateSafeIcon(safeFlagString);
        }
    },

    updateSafeState: function(aBrowser, safeFlagString)
    {
        if (aBrowser && safeFlagString)
        {
            aBrowser.setUserData(UrlSafeFlagAttributeName, safeFlagString, null);
        }
    },

    doUpdateSafeIcon: function(safeFlagString)
    {
        if (safeFlagString && this.m_locationBarImgElement)
        {
            if (safeFlagString == UrlSafeFlagAttributeSafe)
            {
                this.m_locationBarImgElement.src = ImageMgr.m_safeSmallImgURI;
                this.m_locationBarImgElement.setAttribute("tooltiptext", LanguageMgr.m_safeTip);
            }
            else if (safeFlagString == UrlSafeFlagAttributeUnsafe)
            {
                this.m_locationBarImgElement.src = ImageMgr.m_riskSmallImgURI;
                this.m_locationBarImgElement.setAttribute("tooltiptext", LanguageMgr.m_riskTip);
            }
            else
            {
                this.m_locationBarImgElement.hidden = true;
            }
        }
    },

    locationBarIconMouseUp: function()
    {
        if (myExtension.checkEnable())
        {
            var safeFlagString = gBrowser.selectedBrowser.getUserData(UrlSafeFlagAttributeName);
            if (safeFlagString)
            {
                var isSafe = true;
                if (safeFlagString == UrlSafeFlagAttributeUnsafe)
                {
                    isSafe = false;
                }

                var popupElement = document.getElementById("urlsafeflag-icon-popup");
                UrlBarIcon.refinePopupbox(popupElement, isSafe); 
                popupElement.hidden = false;
                popupElement.openPopup(UrlBarIcon.m_locationBarImgElement, 'after_start', 0, 0, false, false); 
            }
        }
    },

    refinePopupbox: function(popupElement, isSafe)
    {
        if (popupElement)
        {
            var styleElement = document.getElementById("popstyle");
            if (styleElement)
            {
                var imgClose = ImageMgr.generateLocalImgBase64URI("popbox_btn_close.png");
                var imgOK = ImageMgr.generateLocalImgBase64URI("popbox_btn_ok.png");

                var popboxStyleHtmlString = null;
                if (isSafe)
                {
                    popboxStyleHtmlString =
                        'html{color:#000;background:#fff}' +
                        'body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,select,p,blockquote,th,td{margin:0;padding:0 ; }' +
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
                        '/***********/' +
                        '.background{width:320px;height:175px; display:block; background:url('+ImageMgr.m_windowSafeImgURI+') 0 0 no-repeat;}' +
                        '#popbox .mbody{height:140px; position:relative;font-family:arial;}' +
                        '#popbox .mbody dl{ width:292px; display:inline-block;margin-top:12px;margin-right:14px; margin-left:14px;}' +
                        '#popbox .mbody dl dt{float:left; width:54px; margin-right:16px;}' +
                        '#popbox .mbody dl dd{margin-left:70px; width:225px;}' +
                        '#popbox .message{color:'+SafeTextColor+'; font-size:18px; font-weight:bold; margin-right:10px; margin-top:12px}' +
                        '#popbox .mbody dl dd.message{margin-bottom:5px; line-height:24px; height:50px;width:210px;overflow:hidden;}' +
                        '#popbox .head{height:35px;}' +
                        '.closebtn{width:18px; height:18px; display:block; cursor:pointer; float:right; margin-top:10px; margin-right:10px; background:url('+imgClose+') 0 0 no-repeat;}' +
                        '.boxbtn_ok{width:100px; height:28px; display:block; float:right; margin-right:88px; margin-top:10px; background:url('+imgOK+'); line-height:28px; text-align:center; color:#000; text-decoration:none;}' +
                        '.bottom_info{margin:0 4px; color:#666; font-size:10px; height:26px; line-height:26px; position:absolute;bottom:0;}' +
                        '.bottom_info li{float:left;}' +
                        '.bottom_info li.detai_info{ text-align:center; width:90px; text-decoration:underline; cursor:pointer; position:relative;}' +
                        '.bottom_info li.detai_info span{width:82px; height:64px; padding-top:5px; display:none; background:url('+ImageMgr.m_tipDetailImgURI+') 0 0 no-repeat; position:absolute; top:-55px; right:5px;}' +
                        '.bottom_info li.detai_info span a{text-align:center; line-height:18px;}' +
                        '.bottom_info li.detai_info:hover span{display:inline-block;}';
                }
                else
                {
                    popboxStyleHtmlString =
                        'html{color:#000;background:#fff}' +
                        'body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,select,p,blockquote,th,td{margin:0;padding:0 ; }' +
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
                        '/***********/' +
                        '.background{width:320px;height:175px; display:block; background:url('+ImageMgr.m_windowRiskImgURI+') 0 0 no-repeat;}' +
                        '#popbox .mbody{height:140px; position:relative;font-family:arial;}' +
                        '#popbox .mbody dl{ width:292px; display:inline-block;margin-top:12px;margin-right:14px; margin-left:14px;}' +
                        '#popbox .mbody dl dt{float:left; width:54px; margin-right:16px;}' +
                        '#popbox .mbody dl dd{margin-left:70px; width:225px;}' +
                        '#popbox .message{color:'+RiskTextColor+'; font-size:18px; font-weight:bold; margin-right:10px;}' +
                        '#popbox .mbody dl dd.message{margin-bottom:5px; line-height:24px; height:50px;width:210px;overflow:hidden;}' +
                        '#popbox .head{height:35px;}' +
                        '.closebtn{width:18px; height:18px; display:block; cursor:pointer; float:right; margin-top:10px; margin-right:10px; background:url('+imgClose+') 0 0 no-repeat;}' +
                        '.boxbtn_ok{width:100px; height:28px; display:block; float:right; margin-right:95px; margin-top:10px; background:url('+imgOK+'); line-height:28px; text-align:center; color:#000; text-decoration:none;}' +
                        '.bottom_info{margin:0 4px; color:#666; font-size:10px; height:26px; line-height:26px; position:absolute;bottom:0;}' +
                        '.bottom_info li{float:left;}' +
                        '.bottom_info li.detai_info{ text-align:center; width:90px; text-decoration:underline; cursor:pointer; position:relative;}' +
                        '.bottom_info li.detai_info span{width:82px; height:64px; padding-top:5px; display:none; background:url('+ImageMgr.m_tipDetailImgURI+') 0 0 no-repeat; position:absolute; top:-55px; right:5px;}' +
                        '.bottom_info li.detai_info span a{text-align:center; line-height:18px;}' +
                        '.bottom_info li.detai_info:hover span{display:inline-block;}';
                }

                styleElement.innerHTML = popboxStyleHtmlString;
            }

            var imgTip = document.getElementById("tipImg");
            if (imgTip)
            {
                if (isSafe)
                {
                    imgTip.src = ImageMgr.m_safeLargeImgURI;
                }
                else
                {
                    imgTip.src = ImageMgr.m_riskLargeImgURI;
                }
            }

            var safeTitle = document.getElementById("desc");
            if (safeTitle)
            {
                if (isSafe)
                {
                    safeTitle.textContent = LanguageMgr.m_safeTitle + ' ' + LanguageMgr.m_safeTip;
                }
                else
                {
                    safeTitle.textContent = LanguageMgr.m_riskTitle + ' ' + LanguageMgr.m_riskTip;
                }
            }

            var urlElement = document.getElementById("detail_URL");
            if (urlElement)
            {
                if (isSafe)
                {
                    urlElement.hidden = true;
                }
                else
                {
                    urlElement.hidden = false;

                    var advisory = document.getElementById("advisorytext");
                    if (advisory)
                    {
                        advisory.textContent = LanguageMgr.m_advisory;
                    }

                    var details = document.getElementById("detailstext");
                    if (details)
                    {
                        details.textContent = LanguageMgr.m_details;
                    }
                }
            }

            var btnOK = document.getElementById("btnOk");
            if (btnOK)
            {
                btnOK.textContent = LanguageMgr.m_btnOK;
            }
        }
    },

    openGoogleDbUrl: function()
    {
        gBrowser.contentWindow.open(GoogleDbUrlWith);
    },

    openAntiPhishingUrl: function()
    {
        gBrowser.contentWindow.open(AntiPhishingUrl);
    },

    openBadwareUrl: function()
    {
        gBrowser.contentWindow.open(StopBadwareUrl);
    },
};
