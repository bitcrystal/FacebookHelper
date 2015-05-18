/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.File;
import java.io.IOException;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

/**
 *
 * @author ABC
 */
public class MyFirefoxDriver extends FirefoxDriver {

    public MyFirefoxDriver() {
        super();
    }

    public MyFirefoxDriver(Capabilities desiredCapabilities) {
        super(desiredCapabilities);
    }

    public MyFirefoxDriver(FirefoxProfile profile) {
        super(profile);
    }

    public MyFirefoxDriver(Capabilities desiredCapabilities, Capabilities requiredCapabilities) {
        super(desiredCapabilities, requiredCapabilities);
    }

    public MyFirefoxDriver(FirefoxBinary binary, FirefoxProfile profile) {
        super(binary, profile);
    }

    public MyFirefoxDriver(FirefoxBinary binary, FirefoxProfile profile, Capabilities capabilities) {
        super(binary, profile, capabilities);
    }

    public MyFirefoxDriver(FirefoxBinary binary, FirefoxProfile profile, Capabilities desiredCapabilities, Capabilities requiredCapabilities) {
        super(binary, profile, desiredCapabilities, requiredCapabilities);
    }

    public static MyFirefoxDriver getMyFirefoxDriver() {
        return new MyFirefoxDriver(new MyFirefoxProfile());
    }

    public static MyFirefoxDriver getMyFirefoxDriver(String path) {
        return new MyFirefoxDriver(new MyFirefoxProfile(path));
    }

    public static MyFirefoxDriver getMyFirefoxDriver(File file) {
        return new MyFirefoxDriver(new MyFirefoxProfile(file));
    }

    public static MyFirefoxDriver getMyFirefoxDriver(FirefoxProfile firefoxProfile) {
        return new MyFirefoxDriver(new MyFirefoxProfile(firefoxProfile));
    }

    public static boolean haveFirefoxInstalled() {
        if (MyFirefoxProfile.getDefaultProfilePath().isEmpty()) {
            return false;
        }
        return true;
    }

    public static void killOldFirefox() {
        OSType oS = Os.getOS();
        switch (oS) {
            case WINDOWS: {
                try {
                    Process exec = Runtime.getRuntime().exec("cmd /c taskkill /F /IM firefox.exe /T");
                    exec.waitFor();
                } catch (Exception ex) {
                }
            }
            break;
            case LINUX:
            case MAC:
            case OTHERS: {
                try {
                    Process exec = Runtime.getRuntime().exec("kill -9 firefox");
                    exec.waitFor();
                } catch (Exception ex) {
                }
            }
            break;
        }
    }
}
