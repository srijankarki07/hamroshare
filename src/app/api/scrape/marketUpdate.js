// app/api/scrape/marketUpdate.js

import axios from "axios";
import cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://www.sharesansar.com/live-trading";
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const marketUpdates = [];

    $(".market-update .mu-list").each((index, element) => {
      const marketUpdate = {
        title: $(element).find("h4").text().trim(),
        price: $(element).find(".mu-price").text().trim(),
        value: $(element).find(".mu-value").text().trim(),
        percent: $(element).find(".mu-percent").text().trim(),
      };
      marketUpdates.push(marketUpdate);
    });

    return NextResponse.json(marketUpdates);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
