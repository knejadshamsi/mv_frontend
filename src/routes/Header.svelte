<script>
	import logo from '$lib/images/move_logo.svg';
	import "@fontsource/poppins"
	import "@fontsource/poppins/700.css";
	import {sim_panel_logic} from "./stores"
	let simtoggle = false
	sim_panel_logic.subscribe((value)=> {
		simtoggle = value
    })
</script>

<header>
	<button id="menu_btn" on:click={()=> {simtoggle = !simtoggle;sim_panel_logic.set(simtoggle)}}>
		<img src="{logo}" alt="MOVE's logo">
	</button>
	<div id="title">
		<span id="Abbreviation">MOVE</span>
		<span id="full">Montreal's OSM Virtual Environment</span>
	</div>
</header>



<style>
	:root {
		--header_height: 4rem;
		--header_bg: linear-gradient(to bottom, rgba(132,21,38,1), rgba(132,21,38,1))
	}
	header {
		height: var(--header_height);
		background: var(--header_bg);
		color: var(--brand_white);
		padding: 0.75rem;
		margin: 0.5rem;
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
	}
</style>
