/// <reference types="vite/client" />
interface ImportMetaEnv {
    // 后端基础地址
    readonly VITE_BACKEND_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
