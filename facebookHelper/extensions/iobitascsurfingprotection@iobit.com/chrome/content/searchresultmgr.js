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


const ASCIconImgElementIdPrefix = "ascimg";
const ASCMouseoverDivIdPrefix = "d";
const SearchEngineAttributeName = "engine";
const RelatedDivIdAttributeName = "relatedId"
const SearchEngineGoogle = "google";
const SearchEngineBing = "bing";
const SearchEngineYahoo = "yahoo";
const SearchEngineConduit = "condiut";
const SearchEngineBaidu = "baidu";
const SearchEngineAVG = "avg";
const SearchEngineYandex = "yandex";
const SearchEngineBabylon = "babylon";
const SearchEngineNaver = "naver";
const SearchEngineV9 = "v9";

const ASCIconTopOffset_Bing = 20;
const ASCIconLeftOffset_Bing = 5;
const ASCIconTopOffset_Other = 20;


var SearchResultMgr = {
    
    m_safeTipPopboxHtmlString: null,
    m_riskTipPopboxHtmlString: null,

    protectGoogleResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("h3");
                this.handleSearchResultItem(currentDocument, titleElements, SearchEngineGoogle, 0);
            }
        }
    },

    protectBingResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("h3");
                this.handleSearchResultItem(currentDocument, titleElements, SearchEngineBing, 0);

                var h2TitleElements = bodyElement.getElementsByTagName("h2");
                this.handleSearchResultItem(currentDocument, h2TitleElements, SearchEngineBing, titleElements.length);
            }
        }
    },

    protectYahooResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("h3");
                this.handleSearchResultItem(currentDocument, titleElements, SearchEngineYahoo, 0);
            }
        }
    },

    protectConduitResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                
                var titleElements = bodyElement.getElementsByTagName("a");
                if (titleElements && titleElements.length != 0)
                {
                    var firstFound = true;
                    var itemBaseIndex = 0;

                    for (var i = 0; i < titleElements.length; ++i)
                    {
                        if (titleElements[i].id.indexOf("ctl00_main_organicResults_results_ct") != -1)
                        {
                            var ascElements = titleElements[i].getElementsByTagName("img");
                            if (this.elementsContainsASCImg(ascElements))
                            {
                               continue;
                            }

                            if (firstFound)
                            {
                                firstFound = false;

                                this.insertLayoutScript(currentDocument);
                            }

                            var href = titleElements[i].getAttribute("href");
                            var result = !myExtension.isThreatUrl(href);
                            this.insertNewImgElement(++itemBaseIndex, currentDocument, titleElements[i], SearchEngineConduit, result);
                        }
                    }
                }
            }
        }
    },

    protectBaiduResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("h3");
                this.handleSearchResultItem(currentDocument, titleElements, SearchEngineBaidu, 0);
            }
        }
    },

    protectAVGResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("h2");
                this.handleSearchResultItem(currentDocument, titleElements, SearchEngineAVG, 0);
            }
        }
    },

    protectYandexResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("a");
                if (titleElements && titleElements.length != 0)
                {
                    var firstFound = true;
                    var itemBaseIndex = 0;

                    for (var i = 0; i < titleElements.length; ++i)
                    {
                        if (titleElements[i].className.indexOf("b-serp-item__title-link") != -1 ||
                            titleElements[i].className.indexOf("b-serp2-item__title-link") != -1 ||
                            titleElements[i].className.indexOf("z-images__title") != -1)
                        {
                            var ascElements = titleElements[i].getElementsByTagName("img");
                            if (this.elementsContainsASCImg(ascElements))
                            {
                               continue;
                            }

                            if (firstFound)
                            {
                                firstFound = false;

                                this.insertLayoutScript(currentDocument);
                            }

                            var href = titleElements[i].getAttribute("href");
                            var result = !myExtension.isThreatUrl(href);
                            this.insertNewImgElement(++itemBaseIndex, currentDocument, titleElements[i], SearchEngineYandex, result);
                        }
                    }
                }
            }
        }
    },

    protectBabylonResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var titleElements = bodyElement.getElementsByTagName("a");
                if (titleElements && titleElements.length != 0)
                {
                    var firstFound = true;
                    var itemBaseIndex = 0;

                    for (var i = 0; i < titleElements.length; ++i)
                    {
                        if (titleElements[i].className == "gRsSlicetitle")
                        {
                            var ascElements = titleElements[i].getElementsByTagName("img");
                            if (this.elementsContainsASCImg(ascElements))
                            {
                               continue;
                            }

                            var parentElement = titleElements[i].parentNode;
                            if (parentElement)
                            {
                                var urlParentElements = parentElement.getElementsByClassName("gRsSliceurl");
                                if (urlParentElements && urlParentElements.length != 0)
                                {
                                    var urlElements = urlParentElements[0].getElementsByClassName("gRsSliceurl");
                                    if (urlElements && urlElements.length != 0)
                                    {
                                        if (firstFound)
                                        {
                                            firstFound = false;

                                            this.insertLayoutScript(currentDocument);
                                        }

                                        var href = urlElements[0].textContent;
                                        var result = !myExtension.isThreatUrl(href);
                                        this.insertNewImgElement(++itemBaseIndex, currentDocument, titleElements[i], SearchEngineBabylon, result);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    protectNaverResult: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var dtElements = bodyElement.getElementsByTagName("dt");
                if (dtElements && dtElements.length != 0)
                {
                    var firstFound = true;
                    var itemBaseIndex = 0;

                    for (var i = 0; i < dtElements.length; ++i)
                    {
                        var titleElements = dtElements[i].getElementsByTagName("a");
                        if (titleElements && titleElements.length == 1 &&
                            titleElements[0].getAttribute("href") != null)
                        {
                            var ascElements = titleElements[0].getElementsByTagName("img");
                            if (this.elementsContainsASCImg(ascElements))
                            {
                               continue;
                            }

                            if (firstFound)
                            {
                                firstFound = false;

                                this.insertLayoutScript(currentDocument);
                            }

                            var href = titleElements[0].getAttribute("href");
                            var result = !myExtension.isThreatUrl(href);
                            this.insertNewImgElement(++itemBaseIndex, currentDocument, titleElements[0], SearchEngineV9, result);
                        }
                    }
                }
            }
        }
    },

    protectV9Result: function(currentDocument)
    {
        if (currentDocument)
        {
            var bodyElement = currentDocument.body;
            if (bodyElement)
            {
                var resultElements = bodyElement.getElementsByTagName("div");
                if (resultElements && resultElements.length != 0)
                {
                    var firstFound = true;
                    var itemBaseIndex = 0;

                    for (var i = 0; i < resultElements.length; ++i)
                    {
                        if (resultElements[i].className == "item")
                        {
                            var titleElements = resultElements[i].getElementsByClassName("title");
                            if (titleElements && titleElements.length == 1)
                            {
                                var ascElements = titleElements[0].getElementsByTagName("img");
                                if (this.elementsContainsASCImg(ascElements))
                                {
                                   continue;
                                }

                                var urlElements = resultElements[i].getElementsByClassName("url");
                                if (urlElements && urlElements.length == 1)
                                {
                                    if (firstFound)
                                    {
                                        firstFound = false;

                                        this.insertLayoutScript(currentDocument);
                                    }

                                    var result = !myExtension.isThreatUrl(urlElements[0].textContent);
                                    this.insertNewImgElement(++itemBaseIndex, currentDocument, titleElements[0], SearchEngineV9, result);
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    elementsContainsASCImg: function(elements)
    {
        var exist = false;

        if (elements && elements.length != 0)
        {
            for (var j = 0; j < elements.length; ++j)
            {
                if (elements[j].id && elements[j].id.indexOf(ASCIconImgElementIdPrefix) != -1)
                {
                    exist = true;
                    break;
                }
            }
        }

        return exist;
    },

    handleSearchResultItem: function(currentDocument, titleElements, searchEngineName, itemBaseIndex)
    {
         if (currentDocument && titleElements && titleElements.length != 0 && searchEngineName)
         {
             var firstFound = true;
             
             for (var i = 0; i < titleElements.length; ++i)
             { 
                 // Avoid duplicated operation
                 var ascElements = titleElements[i].getElementsByTagName("img");
                 if (this.elementsContainsASCImg(ascElements))
                 {
                    continue;
                 }

                 var hrefElements = titleElements[i].getElementsByTagName("a");  
                 if (hrefElements && hrefElements.length == 1)
                 {
                     if (firstFound)
                     {
                         firstFound = false;

                         this.insertLayoutScript(currentDocument);
                     }

                     var href = hrefElements[0].getAttribute("href");
                     var result = !myExtension.isThreatUrl(href);
                     this.insertNewImgElement(itemBaseIndex + i + 1, currentDocument, titleElements[i], searchEngineName, result);
                 }
             }
         }
    },

    insertNewImgElement: function(itemIndex, currentDocument, parentElement, searchEngineName, isSafe)
    {
        if (currentDocument && parentElement)
        {
            // Insert right icon
            var newImageElement = currentDocument.createElement("img");
            newImageElement.setAttribute("id", ASCIconImgElementIdPrefix + itemIndex);
            if (isSafe)
            {
                newImageElement.setAttribute("src", ImageMgr.m_safeSmallImgURI);
            }
            else
            {
                newImageElement.setAttribute("src", ImageMgr.m_riskSmallImgURI);
            }
            newImageElement.setAttribute("width", 16);
            newImageElement.setAttribute("height", 16);
            newImageElement.setAttribute("style", "margin-left:4px;");
            newImageElement.setAttribute(SearchEngineAttributeName, searchEngineName);

            var divId = ASCMouseoverDivIdPrefix + itemIndex;
            newImageElement.setAttribute(RelatedDivIdAttributeName, divId);
            
            //parentElement.insertBefore(newImageElement, parentElement.firstChild);
            parentElement.appendChild(newImageElement);

            // Insert mouseover img
            this.insertMouseoverElement(divId, currentDocument, isSafe);

            // Handle mouseover
            newImageElement.setAttribute("onmouseover", "layerout(this, '"+divId+"');");
            newImageElement.setAttribute("onmouseout", "layerin(this, event, '"+divId+"');");
        }
    },

    insertLayoutScript: function(currentDocument)
    {
        if (currentDocument)
        {
            var scriptElement = currentDocument.createElement("script");
            if (scriptElement )
            {
                scriptElement.innerHTML = 
                    'var delay = null; currDisplay = null;' +
                    'function layerout(obj, bgid){var element= document.getElementById(bgid);if(element!=currDisplay){if (currDisplay) { currDisplay.style.cssText+=";display:none;"; }} clearTimeout(delay);var x,y;oRect=obj.getBoundingClientRect();' +
                    'x= oRect.left;y= oRect.bottom;h=obj.offsetHeight;sh = 0;sh=Math.max(document.documentElement.scrollTop, document.body.scrollTop);delay= window.setTimeout(function(){element.style.cssText+=";display:block;left:"+x+"px;top:"+(y+sh+5)+"px;";},800)}' +
                    'function layerin(obj,e,bgid) {clearTimeout(delay); var element = document.getElementById(bgid);currDisplay = element;if (e.currentTarget){if (e.relatedTarget != obj){if (obj != e.relatedTarget.parentNode){delay = window.setTimeout(function()' +
                    '{element.style.cssText+=";display:none;";}, 500);}}} else {if (e.toElement != obj){if (obj != e.toElement.parentNode) {delay = window.setTimeout(function(){element.style.cssText+=";display:none;";}, 500);}}}}'; 
                   
                currentDocument.head.appendChild(scriptElement);
            }
        }
    },

    insertMouseoverElement: function(divId, currentDocument, isSafe)
    {
        if (currentDocument)
        {
            // Insert div
//             if ((isSafe && this.m_safeTipPopboxHtmlString == null) ||
//                 (!isSafe && this.m_riskTipPopboxHtmlString == null))
//             {
                if (isSafe)
                {
                    this.m_safeTipPopboxHtmlString =
		                '<div style="height:38px"></div>' +
	                    '<div style="height:135px;position:relative;">' +
                        '<dl style="width:272px; display:inline-block; overflow:hidden;margin-top:22px;margin-right:14px; margin-left:14px;">' +
        	            '<dt style="float:left; width:54px; margin-right:14px;height:60px;background:url('+ImageMgr.m_safeLargeImgURI+') 0 0 no-repeat;"></dt>' +
                        '<dd style=margin-top:12px;"><span style="color:'+SafeTextColor+'; font-size:18px; font-weight:bold;">'+LanguageMgr.m_safeTitle+' '+LanguageMgr.m_safeTip+'</span></dd>' +
                        '</dl>' +
                        '</div>';
                }
                else
                {
                    this.m_riskTipPopboxHtmlString =
		                '<div style="height:38px"></div>' +
	                    '<div style="height:135px;position:relative;">' +
                        '<dl style="width:272px; display:inline-block; overflow:hidden;margin-top:22px;margin-right:14px; margin-left:14px;">' +
        	            '<dt style="float:left; width:54px; margin-right:14px;height:60px;background:url('+ImageMgr.m_riskLargeImgURI+') 0 0 no-repeat;"></dt>' +
                        '<dd style="font-size:14px;"><span style="color:'+RiskTextColor+'; font-size:18px; font-weight:bold;">'+LanguageMgr.m_riskTitle+' '+LanguageMgr.m_riskTip+'</span></dd>' +
                        '</dl>' +
		                '<ul style="margin:0 6px; color:#666; font-size:10px; height:19px; line-height:15px; position:absolute;bottom:0; list-style:none; padding:0;">' +
			            '<li style="width:214px; float:left;">' +
				        ''+LanguageMgr.m_advisory+'' +
				        '<a style="color:#666; text-decoration:underline; cursor:pointer;" onClick="window.open('+GoogleDbUrlWithQuot+');">Google</a> & IObit' +
			            '</li>' +
			            '<li style="text-align:center; width:90px; text-decoration:underline; cursor:pointer; position:relative; float:left;" onmouseover="document.getElementById(&quot;ASC_U_'+divId+'&quot;).style.cssText +=&quot;;display:block&quot;; " onmouseout="document.getElementById(&quot;ASC_U_'+divId+'&quot;).style.cssText +=&quot;;display:none&quot;; ">' +
				        ''+LanguageMgr.m_details+'' +
				        '<ul id = "ASC_U_'+divId+'" style="font-size:10px; width:82px; height:64px; display:none; padding-top:5px; background:url('+ImageMgr.m_tipDetailImgURI+') 0 0 no-repeat; position:absolute; top:-55px; right:5px;list-style:none;padding:0;">' +
				        '<li style="height:18px; line-height:18px;margin-top:10px;"><a onClick="window.open('+AntiPhishingUrlWithQuot+')" style="text-align:center; color:blue; text-decoration:underline; cursor:pointer;">Anti-phishing</a></li>' +
				        '<li style="height:18px; line-height:18px;"><a onClick="window.open('+StopBadwareUrlWithQuot+')" style="text-align:center; color:blue; text-decoration:underline; cursor:pointer;">Adware</a></li>' +
				        '</ul>' +
			            '</li>' +
		                '</ul>' +
                        '</div>';
                } 
/*            }*/

            var mouseoverElement = currentDocument.createElement("div");
            mouseoverElement.setAttribute("id", divId);
            mouseoverElement.setAttribute("onmouseover", "layerout(document.getElementById('sp1'),'"+divId+"');");
            mouseoverElement.setAttribute("onmouseout", "layerin(document.getElementById('sp1'),event,'"+divId+"');");

            if (isSafe)
            {
                mouseoverElement.setAttribute("style", 'display:none;position: absolute;overflow: hidden; z-index: 1000; left: 24px;width:320px;height:175px; font:14px arial; background:url('+ImageMgr.m_windowSafeImgURI+') 0 0 no-repeat;');
                mouseoverElement.innerHTML = this.m_safeTipPopboxHtmlString;
            }
            else
            {
                mouseoverElement.setAttribute("style", 'display:none;position: absolute;overflow: hidden; z-index: 1000; left: 24px;width:320px;height:175px; font:14px arial; background:url('+ImageMgr.m_windowRiskImgURI+') 0 0 no-repeat;');
                mouseoverElement.innerHTML = this.m_riskTipPopboxHtmlString;
            }

            var oldElement = currentDocument.getElementById(divId);
            if (oldElement)
            {
                currentDocument.body.replaceChild(mouseoverElement, oldElement);
            }
            else
            {
                currentDocument.body.appendChild(mouseoverElement);
            }
        }
    },
};
