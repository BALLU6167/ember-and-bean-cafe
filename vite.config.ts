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
      const distApp = path.resolve(__dirname, 'dist/app.html');
      const distIndex = path.resolve(__dirname, 'dist/index.html');
      const sourceDist = fs.existsSync(distApp) ? distApp : distIndex;
      if (fs.existsSync(sourceDist)) {
        let html = fs.readFileSync(sourceDist, 'utf8');

        // 1. Remove ANY redirect script from dist/index.html
        html = html.replace(/<script>[\s\S]*?window\.location\.replace[\s\S]*?<\/script>/g, '');

        // 2. Locate the inline script tag that contains the React bundle (length > 1000)
        const scripts = html.match(/<script[\s\S]*?<\/script>/g) || [];
        let bundleScript = '';
        for (const s of scripts) {
          if (!s.includes('application/ld+json') && s.length > 1000) {
            bundleScript = s;
            html = html.replace(s, '');
            break;
          }
        }

        if (bundleScript) {
          // Remove type="module" and crossorigin so it works locally on file:/// without CORS issues
          bundleScript = bundleScript
            .replace(/\s*type="module"/g, '')
            .replace(/\s*crossorigin(="[^"]*")?/g, '')
            .replace(/\s*defer/g, '');

          // Place the bundle script right before </body>, strictly AFTER <div id="root"></div>
          const bodyCloseIndex = html.indexOf('</body>');
          if (bodyCloseIndex !== -1) {
            html = html.substring(0, bodyCloseIndex) + '\n' + bundleScript + '\n' + html.substring(bodyCloseIndex);
          } else {
            html += '\n' + bundleScript;
          }
        }

        // Also write to dist/index.html and root index.html
        fs.writeFileSync(distIndex, html, 'utf8');

        const rootIndex = path.resolve(__dirname, 'index.html');
        fs.writeFileSync(rootIndex, html, 'utf8');

        // 3. Also create Ember_and_Bean_Cafe.html
        const rootLauncher = path.resolve(__dirname, 'Ember_and_Bean_Cafe.html');
        fs.writeFileSync(rootLauncher, html, 'utf8');
        console.log('[file-protocol-compat] Cleaned all redirects, moved script to body end, patched dist/index.html, root index.html & created Ember_and_Bean_Cafe.html');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), fileProtocolCompatPlugin()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'app.html'),
    },
  },
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
