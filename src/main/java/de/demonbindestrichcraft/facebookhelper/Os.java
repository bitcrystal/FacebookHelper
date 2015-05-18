/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.File;

/**
 *
 * @author ABC
 */
public class Os {

    private static String OS = System.getProperty("os.name").toLowerCase();

    public static OSType getOS() {
        if (isWindows()) {
            return OSType.WINDOWS;
        } else if (isMac()) {
            return OSType.LINUX;
        } else if (isUnix()) {
            return OSType.MAC;
        } else {
            return OSType.OTHERS;
        }
    }

    public static OSArch getOsArch() {
        boolean is64bit = false;
        OSType osType = getOS();
        switch (osType) {
            case WINDOWS: {
                is64bit = (System.getenv("ProgramFiles(x86)") != null);
            }
            break;

            case LINUX:
            case MAC:
            case OTHERS: {
                is64bit = (System.getProperty("os.arch").indexOf("64") != -1);
            }
            break;
        }
        
        if(is64bit)
            return OSArch.X64;
        else
            return OSArch.X86;
    }

    public static String getCorrectAppData()
    {
        OSType osType = getOS();
        String path="";
        switch(osType)
        {
            case WINDOWS:
            {
                path = System.getenv("APPDATA");
            }
            break;
            
            case LINUX:
            {
                path = System.getProperty("user.home") + File.separator + ".local" + File.separator + "share";
            }
                
            case MAC:
            {
                path = System.getProperty("user.home") + File.separator + "Library" + File.separator + "Application Support";
            }
                
            case OTHERS:
            {
                path =  System.getProperty("user.home");
            }
        }
        
        return path;
    }
    
    public static String getAppData()
    {
        OSType osType = getOS();
        String path="";
        switch(osType)
        {
            case WINDOWS:
            {
                path = System.getenv("APPDATA");
            }
            break;
            
            case LINUX:
            {
                path = System.getProperty("user.home");
            }
                
            case MAC:
            {
                path = System.getProperty("user.home") + File.separator + "Library" + File.separator + "Application Support";
            }
                
            case OTHERS:
            {
                path =  System.getProperty("user.home");
            }
        }
        
        return path;
    }
    
    private static boolean isWindows() {
        return (OS.indexOf("win") >= 0);
    }

    private static boolean isMac() {
        return (OS.indexOf("mac") >= 0);
    }

    private static boolean isUnix() {
        return (OS.indexOf("nux") >= 0);
    }
}
