/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.firefox.internal.Extension;

/**
 *
 * @author ABC
 */
public class MyFirefoxProfile extends FirefoxProfile {

    private FirefoxProfile firefoxProfile;
    private File file;

    public MyFirefoxProfile() {
        super(getDefaultProfileFile());
        file = getDefaultProfileFile();
        loadUserJS(file);
        firefoxProfile = getDefaultProfile();
        setProfile(file);
    }

    public MyFirefoxProfile(FirefoxProfile profile) {
        super(profile.layoutOnDisk());
        firefoxProfile = profile;
        file = profile.layoutOnDisk();
        loadUserJS(file);
        setProfile(file);
    }

    public MyFirefoxProfile(FirefoxProfile profile, File file) {
        super(file);
        this.file = file;
        loadUserJS(file);
        firefoxProfile = profile;
        setProfile(file);
    }

    public MyFirefoxProfile(FirefoxProfile profile, String path) {
        super(new File(path));
        this.file = new File(path);
        loadUserJS(file);
        firefoxProfile = profile;
        setProfile(path);
    }

    public MyFirefoxProfile(String path) {
        this(new File(path));
        this.file = new File(path);
        loadUserJS(file);
        firefoxProfile = new FirefoxProfile(new File(path));
        setProfile(path);
    }

    public MyFirefoxProfile(File file) {
        super(file);
        this.file = file;
        loadUserJS(file);
        firefoxProfile = new FirefoxProfile(file);
        setProfile(file);
    }

    public MyFirefoxProfile(Reader defaultsReader, File profileDir) {
        super(defaultsReader, profileDir);
        this.file = profileDir;
        loadUserJS(file);
        firefoxProfile = new FirefoxProfile(profileDir);
        setProfile(profileDir);
    }

    public MyFirefoxProfile(FirefoxProfile firefoxProfile, Reader defaultsReader, File profileDir) {
        this.file = profileDir;
        loadUserJS(file);
        this.firefoxProfile = new FirefoxProfile(profileDir);
        setProfile(profileDir);
    }

    @Override
    public void addExtension(File extensionToInstall) throws IOException {
        super.addExtension(extensionToInstall);
        firefoxProfile.addExtension(extensionToInstall);
    }

    @Override
    public void addExtension(String key, Extension extension) {
        super.addExtension(key, extension);
        firefoxProfile.addExtension(key, extension);
    }

    @Override
    public void setEnableNativeEvents(boolean enableNativeEvents) {
        super.setEnableNativeEvents(enableNativeEvents);
        firefoxProfile.setEnableNativeEvents(enableNativeEvents);
    }

    public void setFirefoxProfile(FirefoxProfile firefoxProfile) {
        this.firefoxProfile = firefoxProfile;
        setProfile();
    }

    @Override
    public void setPreference(String key, String value) {
        super.setPreference(key, value);
        firefoxProfile.setPreference(key, value);
    }

    @Override
    public void setPreference(String key, boolean value) {
        super.setPreference(key, value);
        firefoxProfile.setPreference(key, value);
    }

    @Override
    public void setPreference(String key, int value) {
        super.setPreference(key, value);
        firefoxProfile.setPreference(key, value);
    }

    @Override
    public boolean shouldLoadNoFocusLib() {
        return firefoxProfile.shouldLoadNoFocusLib();
    }

    @Override
    public String toJson() throws IOException {
        return firefoxProfile.toJson();
    }

    @Override
    public String toString() {
        return firefoxProfile.toString();
    }

    @Override
    public void updateUserPrefs(File userPrefs) {
        super.updateUserPrefs(userPrefs);
        firefoxProfile.updateUserPrefs(userPrefs);
    }

    @Override
    public void setAssumeUntrustedCertificateIssuer(boolean untrustedIssuer) {
        super.setAssumeUntrustedCertificateIssuer(untrustedIssuer);
        firefoxProfile.setAssumeUntrustedCertificateIssuer(untrustedIssuer);
    }

    @Override
    public void setAlwaysLoadNoFocusLib(boolean loadNoFocusLib) {
        super.setAlwaysLoadNoFocusLib(loadNoFocusLib);
        firefoxProfile.setAlwaysLoadNoFocusLib(loadNoFocusLib);
    }

    @Override
    public void setAcceptUntrustedCertificates(boolean acceptUntrustedSsl) {
        super.setAcceptUntrustedCertificates(acceptUntrustedSsl);
        firefoxProfile.setAcceptUntrustedCertificates(acceptUntrustedSsl);
    }

