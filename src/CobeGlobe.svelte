<!-- @format -->
<!-- src/CobeGlobe.svelte -->
<script>
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { tick } from "svelte";

  export let markers = [];

  let canvas;
  let globe;

  const initializeGlobe = async () => {
    // @ts-ignore
    const createGlobe = (await import("https://cdn.skypack.dev/cobe")).default;

    let phi = 0;

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 400 * 2,
      height: 400 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 2,
      scale: 3,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [1, 1, 0],
      glowColor: [0.1, 0.1, 0.1],
      offset: [0, 0],
      markers,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001;
      },
    });
  };

  onMount(() => {
    initializeGlobe();
  });

  afterUpdate(async () => {
    if (markers.length > 0) {
      if (globe) {
        globe.destroy();
      }
      await tick(); // Wait for DOM updates
      initializeGlobe();
    }
  });

  onDestroy(() => {
    if (globe) {
      globe.destroy();
    }
  });
</script>

<canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>

<style>
  canvas {
    display: block;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
</style>
