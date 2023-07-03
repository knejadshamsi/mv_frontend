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
		<SecondaryMenu />
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
		z-index: 100;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
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
