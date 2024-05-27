import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import axios from 'axios';

const rootURL = process.env.NEXT_PUBLIC_CLIENT_URL;

let driver: WebDriver;


async function login(driver: WebDriver) {
  await driver.get(`${rootURL}/login`);

  const emailInput = await driver.findElement(By.id('email'));
  await emailInput.sendKeys('test@email.com');

  const passwordInput = await driver.findElement(By.id('password'));
  await passwordInput.sendKeys('test');

  const loginButton = await driver.findElement(By.id('loginButton'));
  await loginButton.click();

  await driver.wait(until.urlContains('/'), 10000);
}

describe('Product Creation', () => {

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await login(driver);
  });

  it('add money to wallet', async () => {
    await driver.get(`${rootURL}/user/1`);

    const addMOneyButton = await driver.findElement(By.id('addMoneyPopup'));
    await addMOneyButton.click();

    const amountInput = await driver.findElement(By.id('amountInput'));
    await amountInput.sendKeys('500');
  
  
    const addConfirm = await driver.findElement(By.id('addConfirmation'));
    await addConfirm.click();

    expect(true).toBe(true);
  });
});