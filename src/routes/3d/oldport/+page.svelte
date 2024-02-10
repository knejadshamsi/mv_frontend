<script>
    import oldport from '$lib/Images/stickers/DALL_E_OLD_PORT.png'
    import Scene from './Scene.svelte'
    import { Canvas } from '@threlte/core'
    import { World  } from '@threlte/rapier'
    import {page} from '$lib/Interface/StateManagement'
    import {  onMount } from 'svelte';
    import {meshList,dialog3d} from '$lib/LibStores'

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
{#if $dialog3d}
<section id="dialog_con">
   <div id="dialog">
        <button id="dialog_close" on:click={()=>dialog3d.set(false)}><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg></button>
        <span>You have selected {$meshList.length} buildings</span>
        <button class="dialog_btn">Demo function 1</button>
        <button class="dialog_btn">Demo function 2</button>
        <button class="dialog_btn">Demo function 3</button>
        <button class="dialog_btn">Demo function 4</button>
    </div>
</section>
{/if}
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
    span {
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
    #dialog_con {
        background: rgba(255, 255, 255, 0.3);
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        
    }
    #dialog {
        position: relative;
        background: var(--color-bg-1);
        border-radius: 5px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #dialog span {
        padding-block: 1rem;
    }
    .dialog_btn {
        width: 100%;
        padding-block: 0.5rem;
        padding-inline: 1rem;
        margin-top: 0.5rem;
        border-radius: 5rem;
        font-family: "Poppins", sans-serif;
        font-size: 1rem;
        font-weight: 700;
        border: none;
    }
    #dialog_close {
        width: 1.75rem;
        aspect-ratio: 1/1;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
    }
</style>