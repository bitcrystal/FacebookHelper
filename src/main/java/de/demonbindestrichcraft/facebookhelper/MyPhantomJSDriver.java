/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 *
 * @author ABC
 */
public class MyPhantomJSDriver {
    private PhantomJSDriver driver;
    public MyPhantomJSDriver() {
        DesiredCapabilities sCaps = new DesiredCapabilities();
        sCaps.setJavascriptEnabled(true);
          // Change "User-Agent" via page-object capabilities
        sCaps.setCapability(PhantomJSDriverService.PHANTOMJS_PAGE_SETTINGS_PREFIX + "userAgent", "Mozilla/5.0 (Windows NT 6.1; rv:10.0.11) Gecko/20100101 Firefox/10.0.11");

        // Disable "web-security", enable all possible "ssl-protocols" and "ignore-ssl-errors" for PhantomJSDriver
        sCaps.setCapability(PhantomJSDriverService.PHANTOMJS_CLI_ARGS, new String[] {
            "--web-security=false",
            "--ssl-protocol=any",
            "--ignore-ssl-errors=true",
            "--webdriver-loglevel=DEBUG"
        });
        driver = new PhantomJSDriver(sCaps);
    }
    
    public PhantomJSDriver getDriver()
    {
        return driver;
    }
    
    public static MyPhantomJSDriver getDefaultDriver()
    {
        MyPhantomJSDriver myPhantomJSDriver = new MyPhantomJSDriver();
        return myPhantomJSDriver;
    }
    
}
