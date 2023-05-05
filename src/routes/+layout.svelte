<script>
	import Header from './Header.svelte';
	import ToggleMenu from './ToggleMenu.svelte';
	import BRMenu from './BRMenu.svelte';
	import {interface_logic} from './stores'
	import './styles.css';
	let layouttoggle = {}
	interface_logic.subscribe((value)=> {
		layouttoggle = value
	})

</script>



<div class="app">
	<div id="interface">
		<Header />
		<ToggleMenu />
		{#if (layouttoggle.br == true)}
		<BRMenu />
		{/if}
	</div>

	<!-- add menu here-->
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
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		flex-direction: row;
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
