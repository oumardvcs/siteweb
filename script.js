const $ = (id) => document.getElementById(id);
const fmt = (n, d = 2) =>
  new Intl.NumberFormat("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }).format(Number(n));

async function getBTCPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data?.bitcoin) throw new Error("Format inattendu");
    $("btc-price").textContent = `Bitcoin :  ${fmt(data.bitcoin.eur)} EUR`;
  } catch (e) {
    $("btc-price").textContent = "Erreur chargement BTC 😢";
    console.error("BTC error:", e);
  }
}



function updateAll() {
  getBTCPrice();

}

updateAll();
setInterval(updateAll, 60000);


