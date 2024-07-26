<!-- @format -->
<script>
  import CobeGlobe from "./CobeGlobe.svelte";
  let domain = "";
  let recordType = "A";
  let expectedIp = "";
  let results = [];
  let loading = false;
  let error = null;
  let markers = [];
  let markersReady = false;

  const dnsServers = [
    { ip: "8.8.8.8", name: "Google DNS" },
    { ip: "1.1.1.1", name: "Cloudflare DNS" },
    { ip: "194.145.240.6", name: "Fivestar DNS" },
    { ip: "5.2.75.75", name: "AHA DNS" },
    { ip: "9.9.9.9", name: "Quad9 DNS" },
    { ip: "208.67.222.222", name: "OpenDNS" },
    { ip: "84.200.69.80", name: "DNS.Watch" },
    { ip: "8.26.56.26", name: "Comodo Secure DNS" },
    { ip: "195.46.39.39", name: "SafeDNS" },
    // Add more DNS servers as needed
  ];

  // Reactive statement to clear results when recordType changes
  $: if (recordType) {
    results = [];
  }

  async function getServerLocation(ip) {
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/geo`);
      if (!response.ok) {
        throw new Error("Failed to fetch server location");
      }
      const data = await response.json();
      const [lat, lng] = data.loc.split(",").map(Number);
      return { ...data, lat, lng };
    } catch (err) {
      return { error: err.message };
    }
  }

  async function checkPropagation() {
    loading = true;
    error = null;
    results = [];
    markers = [];
    markersReady = false;
    try {
      const fetchPromises = dnsServers.map(async (server) => {
        const [dnsResult, location] = await Promise.all([
          fetch(`https://networkcalc.com/api/dns/lookup/${domain}`)
            .then((response) => response.json())
            .catch((err) => ({ error: err.message })),
          getServerLocation(server.ip),
        ]);
        markers.push({ location: [location.lat, location.lng], size: 0.03 });
        return {
          server: server.name,
          ip: server.ip,
          dnsResult: dnsResult.records[recordType],
          location,
        };
      });
      results = await Promise.all(fetchPromises);
      markersReady = true;
      console.log("Markers:", markers);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function getHighlightClass(record, type) {
    if (!expectedIp) return "";
    let valueToCompare;
    switch (type) {
      case "A":
      case "AAAA":
        valueToCompare = record.address;
        break;
      case "CNAME":
        valueToCompare = record.address;
        break;
      case "MX":
        valueToCompare = record.exchange;
        break;
      case "NS":
        valueToCompare = record.nameserver;
        break;
      case "TXT":
        valueToCompare = record;
        break;
      default:
        valueToCompare = "";
    }
    return valueToCompare === expectedIp ? "highlight-green" : "highlight-red";
  }

  function formatDNSRecord(record, type) {
    switch (type) {
      case "A":
      case "AAAA":
      case "CNAME":
        return `${record.address}`;
      case "MX":
        return `${record.exchange}`;
      case "NS":
        return `${record.nameserver}`;
      case "TXT":
        return `${record}`;
      default:
        return JSON.stringify(record);
    }
  }
</script>

<main>
  <div class="parent">
    <div class="div1">
      {#if markersReady}
        <CobeGlobe {markers} />
      {:else}
        <CobeGlobe />
      {/if}
    </div>
    <div class="div2">
      <h1>DNS Propagation Checker</h1>
      <form on:submit|preventDefault={checkPropagation}>
        <input
          type="text"
          bind:value={domain}
          placeholder="Enter domain name"
          required
        />
        <select bind:value={recordType}>
          <option value="A">A</option>
          <option value="AAAA">AAAA</option>
          <option value="CNAME">CNAME</option>
          <option value="MX">MX</option>
          <option value="NS">NS</option>
          <option value="TXT">TXT</option>
        </select>
        <input
          type="text"
          bind:value={expectedIp}
          placeholder="Expected Result (optional)"
        />
        <button type="submit" disabled={loading}>Check</button>
      </form>

      {#if loading}
        <p>Checking DNS...</p>
      {/if}

      {#if error}
        <p style="color: red;">Error: {error}</p>
      {/if}

      {#if results.length > 0}
        <h2>Results for {domain}</h2>
        <ul>
          {#each results as result, i}
            <li
              class="fade-in {getHighlightClass(
                result.dnsResult[0] || {},
                recordType
              )}"
              style="animation-delay: {i * 0.2}s;"
            >
              <div class="resultInner">
                <div class="dns">
                  <span><strong>{result.server} ({result.ip}):</strong></span>
                  {#if result.location.error}
                    <span class="location" style="color: red;">
                      <small>{result.location.error}</small></span
                    >
                  {:else}
                    <span class="location">
                      <small
                        >Location: {result.location.region}, {result.location
                          .country}</small
                      >
                    </span>
                  {/if}
                </div>
                <div>
                  {#if result.dnsResult.error}
                    <span style="color: red;">{result.dnsResult.error}</span>
                  {:else}
                    {#each result.dnsResult as record}
                      <div class={getHighlightClass(record, recordType)}>
                        {formatDNSRecord(record, recordType)}
                      </div>
                    {/each}
                  {/if}
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</main>
<footer>
  <p>
    Made with ❤️ by
    <a href="https://github.com/lukeoregan88" target="_blank">Luke O'Regan</a>
    <br />
    <strong>BTC address</strong>: 328fUT3qVNZJ8EbHGaZ3M1VvCzEbFGW39f
  </p>
</footer>

<style>
  main {
    min-height: 100vh;
    width: 100vw;
    height: auto;
  }
  footer {
    text-align: center;
    background-color: #ffffff;
    color: #333;
    width: calc(100vw - 2em);
    padding: 1em;
    height: calc(10vh - 2em);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  footer p {
    margin: 0;
  }
  .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100vw;
    min-height: 100vh;
    height: auto;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;
    min-height: 100vh;
    height: auto;
    width: 50vw;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    min-height: calc(100vh - 2em);
    height: auto;
    padding: 2em 1em;
    display: flex;
    align-content: center;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
    width: calc(50vw - 2em);
  }

  input,
  select {
    padding: 0.5em;
    margin-right: 0.5em;
  }
  button {
    padding: 0.5em;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 0.5em;
  }

  li span {
    display: inline-block;
  }

  li .resultInner {
    display: flex;
    justify-content: space-between;
  }

  li .dns {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    opacity: 0; /* Start with the items hidden */
    animation: fadeIn 1s forwards; /* 1s duration, forwards to keep the final state */
  }

  .highlight-green {
    background-color: lightgreen;
    color: black;
  }

  .highlight-red {
    background-color: lightcoral;
  }

  .dnsResult {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
</style>
