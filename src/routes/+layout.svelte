<script>
	import Header from './Header.svelte';
	import VisualisationMenu from '$lib/Interface/VisualisationMenu.svelte';
	import BusRoutesMenu from '$lib/Interface/BusRoutesMenu.svelte';
	import {interface_logic,sim_panel_logic} from './stores'
	import './styles.css';
	import './visualization.css'
    import SimulationPanel from '$lib/Simulation/SimulationPanel.svelte';
	let sim_panel_class = "interface_horizontal" 
	$: if ($sim_panel_logic) {
		sim_panel_class = "interface_vertical"
	} else {
		sim_panel_class = "interface_horizontal" 
	}


</script>

<div class="app">
	<div id="interface" class={sim_panel_class}>
		<Header />
		{#if !$sim_panel_logic}
			<VisualisationMenu />
			{#if $interface_logic["br"]}
				<BusRoutesMenu />
			{/if}
		{:else}
			<SimulationPanel />
		{/if}
	</div>
	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	#interface {
		width: 100%;
		position: absolute;
		top: 0.75rem;
		left: 0.5rem;
		z-index: 100;
		display: flex;
		/**flex-direction: row;**/
		justify-content: flex-start;
		align-items: flex-start;
	}
	.interface_vertical {
		flex-direction: column;
	}
	.interface_horizontal {
		flex-direction: row;
	}
	main {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		margin: 0 auto;
		box-sizing: border-box;
		z-index: 1;
	}
</style>
