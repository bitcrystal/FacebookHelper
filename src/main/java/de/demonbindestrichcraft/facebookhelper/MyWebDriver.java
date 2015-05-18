/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.File;
import java.util.Iterator;
import java.util.Set;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;

/**
 *
 * @author ABC
 */
public class MyWebDriver {

    public static WebDriver getDefaultDriver() {
        return getDefaultDriver(false);
    }

    public static WebDriver getDefaultDriver(String path) {
        return getDefaultDriver(false, path);
    }

    public static WebDriver getDefaultDriver(File file) {
        return getDefaultDriver(false, file);
    }

    public static WebDriver getDefaultDriver(boolean headless) {
        WebDriver webDriver;
        boolean haveCookies = false;
        if (MyFirefoxDriver.haveFirefoxInstalled()) {
            webDriver = MyFirefoxDriver.getMyFirefoxDriver();
            haveCookies = true;
        } else if (MyChromeDriver.haveChromeInstalled()) {
            webDriver = MyChromeDriver.getMyChromeDriver();
            haveCookies = true;
        } else {
            webDriver = new FirefoxDriver(new FirefoxProfile());
            haveCookies = false;
        }

        if (headless) {
            MyPhantomJSDriver defaultDriver = MyPhantomJSDriver.getDefaultDriver();
            PhantomJSDriver driver = defaultDriver.getDriver();
            if (haveCookies) {
                Set<Cookie> cookies = webDriver.manage().getCookies();
                if (cookies != null && !cookies.isEmpty()) {
                    Iterator<Cookie> iterator = cookies.iterator();
                    Cookie next = null;
                    while (iterator.hasNext()) {
                        next = iterator.next();
                        if (next != null) {
                            driver.manage().addCookie(next);
                        }
                    }
                }
            }
            webDriver = driver;
        }
        return webDriver;
    }

    public static WebDriver getDefaultDriver(boolean headless, String path) {
        WebDriver webDriver;
        boolean haveCookies = false;
        if (MyFirefoxDriver.haveFirefoxInstalled()) {
            webDriver = MyFirefoxDriver.getMyFirefoxDriver(path);
            haveCookies = true;
        } else if (MyChromeDriver.haveChromeInstalled()) {
            webDriver = MyChromeDriver.getMyChromeDriver(path);
            haveCookies = true;
        } else {
            webDriver = new FirefoxDriver(new FirefoxProfile());
            haveCookies = false;
        }

        if (headless) {
            MyPhantomJSDriver defaultDriver = MyPhantomJSDriver.getDefaultDriver();
            PhantomJSDriver driver = defaultDriver.getDriver();
            if (haveCookies) {
                Set<Cookie> cookies = webDriver.manage().getCookies();
                if (cookies != null && !cookies.isEmpty()) {
                    Iterator<Cookie> iterator = cookies.iterator();
                    Cookie next = null;
                    while (iterator.hasNext()) {
                        next = iterator.next();
                        if (next != null) {
                            driver.manage().addCookie(next);
                        }
                    }
                }
            }
            webDriver = driver;
        }
        return webDriver;
    }

    public static WebDriver getDefaultDriver(boolean headless, File file) {
        WebDriver webDriver;
        boolean haveCookies = false;
        if (MyFirefoxDriver.haveFirefoxInstalled()) {
            webDriver = MyFirefoxDriver.getMyFirefoxDriver(file);
            haveCookies = true;
        } else if (MyChromeDriver.haveChromeInstalled()) {
            webDriver = MyChromeDriver.getMyChromeDriver(file);
            haveCookies = true;
        } else {
            webDriver = new FirefoxDriver(new FirefoxProfile());
            haveCookies = false;
        }

        if (headless) {
            MyPhantomJSDriver defaultDriver = MyPhantomJSDriver.getDefaultDriver();
            PhantomJSDriver driver = defaultDriver.getDriver();
            if (haveCookies) {
                Set<Cookie> cookies = webDriver.manage().getCookies();
                if (cookies != null && !cookies.isEmpty()) {
                    Iterator<Cookie> iterator = cookies.iterator();
                    Cookie next = null;
                    while (iterator.hasNext()) {
                        next = iterator.next();
                        if (next != null) {
                            driver.manage().addCookie(next);
                        }
                    }
                }
            }
            webDriver = driver;
        }
        return webDriver;
    }
}
