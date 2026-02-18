import { ConfigHelper } from "@helpers/config-helper";
import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openUrl(path: string = "") {
        await this.page.goto(ConfigHelper.getBaseUrl() + path)
    }

    async enterTxt(element: Locator, text: string) {
        await element.clear()
        await element.fill(text);
    }

    async typeText(element: Locator, text: string, delay: number = 100) {
        await element.pressSequentially(text, { delay });
    }

    async clickOnElement(element: Locator) {
        await element.click();
    }

    async getTextContent(element: Locator) {
        return await element.textContent();
    }

    async hoverOnElement(element: string) {
        return await this.page.hover(element);
    }

    async waitUntilVisible(element: Locator, timeout?: number) {
        return await element.waitFor({ state: 'visible', timeout: timeout });
    }

    async waitUntilHidden(element: Locator) {
        return await element.waitFor({ state: 'hidden' });
    }

    async waitForPageLoad(loadState?: 'networkidle' | 'load' | 'domcontentloaded') {
        return await this.page.waitForLoadState(loadState);
    }

    async getText(locator: Locator) {
        const elementText = await locator.innerText();

        return elementText;
    }

    async getInputValue(locator: Locator) {
        const elementText = await locator.inputValue();

        return elementText;
    }

    async hover(locator: Locator) {
        return await locator.hover()
    }

    async setAttribute(locator: Locator, attributeName: string, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.evaluate(element => element.setAttribute(attributeName, value));
    }

    async setElementValue(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.evaluate((element, value) => (element as HTMLInputElement).value = value, value);
    }

    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    async isElementVisible(locator: Locator, timeout: number = 3000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: timeout });
            return true;
        } catch {
            return false;
        }
    }
}