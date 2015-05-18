/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import de.demonbindestrichcraft.lib.bukkit.wbukkitlib.common.files.GenerallyFileManager;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ABC
 */
public class JreFix {
    private boolean isFixxed;
    private boolean isAlreadyFixxed;
    public JreFix()
    {
        isFixxed=false;
        isAlreadyFixxed=false;
        String appData = Os.getAppData();
        if(appData.lastIndexOf("Roaming")>=0)
            appData=appData.replaceAll("Roaming", "LocalLow");
        String deployment = appData + File.separator + "Sun" + File.separator + "Java" + File.separator + "Deployment";
        String properties = "deployment.properties";
        File file = new File(deployment + File.separator + properties);
        if(file.exists())
        {
            Map<String, String> AllgemeinFileReader = GenerallyFileManager.AllgemeinFileReader(file, "=");
            File loc = null;
            if(AllgemeinFileReader.containsKey("deployment.javaws.jre.0.path"))
            {
                String get = AllgemeinFileReader.get("deployment.javaws.jre.0.path");
                String s = "";
                boolean isWindows = get.startsWith("C\\")||get.startsWith("D\\")||get.startsWith("E\\");

                if(isWindows)
                {
                    s="=C\\:\\\\jre7\\\\bin\\\\javaw.exe";
                    loc = new File("C:\\jre7");
                } else {
                    s="/jre7/bin/javaw";
                    loc = new File("/jre7");
                }
                if(get.equals(s))
                {
                    isAlreadyFixxed=true;
                    return;
                }
                loc.mkdirs();
                AllgemeinFileReader.put(get, s);
                GenerallyFileManager.FileWrite(AllgemeinFileReader, file, "=");
            }
            InputStream stream = null;
            try {
                stream = MyResource.getStream("jre7.zip");
                UnzipUtility.unzip(stream, loc.getAbsolutePath());
                isFixxed=true;
            } catch (Exception ex) {
               if(stream!=null)
               {
                    try {
                        stream.close();
                    } catch (Exception ex1) {
                    }
                    stream = null;
               }
               isFixxed=false;
            }
        } else {
            isFixxed=false;
        }
    }
    
    public boolean isFixxed()
    {
        return isFixxed;
    }
    
    public boolean isAlreadyFixxed()
    {
        return isAlreadyFixxed;
    }
}
