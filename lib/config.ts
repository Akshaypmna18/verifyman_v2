import Constants from 'expo-constants';

/**
 * API Configuration
 * 
 * To override the API URL for physical devices or staging:
 * 1. Add 'EXPO_PUBLIC_API_URL=http://your-ip:8787' to a .env file
 * 2. Or update the default value below
 */

// Expo 49+ uses EXPO_PUBLIC_ prefix for environment variables
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const Config = {
  // Priority: 
  // 1. Environment Variable (EXPO_PUBLIC_API_URL)
  // 2. Localhost default (Emulator)
  apiUrl: API_URL || 'http://localhost:8787',
  
  // Helper for physical devices during local development
  // Note: Replace with your machine's IP if testing on a physical device
  // apiUrl: 'http://192.168.1.XX:8787', 
};

export const getBaseUrl = () => {
  // If running in development and we have a debugger host (physical device)
  // we might want to automatically swap localhost for the host IP.
  // But for now, explicit environment variables or defaults are safer.
  return Config.apiUrl;
};
