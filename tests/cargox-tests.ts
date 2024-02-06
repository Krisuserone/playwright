import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";

test("Open and verify title", async ({ page }) => {
  await page.goto("https://cargox.io/");
  
  // Assertions
  await expect(page).toHaveTitle(
    "CargoX - Building digital trust, one document at a time.",
  );
});

test("Navigation sanity checks", async ({ page }) => {
  // Products
  const products = page.locator('button:has-text("Products")');
  const billOfLading = page.locator(
    "//span[contains(text(),'Electronic bill of lading')]",
  );
  const bolText = page.locator(
    "text=Create , transfer and process all your eBL documents.",
  );
  const govLink = page.locator("//div[contains(text(),'Governments')]");
  const Transportlink = page.locator(
    "//div[contains(text(),'Transport & logistics')]",
  );
  const TradeLink = page.locator(
    "(//div[contains(text(),'Trade finance')])[1]",
  );
  const OtherLink = page.locator("//div[contains(text(),'Other industries')]");
  const BolPage = page.locator(
    "text=All bills of lading will be electronic by 2030",
  );

  await page.goto("https://cargox.io/");
  await products.click();

  // Assertions
  await expect(billOfLading).toBeVisible();
  await expect(govLink).toBeVisible();
  await expect(Transportlink).toBeVisible();
  await expect(TradeLink).toBeVisible();
  await expect(OtherLink).toBeVisible();

  billOfLading.click({ force: true });
  await expect(BolPage).toBeVisible();
  await expect(page).toHaveURL('https://cargox.io/electronic-bill-of-lading');

  // Platform
  const Platform = page.locator("//button[contains(text(),'Platform')]");
  const TransferDoc = page.locator(
    "//span[contains(text(),'Transfer documents')]",
  );
  const ManageLink = page.locator(
    "//span[contains(text(),'Manage workflows')]",
  );
  const CreateDoc = page.locator("//span[contains(text(),'Create documents')]");
  const Register = page.getByRole("link", { name: "Get started Details" });

  await Platform.click({ force: true });
  // Assertions
  await expect(TransferDoc).toBeVisible();
  await expect(ManageLink).toBeVisible();
  await expect(CreateDoc).toBeVisible();

  await TransferDoc.click({ force: true });
  // Assertions
  await Register.scrollIntoViewIfNeeded();
  await expect(Register).toBeVisible();
  await expect(page).toHaveURL('https://cargox.io/transfer-documents');
});

test('Book a Demo', async ({ page }) => {

  const FooterText = page.locator(
    "text= By subscribing to the CargoX Newsletter you agree to receive news and marketing offers in accordance with our ",
  );
  await page.goto('https://cargox.io/');
    
  // Go to "Book a demo" page and accept cookies
  await page.getByRole('main').getByRole('link', { name: 'Book a demo Details' }).click();
  await page.getByRole('button', { name: 'Accept all Details' }).click({ force: true });

  // Fill the application
  // Enter first name
  await page.getByPlaceholder('Enter your first name').click();
  await page.getByPlaceholder('Enter your first name').fill('kristjan');
  await page.getByPlaceholder('Enter your first name').press('Tab');
  // Enter last name
  await page.getByPlaceholder('Enter your last name').click();
  await page.getByPlaceholder('Enter your last name').fill('rakose');
  // Enter email
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill('kristjan@kristjan.net');
  // Enter company name
  await page.getByPlaceholder('Enter your company name').click();
  await page.getByPlaceholder('Enter your company name').fill('kristjan d.o.o.');
  // Enter position
  await page.getByPlaceholder('Enter your position in company').click();
  await page.getByPlaceholder('Enter your position in company').fill('ceo');
  // Select help type
  await page.locator('div').filter({ hasText: /^Select help type$/ }).click();
  await page.getByText('CargoX Platform walk-through').click();
  // Select company size
  await page.getByText('Select size').click();
  await page.getByText('Small enterprise').click();
  // Select industry
  await page.locator('div').filter({ hasText: /^Select industry$/ }).click();
  await page.getByText('Food & Hospitality').click();
  // Select country
  await page.locator('div').filter({ hasText: /^Select country$/ }).click();
  await page.getByPlaceholder('Select country').fill('slo');
  await page.getByText('Slovenia', { exact: true }).click();

  // Check I'm not a robot and newsletter checkbox
  await page.getByText('I would like to receive news').click();
  await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();

  // Assertions
  await expect(page).toHaveURL('https://cargox.io/book-a-demo');
  await expect(page.getByPlaceholder('Enter your first name')).not.toBeEmpty()
  await expect(page.getByPlaceholder('Enter your position in company')).not.toBeEmpty();
  await expect(page.getByPlaceholder('Enter your last name')).not.toBeEmpty();
  await expect(page.getByPlaceholder('Enter your email address')).not.toBeEmpty();
  await expect(FooterText).toBeVisible();
});

test("Validate video is playing", async ({ page }) => {
  await page.goto("https://cargox.io/");

  const videoLocator = page.locator('video'); 

  // Assertions
  await expect(videoLocator).toHaveJSProperty('paused', false);
  await expect(videoLocator).toBeVisible();
}); 