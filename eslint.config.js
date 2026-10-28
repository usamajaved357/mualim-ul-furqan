import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

/* ------------------------------------------------------------------
   Architecture boundaries (see docs/ARCHITECTURE.md)
   pages → features → components · lib · hooks · config · types
   ------------------------------------------------------------------ */
const noFeatures = {
  group: ['@/features/*', '@/features/**', '**/features/**'],
  message: 'Features must not import other features. Move shared code to components/, lib/ or types/.',
};
const noPagesOrApp = {
  group: ['@/pages/*', '@/pages/**', '@/app/*', '@/app/**'],
  message: 'Only app/ may import pages; nothing imports app/.',
};
const noComponents = {
  group: ['@/components/*', '@/components/**'],
  message: 'lib/, hooks/, config/ and types/ are framework-agnostic and must not import UI components.',
  allowTypeImports: true,
};
const noDeepFeatureImports = {
  group: ['@/features/*/*', '@/features/*/**'],
  message: "Import a feature only through its public index.ts (e.g. '@/features/pricing').",
};

const restrict = (...patterns) => ({ 'no-restricted-imports': ['error', { patterns }] });

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, jsxA11y.flatConfigs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2023, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  { files: ['src/features/**/*.{ts,tsx}'], rules: restrict(noFeatures, noPagesOrApp) },
  { files: ['src/components/**/*.{ts,tsx}'], rules: restrict(noFeatures, noPagesOrApp) },
  {
    files: ['src/{lib,hooks,config,types}/**/*.{ts,tsx}'],
    rules: restrict(noFeatures, noPagesOrApp, noComponents),
  },
  { files: ['src/pages/**/*.{ts,tsx}'], rules: restrict(noDeepFeatureImports, noPagesOrApp) },
  {
    files: ['.claude/**/*.mjs', '*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
  },
);
