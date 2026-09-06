import fetch from 'node-fetch';

async function testApi() {
  try {
    console.log("Testing /api/visa-flights?featured=true...");
    const res = await fetch('http://localhost:3000/api/visa-flights?featured=true');
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data count:", Array.isArray(data) ? data.length : "Not an array");
    if (res.status !== 200) {
      console.log("Error body:", data);
    }
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testApi();
