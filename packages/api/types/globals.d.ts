// Global type declarations for SlipUp mobile Android app

declare global {
  // React Native __DEV__ global
  const __DEV__: boolean;
  
  // Node.js process (for Expo/React Native)
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      GROWTHBOOK_API_HOST?: string;
      GROWTHBOOK_CLIENT_KEY?: string;
      EXPO_PUBLIC_APP_VERSION?: string;
    }
  }
}

export {}; 