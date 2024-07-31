<!-- @format -->
<script>
  import CobeGlobe from "./CobeGlobe.svelte";
  import BuyMeACoffee from "./assets/BuyMeACoffee.svelte";

  let domain = "";
  let recordType = "A";
  let expectedIp = "";
  let loading = false;
  let showExpected = false;
  let recaptchaToken = "";
  let error = null;
  let results = [];
  let markers = [];
  let markersReady = false;

  const isProduction = process.env.NODE_ENV === "production";

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

    if (isProduction) {
      // Generate reCAPTCHA token
      // @ts-ignore
      grecaptcha.ready(async () => {
        // @ts-ignore
        recaptchaToken = await grecaptcha.execute(
          "6LfJ1bsZAAAAAFZIfAjw0M8zVRnEopUxG67Bw7Sg",
          {
            action: "submit",
          }
        );

        // Send the token to your PHP script for verification
        const response = await fetch("verify-recaptcha.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ token: recaptchaToken }),
        });

        const data = await response.json();
        if (data.success) {
          // Proceed with your existing checkPropagation logic
          await performCheckPropagation();
        } else {
          console.error("reCAPTCHA verification failed", data.errors);
          error = "reCAPTCHA verification failed";
          loading = false;
        }
      });
    } else {
      // Skip reCAPTCHA in development
      await performCheckPropagation();
    }
  }

  async function performCheckPropagation() {
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
      //console.log("Markers:", markers);
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
  <div class="background-video">
    <video
      class="video"
      autoplay
      muted
      loop
      playsinline
      src="./121470-724697516_small.mp4"
    ></video>
  </div>
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
        <button
          class="expectedBtn"
          type="button"
          on:click={() => (showExpected = !showExpected)}
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><path
              class="fa-secondary"
              opacity=".4"
              d="M192 256a64 64 0 1 0 128 0 64 64 0 1 0 -128 0z"
            /><path
              class="fa-primary"
              d="M489.6 191.2c6.9-6.2 9.6-15.9 6.4-24.6c-4.4-11.9-9.7-23.3-15.8-34.3l-4.7-8.1c-6.6-11-14-21.4-22.1-31.2c-5.9-7.2-15.7-9.6-24.5-6.8l-55.7 17.7C359.8 93.6 345 85 329.2 78.4L316.7 21.3c-2-9.1-9-16.3-18.2-17.8C284.7 1.2 270.5 0 256 0s-28.7 1.2-42.5 3.5c-9.2 1.5-16.2 8.7-18.2 17.8L182.8 78.4c-15.8 6.5-30.6 15.1-44 25.4L83.1 86.1c-8.8-2.8-18.6-.3-24.5 6.8c-8.1 9.8-15.5 20.2-22.1 31.2l-4.7 8.1c-6.1 11-11.4 22.4-15.8 34.3c-3.2 8.7-.5 18.4 6.4 24.6l43.3 39.4C64.6 238.9 64 247.4 64 256s.6 17.1 1.7 25.4L22.4 320.8c-6.9 6.2-9.6 15.9-6.4 24.6c4.4 11.9 9.7 23.3 15.8 34.3l4.7 8.1c6.6 11 14 21.4 22.1 31.2c5.9 7.2 15.7 9.6 24.5 6.8l55.7-17.7c13.4 10.3 28.2 18.9 44 25.4l12.5 57.1c2 9.1 9 16.3 18.2 17.8c13.8 2.3 28 3.5 42.5 3.5s28.7-1.2 42.5-3.5c9.2-1.5 16.2-8.7 18.2-17.8l12.5-57.1c15.8-6.5 30.6-15.1 44-25.4l55.7 17.7c8.8 2.8 18.6 .3 24.5-6.8c8.1-9.8 15.5-20.2 22.1-31.2l4.7-8.1c6.1-11 11.4-22.4 15.8-34.3c3.2-8.7 .5-18.4-6.4-24.6l-43.3-39.4c1.1-8.3 1.7-16.8 1.7-25.4s-.6-17.1-1.7-25.4l43.3-39.4zM256 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            /></svg
          ></button
        >
        {#if showExpected}
          <input
            type="text"
            bind:value={expectedIp}
            placeholder="Expected Result (optional)"
          />
        {/if}

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
    <BuyMeACoffee />
  </p>
</footer>
