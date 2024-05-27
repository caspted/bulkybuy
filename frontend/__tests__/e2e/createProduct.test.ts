import { Builder, By, until, WebDriver } from 'selenium-webdriver';

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

  it('create a new product with valid input', async () => {
    await driver.get(`${rootURL}/products/create`);

    const nameInput = await driver.findElement(By.id('name'));
    await nameInput.sendKeys('Test Product');

    const descriptionInput = await driver.findElement(By.id('productDescription'));
    await descriptionInput.sendKeys('This is a test product description');

    const categoryButton = await driver.findElement(By.css('button[role="combobox"]'));
    await categoryButton.click();
  
    const searchInput = await driver.findElement(By.css('input[placeholder="Search category..."]'));
    await searchInput.sendKeys('Material');
  
    const categoryOptions = await driver.findElements(By.id('category'));
    await driver.wait(async () => categoryOptions.length > 0, 5000);
  
    const categoryOption = categoryOptions[0];
    await categoryOption.click();

    const createButton = await driver.findElement(By.id('createButton'));
    await createButton.click();

    await driver.wait(async () => (await driver.getCurrentUrl()) === `${rootURL}/`, 10000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toEqual(`${rootURL}/`);
  });
});