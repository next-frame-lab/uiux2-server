import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default defineConfig([
	pluginReact.configs.flat.recommended,
	...compat.extends("airbnb"),
	...compat.extends("plugin:@typescript-eslint/recommended"),
	...compat.extends("plugin:prettier/recommended"),
	...compat.extends("plugin:react/recommended"),
	prettier,
	{
		languageOptions: {
			globals: { ...globals.node, ...globals.jest },
			ecmaVersion: "latest",
		},
		rules: {
			"import/extensions": ["error", "ignorePackages"],
			"react/react-in-jsx-scope": "off",
			"react/jsx-filename-extension": [
				"warn",
				{ extensions: [".jsx", ".tsx"] },
			],
		},
	},
	{
		files: ["eslint.config.js"],
		rules: {
			"no-underscore-dangle": "off",
			"import/no-extraneous-dependencies": ["error", { packageDir: __dirname }],
		},
	},
]);
