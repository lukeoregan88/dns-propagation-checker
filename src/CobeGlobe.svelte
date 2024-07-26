<!-- @format -->
<!-- src/CobeGlobe.svelte -->
<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(async () => {
    // Dynamically import Cobe from the CDN
    const createGlobe = (await import("https://cdn.skypack.dev/cobe")).default;

    let phi = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 300 * 2,
      height: 300 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        state.phi = phi;
        phi += 0.001;
      },
    });
  });
</script>

<div class="globe">
  <canvas bind:this={canvas} style="width: 100%; height: 600px;"></canvas>
</div>

<style>
  .globe {
    display: grid;
    place-items: center;
    place-content: center;
    height: 100vh;
    width: 100%;
  }
  canvas {
    display: block;
    margin: 0 auto;
  }
</style>
