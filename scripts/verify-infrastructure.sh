#!/bin/bash

# SlipUp Mobile Android - Infrastructure Verification Script
# This script verifies that all infrastructure components are properly configured

set -e

echo "🔍 SlipUp Mobile Android - Infrastructure Verification"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to print colored output
print_check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    echo -e "${BLUE}[$TOTAL_CHECKS]${NC} Checking: $1"
}

print_pass() {
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
    echo -e "  ${GREEN}✓ PASS${NC} $1"
}

print_fail() {
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
    echo -e "  ${RED}✗ FAIL${NC} $1"
}

print_warning() {
    echo -e "  ${YELLOW}⚠ WARNING${NC} $1"
}

# Check GitHub CLI installation and authentication
check_github_cli() {
    print_check "GitHub CLI installation and authentication"
    
    if command -v gh &> /dev/null; then
        if gh auth status &> /dev/null; then
            print_pass "GitHub CLI is installed and authenticated"
        else
            print_fail "GitHub CLI is installed but not authenticated"
        fi
    else
        print_fail "GitHub CLI is not installed"
    fi
}

# Check local git repository
check_local_git() {
    print_check "Local git repository configuration"
    
    if [ -d ".git" ]; then
        if git remote get-url origin &> /dev/null; then
            ORIGIN_URL=$(git remote get-url origin)
            print_pass "Git repository initialized with remote: $ORIGIN_URL"
        else
            print_fail "Git repository exists but no remote origin configured"
        fi
    else
        print_fail "No git repository found"
    fi
}

# Check GitHub repository existence
check_github_repo() {
    print_check "GitHub repository existence and access"
    
    if command -v gh &> /dev/null && gh auth status &> /dev/null; then
        REPO_NAME="slipup-mobile"
        if gh repo view "$REPO_NAME" &> /dev/null; then
            REPO_URL=$(gh repo view "$REPO_NAME" --json url -q .url)
            print_pass "GitHub repository exists: $REPO_URL"
        else
            print_fail "GitHub repository '$REPO_NAME' not found or not accessible"
        fi
    else
        print_warning "Cannot check GitHub repository (GitHub CLI not available)"
    fi
}

# Check branch protection
check_branch_protection() {
    print_check "Branch protection rules"
    
    if command -v gh &> /dev/null && gh auth status &> /dev/null; then
        REPO_NAME="slipup-mobile"
        REPO_OWNER=$(gh api user --jq .login 2>/dev/null || echo "unknown")
        
        if gh api repos/"$REPO_OWNER"/"$REPO_NAME"/branches/main/protection &> /dev/null; then
            print_pass "Branch protection is configured for main branch"
        else
            print_fail "Branch protection is not configured for main branch"
        fi
    else
        print_warning "Cannot check branch protection (GitHub CLI not available)"
    fi
}

