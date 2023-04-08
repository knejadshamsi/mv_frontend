<script>
	import logo from '$lib/images/move_logo.svg';
	import "@fontsource/poppins"
	import "@fontsource/poppins/700.css";
</script>

<header>
	<button id="menu_btn">
		<img src="{logo}" alt="MOVE's logo">
	</button>
	<div id="title">
		<span id="Abbreviation">MOVE</span>
		<span id="full">Montreal's OpenStreetMap Virtual Environment</span>
	</div>

</header>


<style>
	:root {
		--header_height: 4rem;
		--header_bg: linear-gradient(to bottom, rgba(132,21,38,1), rgba(132,21,38,1))
	}
	header {
		width: 100%;
		height: var(--header_height);
		background: var(--header_bg);
		color: var(--brand_white);
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
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
		font-size: 2.5rem;
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
	}
</style>
