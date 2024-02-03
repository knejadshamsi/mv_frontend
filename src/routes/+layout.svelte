<script>
	import Toggles from '$lib/Interface/Toggles.svelte'
	import Menu from '$lib/Interface/Menu.svelte'
    import SecondMenu from '$lib/Interface/SecondMenu.svelte'
	import './styles.css'
	import './visualization.css'
	import { onNavigate } from '$app/navigation'
	import {page} from '$lib/Interface/StateManagement'
	import DDDGuide from '$lib/DDD/Interface/DDDGuide.svelte'


	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

</script>

<div class="app">
	<Menu />
	{#if $page === "Map"}
	<Toggles />
	<SecondMenu />
	{:else if $page === "3D"}
	<DDDGuide />
	{/if}
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
