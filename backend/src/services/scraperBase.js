// backend/src/services/scraperBase.js
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

export async function launchBrowser() {
    return puppeteer.launch({ headless: "new" });
}

// Helpers para pegar texto ou atributo sem travar o scraper
export async function safeText(page, selector) {
    try {
        await page.waitForSelector(selector, { timeout: 1000 });
        return await page.$eval(selector, el => el.innerText.trim());
    } catch {
        return null;
    }
}

export async function safeAttr(page, selector, attr) {
    try {
        await page.waitForSelector(selector, { timeout: 1000 });
        return await page.$eval(selector, el => el.getAttribute(attr));
    } catch {
        return null;
    }
}

// Cache diário para qualquer scraper
export async function getDailyCache(cachePath, fetchFunction) {
    await fs.ensureDir(path.dirname(cachePath));
    await fs.ensureFile(cachePath);

    let file = {};
    try {
        file = await fs.readJSON(cachePath);
    } catch {}

    const today = new Date().toISOString().split("T")[0];

    if (file.date === today && file.data) {
        return { fromCache: true, data: file.data };
    }

    const data = await fetchFunction();
    await fs.writeJSON(cachePath, { date: today, data }, { spaces: 4 });

    return { fromCache: false, data };
}
