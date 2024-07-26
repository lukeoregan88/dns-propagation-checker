/** @format */

import express from "express";
import dns from "dns";
import fetch from "node-fetch";

const app = express();
const port = 3001;

const getServerLocation = async (ip) => {
  const response = await fetch(`https://ipinfo.io/${ip}/geo`);
  if (!response.ok) {
    throw new Error("Failed to fetch server location");
  }
  return response.json();
};

app.get("/api/dns-query", async (req, res) => {
  const { domain, type, server } = req.query;

  const resolver = new dns.promises.Resolver();
  resolver.setServers([server]);

  try {
    const [records, location] = await Promise.all([
      resolver.resolve(domain, type),
      getServerLocation(server),
    ]);
    res.status(200).json({ records, location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
