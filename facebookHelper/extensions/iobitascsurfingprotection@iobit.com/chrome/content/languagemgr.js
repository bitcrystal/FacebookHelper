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


const IniFileSectionName = "Brower_Protected_M";

const Btn_ok = "btn_ok";
const Site_Safe_tip = "Site_Safe_tip";
const Site_Risk_tip = "Site_Risk_tip";
const Protected_Off_tip = "Protected_Off_tip";
const Site_Safe = "Site_Safe";
const Site_Risk = "Site_Risk";
const Site_Advisory = "Site_Advisory";
const Site_Details = "Site_Details";

const Risk_Title = "Risk_Title";
const Risk_recommend = "Risk_recommend";
const Risk_goBack = "Risk_goBack";
const Risk_report = "Risk_report";
const Risk_continue = "Risk_continue";

var LanguageMgr = {
    
    m_ASCLanguageFolderPath: null,

    m_btnOK: "OK",
    m_safeTip: "This site is safe",
    m_riskTip: "This site contains potential threats",
    m_offTip: "Advanced SystemCare Broswer Protected: Off",
    m_safeTitle: "Safe:",
    m_riskTitle: "Risk:",
    m_advisory: "Advisory provided by ",
    m_details: "More Details",

    m_warningPageTitle: "This website has been reported as unsafe",
    m_warningPageRecommand: "We recommend that you do not continue to this website.",
    m_warningPageGoback: "Cancel",
    m_warningPageReport: "Report false alarm",
    m_warningPageContinue: "Continue away",

	init: function(ASCLanguageFolderPath)
	{
        if (ASCLanguageFolderPath == null)
        {
            return;
        }

        try
        {
            var iniFact = Components.manager.getClassObjectByContractID("@mozilla.org/xpcom/ini-parser-factory;1", CompI.nsIINIParserFactory);
            var iniParser = iniFact.createINIParser(myExtension.m_mainIniFile);
	        var languageFileName = iniParser.getString("Main","Language") + ".lng";
        }
        catch(e)
        {
            languageFileName = "English.lng";
        }

        try 
        {
            this.m_ASCLanguageFolderPath = ASCLanguageFolderPath;
            var iniFile = CompC["@mozilla.org/file/local;1"].createInstance(CompI.nsILocalFile);
            iniFile.initWithPath(this.m_ASCLanguageFolderPath + languageFileName);

            var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].  
                  createInstance(CompI.nsIFileInputStream);  
            istream.init(iniFile, -1, 0, 0);  
            istream.QueryInterface(CompI.nsILineInputStream);  

            // Convert to UTF-16
            var is = Components.classes["@mozilla.org/intl/converter-input-stream;1"]  
                               .createInstance(CompI.nsIConverterInputStream);  
            is.init(istream, "UTF-16", 1024, 0xFFFD);  
            is.QueryInterface(CompI.nsIUnicharLineInputStream);  

            if (is instanceof CompI.nsIUnicharLineInputStream)
            {  
                var line = {};  
                var lineItems = [];
                var hasMore = false;  
                do {  
                    hasMore = is.readLine(line);  
                    if (line.value.indexOf("=") != -1)
                    {
                        lineItems = line.value.split("=");
                        if (lineItems.length == 2)
                        {
                            if (lineItems[0].indexOf(Btn_ok) != -1) // Maybe contains space
                            {
                                this.m_btnOK = lineItems[1];
                                this.m_btnOK = this.m_btnOK.trim();
                            }

                            else if (lineItems[0].indexOf(Site_Safe_tip) != -1) // Maybe contains space
                            {
                                this.m_safeTip = lineItems[1];
                                this.m_safeTip = this.m_safeTip.trim();
                            }

                            else if (lineItems[0].indexOf(Site_Risk_tip) != -1) // Maybe contains space
                            {
                                this.m_riskTip = lineItems[1];
                                this.m_riskTip = this.m_riskTip.trim();
                            }

                            else if (lineItems[0].indexOf(Protected_Off_tip) != -1) // Maybe contains space
                            {
                                this.m_offTip = lineItems[1];
                                this.m_offTip = this.m_offTip.trim();
                            }

                            else if (lineItems[0].indexOf(Site_Safe) != -1) // Maybe contains space
                            {
                                this.m_safeTitle = lineItems[1];
                                this.m_safeTitle = this.m_safeTitle.trim();
                            }

                            else if (lineItems[0].indexOf(Site_Risk) != -1) // Maybe contains space
                            {
                                this.m_riskTitle = lineItems[1];
                                this.m_riskTitle = this.m_riskTitle.trim();
                            }

                            else if (lineItems[0].indexOf(Site_Advisory) != -1) // Maybe contains space
                            {
                                this.m_advisory = lineItems[1];
                                this.m_advisory = this.m_advisory.trim();
                                this.m_advisory += " ";
                            }

                            else if (lineItems[0].indexOf(Site_Details) != -1) // Maybe contains space
                            {
                                this.m_details = lineItems[1];
                                this.m_details = this.m_details.trim();
                            }

                            else if (lineItems[0].indexOf(Risk_Title) != -1) // Maybe contains space
                            {
                                this.m_warningPageTitle = lineItems[1];
                                this.m_warningPageTitle = this.m_warningPageTitle.trim();
                            }

                            else if (lineItems[0].indexOf(Risk_recommend) != -1) // Maybe contains space
                            {
                                this.m_warningPageRecommand = lineItems[1];
                                this.m_warningPageRecommand = this.m_warningPageRecommand.trim();
                            }

                            else if (lineItems[0].indexOf(Risk_goBack) != -1) // Maybe contains space
                            {
                                this.m_warningPageGoback = lineItems[1];
                                this.m_warningPageGoback = this.m_warningPageGoback.trim();
                            }

                            else if (lineItems[0].indexOf(Risk_report) != -1) // Maybe contains space
                            {
                                this.m_warningPageReport = lineItems[1];
                                this.m_warningPageReport = this.m_warningPageReport.trim();
                            }

                            else if (lineItems[0].indexOf(Risk_continue) != -1) // Maybe contains space
                            {
                                this.m_warningPageContinue = lineItems[1];
                                this.m_warningPageContinue = this.m_warningPageContinue.trim();
                            }
                        }
                    }
  
                } while (hasMore);  
            }
        }
        catch(e) 
        {
         
        }
	},
};