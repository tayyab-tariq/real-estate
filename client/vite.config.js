/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
      plugins: [react()],

      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            target: process.env.VITE_BASE_URL,
            secure: true,
          },
        },
      },
  });
}
