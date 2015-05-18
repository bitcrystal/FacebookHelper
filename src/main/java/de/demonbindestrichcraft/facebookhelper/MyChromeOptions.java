/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import de.demonbindestrichcraft.lib.bukkit.wbukkitlib.common.files.GenerallyFileManager;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openqa.selenium.chrome.ChromeOptions;

/**
 *
 * @author ABC
 */
public class MyChromeOptions extends ChromeOptions {

    private String profilePath;
    private String userdatadir;
    private File userdataFile;
    private File profileFile;
    private ChromeOptions chromeOptions;

    public MyChromeOptions(File profileFile) {
        super();
        this.userdataFile = getDefaultRelativeFile();
        this.userdatadir = userdataFile.getAbsolutePath();
        this.profileFile = profileFile;
        this.profilePath = profileFile.getAbsolutePath();
        this.chromeOptions = new ChromeOptions();
        setProfile();
    }

    public MyChromeOptions(String profilePath) {
        super();
        this.userdataFile = getDefaultRelativeFile();
        this.userdatadir = userdataFile.getAbsolutePath();
        this.profilePath = profilePath;
        this.profileFile = new File(profilePath);
        this.chromeOptions = new ChromeOptions();
        setProfile();
    }

    public MyChromeOptions() {
        super();
        this.userdataFile = getDefaultRelativeFile();
        this.userdatadir = userdataFile.getAbsolutePath();
        this.profileFile = getDefaultProfileFile();
        this.profilePath = this.profileFile.getAbsolutePath();
        this.chromeOptions = new ChromeOptions();
        setProfile();
    }

    public MyChromeOptions(ChromeOptions chromeOptions) {
        this.userdataFile = getDefaultRelativeFile();
        this.userdatadir = userdataFile.getAbsolutePath();
        this.profileFile = getDefaultProfileFile();
        this.profilePath = this.profileFile.getAbsolutePath();
        this.chromeOptions = chromeOptions;
        setProfile();
    }

    public ChromeOptions getChromeOptions() {
        return chromeOptions;
    }

    private void setProfile() {
        //Map<String, Object> prefs = new ConcurrentHashMap<String, Object>();
        //prefs.put("ignore-autocomplete-off-autofill", 0);
        //this.setExperimentalOption("prefs", prefs);
        File file = new File(getDefaultRelativePath() + File.separator + "Local State");
        if (file.exists()) {
            try {
                List<String> list = GenerallyFileManager.AllgemeinFileReader(file);
                int length = list.size();
                for (int i = 0; i < length; i++) {
                    if (list.get(i).contains("enabled_labs_experiments")) {
                        list.set(i, "      \"enabled_labs_experiments\": [ \"autofill-sync-credential@1\", \"enable-single-click-autofill@1\", \"ignore-autocomplete-off-autofill@1\", \"show-autofill-type-predictions\" ],");
                        break;
                    }
                }
                GenerallyFileManager.FileWrite(list, file);
            } catch (IOException ex) {
                Logger.getLogger(MyChromeOptions.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        this.addArguments("user-data-dir=" + this.userdatadir, "--start-maximized");
         System.setProperty("webdriver.chrome.profile", this.profilePath);
        System.setProperty("webdriver.chrome.profile.path", this.profilePath);
    }

    public File getProfileFile() {
        return profileFile;
    }

    public String getProfilePath() {
        return profilePath;
    }

    public void setProfileFile(File profileFile) {
        this.profileFile = profileFile;
    }

    public void setProfilePath(String profilePath) {
        this.profilePath = profilePath;
    }

    public void setChromeOptions(ChromeOptions chromeOptions) {
        this.chromeOptions = chromeOptions;
    }

    @Override
    public void addArguments(String... arguments) {
        super.addArguments(arguments);
        chromeOptions.addArguments(arguments);
    }

    @Override
    public void addArguments(List<String> arguments) {
        super.addArguments(arguments);
        chromeOptions.addArguments(arguments);
    }

    @Override
    public String toString() {
        return chromeOptions.toString();
    }

    @Override
    public void setBinary(String path) {
        super.setBinary(path);
        chromeOptions.setBinary(path);
    }

    @Override
    public void setExperimentalOption(String name, Object value) {
        super.setExperimentalOption(name, value);
        chromeOptions.setExperimentalOption(name, value);
    }

    @Override
    public void setBinary(File path) {
        super.setBinary(path);
        chromeOptions.setBinary(path);
    }

    @Override
    public int hashCode() {
        return chromeOptions.hashCode();
    }

    @Override
    public Object getExperimentalOption(String name) {
        return chromeOptions.getExperimentalOption(name);
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
    }

    public static String getCAPABILITY() {
        return CAPABILITY;
    }

    @Override
    public boolean equals(Object other) {
        return chromeOptions.equals(other);
    }

    @Override
    public void addExtensions(List<File> paths) {
        super.addExtensions(paths);
        chromeOptions.addExtensions(paths);
    }

    @Override
    public void addExtensions(File... paths) {
        super.addExtensions(paths);
        chromeOptions.addExtensions(paths);
    }

    @Override
    public void addEncodedExtensions(String... encoded) {


        super.addEncodedExtensions(encoded);
        chromeOptions.addEncodedExtensions(encoded);
    }

    @Override
    public void addEncodedExtensions(List<String> encoded) {
        super.addEncodedExtensions(encoded);
        chromeOptions.addEncodedExtensions(encoded);
    }

    public static String getDefaultProfilePath() {
        File file = getDefaultProfileFile();
        if (file == null) {
            return "";
        }
        return file.getAbsolutePath();
    }

    public static File getDefaultProfileFile() {
        OSType osType = Os.getOS();
        String path = "";
        if (osType == OSType.WINDOWS) {
            path = Os.getAppData() + File.separator + "Google" + File.separator + "Chrome" + File.separator + "User Data" + File.separator;
            path = path.replaceAll("Roaming", "Local");
        } else if (osType == OSType.MAC) {
            path = Os.getAppData() + File.separator + "Google" + File.separator + "Chrome" + File.separator;
        } else {
            path = Os.getAppData() + File.separator + ".config" + File.separator + "google-chrome" + File.separator;
        }
        File file = new File(path);
        if (!file.exists()) {
            return null;
        }
        File[] listFiles = file.listFiles();
        String name;
        if (listFiles != null && listFiles.length != 0) {
            int length = listFiles.length;
            for (int i = 0; i < length; i++) {
                if (listFiles[i].isDirectory()) {
                    name = listFiles[i].getName().toLowerCase();
                    if (!name.equals("default") && !name.startsWith("profile")) {
                        continue;
                    }
                    return listFiles[i];
                }
            }
        }
        return null;
    }

    public static String getDefaultRelativePath() {
        OSType osType = Os.getOS();
        String path = "";
        if (osType == OSType.WINDOWS) {
            path = Os.getAppData() + File.separator + "Google" + File.separator + "Chrome" + File.separator + "User Data";
            path = path.replaceAll("Roaming", "Local");
        } else if (osType == OSType.MAC) {
            path = Os.getAppData() + File.separator + "Google" + File.separator + "Chrome";
        } else {
            path = Os.getAppData() + File.separator + ".config" + File.separator + "google-chrome";
        }
        return path;
    }

    public static File getDefaultRelativeFile() {
        String path = getDefaultRelativePath();
        File file = new File(path);
        if (!file.exists()) {
            return null;
        }
        return file;
    }
}