    @Override
    public File layoutOnDisk() {
        return firefoxProfile.layoutOnDisk();
    }

    @Override
    public int hashCode() {
        return firefoxProfile.hashCode();
    }

    public static String getPORT_PREFERENCE() {
        return PORT_PREFERENCE;
    }

    @Override
    public int getIntegerPreference(String key, int defaultValue) {
        return firefoxProfile.getIntegerPreference(key, defaultValue);
    }

    public FirefoxProfile getFirefoxProfile() {
        return firefoxProfile;
    }

    public static String getALLOWED_HOSTS_PREFERENCE() {
        return ALLOWED_HOSTS_PREFERENCE;
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
    }

    @Override
    public boolean equals(Object obj) {
        return firefoxProfile.equals(obj);
    }

    @Override
    protected void deleteLockFiles(File profileDir) {
        super.deleteLockFiles(profileDir);
    }

    @Override
    public void deleteExtensionsCacheIfItExists(File profileDir) {
        super.deleteExtensionsCacheIfItExists(profileDir);
        firefoxProfile.deleteExtensionsCacheIfItExists(profileDir);
    }

    @Override
    protected void copyModel(File sourceDir, File profileDir) throws IOException {
        super.copyModel(sourceDir, profileDir);
    }

    @Override
    public boolean containsWebDriverExtension() {
        return firefoxProfile.containsWebDriverExtension();
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    @Override
    protected void cleanTemporaryModel() {
        super.cleanTemporaryModel();
    }

    @Override
    public void clean(File profileDir) {
        super.clean(profileDir);
        firefoxProfile.clean(profileDir);
    }

    @Override
    public boolean areNativeEventsEnabled() {
        return firefoxProfile.areNativeEventsEnabled();
    }

    @Override
    public void addExtension(Class<?> loadResourcesUsing, String loadFrom) throws IOException {
        super.addExtension(loadResourcesUsing, loadFrom);
        firefoxProfile.addExtension(loadResourcesUsing, loadFrom);
    }

    private void setProfile() {
        setProfile(firefoxProfile.layoutOnDisk());
    }

    private void setProfile(String path) {
        setProfile(new File(path));
    }

    private void setProfile(File file) {
        if (!file.exists()) {
            file.mkdirs();
        }
        this.setAcceptUntrustedCertificates(true);
        this.setPreference("signon.importedFromSqlite", true);
        this.setPreference("services.sync.prefs.sync.signon.rememberSignons", true);
        this.setPreference("security.ask_for_password", "0");
        this.setPreference("plugin.importedState", true);
        this.setPreference("browser.download.importedFromSqlite", true);
        this.setPreference("network.proxy.type", 0);
        System.setProperty("webdriver.firefox.profile", file.getAbsolutePath());
    }

    public final FirefoxProfile getDefaultProfile() {
        File file = getDefaultProfileFile();
        if (file == null) {
            file = new File("selenium");
            file.mkdir();
        }
        return new FirefoxProfile(file);
    }

    public static String getDefaultProfilePath() {
        File file = getDefaultProfileFile();
        if (file == null) {
            return "";
        }
        return file.getAbsolutePath();
    }

    public static void loadUserJS(File profileFile) {
        //System.out.println(profileFile.getAbsolutePath());
        if (!profileFile.exists()) {
            return;
        }
        File file = new File(profileFile.getAbsolutePath() + File.separator + "user.js");
        //System.out.println(file.getAbsolutePath());
        MyResource.copyAndRenew("user.js", file);
    }

    public static File getDefaultProfileFile() {
        OSType osType = Os.getOS();
        String path = "";
        if (osType == OSType.WINDOWS) {
            path = Os.getAppData() + File.separator + "Mozilla" + File.separator + "Firefox" + File.separator + "Profiles" + File.separator;
        } else if (osType == OSType.MAC) {
            path = Os.getAppData() + File.separator + "Mozilla" + File.separator + "Firefox" + File.separator + "Profiles" + File.separator;
        } else {
            path = Os.getAppData() + File.separator + "mozilla" + File.separator + "firefox" + File.separator;
        }
        File file = new File(path);
        if (!file.exists()) {
            return null;
        }
        File[] listFiles = file.listFiles();
        if (listFiles != null && listFiles.length != 0) {
            int length = listFiles.length;
            for (int i = 0; i < length; i++) {
                if (listFiles[i].isDirectory()) {
                    return listFiles[i];
                }
            }
        }
        return null;
    }
}
