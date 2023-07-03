<script>
    import { fade, fly } from 'svelte/transition';
    import {panel_logic,sim_panel_logic} from "$lib/Interface/Interface_stores"
</script>
<div id="MainMenu" in:fly={{duration:150}}>
    <div id="Menu_list">
        <button class="Menu_btn" on:click={()=> {panel_logic.set(false); sim_panel_logic.set(true)}}>SIMULATION</button>
        <button class="Menu_btn">PTA</button>
        <!-- <button class="Menu_btn"></button> -->
    </div>
</div>


<style>
    #MainMenu {
        width: 100%;
        background-color: rgba(132,21,38,0.8);
        z-index: 102;
        margin-top: 0.5rem;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        backdrop-filter: blur(5px);
        user-select: none;
    }
    .Menu_btn {
        width: 100%;
        padding-inline: 1.75rem;
        padding-block: 0.25rem;
        background: none;
        color: white;
        margin: 0.5rem;
        border: none;
        user-select: none;
        font-family: "poppins", sans-serif;
        font-weight: 700;
        font-size: 1.25rem;
        cursor: pointer;
        text-align: left;
    }
    #Menu_list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>