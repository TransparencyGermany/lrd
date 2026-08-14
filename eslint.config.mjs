import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["bower_components/**", "out/**", ".next/**"],
  },
];

export default eslintConfig;
