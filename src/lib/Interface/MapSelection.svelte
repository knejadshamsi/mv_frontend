<script>
    import {state} from "$lib/Interface/StateManagement"
    import { fly } from 'svelte/transition'
</script>
<div id="info" in:fly={{duration:250}}>
    <div id="title"><span>Please select the area.</span><button class="info_btn" id="info_cancel" on:click={()=>state.set("Emissions")}>Cancel</button><button class="info_btn" on:click={()=>state.set("Emissions")}>Confirm</button></div>
    <div id="help">
        <div class="help_items">test</div>
        <div class="help_items">test</div>
        <div class="help_items">test</div>
        <div class="help_items">test</div>
    </div>
</div>

<style>
    @import "@fontsource/poppins";
    #info {
        position: absolute;
        top: 8%;
        right: 35%;
        left: 35%;
        height: 6rem;
        background: var(--brand_main);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "poppins", sans-serif;
    }
    #title {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    #title span {
        width: 100%;
        height: 4rem;
        color: var(--brand_white);
        font-size: 1.5rem;
        font-weight: 700;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 1;
        margin-left: 1rem;
    }
    .info_btn {
        height: 2rem;
        margin-right: 1rem;
        cursor: pointer;
        font-weight: 600;
        padding: 0.25rem;
        padding-inline: 0.5rem;
        border: 1px solid white;
        border-radius: 10px;
    }
    #info_cancel {
        background-color: var(--brand_main);
        color: white;
    }
    #help {
        width: 100%;
        height: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: lightgray;
        color: black;
    }
    .help_items {
        flex-grow: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 1rem;
    }
</style>