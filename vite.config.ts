import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import fs from 'fs';

function fileProtocolCompatPlugin(): PluginOption {
  return {
    name: 'file-protocol-compat',
    enforce: 'post',
    closeBundle() {
      const distIndex = path.resolve(__dirname, 'dist/index.html');
      if (fs.existsSync(distIndex)) {
        let html = fs.readFileSync(distIndex, 'utf8');

        // 1. Remove ANY redirect script from dist/index.html so it NEVER redirects to dist/dist/index.html
        html = html.replace(/<script>[\s\S]*?window\.location\.replace[\s\S]*?<\/script>/g, '');

        // 2. Convert module script to deferred classic script so it executes seamlessly on file:/// (double-click)
        html = html.replace(/<script\s+type="module"\s+crossorigin>/g, '<script defer>');
        fs.writeFileSync(distIndex, html, 'utf8');

        // 3. Also create a convenient direct root launcher file
        const rootLauncher = path.resolve(__dirname, 'Ember_and_Bean_Cafe.html');
        fs.writeFileSync(rootLauncher, html, 'utf8');
        console.log('[file-protocol-compat] Cleaned all redirects, patched dist/index.html & created Ember_and_Bean_Cafe.html');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), fileProtocolCompatPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
