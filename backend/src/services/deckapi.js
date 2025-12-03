// backend/src/services/deckapi.js
import path from "path";
import { launchBrowser, getDailyCache } from "./scraperBase.js";

const URL = "https://royaleapi.com/decks/popular";
const CACHE_PATH = path.resolve("data/decks.json");

// pega dados completos do deck
async function extractDeckData(page, deck) {
    const data = {};
    data.deck_id = await page.evaluate(el => el.id, deck);
    data.data_name = await page.evaluate(el => el.getAttribute("data-name"), deck);

    data.name_desktop = await page.evaluate(el => el.querySelector(".deck_human_name-desktop")?.innerText.trim() || null, deck);
    data.name_mobile = await page.evaluate(el => el.querySelector(".deck_human_name-mobile")?.innerText.trim() || null, deck);

    data.cards = await page.evaluate(el => [...el.querySelectorAll("img.deck_card")].map(card => ({
        alt: card.getAttribute("alt"),
        card_key: card.getAttribute("data-card-key"),
        image: card.getAttribute("src")
    })), deck);

    data.copy_link = await page.evaluate(el => el.querySelector("a[href*='copyDeck']")?.getAttribute("href") || null, deck);
    data.qr_code = await page.evaluate(el => el.querySelector(".qrcode_button")?.getAttribute("data-qrcode") || null, deck);

    data.desktop_table = await page.evaluate(el => {
        try {
            const table = el.querySelector(".mobile-hide table");
            const rows = table.querySelectorAll("tr");
            const r1 = rows[1].querySelectorAll("td");
            const r2 = rows[2].querySelectorAll("td");
            return {
                rating: r1[0].innerText.trim(),
                usage_percent: r1[1].innerText.trim(),
                wins_percent: r1[2].innerText.trim(),
                draw_percent: r1[3].innerText.trim(),
                loss_percent: r1[4].innerText.trim(),
                usage_absolute: r2[1].innerText.trim(),
                wins_absolute: r2[2].innerText.trim(),
                draw_absolute: r2[3].innerText.trim(),
                loss_absolute: r2[4].innerText.trim()
            };
        } catch {
            return null;
        }
    }, deck);

    return data;
}

// busca deck no site
async function fetchDeck() {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: "networkidle2" });
    await page.waitForSelector(".deck_segment");

    const deckEl = (await page.$$(".deck_segment"))[0];
    const data = await extractDeckData(page, deckEl);

    await browser.close();
    return data;
}

// retorna só o básico para o frontend
function getBestDeck(deck) {
    return {
        name: deck.name_desktop || deck.name_mobile,
        winrate: deck.desktop_table?.wins_percent || null,
        usage: deck.desktop_table?.usage_percent || null,
        cards: deck.cards
    };
}

// função pública que lida com cache diário
export async function getDailyDeck() {
    const result = await getDailyCache(CACHE_PATH, fetchDeck);
    return { ...result, best: getBestDeck(result.data) };
}
