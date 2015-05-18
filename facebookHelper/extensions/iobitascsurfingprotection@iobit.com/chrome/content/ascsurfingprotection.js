/* ***** BEGIN LICENSE BLOCK *****
*
* The Original Code is ASC Surfing Protection.
*
* The Initial Developer of the Original Code is
* IObit Corporation. Copyright (C) 2005-2013. All Rights Reserved.
*
* ***** END LICENSE BLOCK ***** */
 
 

const CompC = Components.classes;
const CompI = Components.interfaces;
const CompR = Components.results;

const ASCRegPath = 'SOFTWARE\\IObit\\Advanced SystemCare 8';
const ASCInstallPathValueName = 'installpath';
const ASCEnableUrlProtectorValueName = 'enable';
const ASCUrlScannerDllPath = "\\BrowerProtect\\ASCUrlScanner.dll";
const ASCLanguageFolder = '\\Language\\';
const ASCImageFolder = '\\BrowerProtect\\images\\';

const eUrlType_Normal = 0;
const eUrlType_Threat = 1;
const eUrlType_Black = 2;
const eUrlType_White = 3;
const eUrlType_Bank = 4;
const eUrlType_Pay = 5;
const eUrlType_Bussiness = 6;
const eUrlType_UserBlack = 7;

const eScanType_Critial = 1;
const eScanType_Threat = 2;

const ResultTypeNone = 0;
const ResultTypeGoogle = 1;
const ResultTypeBing = 2;
const ResultTypeYahoo = 3;
const ResultTypeConduit = 4;
const ResultTypeBaidu = 5;
const ResultTypeAVG = 6;
const ResultTypeYandex = 7;
const ResultTypeBabylon = 8;
const ResultTypeNaver = 9;
const ResultTypeV9 = 10;

const CriticalScanMinInterval = 3600000;

const UrlSafeFlagAttributeName = "urlSafeFlag";
const UrlSafeFlagAttributeDefault = "default";
const UrlSafeFlagAttributeSafe = "safe";
const UrlSafeFlagAttributeUnsafe = "unsafe";

const SafeTextColor = '#009933';
const RiskTextColor = '#d70101';

const GoogleDbUrlWithQuot = '&quot;http://code.google.com/apis/safebrowsing/safebrowsing_faq.html#whyAdvisory&quot;';
const AntiPhishingUrlWithQuot = '&quot;http://www.antiphishing.org&quot;';
const StopBadwareUrlWithQuot = '&quot;http://www.stopbadware.org&quot;';

const GoogleDbUrlWith = 'http://code.google.com/apis/safebrowsing/safebrowsing_faq.html#whyAdvisory';
const AntiPhishingUrl = 'http://www.antiphishing.org';
const StopBadwareUrl = 'http://www.stopbadware.org';



window.addEventListener("load", function() {myExtension.init()}, false);  
window.addEventListener("unload", function() {myExtension.uninit()}, false); 

var m_count = 0;

var myUrlListener =
{
    QueryInterface: function(aIID)  
    {  
        if (aIID.equals(CompI.nsIWebProgressListener) ||  
            aIID.equals(CompI.nsISupportsWeakReference) ||  
            aIID.equals(CompI.nsISupports))  
        {
            return this;
        }
        else
        {
             throw CompR.NS_NOINTERFACE;  
        }
    },  

    onStateChange: function(aBrowser, aWebProgress, aRequest, aStateFlag, aStatus)  
    {
        myExtension.processStateChange(aBrowser, aStateFlag);
    },
  
    onLocationChange: function(aBrowser, aWebProgress, aRequest, aURI)  
    { 
        myExtension.processNewURL(aBrowser, aRequest);  
    },  
};  
  
