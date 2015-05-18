/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.File;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

/**
 *
 * @author ABC
 */
public class MyWebDriver {

    public static WebDriver getDefaultDriver() {
        if (MyFirefoxDriver.haveFirefoxInstalled()) {
            return MyFirefoxDriver.getMyFirefoxDriver();
        }
        if (MyChromeDriver.haveChromeInstalled()) {
            return MyChromeDriver.getMyChromeDriver();
        }
        return new FirefoxDriver(new FirefoxProfile());
    }

    public static WebDriver getDefaultDriver(String path) {
        if (MyFirefoxDriver.haveFirefoxInstalled()) {
            return MyFirefoxDriver.getMyFirefoxDriver(path);
        }
        if (MyChromeDriver.haveChromeInstalled()) {
            return MyChromeDriver.getMyChromeDriver(path);
        }
        return new FirefoxDriver(new FirefoxProfile());
    }

    public static WebDriver getDefaultDriver(File file) {
        if (MyFirefoxDriver.haveFirefoxInstalled()) {
            return MyFirefoxDriver.getMyFirefoxDriver(file);
        }
        if (MyChromeDriver.haveChromeInstalled()) {
            return MyChromeDriver.getMyChromeDriver(file);
        }
        return new FirefoxDriver(new FirefoxProfile());
    }
}