# Check repository secrets
check_repository_secrets() {
    print_check "Repository secrets configuration"
    
    if command -v gh &> /dev/null && gh auth status &> /dev/null; then
        REQUIRED_SECRETS=("EXPO_TOKEN" "GROWTHBOOK_CLIENT_KEY" "GROWTHBOOK_API_HOST" "EXPO_PUBLIC_APP_VERSION")
        SECRET_COUNT=0
        
        for secret in "${REQUIRED_SECRETS[@]}"; do
            if gh secret list | grep -q "$secret"; then
                SECRET_COUNT=$((SECRET_COUNT + 1))
            fi
        done
        
        if [ $SECRET_COUNT -eq ${#REQUIRED_SECRETS[@]} ]; then
            print_pass "All required repository secrets are configured ($SECRET_COUNT/${#REQUIRED_SECRETS[@]})"
        else
            print_fail "Missing repository secrets ($SECRET_COUNT/${#REQUIRED_SECRETS[@]} configured)"
        fi
    else
        print_warning "Cannot check repository secrets (GitHub CLI not available)"
    fi
}

# Check package.json and dependencies
check_package_json() {
    print_check "Package.json and workspace configuration"
    
    if [ -f "package.json" ]; then
        if grep -q '"workspaces"' package.json; then
            print_pass "Root package.json exists with workspace configuration"
        else
            print_fail "Root package.json exists but no workspace configuration found"
        fi
    else
        print_fail "Root package.json not found"
    fi
}

# Check mobile app configuration
check_mobile_app() {
    print_check "Mobile app configuration"
    
    if [ -f "apps/mobile/package.json" ]; then
        print_pass "Mobile app package.json exists"
    else
        print_fail "Mobile app package.json not found"
    fi
    
    if [ -f "apps/mobile/app.json" ]; then
        if grep -q '"android"' apps/mobile/app.json; then
            print_pass "Expo app.json exists with Android configuration"
        else
            print_fail "Expo app.json exists but no Android configuration found"
        fi
    else
        print_fail "Expo app.json not found"
    fi
    
    if [ -f "apps/mobile/eas.json" ]; then
        print_pass "EAS build configuration exists"
    else
        print_fail "EAS build configuration not found"
    fi
}

# Check TypeScript configuration
check_typescript_config() {
    print_check "TypeScript configuration"
    
    if [ -f "tsconfig.json" ]; then
        print_pass "Root TypeScript configuration exists"
    else
        print_fail "Root TypeScript configuration not found"
    fi
    
    if [ -f "apps/mobile/tsconfig.json" ]; then
        print_pass "Mobile app TypeScript configuration exists"
    else
        print_fail "Mobile app TypeScript configuration not found"
    fi
}

# Check feature flags implementation
check_feature_flags() {
    print_check "Feature flags implementation"
    
    if [ -f "packages/api/feature-flags.ts" ]; then
        if grep -q "flag_email_import\|flag_pos_webhook\|flag_stripe_billing" packages/api/feature-flags.ts; then
            print_pass "Feature flags implementation exists with required flags"
        else
            print_fail "Feature flags file exists but missing required flags"
        fi
    else
        print_fail "Feature flags implementation not found"
    fi
}

# Check CI/CD configuration
check_ci_cd() {
    print_check "CI/CD pipeline configuration"
    
    if [ -f ".github/workflows/nightly.yml" ]; then
        if grep -q "android.*build" .github/workflows/nightly.yml; then
            print_pass "Nightly build workflow exists with Android build steps"
        else
            print_fail "Nightly build workflow exists but no Android build steps found"
        fi
    else
        print_fail "Nightly build workflow not found"
    fi
    
    if [ -f ".github/PULL_REQUEST_TEMPLATE.md" ]; then
        print_pass "Pull request template exists"
    else
        print_fail "Pull request template not found"
    fi
}

# Check ESLint configuration
check_eslint_config() {
    print_check "ESLint configuration"
    
    if [ -f ".eslintrc.js" ]; then
        if grep -q "expo\|react-native" .eslintrc.js; then
            print_pass "ESLint configuration exists with mobile-specific rules"
        else
            print_fail "ESLint configuration exists but no mobile-specific rules found"
        fi
    else
        print_fail "ESLint configuration not found"
    fi
}

# Test pnpm commands
check_pnpm_commands() {
    print_check "pnpm workspace functionality"
    
    if command -v pnpm &> /dev/null; then
        if [ -f "package.json" ]; then
            # Test if pnpm can read the workspace
            if pnpm list --depth=0 &> /dev/null; then
                print_pass "pnpm workspace is functional"
            else
                print_warning "pnpm workspace has issues (may need 'pnpm install')"
            fi
        else
            print_fail "No package.json found for pnpm test"
        fi
    else
        print_fail "pnpm is not installed"
    fi
}

# Main verification function
main() {
    echo "Starting infrastructure verification..."
    echo ""
    
    # Run all checks
    check_github_cli
    check_local_git
    check_github_repo
    check_branch_protection
    check_repository_secrets
    check_package_json
    check_mobile_app
    check_typescript_config
    check_feature_flags
    check_ci_cd
    check_eslint_config
    check_pnpm_commands
    
    # Summary
    echo ""
    echo "======================================================"
    echo "VERIFICATION SUMMARY"
    echo "======================================================"
    echo -e "Total checks: ${BLUE}$TOTAL_CHECKS${NC}"
    echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
    echo -e "Failed: ${RED}$FAILED_CHECKS${NC}"
    
    if [ $FAILED_CHECKS -eq 0 ]; then
        echo ""
        echo -e "${GREEN}🎉 ALL CHECKS PASSED! Infrastructure is ready.${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Run: pnpm install"
        echo "2. Run: cd apps/mobile && expo start"
        echo "3. Test Android build: cd apps/mobile && eas build --platform android --profile preview"
        
        exit 0
    else
        echo ""
        echo -e "${RED}❌ $FAILED_CHECKS checks failed. Please review and fix the issues above.${NC}"
        echo ""
        echo "Common fixes:"
        echo "1. Install GitHub CLI: winget install --id GitHub.cli"
        echo "2. Authenticate: gh auth login"
        echo "3. Run setup script: ./scripts/setup-infrastructure.sh"
        echo "4. Install dependencies: pnpm install"
        
        exit 1
    fi
}

# Run main function
main "$@" 