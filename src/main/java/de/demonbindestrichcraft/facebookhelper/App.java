package de.demonbindestrichcraft.facebookhelper;

/**
 * Hello world!
 *
 */
import java.io.File;
import java.util.Iterator;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;
import org.openqa.selenium.By;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.firefox.internal.ProfilesIni;
import org.openqa.selenium.remote.RemoteWebDriver;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import javax.swing.*;
import org.openqa.selenium.phantomjs.PhantomJSDriver;

public class App {

    public static void start() {
        //FirefoxProfile profile = new FirefoxProfile(new File("facebookHelper"));
        //WebDriver driver = new FirefoxDriver(profile);
        WebDriver driver = MyWebDriver.getDefaultDriver();
        PhantomJSDriver ps = new PhantomJSDriver();
        /*
        Set<Cookie> cookies = driver.manage().getCookies();
        int length = cookies.size();
        Cookie[] mycookies = new Cookie[length];
        Iterator<Cookie> iterator = cookies.iterator();
        Cookie next = null;
        if (iterator.hasNext()) {
            next = iterator.next();
            mycookies[0] = next;
        }
        for (int i = 1; iterator.hasNext()&&i<length; i++) {
            next = iterator.next();
            mycookies[i] = next;
        }
        
        HtmlUnitDriver htmlUnitDriver = new HtmlUnitDriver(MyBrowserVersion.FIREFOX_10);
        
        java.util.logging.Logger.getLogger("com.gargoylesoftware.htmlunit").setLevel(Level.ALL);
        htmlUnitDriver.setJavascriptEnabled(true);
        driver = htmlUnitDriver;
        for (Cookie cookie : mycookies) {
            if (cookie != null) {
                driver.manage().addCookie(cookie);
            }
        }
        cookies=null;*/
        File file = new File("fblink.cfg");
        String fblink = MyResource.loadStringOutResoutce("fblink.cfg", file, "fblink");
        if (fblink.isEmpty()) {
            try {
                driver.quit();
                driver.close();
                return;
            } catch (Exception ex) {
                return;
            }
        }
        file.delete();
        driver.get("https://facebook.com");
        WebElement findElementPass = null;
        WebElement checked = null;
        WebElement loggedIn = null;
        for (int i = 0; i < 150; i++) {
            try {
                loggedIn = driver.findElement(By.id("findFriendsNav"));
            } catch (Throwable ex) {
                loggedIn = null;
            }
            if (loggedIn != null) {
                break;
            }
            try {
                findElementPass = driver.findElement(By.id("pass"));
            } catch (Throwable ex) {
                findElementPass = null;
            }
            try {
                checked = driver.findElement(By.id("persist_box"));
            } catch (Throwable ex) {
                checked = null;
            }

            if (findElementPass != null && checked != null) {
                break;
            }
            try {
                Thread.sleep(500);
            } catch (InterruptedException ex) {
            }
        }
        String currentUrl = "";
        if (loggedIn == null) {
            if (findElementPass == null || checked == null) {
                //System.out.println("xd");
                try {
                    driver.quit();
                    driver.close();
                } catch (Exception ex) {
                }
                return;
            }

            if (!checked.isSelected()) {
                checked.sendKeys(Keys.SPACE);
            } else {
            }

            WebElement findElement = null;
            for (int i = 0; i < 150; i++) {
                try {
                    findElement = driver.findElement(By.id("u_0_l"));
                } catch (Throwable ex) {
                    findElement = null;
                }
                if (findElement != null) {
                    break;
                }
                try {
                    Thread.sleep(500);
                } catch (InterruptedException ex) {
                }
            }
            if (findElement == null) {
                System.out.println("xd10");
                return;
            }
            boolean set = findElementPass.getAttribute("value") == null;
            if (set) {
                System.out.println("setted");
                return;
            }

            currentUrl = driver.getCurrentUrl();
            try {
                while (findElementPass.getAttribute("value").isEmpty()) {
                    JOptionPane.showMessageDialog(null, "You have 50 seconds in order to login to facebook!");
                    try {
                        Thread.sleep(50000L);
                    } catch (InterruptedException ex) {
                    }
                }
                try {
                    if (currentUrl.equals(driver.getCurrentUrl())) {
                        findElement.click();
                    } else {
                        currentUrl = "";
                    }
                } catch (Throwable ex) {
                }
            } catch (Throwable ex) {
                currentUrl = "";
            }

            while (currentUrl.equals(driver.getCurrentUrl())) {
                try {
                    Thread.sleep(500);
                } catch (InterruptedException ex) {
                }
            }
        }
        String url = fblink;
        driver.get(url);
        WebElement element = null;
        for (int i = 0; i < 150; i++) {
            if (driver.getCurrentUrl().contains("?code=")) {
                try {
                    Thread.sleep(1500);
                } catch (InterruptedException ex) {
                }
                break;
            }
            try {
                element = driver.findElement(By.name("__CONFIRM__"));
            } catch (Throwable ex) {
                element = null;
            }
            if (element != null) {
                break;
            }
            try {
                Thread.sleep(500);
            } catch (InterruptedException ex) {
            }
        }
        if (element == null) {
            //System.out.println("x1100");
            try {
                driver.quit();
                driver.close();
            } catch (Exception ex) {
            }
            return;
        }
        currentUrl = driver.getCurrentUrl();
        element.click();
        while (currentUrl.equals(driver.getCurrentUrl())) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException ex) {
            }
        }
        // Check the title of the page
        //System.out.println("Page title is: " + driver.getTitle());
        try {
            driver.quit();
            driver.close();
        } catch (Exception ex) {
        }
    }

    public static void main(String[] args) {
        start();
    }
}
