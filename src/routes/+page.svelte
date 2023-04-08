<script>
	//import welcome_fallback from '$lib/images/svelte-welcome.png';
	// OpenLayers
    import  Map  from 'ol/Map';
    import TileLayer from 'ol/layer/Tile';

    // Svelte
    import View from 'ol/View';
    import OSM from 'ol/source/OSM';
	import {fromLonLat} from 'ol/proj';
	import gsap from 'gsap'
    // Exports
    let mapId = "map";
    // Local state
    // @ts-ignore
    let map = null;

    // functions
    // @ts-ignore
    const setupMap = (node) => {
        const osmLayer = new TileLayer({
            source: new OSM()
        })
        map = new Map({
            target: node.id,
            layers: [
                osmLayer,
            ],
            view: new View({
                // @ts-ignore
                center: fromLonLat([-73.683333, 45.5529323]),
                zoom: 11,
            })
        });
		// @ts-ignore
		let header_timeline = gsap.timeline({duration:0.2,paused:true})
		header_timeline.to("header",{ background: "linear-gradient(to bottom, rgba(132,21,38,0.4) 40%, rgba(132,21,38,0)", duration:0.5,ease:"power4.out"},'ha')
		.to("#full", {opacity:0.3},'ha')
		.to(["#Abbreviation","#menu_btn"], {opacity:0.7}, 'ha')
		map.on('movestart', ()=>{header_timeline.play()});
		map.on('moveend', ()=>{header_timeline.reverse()});
        return {
            destroy() {
                // @ts-ignore
                if (map) { // as Map
                    map.setTarget(null);
                    map = null;
                }
            }
        }
    }
</script>

<svelte:head>
	<title>MOVE</title>
	<meta name="description" content="MOVE main page" />
</svelte:head>


<section id={mapId} class="map" use:setupMap >
</section>

<style>
	section {
		width: auto;
		min-height: 100vh;
	}
	.map {
		width: 100vw;
		height: 100vh;
	}

</style>
