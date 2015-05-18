package de.demonbindestrichcraft.facebookhelper;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


import de.demonbindestrichcraft.lib.bukkit.wbukkitlib.common.files.ConcurrentConfig;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ABC
 */
public class MyResource {
        
    public static String loadStringOutResoutce(String path, File fullDestFile, String key)
    {
        ConcurrentConfig config = loadResource(path, fullDestFile);
        if(config==null)
            return "";
        Map<String, String> copyOfProperties = config.getCopyOfProperties();
        if(copyOfProperties.containsKey(key))
            return copyOfProperties.get(key);
        return "";
    }
    
    public static String loadStringOutResoutceAndRenew(String path, File fullDestFile, String key)
    {
        ConcurrentConfig config = loadResourceAndRenew(path, fullDestFile);
        if(config==null)
            return "";
        Map<String, String> copyOfProperties = config.getCopyOfProperties();
        if(copyOfProperties.containsKey(key))
            return copyOfProperties.get(key);
        return "";
    }
    
    public static ConcurrentConfig loadResourceAndRenew(String path, File fullDestFile)
     {
        File copy = copy(path, fullDestFile);
        if(copy==null)
            return null;
        if(copy.exists())
        {
            copy.delete();
        }
        return loadResource(path, fullDestFile);
     }
    
     public static ConcurrentConfig loadResource(String path, File fullDestFile)
     {
        File copy = copy(path, fullDestFile);
        if(copy==null)
            return null;
        ConcurrentConfig config = new ConcurrentConfig(copy);
        config.load(copy, "=");
        return config;
     }
    
     public static File copyAndRenew(String path, File fullDestFile) {
         if(fullDestFile.exists())
             fullDestFile.delete();
         return copy(path, fullDestFile);
     }
    
    public static File copy(String path, File fullDestFile) {
        InputStream inputStream = MyResource.class.getResourceAsStream(path);
        if (inputStream == null) {
            return null;
        }

        File file = fullDestFile;
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException ex) {
                Logger.getLogger(MyResource.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            return file;
        }

        OutputStream outputStream = null;

        try {
            outputStream = new FileOutputStream(file);
        } catch (FileNotFoundException ex) {
            if (outputStream != null) {
                try {
                    outputStream.close();
                    outputStream = null;
                } catch (IOException ex1) {
                    outputStream = null;
                }
            }
        }
        if (outputStream == null) {
            return null;
        }
        int b = 0;
        try {
            while (true) {
                b = inputStream.read();
                if (b == -1) {
                    break;
                }
                outputStream.write(b);
            }
        } catch (Exception ex) {
        } finally {
            try {
                inputStream.close();
                inputStream = null;
            } catch (IOException ex) {
                Logger.getLogger(MyResource.class.getName()).log(Level.SEVERE, null, ex);
            }
            try {
                outputStream.close();
                outputStream = null;
            } catch (IOException ex) {
                Logger.getLogger(MyResource.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return file;
    }
    
    public static InputStream getStream(String path)
    {
        InputStream inputStream = MyResource.class.getResourceAsStream(path);
        return inputStream;
    }
}
