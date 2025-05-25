# SlipUp - Mobile Android App

SlipUp is a mobile-first application built with React Native and Expo, focusing on Android development.

## Repository Structure

```
slipup/
├─ apps/mobile/        # Expo React Native app (Android)
├─ packages/ui-kit/    # Shared components (shadcn + Tailwind)
├─ packages/api/       # API handlers + libs
├─ packages/prompts/   # OpenAI prompt YAMLs
└─ .github/workflows/  # CI/CD pipelines
```

## Development Setup

1. Install dependencies: `pnpm install`
2. Start mobile development: `cd apps/mobile && expo start`
3. Run on Android: Press 'a' in Expo CLI or scan QR code with Expo Go

## Mobile Development

This project focuses exclusively on Android mobile development. The app is built using:
- React Native with Expo
- TypeScript
- Shared UI components
- Mobile-optimized CI/CD

## Feature Flags

The project uses GrowthBook for feature flag management with the following flags:
- `flag_email_import` - Email import functionality
- `flag_pos_webhook` - POS webhook integration  
- `flag_stripe_billing` - Stripe billing integration

All flags default to off for safety. 