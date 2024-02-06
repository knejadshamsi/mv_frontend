<script>
    import oldport from '$lib/Images/stickers/DALL_E_OLD_PORT.png'
    import Scene from './Scene.svelte'
    import { Canvas } from '@threlte/core'
    import { World  } from '@threlte/rapier'
    import {page} from '$lib/Interface/StateManagement'
    import {  onMount } from 'svelte';

    onMount(()=> { 
        page.set("3D")
    })
    
</script>
<section> 
    <div class="logo">
        <img id="logo-test" src={oldport} alt="old port" />
    </div>
    <div class="dec">
        <span>OLD PORT</span>
        <p class="shrt_dec">The Old Port of Montreal, nestled along the St. Lawrence River, is a historic gem in the city's heart, blending its rich trading past with modern vibrancy. Renowned for its stunning skyline views, this cultural hub features attractions like the interactive Montreal Science Centre and the iconic Clock Tower. It's a year-round hotspot for activities ranging from zip-lining to ice-skating, alongside hosting diverse festivals. The Old Port, with its cobblestone streets and culinary delights, embodies Montreal's spirit, offering a unique mix of history and contemporary urban life.</p>
        <div class="loading">LOADING....</div>
    </div>
</section>
<main><Canvas><World><Scene /></World></Canvas></main>

<style>
    @import "@fontsource/poppins";
	@import "@fontsource/poppins/700.css";
    section,main {
        width: 100vw;
        height: 100vh;
        height: 100lvh;
        overflow: hidden;
        background-color: var(--color-bg-1);
        background-image: radial-gradient( 50% 50% at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100% ), linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%)
    }
    section {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        display: flex;
        flex-direction: row;
        }
    main {
        z-index: 2;
    }
    .logo, .dec {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .logo {
        flex-grow: 1;
        align-items: center;
    }
    #logo-test {
        width: 400px;
        margin-left: 5rem;
        view-transition-name: img;
    }   
    .dec {
        flex-grow: 1.5;
        font-family: "Poppins", sans-serif;
    }
    .dec span {
        font-size: 2rem;
        font-weight: 700;
        padding-bottom: 0.5rem;
    }
    .dec p {
        width: 65ch;
    }
    .loading {
        font-weight: 700;
    }
</style>