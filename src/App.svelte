<!-- @format -->
<script>
  import CobeGlobe from "./CobeGlobe.svelte";
  let domain = "";
  let recordType = "A";
  let results = [];
  let loading = false;
  let error = null;

  const dnsServers = [
    { ip: "8.8.8.8", name: "Google DNS" },
    { ip: "1.1.1.1", name: "Cloudflare DNS" },
    { ip: "9.9.9.9", name: "Quad9 DNS" },
    { ip: "208.67.222.222", name: "OpenDNS" },
    { ip: "84.200.69.80", name: "DNS.Watch" },
    { ip: "8.26.56.26", name: "Comodo Secure DNS" },
    { ip: "195.46.39.39", name: "SafeDNS" },
    { ip: "156.154.70.1", name: "Neustar DNS" },
    { ip: "185.228.168.9", name: "CleanBrowsing DNS" },
    // Add more DNS servers as needed
  ];

  async function getServerLocation(ip) {
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/geo`);
      if (!response.ok) {
        throw new Error("Failed to fetch server location");
      }
      return response.json();
    } catch (err) {
      return { error: err.message };
    }
  }

  async function checkPropagation() {
    loading = true;
    error = null;
    results = [];
    try {
      const fetchPromises = dnsServers.map(async (server) => {
        const [dnsResult, location] = await Promise.all([
          fetch(
            `/api/dns-query?domain=${domain}&type=${recordType}&server=${server.ip}`
          )
            .then((response) => response.json())
            .catch((err) => ({ error: err.message })),
          getServerLocation(server.ip),
        ]);
        return { server: server.name, ip: server.ip, dnsResult, location };
      });
      results = await Promise.all(fetchPromises);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<main>
  <div class="parent">
    <div class="div1">
      <CobeGlobe />
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
        <button type="submit" disabled={loading}>Check</button>
      </form>

      {#if loading}
        <p>Loading...</p>
      {/if}

      {#if error}
        <p style="color: red;">Error: {error}</p>
      {/if}

      {#if results.length > 0}
        <h2>Results for {domain}</h2>
        <ul>
          {#each results as result}
            <li>
              <strong>{result.server}:</strong>
              {#if result.dnsResult.error}
                <span style="color: red;">{result.dnsResult.error}</span>
              {:else}
                <span>{result.dnsResult.records}</span>
              {/if}
              {#if result.location.error}
                <span style="color: red;">{result.location.error}</span>
              {:else}
                <p>
                  Location: {result.location.city}, {result.location.region}, {result
                    .location.country}
                </p>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
  }

  .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }

  input,
  select {
    padding: 0.5em;
    margin-right: 0.5em;
  }
  button {
    padding: 0.5em;
  }
</style>
