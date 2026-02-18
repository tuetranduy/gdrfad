import playwrightConfig from "playwright.config"

export class ConfigHelper {
    static getBaseUrl() {
        console.log(`===> Debug: Test is running on: ${process.env.ENV} environment`)
        return playwrightConfig.projects.find(x => x.name === process.env.ENV.toLowerCase()).use.baseURL
    }
}