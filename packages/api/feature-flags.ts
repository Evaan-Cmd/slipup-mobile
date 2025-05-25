import { GrowthBook } from '@growthbook/growthbook';

// Feature flag keys for SlipUp mobile Android app
export enum FeatureFlags {
  EMAIL_IMPORT = 'flag_email_import',
  POS_WEBHOOK = 'flag_pos_webhook',
  STRIPE_BILLING = 'flag_stripe_billing',
}

// Default feature flag values (all off for safety)
export const DEFAULT_FEATURES = {
  [FeatureFlags.EMAIL_IMPORT]: false,
  [FeatureFlags.POS_WEBHOOK]: false,
  [FeatureFlags.STRIPE_BILLING]: false,
};

// Check if we're in development mode (React Native/Expo)
const isDevelopment = () => {
  try {
    // Check for React Native __DEV__ global
    return typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV === 'development';
  } catch {
    return process.env.NODE_ENV === 'development';
  }
};

// GrowthBook instance for mobile app
export class FeatureFlagService {
  private growthbook: GrowthBook;
  
  constructor() {
    this.growthbook = new GrowthBook({
      apiHost: process.env.GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io',
      clientKey: process.env.GROWTHBOOK_CLIENT_KEY || '',
      // Enable for mobile development
      enableDevMode: isDevelopment(),
      // Track feature usage for analytics
      trackingCallback: (experiment, result) => {
        // Log feature flag usage for mobile analytics
        console.log('Feature flag used:', {
          feature: experiment.key,
          enabled: result.value,
          platform: 'android',
        });
      },
    });
  }

  async initialize(): Promise<void> {
    try {
      await this.growthbook.loadFeatures();
    } catch (error) {
      console.warn('Failed to load remote features, using defaults:', error);
      // Fallback to default features if remote loading fails
      this.growthbook.setFeatures(DEFAULT_FEATURES);
    }
  }

  isFeatureEnabled(flag: FeatureFlags): boolean {
    return this.growthbook.isOn(flag);
  }

  getFeatureValue<T>(flag: FeatureFlags, defaultValue: T): T {
    return this.growthbook.getFeatureValue(flag, defaultValue);
  }

  // Set user attributes for targeting (mobile-specific)
  setUserAttributes(userId: string, deviceInfo?: any): void {
    this.growthbook.setAttributes({
      id: userId,
      platform: 'android',
      app_version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
      device_info: deviceInfo,
    });
  }

  destroy(): void {
    this.growthbook.destroy();
  }
}

// Singleton instance for mobile app
export const featureFlagService = new FeatureFlagService(); 