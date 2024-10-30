import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    basicSsl(),
  ],
  publicDir: './public',
  server: {
    host: true,
  },
});

