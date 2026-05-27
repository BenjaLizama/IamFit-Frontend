import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.jest.ts", "**/*.jest.tsx"],
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname) },
      { find: /^@\/(.*)$/, replacement: path.resolve(__dirname, "$1") },
      { find: "react-native", replacement: "react-native-web" },
      {
        find: /\.svg$/,
        replacement: path.resolve(__dirname, "test/mocks/svgMock.tsx"),
      },
      {
        find: /\.(ttf|png|jpg|jpeg)$/,
        replacement: path.resolve(__dirname, "test/mocks/fileMock.ts"),
      },
    ],
  },
});
