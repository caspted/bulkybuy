import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import axios from 'axios';

const rootURL = process.env.NEXT_PUBLIC_CLIENT_URL;

async function deleteUserByEmail(email: string) {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/email/${email}`);
    console.log(response.data.message);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

describe('Registration Process', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should register with valid credentials', async () => {
    await driver.get(`${rootURL}/register`);

    const usernameInput = await driver.findElement(By.id('name'));
    await usernameInput.sendKeys('newuser');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('valid@email.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('validPassword');

    const registerButton = await driver.findElement(By.id('registerButton'));
    await registerButton.click();

    await driver.wait(until.urlContains('/'), 10000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain(`${rootURL}`);

    deleteUserByEmail(`valid@email.com`)
  });

  it('should display an error message for invalid email', async () => {
    await driver.get(`${rootURL}/register`);

    const usernameInput = await driver.findElement(By.id('name'));
    await usernameInput.sendKeys('newuser');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('invalidemail');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('validPassword');

    await driver.wait(until.elementLocated(By.id('registerButton')), 5000);

    const registerButton = await driver.findElement(By.id('registerButton'));
    await registerButton.click();

    const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
    expect(errorMessage).toContain('Enter a valid email');
  });

  it('should display an error message for email already in use', async () => {
    await driver.get(`${rootURL}/register`);

    const usernameInput = await driver.findElement(By.id('name'));
    await usernameInput.sendKeys('newuser');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('test@email.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('test');

    const registerButton = await driver.findElement(By.id('registerButton'));
    await registerButton.click();

    await driver.wait(until.elementLocated(By.id('errorMessage')), 5000);

    const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
    expect(errorMessage).toContain('Email is already in use');
  });
});