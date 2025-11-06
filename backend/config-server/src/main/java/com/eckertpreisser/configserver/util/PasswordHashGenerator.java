package com.eckertpreisser.configserver.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * PasswordHashGenerator - Utility to generate BCrypt password hashes
 *
 * Usage: Run this main method with your desired password to get the hash.
 * Then copy the hash to application.yml
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
public class PasswordHashGenerator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Change this to your desired password
        String password = "EckertPreisser2025!";

        // Generate hash
        String hash = encoder.encode(password);

        System.out.println("=====================================");
        System.out.println("Password Hash Generator");
        System.out.println("=====================================");
        System.out.println("Password: " + password);
        System.out.println("Hash:     " + hash);
        System.out.println("=====================================");
        System.out.println();
        System.out.println("Add this to application.yml:");
        System.out.println("config:");
        System.out.println("  auth:");
        System.out.println("    username: admin");
        System.out.println("    password: " + hash);
        System.out.println("=====================================");
    }
}
