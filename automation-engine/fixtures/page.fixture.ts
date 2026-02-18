import { test as base } from '@playwright/test';
import { BasePage } from '../page-objects/base-page';

export type PageFixtures = {
    basePage: BasePage;
}

type ExtendParams = Parameters<typeof base.extend<PageFixtures>>;

export const pageFixtures: ExtendParams[0] = {
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    }
};

export { expect } from '@playwright/test';