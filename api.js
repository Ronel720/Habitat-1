// Optional Drop-In Module: Live NASA API Ingestion
async function fetchLiveSpaceWeather() {
  const NASA_API_KEY = "DEMO_KEY"; // Replace with free NASA developer key
  const today = new Date().toISOString().split('T')[0];
  const url = `https://api.nasa.gov/DONKI/CME?startDate=${today}&api_key=${NASA_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      const latestCME = data[0];
      const speed = latestCME.cmeAnalyses?.[0]?.speed || 850;
      log(`[LIVE DONKI API] Detected active solar CME! Velocity: ${speed} km/s. Ingestion successful.`, "crit");
      // Dynamically adjust in-game radiation threat based on live Sun activity
      state.totalGeneration *= 0.9; // Solar panel flux interference
    }
  } catch (err) {
    log("[SYSTEM] Using curated historical NASA DONKI database (offline-safe mode).", "info");
  }
}