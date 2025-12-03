// backend/src/services/leaders.js
import puppeteer from "puppeteer";

/**
 * Busca líderes de qualquer leaderboard (global ou regional)
 * @param {string} url - URL do leaderboard
 * @param {number} limit - número máximo de jogadores para retornar
 */
export async function fetchLeaders(url = "https://royaleapi.com/decks/leaderboard", limit = 3) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Vai até a página do leaderboard
    await page.goto(url, { waitUntil: "networkidle2" });

    // Aguarda o container dos decks aparecer
    await page.waitForSelector("#deck_results", { timeout: 60000 }); // aumenta timeout para garantir carregamento

    // Extrai os dados diretamente da página
    const leaders = await page.evaluate((limit) => {
        const players = document.querySelectorAll("#deck_results .deck_segment");
        const results = [];

        for (let i = 0; i < Math.min(limit, players.length); i++) {
            const el = players[i];
            const data = {};

            data.playerName = el.querySelector(".player_name")?.innerText.trim() || null;
            data.playerLink = el.querySelector(".player_name")?.getAttribute("href") || null;

            data.clanName = el.querySelector(".clan_name a")?.innerText.trim() || null;
            data.clanLink = el.querySelector(".clan_name a")?.getAttribute("href") || null;

            data.rank = el.querySelector(".lb_deck_info .rank")?.innerText.trim() || null;
            data.avgElixir = el.querySelector(".lb_deck_info .item:nth-child(3)")?.innerText.trim() || null;
            data.rating = el.querySelector(".lb_deck_info .item:nth-child(5)")?.innerText.trim() || null;

            const deckImgs = el.querySelectorAll("a.deck_lb__deck_row img.deck_card");
            data.deckCards = Array.from(deckImgs).map(img => ({
                name: img.getAttribute("alt"),
                icon: img.getAttribute("src")
            }));

            data.deckLink = el.querySelector("a.deck_lb__deck_row")?.getAttribute("href") || null;
            data.copyLink = el.querySelector("a[href*='copyDeck']")?.getAttribute("href") || null;
            data.qrCode = el.querySelector(".qrcode_button")?.getAttribute("data-qrcode") || null;

            results.push(data);
        }

        return results;
    }, limit);

    await browser.close();
    return leaders;
}

/**
 * Formata os líderes para o frontend (posição, nome, deck)
 */
export function formatLeadersForFrontend(leaders) {
    return leaders.map((l, index) => ({
        position: index + 1,
        name: l.playerName,
        deck: l.deckCards.map(c => ({
            name: c.name,
            icon: c.icon,
            elixir: null
        }))
    }));
}