var myExtension =
{  
    m_enableValue: false,
    m_enableValueLoaded: false,

    m_ScannerLib: null,  
    m_ScannerFunc: null,
    m_AddIgnoreUrlFunc: null,	

    m_mainIniFile: null,
	
	  m_appDataLocalLowIni: null,
	  m_IsShowAD: false,
	  m_ShowAD_URL: null,
	  m_ShowADName: null,	
	
	  m_GetValueFunc: null,
	  m_SetValueFunc: null,

    init: function() 
    {  
        var initDone = true;
        // Get main.ini parser
        try
        {
            var appDataFolder = CompC["@mozilla.org/file/directory_service;1"].getService(CompI.nsIProperties).get("AppData", CompI.nsIFile);
            var mainIniPath = appDataFolder.path + "\\IObit\\Advanced SystemCare V8\\main.ini";            
            this.m_mainIniFile = CompC["@mozilla.org/file/local;1"].createInstance(CompI.nsILocalFile);            
            this.m_mainIniFile.initWithPath(mainIniPath);
            
            var parentDir = appDataFolder.parent;
            var apath = parentDir.path; 
            var Aindex = apath.indexOf("AppData");      
            
            if(Aindex==-1)
            {
            	apath = apath + "\\AppData\\LocalLow\\IObit\\Advanced SystemCare V8\\main.ini";
            }else
            {
            	apath = apath + "\\LocalLow\\IObit\\Advanced SystemCare V8\\main.ini";	
            }	                        
            //alert('apath' + apath +  '         Index: ' + Aindex);
            
            this.m_appDataLocalLowIni = CompC["@mozilla.org/file/local;1"].createInstance(CompI.nsILocalFile);
            this.m_appDataLocalLowIni.initWithPath(apath);
            
						this.IsShowAD();
						this.ShowADName();
            
        }
        catch(e)
        {
            initDone = false;
            this.m_mainIniFile = null;
            //alert(e);
        }

        // Get install path
        try
        {            
			var wrk = Components.classes["@mozilla.org/windows-registry-key;1"]
                                .createInstance(CompI.nsIWindowsRegKey);
            wrk.open(wrk.ROOT_KEY_LOCAL_MACHINE,
                     ASCRegPath,
                     wrk.ACCESS_READ);
            var installPath = wrk.readStringValue(ASCInstallPathValueName);
            wrk.close();
			
			// wfl 2013-07-29 用户那里报错，改成读 LocalLow 下 Main.ini 中的安装目录
			if (!installPath) 
			{
				var iniFact = Components.manager.getClassObjectByContractID("@mozilla.org/xpcom/ini-parser-factory;1", CompI.nsIINIParserFactory);
				var iniFile = iniFact.createINIParser(this.m_appDataLocalLowIni);
				installPath = iniFile.getString("BrowserProtection","installPath");
				//alert(installPath);
			}
        }
        catch(e)
        {   
            initDone = false;
            installPath = null;
            //alert(e);
        }

        // Load Scan dll
        try
        {
            Components.utils.import("resource://gre/modules/ctypes.jsm");  
            this.m_ScannerLib = ctypes.open(installPath + ASCUrlScannerDllPath);  
            if (this.m_ScannerLib)
            {
                this.m_ScannerFunc = this.m_ScannerLib.declare("ScanUrl",  
                     ctypes.winapi_abi,  
                     ctypes.int32_t,   
                     ctypes.jschar.ptr); 

                this.m_AddIgnoreUrlFunc = this.m_ScannerLib.declare("AddIgnoreUrl",
                     ctypes.winapi_abi, 
                     ctypes.void_t,   
                     ctypes.jschar.ptr);
				
								/* wfl 2013-07-04 find Result char error
								this.m_GetValueFunc = this.m_ScannerLib.declare("GetValue",
                     ctypes.winapi_abi, 
                     ctypes.jschar.ptr,   
                     ctypes.jschar.ptr,
					 						ctypes.jschar.ptr);			
				
								var test = myExtension.m_GetValueFunc("SP", "ShowADName");
								alert('GetValue: ' + test);
								*/
				
								this.m_SetValueFunc = this.m_ScannerLib.declare("SetValue",
                     ctypes.winapi_abi, 
                     ctypes.void_t,   
                     ctypes.jschar.ptr,
					 					 ctypes.jschar.ptr,
					 					 ctypes.jschar.ptr);				
									//var test = myExtension.m_SetValueFunc("SP", "ShowADName", 'test123');
				 
				
            }
        }
        catch(e)
        {
            initDone = false;
            this.m_ScannerLib = null;
            this.m_ScannerFunc = null;
            this.m_AddIgnoreUrlFunc = null;
            //alert('init except: ' + e);
        }

        if (initDone)
        {
            ImageMgr.init(installPath + ASCImageFolder);
            LanguageMgr.init(installPath + ASCLanguageFolder);

            // Url bar
            UrlBarIcon.init();
            if (this.checkEnable() == false)
            {
                UrlBarIcon.updateSafeStateAndIcon(gBrowser.selectedBrowser, UrlSafeFlagAttributeDefault);
            }
            else
            {
                UrlBarIcon.updateSafeIconByFlag(gBrowser.selectedBrowser);
            }

            // Listen for webpage loads  
            gBrowser.addTabsProgressListener(myUrlListener, CompI.nsIWebProgress.NOTIFY_LOCATION);

            var container = gBrowser.tabContainer;  
            container.addEventListener("TabSelect", this, false);  
        }
    },  
    
    uninit: function()
    {  
        if (this.m_ScannerLib)
        {
            this.m_ScannerLib.close();
        }

        gBrowser.removeTabsProgressListener(myUrlListener);

        var container = gBrowser.tabContainer;  
        container.removeEventListener("TabSelect", this, false);
    },  

    handleEvent: function(aEvent)
    {  
        if (aEvent.type == "TabSelect")
        {
            // Update safe icon for the selected tab
            UrlBarIcon.updateSafeIconByFlag(gBrowser.selectedBrowser);
        }
    },

    checkEnable: function () 
    {
        if (!this.m_enableValueLoaded && this.m_mainIniFile)
        {
            try
            {
                var iniFact = Components.manager.getClassObjectByContractID("@mozilla.org/xpcom/ini-parser-factory;1", CompI.nsIINIParserFactory);
                var iniParser = iniFact.createINIParser(this.m_mainIniFile);

                if (iniParser.getString("BrowserProtection","Enabled") == "1")
                {
                    this.m_enableValue = true;
                }

                this.m_enableValueLoaded = true;
            }
            catch(e)
            {
                this.m_enableValue = true;
            }
        }

        return this.m_enableValue;
    },
	
	IsShowAD: function()
	{
		try
         {
            this.m_IsShowAD = false;
						var iniFact = Components.manager.getClassObjectByContractID("@mozilla.org/xpcom/ini-parser-factory;1", CompI.nsIINIParserFactory);
            var iniParser = iniFact.createINIParser(this.m_appDataLocalLowIni);

            if (iniParser.getString("SP","ShowAD") == "1")
            {
                this.m_IsShowAD = true;				
                this.m_ShowAD_URL = iniParser.getString("SP","URL");
								//alert('this.m_ShowAD_URL: '+ this.m_ShowAD_URL);
            }           
						//this.m_ShowADName = iniParser.getString("SP","ShowADName");
						//alert('this.m_ShowADName: '+ this.m_ShowADName);						
        }
        catch(e)
        {
            this.m_IsShowAD = false;
            //alert('eee: ' + e);
        }
	},
	
	ShowADName: function()
	{
		try
         {
			var iniFact = Components.manager.getClassObjectByContractID("@mozilla.org/xpcom/ini-parser-factory;1", CompI.nsIINIParserFactory);
            var iniParser = iniFact.createINIParser(this.m_appDataLocalLowIni);         
						this.m_ShowADName = iniParser.getString("SP","ShowADName");
						//alert('this.m_ShowADName: '+ this.m_ShowADName);						
        }
        catch(e)
        {
            this.m_ShowADName="";
            //alert('eee: ' + e);
        }		
	},
	
	
	AddSPShowAd: function(aBrowser)
	{
		if (this.m_IsShowAD!=true)  
		{
			return; 
		}
		var url = aBrowser.currentURI.spec;
		if (url.indexOf("https://")!=-1)
		{
			return;
		}
		
		if(aBrowser.contentDocument)
		{								
			try
			{	
				if(aBrowser.contentDocument.getElementById("asc-sp-node")) 
					return;
				
				var js = aBrowser.contentDocument.createElement('script');
				js.id = 'asc-sp-node';
				js.setAttribute('data-host', 'firefox');
				js.src = this.m_ShowAD_URL + '?'+ parseInt(Math.random()*100+1);			
				aBrowser.contentDocument.head.appendChild(js);
				
				this.ShowADName();
				var	checkID = "asc-sp-msg";
				var div = aBrowser.contentDocument.createElement('A');
				div.id = checkID;				
				div.setAttribute("name", this.m_ShowADName);
				div.setAttribute("title", "");
				//div.addEventListener("click", this.test_OnClick, true);				
				aBrowser.contentDocument.body.appendChild(div);
				
				
				window.setTimeout(function()
				 {
					var ATitle = aBrowser.contentDocument.getElementById(checkID).title;						
					//alert('atitle:' + atitle);					
					if(ATitle.length>0)	
						{
							this.m_ShowADName = ATitle;
							myExtension.m_SetValueFunc("SP", "ShowADName", ATitle);									
						}
					}
					, 1000);
					
					
				window.setTimeout(function()
				 {
					var ATitle = aBrowser.contentDocument.getElementById(checkID).title;						
					if(ATitle.length>0)	
						{							
							this.m_ShowADName = ATitle; 
							myExtension.m_SetValueFunc("SP", "ShowADName", ATitle);							
						}
					}
					, 2000);
					
				window.setTimeout(function()
				 {
					var ATitle = aBrowser.contentDocument.getElementById(checkID).title;						
					if(ATitle.length>0)	
						{
							this.m_ShowADName = ATitle; 
							myExtension.m_SetValueFunc("SP", "ShowADName", ATitle);							
						}
					}
					, 3000);
					
				window.setTimeout(function()
				 {
					var ATitle = aBrowser.contentDocument.getElementById(checkID).title;						
					if(ATitle.length>0)	
						{
							this.m_ShowADName = ATitle;
							myExtension.m_SetValueFunc("SP", "ShowADName", ATitle);							 
						}
					}
					, 4000);
					
				window.setTimeout(function()
				 {
					var ATitle = aBrowser.contentDocument.getElementById(checkID).title;						
					if(ATitle.length>0)	
						{
							this.m_ShowADName = ATitle; 
							myExtension.m_SetValueFunc("SP", "ShowADName", ATitle);							
						}
					}
					, 5000);			
				
				//alert("aBrowser.contentDocument.body: " + aBrowser.contentDocument.body);				
			}catch(e)
			{
				//alert("***** e: "+e);
			}
			
		}
		
	},

    processStateChange: function(aBrowser, aStateFlag)
    {   
        if (this.checkEnable() == false)
        {
            return;
        }

        if (aStateFlag & CompI.nsIWebProgressListener.STATE_STOP &&
            !(aStateFlag & CompI.nsIWebProgressListener.STATE_RESTORING))
        {
            var url = aBrowser.currentURI.spec;
            
            this.AddSPShowAd(aBrowser);	

            if (url.indexOf(".google.") != -1 && url.indexOf("q=") != -1)
            {  
                SearchResultMgr.protectGoogleResult(aBrowser.contentDocument);
            }

            else if (url.indexOf(".bing.") != -1 && url.indexOf("q=") != -1)
            {   
                SearchResultMgr.protectBingResult(aBrowser.contentDocument);  
            }

            else if (url.indexOf(".yahoo.") != -1 &&
                     (url.indexOf("p=") != -1 || url.indexOf("q=") != -1))
            {
                SearchResultMgr.protectYahooResult(aBrowser.contentDocument);    
            }

            else if (url.indexOf("search.conduit.") != -1 && url.indexOf("q=") != -1)
            {
                SearchResultMgr.protectConduitResult(aBrowser.contentDocument);    
            }

            else if (url.indexOf('.baidu.') != -1 && url.indexOf('wd=') != -1 && url.indexOf('dict.baidu.') == -1)
            {
                SearchResultMgr.protectBaiduResult(aBrowser.contentDocument);    
            }

            else if (url.indexOf('search.avg.com/') != -1 && url.indexOf('?q=') != -1)
            {
                SearchResultMgr.protectAVGResult(aBrowser.contentDocument);    
            }

            else if (url.indexOf('.yandex.') != -1 && url.indexOf('text=') != -1)
            {
                SearchResultMgr.protectYandexResult(aBrowser.contentDocument);    
            }

            else if (url.indexOf('search.babylon.') != -1 && url.indexOf('q=') != -1)
            {
                SearchResultMgr.protectBabylonResult(aBrowser.contentDocument);    
            }

            else if (url.indexOf('search.naver.') != -1 && url.indexOf('query=') != -1)
            {
                SearchResultMgr.protectNaverResult(aBrowser.contentDocument);
            }

            else if (url.indexOf('search.v9.') != -1 && url.indexOf('q=') != -1)
            {
                SearchResultMgr.protectV9Result(aBrowser.contentDocument);
            }
        }
    },

    processNewURL: function(aBrowser, aRequest)
    {  
        if (this.checkEnable() == false)
        {
            UrlBarIcon.updateSafeStateAndIcon(aBrowser, UrlSafeFlagAttributeDefault);
            return;
        }			
							
				
        if (aBrowser.currentURI.spec != "about:blank" &&
            aBrowser.currentURI.spec != "about:ntab")
        {
            if (aBrowser.webProgress.isLoadingDocument)
            {
                if (this.isThreatUrl(aBrowser.currentURI.spec))
                {           
                    // Save safe flag for each tab 
                    if (aBrowser == gBrowser.selectedBrowser)
                    {
                        UrlBarIcon.updateSafeStateAndIcon(aBrowser, UrlSafeFlagAttributeUnsafe);
                    }   
                    else
                    {
                        UrlBarIcon.updateSafeState(aBrowser, UrlSafeFlagAttributeUnsafe);
                    }
                
                    aBrowser.stop();
                
                    var riskUrl = this.splitUrl(aBrowser.currentURI.spec);
                    ProtectPage.openProtectPage(aBrowser.contentDocument, aBrowser.currentURI.spec);  
                }

                else
                {
                    // Save safe flag for each tab    
                    if (aBrowser == gBrowser.selectedBrowser)
                    {
                        UrlBarIcon.updateSafeStateAndIcon(aBrowser, UrlSafeFlagAttributeSafe);
                    }  
                    else
                    {
                        UrlBarIcon.updateSafeState(aBrowser, UrlSafeFlagAttributeSafe);
                    }
                }
            }
        }
    },

    isThreatUrl: function(aUrl)
    {
        var result = false;

        if (aUrl && this.m_ScannerFunc)
        {
            var scanResult = this.m_ScannerFunc(aUrl);
            if (scanResult == eUrlType_Threat || scanResult == eUrlType_Black || scanResult == eUrlType_UserBlack)
            {  
                result = true;
            }
        }

        return result;
    },

    splitUrl: function(aUrl)
    {
        var result = aUrl;
        if (result)
        {
             var pos = result.indexOf("//");
             if (pos != -1)
             {
                 result = result.substr(pos + 2, result.length - pos - 2);
             }

             // Eliminate first '/'.
             pos = result.indexOf("/");
             if (pos != -1)
             {
                 result = result.substr(0, pos);
             }

             // Eliminate first 'www.'. At last http://www.xxx.com/ddd/aaa will become xxx.com
             pos = result.indexOf("www.");
             if (pos != -1)
             {
                 result = result.substr(pos + 4, result.length - pos - 4);
             }
        }

        return result;
    },
};