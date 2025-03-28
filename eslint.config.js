import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
export default tseslint.config(
  { ignores: ["dist"] }, // Bỏ qua thư mục "dist" khi chạy ESLint
  {
    extends: [js.configs.recommended,eslintPluginPrettier, ...tseslint.configs.recommended], // Kế thừa các cấu hình đề xuất của ESLint và TypeScript
    files: ["**/*.{ts,tsx,jsx}"], // Chỉ kiểm tra các file TypeScript (*.ts, *.tsx)
    languageOptions: {
      ecmaVersion: 2020, // Sử dụng phiên bản ECMAScript 2020
      globals: globals.browser, // Định nghĩa các biến toàn cục của trình duyệt
    },
    plugins: {
      "react-hooks": reactHooks, // Plugin hỗ trợ kiểm tra quy tắc React Hooks
      "react-refresh": reactRefresh, // Plugin hỗ trợ React Fast Refresh
    },
    rules: {
      // 🟢 React Hooks
      ...reactHooks.configs.recommended.rules, // Kế thừa các quy tắc đề xuất của React Hooks

      // 🔵 Cấu trúc code
      "space-before-function-paren": ["error", "always"], // Bắt buộc có space trước dấu `()`
      "indent": ["error", 2], // Sử dụng 2 spaces để thụt lề
      "no-mixed-spaces-and-tabs": "error", // Cấm trộn lẫn tab và space

      // 🟠 Quy tắc về định dạng
      "block-spacing": "error", // Yêu cầu có khoảng trắng bên trong `{}` của block code
      "newline-after-var": ["error", "always"], // Bắt buộc có dòng trống sau khi khai báo biến
      "no-tabs": 0, // Không cấm tab (có thể dùng tùy theo style)
      "comma-dangle": ["error", "never"], // Không được có dấu `,` cuối cùng trong object, array
      "object-curly-spacing": [
        "error",
        "always",
        { arraysInObjects: false, objectsInObjects: false }
      ], // Có space bên trong `{}` nhưng không có trong object lồng nhau
      "spaced-comment": ["error", "always"], // Bắt buộc có space sau `//`
      "no-trailing-spaces": ["error", { skipBlankLines: true }], // Không có space dư ở cuối dòng (trừ dòng trống)
      "keyword-spacing": ["error", { before: true }], // Có space trước `if`, `else`, `return`, ...
      "comma-spacing": ["error", { before: false, after: true }], // Có space sau dấu `,` nhưng không trước
      "quotes": ["error", "double"], // Bắt buộc dùng dấu nháy `"`
      "semi": ["error", "always"], // Bắt buộc phải có dấu `;` ở cuối dòng

      // ⚠️ React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ], // Cảnh báo nếu một component không được export đúng cách (cho React Fast Refresh)
    },
  }
);
