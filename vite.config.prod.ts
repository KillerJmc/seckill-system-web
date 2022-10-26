import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            // CDN加速
            "vue": "https://esm.sh/vue@3.2.41",
            "vue-router": "https://esm.sh/vue-router@4.1.6",
            "axios": "https://esm.sh/axios@1.1.2",
            "pinia": "https://esm.sh/pinia@2.0.23",
            "js-cookie": "https://esm.sh/js-cookie@3.0.1",
            "js-sha256": "https://esm.run/js-sha256@0.9.0"
        }
    },
    server: {
        port: 80
    }
})
