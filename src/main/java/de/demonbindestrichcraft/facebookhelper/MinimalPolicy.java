/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

import java.io.FilePermission;
import java.net.SocketPermission;
import java.security.AllPermission;
import java.security.CodeSource;
import java.security.PermissionCollection;
import java.security.Policy;
import java.security.ProtectionDomain;
import java.util.PropertyPermission;

/**
 *
 * @author ABC
 */
public class MinimalPolicy extends Policy {

    private static PermissionCollection perms;

    public MinimalPolicy() {
        super();
        if (perms == null) {
            perms = new MyPermissionCollection();
            addPermissions();
        }
    }

    @Override
    public PermissionCollection getPermissions(ProtectionDomain domain) {
        return perms;
    }

    @Override
    public PermissionCollection getPermissions(CodeSource codesource) {
        return perms;
    }

    private void addPermissions() {
        AllPermission allPermission = new AllPermission();
        //SocketPermission socketPermission = new SocketPermission("*:1024-", "connect, resolve");
       // PropertyPermission propertyPermission = new PropertyPermission("*", "read, write");
       // FilePermission filePermission = new FilePermission("<<ALL FILES>>", "read");

       // perms.add(socketPermission);
       // perms.add(propertyPermission);
       // perms.add(filePermission);
        
        perms.add(allPermission);
    }

}