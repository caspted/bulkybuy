import { until, By, WebDriver } from 'selenium-webdriver';

const waitUntilTime = 5 * 1000; // millisecond

export async function getElementById(id: string, driver: WebDriver) {
    const el = await driver.wait(
        until.elementLocated(By.id(id)),
        waitUntilTime
    );

    return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}

export async function getElementByXPath(xpath: string, driver: WebDriver) {
    const el = await driver.wait(
        until.elementLocated(By.xpath(xpath)),
        waitUntilTime
    );

    return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}
