import axios from "axios";
import cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const stocks = [];

    $("table tr").each((index, element) => {
      if (index !== 0) {
        const tds = $(element).find("td");
        const stock = {
          sn: tds.eq(0).text().trim(),
          symbol: tds.eq(1).text().trim(),
          ltp: tds.eq(2).text().trim(),
          pointChange: tds.eq(3).text().trim(),
          change: tds.eq(4).text().trim(),
          open: tds.eq(5).text().trim(),
          high: tds.eq(6).text().trim(),
          low: tds.eq(7).text().trim(),
          volume: tds.eq(8).text().trim(),
          prevClose: tds.eq(9).text().trim(),
        };
        stocks.push(stock);
      }
    });

    return NextResponse.json(stocks);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
