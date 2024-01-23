<script>
	import Toggles from '$lib/Interface/Toggles.svelte';
	import Menu from './Menu.svelte';
    import SecondaryMenu from './SecondaryMenu.svelte';
	import './styles.css';
	import './visualization.css'
</script>

<div class="app">
	<Menu />
	<Toggles />
	<SecondaryMenu />
	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		height: 100vh;
		height: 100lvh;
		box-sizing: border-box;
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		
	}
	main {
		height: 100lvh;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>
