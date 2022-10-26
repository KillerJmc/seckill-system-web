import { defineConfig } from "vite"
import type { UserConfig } from "vite"
import DevConfig from "./vite.config.dev"
import ProdConfig from "./vite.config.prod"

export default defineConfig(
    config => <UserConfig> (config.command === "serve" ? DevConfig : ProdConfig)
)
