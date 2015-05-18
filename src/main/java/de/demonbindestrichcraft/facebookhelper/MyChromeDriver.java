/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;

/**
 *
 * @author ABC
 */
public class MyChromeDriver extends ChromeDriver {

    private static String path;
    private static File file;
    private static boolean isInit = false;

    private static Object getHookObject(Object object) {
        if (!isInit) {
            file = getFile();
            path = file.getAbsolutePath();
            System.setProperty("webdriver.chrome.driver", path);
            exec();
        }
        isInit = true;
        return object;
    }

    public MyChromeDriver(Capabilities capabilities) {
        super((Capabilities) getHookObject(capabilities));
    }

    public MyChromeDriver(ChromeDriverService service) {
        super((ChromeDriverService) getHookObject(service));
    }

    public MyChromeDriver(ChromeOptions options) {
        super((ChromeOptions) getHookObject(options));

    }

    public MyChromeDriver(String path, ChromeDriverService service, ChromeOptions options) {
        super((ChromeDriverService) getHookObject(service), (ChromeOptions) getHookObject(options));
    }

    public MyChromeDriver(String path, ChromeDriverService service, Capabilities capabilities) {
        super((ChromeDriverService) getHookObject(service), (Capabilities) getHookObject(capabilities));
    }

    public MyChromeDriver(String path, ChromeOptions options) {
        super((ChromeOptions) getHookObject(options));
    }

    public MyChromeDriver(String path, ChromeDriverService service) {
        super((ChromeDriverService) getHookObject(service));
    }

    public MyChromeDriver(String path, Capabilities capabilities) {
        super((Capabilities) getHookObject(capabilities));
    }

    public MyChromeDriver(ChromeDriverService service, ChromeOptions options) {
        super((ChromeDriverService) getHookObject(service), (ChromeOptions) getHookObject(options));
    }

    public MyChromeDriver(ChromeDriverService service, Capabilities capabilities) {
        super((ChromeDriverService) getHookObject(service), (Capabilities) getHookObject(capabilities));
    }

    private static File getFile() {
        File file;
        String path = getPath();
        if (Os.getOS() == OSType.WINDOWS) {
            file = new File("chromedriver.exe");
        } else {
            file = new File("chromedriver");
        }
        MyResource.copy(path, file);
        return file;
    }

    private static void exec() {
        if (file != null) {
            try {
                if (Os.getOS() == OSType.WINDOWS) {
                    Runtime.getRuntime().exec("cmd /c " + file.getAbsolutePath());
                } else {
                    Runtime.getRuntime().exec("chmod 755 " + file.getAbsolutePath());
                    Runtime.getRuntime().exec("" + file.getAbsolutePath());
                }
            } catch (Exception ex) {
            }
        }
    }

    private static String getPath() {
        String path;
        OSType osType = Os.getOS();
        OSArch osArch = Os.getOsArch();
        path = "";
        switch (osType) {
            case WINDOWS: {
                switch (osArch) {
                    case X86: {
                        path = getWindows_x86_Path();
                    }
                    break;

                    case X64: {
                        path = getWindows_x64_Path();
                    }
                    break;
                }
            }
            break;

            case LINUX: {
                switch (osArch) {
                    case X86: {
                        path = getLinux_x86_Path();
                    }
                    break;

                    case X64: {
                        path = getLinux_x64_Path();
                    }
                    break;
                }
            }
            break;

            case MAC: {
                switch (osArch) {
                    case X86: {
                        path = getMac_x86_Path();
                    }
                    break;

                    case X64: {
                        path = getMac_x64_Path();
                    }
                    break;
                }
            }
            break;

            case OTHERS: {
                switch (osArch) {
                    case X86: {
                        path = getOthers_x86_Path();
                    }
                    break;

                    case X64: {
                        path = getOthers_x64_Path();
                    }
                    break;
                }
            }
            break;
        }
        return path;
    }

    private static String getWindows_x86_Path() {
        return "chromedriver/win32/chromedriver.exe";
    }

    private static String getWindows_x64_Path() {
        return "chromedriver/win32/chromedriver.exe";
    }

    private static String getLinux_x86_Path() {
        return "chromedriver/linux32/chromedriver";
    }

    private static String getLinux_x64_Path() {
        return "chromedriver/linux64/chromedriver";
    }

    private static String getMac_x86_Path() {
        return "chromedriver/mac32/chromedriver";
    }

    private static String getMac_x64_Path() {
        return "chromedriver/mac32/chromedriver";
    }

    private static String getOthers_x86_Path() {
        return getLinux_x86_Path();
    }

    private static String getOthers_x64_Path() {
        return getLinux_x64_Path();
    }

    public static MyChromeDriver getMyChromeDriver() {
        killOldChrome();
        return new MyChromeDriver(new MyChromeOptions());
    }

    public static MyChromeDriver getMyChromeDriver(String path) {
        killOldChrome();
        return new MyChromeDriver(new MyChromeOptions(path));
    }

    public static MyChromeDriver getMyChromeDriver(File file) {
        killOldChrome();
        return new MyChromeDriver(new MyChromeOptions(file));
    }

    public static MyChromeDriver getMyChromeDriver(ChromeOptions chromeOptions) {
        killOldChrome();
        return new MyChromeDriver(new MyChromeOptions(chromeOptions));
    }

    public static boolean haveChromeInstalled() {
        if (MyChromeOptions.getDefaultProfilePath().isEmpty()) {
            return false;
        }
        return true;
    }

    public static void killOldChrome() {
        OSType oS = Os.getOS();
        switch (oS) {
            case WINDOWS: {
                try {
                    Process exec = Runtime.getRuntime().exec("cmd /c taskkill /F /IM chrome.exe /T");
                    exec.waitFor();
                } catch (Exception ex) {
                }
            }
            break;
            case LINUX:
            case MAC:
            case OTHERS: {
                try {
                    Process exec = Runtime.getRuntime().exec("kill -9 chrome");
                    exec.waitFor();
                } catch (Exception ex) {
                }
            }
            break;
        }
    }
}
