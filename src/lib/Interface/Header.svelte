<script>
	import logo from '$lib/Images/move_logo.svg'
	import {state} from '$lib/Interface/StateManagement'
	import { fade, fly } from 'svelte/transition'
</script>

<header in:fly|global={{duration:150}} out:fade|global={{duration:50}}>
	<button id="menu_btn" on:click={()=> { if ($state === "Menu") {state.set("Visualisation")} else {state.set("Menu")}}}>
		<img src="{logo}" alt="MOVE's logo">
	</button>
	<div id="title" >
		{#if $state != "Emissions"}
		<span id="Abbreviation">MOVE</span>
		<span id="full">Montreal's OSM Virtual Environment</span>
		{/if}
	</div>
	
</header>
<style>
	@import "@fontsource/poppins";
	@import "@fontsource/poppins/700.css";
	:root {
		--header_height: 3.5rem;
		--header_bg: linear-gradient(to bottom, rgba(132,21,38,1), rgba(132,21,38,1))
	}
	header {
		height: var(--header_height);
		background: var(--header_bg);
		color: var(--brand_white);
		padding-block: 0.75rem;
		padding-inline: 0.75rem;
		display: flex;
		flex-direction: row;
		user-select: none;
	}
	#menu_btn {
		background: none;
		border: none;
		height: var(--header_height);
		margin-inline: 0.5rem;
		cursor: pointer;
	}
	#menu_btn img {
		height: var(--header_height);
	}
	#Abbreviation {
		font-size: 2.25rem;
		line-height: 2.125rem;
		font-family: "Poppins", sans-serif;
		font-weight: 700;
	}
	#title {
		height: var(--header_height);
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-family: "Poppins", sans-serif;
		font-size: 0.70rem;
		padding-right: 0.5rem;
	}
</style>
