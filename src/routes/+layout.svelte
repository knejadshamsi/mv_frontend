<script>
	import VisualisationMenu from '$lib/Interface/VisualisationMenu.svelte';
	import MainMenu from './MainMenu.svelte';
    import SecondaryMenu from './SecondaryMenu.svelte';
	import './styles.css';
	import './visualization.css'
</script>

<div class="app">
	<div id="interface">
		<MainMenu />
		<VisualisationMenu />
	</div>
	<SecondaryMenu />
	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		min-height: 100lvh;
		min-height: 100vh;
		position: relative;
	}
	#interface { 
		position: absolute;
		z-index: 100;
		display: flex;
		margin: 0.5rem 0 0 0.5rem;
	}
	main {
		height: 100lvh;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
	}
</style>
