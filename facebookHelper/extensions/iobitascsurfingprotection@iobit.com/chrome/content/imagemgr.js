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


var ImageMgr = {

    m_ASCImageFolderPath: null,

    m_safeSmallImgURI: null,
    m_riskSmallImgURI: null,

    m_windowRiskImgURI: null,
    m_windowSafeImgURI: null,
    m_tipDetailImgURI: null,

    m_safeLargeImgURI: null,
    m_riskLargeImgURI: null,

	init: function(ASCImageFolderPath)
	{
        if (ASCImageFolderPath == null)
        {
            return;
        }

        this.m_ASCImageFolderPath = ASCImageFolderPath;

        this.m_safeSmallImgURI = this.generateLocalImgBase64URI("safe.png");
        this.m_riskSmallImgURI = this.generateLocalImgBase64URI("risk.png");

        this.m_windowRiskImgURI = this.generateLocalImgBase64URI("window_risk.png");
        this.m_windowSafeImgURI = this.generateLocalImgBase64URI("window_safe.png");
        this.m_tipDetailImgURI = this.generateLocalImgBase64URI("tip_details.png");

        this.m_safeLargeImgURI = this.generateLocalImgBase64URI("safe_logo.png");
        this.m_riskLargeImgURI = this.generateLocalImgBase64URI("risk_logo.png");
	},

    generateLocalImgBase64URI: function(fileName)
    {
        var uri = null;

        if (fileName)
        {
            try
            {
                var imgFile = CompC["@mozilla.org/file/local;1"].createInstance(CompI.nsILocalFile);
                imgFile.initWithPath(this.m_ASCImageFolderPath + fileName);
                uri = 'data:image/jpeg;base64,' + this.loadLocalImageBase64(imgFile);
            }
            catch(e)
            {

            }
        }

        return uri;
    },

    loadLocalImageBase64: function(file)
    {
        if (file)
        {        
            var inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                                        .createInstance(CompI.nsIFileInputStream);
            inputStream.init(file, 0x01, 0600, 0);

            var stream = Components.classes["@mozilla.org/binaryinputstream;1"]
                                   .createInstance(CompI.nsIBinaryInputStream);
            stream.setInputStream(inputStream);

            return btoa(stream.readBytes(stream.available()));
        }

        return null;
    },

    generateLocalFileUrl: function(fileName)
    {
        var localFileUrl = 'file://' + this.m_ASCImageFolderPath + fileName;
//         localFileUrl = localFileUrl.replace("\\", "/", "gi");
//         localFileUrl = localFileUrl.replace(" ", "%20", "gi");
        
        localFileUrl = localFileUrl.replace("(", "%28", "gi");
        localFileUrl = localFileUrl.replace(")", "%29", "gi");

        var ioService = Components.classes["@mozilla.org/network/io-service;1"]  
                                  .getService(Components.interfaces.nsIIOService);
        var uri = ioService.newURI(localFileUrl, null, null);  

        return uri.spec;
    },
};
