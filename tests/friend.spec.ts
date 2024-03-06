import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { test, expect } from "@playwright/test";

test("friend", async ({ page, browserName }) => {
  const name = "test1";
  const password = "123456";
  const email1 = `test-1-${browserName}@example.com`;
  const email2 = `test-2-${browserName}@example.com`;

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "start using" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/auth/login");

  //first user
  await page.getByRole("link", { name: "Don't have an account?" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/auth/register");

  await page.getByPlaceholder("John Doe").fill(name);
  await page.getByPlaceholder("john.doe@example.com").fill(email1);
  await page.getByPlaceholder("******").fill(password);
  await page.getByRole("button", { name: "Create an account" }).click();

  await page.waitForLoadState("networkidle");

  await expect(
    page.locator("div").filter({ hasText: /^Confirmation email sent!$/ }),
  ).toBeVisible();

  const verificationTokenEmail1 = await db.verificationToken.findFirst({
    where: { email: email1 },
  });

  await page.goto(
    `/auth/new-verification?token=${verificationTokenEmail1?.token}`,
  );

  await page.waitForLoadState("networkidle");

  await expect(
    page.locator("div").filter({ hasText: "Email verified!" }).nth(4),
  ).toBeVisible();

  //second user

  await page.goto("/auth/register");
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("John Doe").fill(name);
  await page.getByPlaceholder("john.doe@example.com").fill(email2);
  await page.getByPlaceholder("******").fill(password);
  await page.getByRole("button", { name: "Create an account" }).click();

  await page.waitForLoadState("networkidle");

  await expect(
    page.locator("div").filter({ hasText: /^Confirmation email sent!$/ }),
  ).toBeVisible();

  const verificationTokenEmail2 = await db.verificationToken.findFirst({
    where: { email: email2 },
  });

  await page.goto(
    `/auth/new-verification?token=${verificationTokenEmail2?.token}`,
  );

  await page.waitForLoadState("networkidle");

  await expect(
    page.locator("div").filter({ hasText: "Email verified!" }).nth(4),
  ).toBeVisible();

  // login first user

  await page.getByRole("link", { name: "Back to login" }).click();
  await expect(page).toHaveURL("/auth/login");
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("john.doe@example.com").fill(email1);
  await page.getByPlaceholder("******").fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(DEFAULT_LOGIN_REDIRECT);

  //friend request to second user

  await page.getByRole("navigation").getByRole("button").click();
  await page.getByRole("link", { name: "Friends" }).click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/friends");

  await page.getByPlaceholder("john.doe@example.com").fill(email2);
  await page.getByRole("button", { name: "search" }).click();
  await page.getByRole("img").nth(3).click();

  await page.getByRole("navigation").getByRole("button").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();

  //login with second user
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/auth/login?callbackUrl=%2Ffriends");

  await page.getByPlaceholder("john.doe@example.com").fill(email2);
  await page.getByPlaceholder("******").fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/friends");

  await page.getByRole("navigation").getByRole("button").click();
  await page.getByRole("link", { name: "Notifications" }).click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/notifications");
  await page.getByRole("img").nth(3).click();

  await page.getByRole("navigation").getByRole("button").click();
  await page.getByRole("link", { name: "Friends" }).click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("/friends");
  await expect(page.locator("body")).toContainText(email1);
});
