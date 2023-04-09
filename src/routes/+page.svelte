<script>
	//import welcome_fallback from '$lib/images/svelte-welcome.png';
	// OpenLayers
    import  Map  from 'ol/Map';
    import TileLayer from 'ol/layer/Tile';
    import {defaults} from 'ol/control/defaults';
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
            controls: defaults({
                attribution:false,
                rotate:false,
                zoom:true
            }),
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
		let header_timeline = gsap.timeline({duration:0.2,paused:true, ease:"power4.out"})
		header_timeline.to("header",{ background: "linear-gradient(to bottom, rgba(132,21,38,0.4) , rgba(132,21,38,0)"},'ha')
		.to("#full", {opacity:0.3},'ha')
		.to("#Abbreviation", {textShadow:"-2px 3px 0px var(--brand_main)"}, 'ha')
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
<div id="map_control"></div>
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
