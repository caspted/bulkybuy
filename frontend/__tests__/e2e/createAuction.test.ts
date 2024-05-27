import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import axios from 'axios';

const rootURL = process.env.NEXT_PUBLIC_CLIENT_URL;
let driver: WebDriver;

async function deleteAuctionByProductId(productId: number) {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions/product/${productId}`);
  } catch (error) {
    console.error('Error deleting auction:', error);
  }
}

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

const productId = 1

describe('Product Auction', () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await deleteAuctionByProductId(productId)
    await driver.quit();
  });

  beforeEach(async () => {
    await login(driver);
  });

  it('display the auction form', async () => {
    await driver.get(`${rootURL}/products/${productId}/auctionForm`);

    const endDateInput = await driver.findElement(By.id('date_ends'));
    expect(endDateInput).toBeDefined();

    const minimumBidInput = await driver.findElement(By.id('minimum_bid'));
    expect(minimumBidInput).toBeDefined();

    const openForAuctionButton = await driver.findElement(By.id('createAuction'));
    expect(openForAuctionButton).toBeDefined();
  });

  it('creates a new auction', async () => {
    await driver.get(`${rootURL}/products/${productId}/auctionForm`);

    const openForAuctionButton = await driver.findElement(By.id('createAuction'));
    await openForAuctionButton.click();

    await driver.wait(until.urlContains('/products'), 10000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/products');
    
  });
});