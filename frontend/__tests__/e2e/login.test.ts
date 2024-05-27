import { Builder, By, until, WebDriver } from 'selenium-webdriver';

const rootURL = process.env.NEXT_PUBLIC_CLIENT_URL;

describe('Login Process', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should login with valid credentials', async () => {
    await driver.get(`${rootURL}/login`);

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('test@email.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('test');

    const loginButton = await driver.findElement(By.id('loginButton'));
    await loginButton.click();

    await driver.wait(until.urlContains('/'), 15000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('http://localhost:3000/');
  });

  it('should display an error message for invalid email', async () => {
    await driver.get('http://localhost:3000/login');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('invalidemail');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('validPassword');

    const loginButton = await driver.findElement(By.id('loginButton'));
    await loginButton.click();

    await driver.wait(until.elementLocated(By.id('errorMessage')), 5000);

    const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
    expect(errorMessage).toContain('Enter a valid email');
  });
});