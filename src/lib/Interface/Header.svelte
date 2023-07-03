<script>
	import logo from '$lib/Images/move_logo.svg';
	import {panel_logic} from "./Interface_stores";
	import { fade, fly } from 'svelte/transition';
</script>

<header in:fly={{duration:150}} out:fade={{duration:50}}>
	<button id="menu_btn" on:click={()=> {panel_logic.set(!$panel_logic)}}>
		<img src="{logo}" alt="MOVE's logo">
	</button>
	<!-- {#if $panel_logic}
	<button id="panel_close" on:click={()=> {panel_logic.set(false)}}>
		<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
		</svg>
	</button>
	{/if} -->
	<div id="title" >
		<span id="Abbreviation">MOVE</span>
		<span id="full">Montreal's OSM Virtual Environment</span>
	</div>
	
</header>
<style>
	@import "@fontsource/poppins";
	@import "@fontsource/poppins/700.css";
	:root {
		--header_height: 4rem;
		--header_bg: linear-gradient(to bottom, rgba(132,21,38,1), rgba(132,21,38,1))
	}
	header {
		height: var(--header_height);
		background: var(--header_bg);
		color: var(--brand_white);
		padding-block: 0.75rem;
		padding-inline: 0.125rem;
		border-radius: 20px;
		display: flex;
		flex-direction: row;
		user-select: none;
		box-shadow: 1px 6px 32px -9px rgba(0,0,0,0.5);
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
		font-size: 2rem;
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
		font-size: 0.75rem;
		padding-right: 0.5rem;
	}
</style>
