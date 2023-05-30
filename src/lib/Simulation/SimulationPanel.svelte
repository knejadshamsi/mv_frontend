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
  #anime_control_con {
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
}
</style>
