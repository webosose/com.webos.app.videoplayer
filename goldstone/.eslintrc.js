module.exports = {
	root: true,
	globals: {
		__DEV__: true,
		process: true,
		window: true,
		document: true
	},
	env: {
		es6: true, // Enables ES6 globals
		'shared-node-browser': true, // restrict to common globals to preserve isomorphic support
		commonjs: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
	ignorePatterns: [
		'/**/node_modules/',
		'/**/node_modules/*',
		'/**/build/',
		'/**/build/*',
		'/**/dist/',
		'/**/dist/*',
		'/**/coverage/',
		'/**/coverage/*',
		'/**/resources/',
		'/**/resources/*'
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['babel', 'jsx-a11y',  'react', 'enact'],
	settings: {
		react: {
			'pragma': 'React',	// Pragma to use, default to "React"
			'version': 'detect' // React version, default to the latest React stable release
		}
	},
	rules: {
		'block-scoped-var': 'warn',
		'curly': ['warn', 'multi-line'],
		'eqeqeq': ['warn', 'smart'],
		'new-parens': 'warn',
		'no-alert': 'warn',
		'no-array-constructor': 'warn',
		'no-caller': 'error',
		'no-catch-shadow': 'error',
		'no-cond-assign': ['warn', 'except-parens'],
		'no-constant-condition': 'warn',
		'no-control-regex': 'off',
		'no-debugger': 'off',
		'no-div-regex': 'warn',
		'no-empty': 'warn',
		'no-eval': 'warn',
		'no-extend-native': 'warn',
		'no-extra-bind': 'warn',
		'no-extra-boolean-cast': 'warn',
		'no-extra-semi': 'off',
		'no-fallthrough': 'warn',
		'no-floating-decimal': 'warn',
		'no-func-assign': 'warn',
		'no-implied-eval': 'warn',
		'no-inner-declarations': 'off',
		'no-irregular-whitespace': 'warn',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-labels': 'error',
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'no-native-reassign': 'error',
		'no-negated-in-lhs': 'error',
		'no-new-func': 'error',
		'no-new-object': 'warn',
		'no-new-wrappers': 'warn',
		'no-octal-escape': 'warn',
		'no-proto': 'error',
		'no-redeclare': ['error', {
			builtinGlobals: true
		}],
		'no-regex-spaces': 'warn',
		'no-return-assign': ['warn', 'except-parens'],
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'warn',
		'no-shadow': ['warn', {
			builtinGlobals: true,
			hoist: 'all',
			allow: [
				'context'
			]
		}],
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'warn',
		'no-unexpected-multiline': 'warn',
		'no-unneeded-ternary': 'warn',
		'no-unreachable': 'warn',
		'no-unused-vars': 'warn',
		'no-use-before-define': ['warn', {
			functions: false
		}],
		'no-useless-call': 'warn',
		'no-useless-escape': 'off',
		'no-var': 'warn',
		'require-yield': 'off',
		'use-isnan': 'warn',
		'wrap-iife': ['error', 'inside'],

		// jsx-a11y plugin https://github.com/evcohen/eslint-plugin-jsx-a11y
		'jsx-a11y/accessible-emoji': 'warn',
		'jsx-a11y/alt-text': 'warn',
		'jsx-a11y/anchor-has-content': 'warn',
		'jsx-a11y/anchor-is-valid': ['warn', {
			aspects: ['noHref', 'invalidHref']
		}],
		'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
		'jsx-a11y/aria-props': 'warn',
		'jsx-a11y/aria-proptypes': 'warn',
		'jsx-a11y/aria-role': ['warn', {ignoreNonDOM: true}],
		'jsx-a11y/aria-unsupported-elements': 'warn',
		'jsx-a11y/heading-has-content': 'warn',
		'jsx-a11y/iframe-has-title': 'warn',
		'jsx-a11y/img-redundant-alt': 'warn',
		'jsx-a11y/no-access-key': 'warn',
		'jsx-a11y/no-distracting-elements': 'warn',
		'jsx-a11y/no-redundant-roles': 'warn',
		'jsx-a11y/role-has-required-aria-props': 'warn',
		'jsx-a11y/role-supports-aria-props': 'warn',
		'jsx-a11y/scope': 'warn',

		// react plugin https://github.com/yannickcr/eslint-plugin-react
		'react/display-name': 'off',
		'react/no-access-state-in-setstate': 'warn',
		'react/no-children-prop': 'warn',
		'react/no-danger': 'warn',
		'react/no-deprecated': 'warn',
		'react/no-did-mount-set-state': ['warn'],
		'react/no-did-update-set-state': ['warn'],
		'react/no-direct-mutation-state': 'warn',
		'react/no-find-dom-node': 'warn',
		'react/forbid-foreign-prop-types': 'warn',
		'react/no-is-mounted': 'warn',
		'react/no-render-return-value': 'warn',
		'react/no-string-refs': 'warn',
		'react/no-this-in-sfc': 'warn',
		'react/no-unescaped-entities': 'warn',
		'react/no-unknown-property': 'warn',
		'react/prefer-es6-class': ['warn', 'always'],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'warn',
		'react/require-render-return': 'warn',
		'react/self-closing-comp': 'warn',

		// react plugin - jsx rules
		'react/jsx-boolean-value': ['warn', 'never'],
		'react/jsx-key': 'off',
		'react/jsx-no-bind': ['warn', {
			ignoreRefs: true,
			allowArrowFunctions: false,
			allowBind: false
		}],
		'react/jsx-no-comment-textnodes': 'warn',
		'react/jsx-no-duplicate-props': 'warn',
		'react/jsx-no-target-blank': 'warn',
		'react/jsx-no-undef': 'warn',
		'react/jsx-pascal-case': 'warn',
		'react/jsx-uses-react': 'warn',
		'react/jsx-uses-vars': 'warn',

		// babel plugin https://github.com/babel/eslint-plugin-babel
		'babel/new-cap': ['error', {
			newIsCap: true,
			capIsNew: false
		}],
		'babel/no-unused-expressions': 'warn',

		// enact plugin https://github.com/enactjs/eslint-plugin-enact/
		'enact/no-module-exports-import': 'error'
	},
	overrides: [
		{
			// Typescript
			files: ['**/*.ts?(x)'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				},
				warnOnUnsupportedTypeScriptVersion: true
			},
			plugins: ['@typescript-eslint'],
			rules: {
				// Unneeded options covered by Typescript plugin
				'default-case': 'off',
				'no-dupe-class-members': 'off',
				'no-undef': 'off',

				// Typescript rules
				'@typescript-eslint/consistent-type-assertions': 'warn',
				'no-array-constructor': 'off',
				'@typescript-eslint/no-array-constructor': 'warn',
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': ['warn', {
					functions: false,
					classes: false,
					variables: false,
					typedefs: false
				}],
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-unused-expressions': ['error', {
					allowShortCircuit: true,
					allowTernary: true,
					allowTaggedTemplates: true
				}],
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': ['warn', {
					args: 'none',
					ignoreRestSiblings: true
				}],
				'no-useless-constructor': 'off',
				'@typescript-eslint/no-useless-constructor': 'warn'
			}
		},
		{
			// Jest unit tests
			files: [
				'**/__tests__/**/*.{js,jsx,ts,tsx}',
				'**/?(*.)(spec|test).{js,jsx,ts,tsx}',
				'**/*-specs.{js,jsx,ts,tsx}'
			],
			excludedFiles: ['tests/screenshot/**/*', 'tests/ui/**/*'],
			env: {
				jest: true
			},
			rules: {
				// Arrow functions can simplify tests
				'react/jsx-no-bind': 'off'
			}
		},
		{
			// WDIO mocha ui & screenshot tests
			files: [
				'**/tests/screenshot/**/*', '**/tests/ui/**/*'
			],
			globals: {
				'browser': true,
				'expect': true,
				'$': true,
				'$$': true
			},
			env: {
				mocha: true
			},
			rules: {
				// Arrow functions can simplify tests
				'react/jsx-no-bind': 'off'
			}
		}
	]
};
