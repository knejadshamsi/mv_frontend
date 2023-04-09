<script>
    import bus_stops from "$lib/images/bus_stops.svg"
    import bus_routes from "$lib/images/bus_routes.svg"
    import metro_stations from "$lib/images/metro_stations.svg"
    import metro_lines from "$lib/images/metro_lines.svg"
    import bicycle_stations from "$lib/images/bicycle_stations.svg"
    import "@fontsource/poppins"
    import "@fontsource/poppins/600.css";
</script>

<div id="info_toggle_con">
    <button class="info_toggle_btn">
        <img class="it_btn_img" src="{bus_stops}" alt="">
        <span class="it_btn_text">Bus stops</span>
    </button>
    <button class="info_toggle_btn">
        <img class="it_btn_img" src="{bus_routes}" alt="">
        <span class="it_btn_text">Bus routes</span>
    </button>
    <button class="info_toggle_btn">
        <img class="it_btn_img" src="{metro_stations}" alt="">
        <span class="it_btn_text">Metro stations</span>
    </button>
    <button class="info_toggle_btn">
        <img class="it_btn_img" src="{metro_lines}" alt="">
        <span class="it_btn_text">Metro routes</span>
    </button>
    <button class="info_toggle_btn">
        <img class="it_btn_img" src="{bicycle_stations}" alt="">
        <span class="it_btn_text">Bicycle stations</span>
    </button>
</div>

<style>
    :root {
        --btn_height: 2.25rem;
        --btn_img_height: 1.5rem;
    }
#info_toggle_con {
    width: auto;
    flex-grow: 1;
    z-index: 100;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.info_toggle_btn {
    height: var(--btn_height);
    border: 1.5px solid darkgray;
    border-radius: 20px;
    background: lightgray;
    padding: 0.25rem;
    margin-inline: 0.125rem;
    margin-block: 0.5rem;
    user-select: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: scale(0.95);
}
.info_toggle_btn img {
    padding: 0.125rem;
    padding-left: 0.25rem;
}
.it_btn_img {
    height: var(--btn_img_height);
}
.it_btn_text {
    margin-left: 0.25rem;
    font-family: "poppins", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    padding-right: 0.25rem;
}
</style>