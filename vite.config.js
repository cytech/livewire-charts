import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel([
            //'resources/css/app.css',
            'resources/js/app.js',
        ]),
    ],
    targets: [
        {
            src: 'public/build/assets/app.js',
            dest: '/home/dave_albright/Program_Data_Local/Development/git/DEB-Log/public/vendor/livewire-charts/app.js',
            rename: { stripBase: true },
        },
        ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern"
                silenceDeprecations: ['if-function', 'color-functions', 'global-builtin', 'import']
            }
        }
    },
});
