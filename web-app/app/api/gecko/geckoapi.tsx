export async function getLatestCoinsData() {
    const latestCoinIds = [ "bitcoin", "ethereum ", "solana", "dogecoin", "tron" ];

    const params = new URLSearchParams({
        "vs_currency": "usd",
        "ids": latestCoinIds.join(",")
    });
    
    const resp = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${params}`);
    if (!resp.ok) {
        return { msg: "Error: failed to retrieve coins." };
    }

    const data = await resp.json();
    return data;
}