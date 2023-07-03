<script lang="ts">
  import { fade } from 'svelte/transition';
  import AnimeControls from "./AnimeControls.svelte"
  import ScenarioMenu from "./ScenarioMenu.svelte"
</script>


<div id="anime_control_con" in:fade={{duration:150}}>
  <AnimeControls />
  <ScenarioMenu />
</div>

<style>
  @import "@fontsource/poppins";
  @import "@fontsource/poppins/600.css";
  #anime_control_con {
    width: 100%;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
}
</style>
