const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // note.comログイン
  await page.goto('https://note.com/login');
  await page.fill('input[name="user[email]"]', process.env.NOTE_EMAIL);
  await page.fill('input[name="user[password]"]', process.env.NOTE_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/home**');
  
  // 新規投稿
  await page.click('[data-testid="fab"]');
  await page.fill('[data-testid="note-title"]', 'IPS解析第N節 | 鈴木悠起也');
  await page.fill('[data-testid="note-editor"]', `調和公理: H(x)=limφ→∞Σ(多様性×関係性)\n\n情報創発理論の物理法則。`);
  await page.click('[data-testid="publish-button"]');
  
  await browser.close();
})();
