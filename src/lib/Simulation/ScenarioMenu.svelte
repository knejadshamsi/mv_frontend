<script lang="ts">
    import {scenario} from "$lib/Interface/StateManagement"
    import {map} from "$lib/LibStores"
    let check1 :boolean = true
    let check2 : boolean,check3 :boolean = false
    $: if ($scenario === 1) {
        if ($map) {
        $map.flyTo({center:[-73.5834,45.4937],zoom:15.5})
        }
        check2 = false
        check3 = false
    } else if($scenario === 2) {
        check1 = false
        check3 = false
    } else if($scenario === 3){
        check1 = false
        check2 = false
    }
</script>
<div id="scenario_list_con">
    <input class="scenario_list_input" type="checkbox" id="scenario_1_check" bind:checked={check1} on:click={()=> {scenario.set(1)}} />
    <label class="scenario_list" for="scenario_1_check" >
        <span class="it_btn_text">scenario 1</span>
    </label>
    <input class="scenario_list_input" type="checkbox" id="scenario_2_check" bind:checked={check2} on:click={()=> {scenario.set(2)}} />
    <label class="scenario_list" for="scenario_2_check" >
        <span class="it_btn_text">scenario 2</span>
    </label>
    <input class="scenario_list_input" type="checkbox" id="scenario_3_check" bind:checked={check3} on:click={()=> {scenario.set(3)}} />
    <label class="scenario_list" for="scenario_3_check" >
        <span class="it_btn_text">scenario 3</span>
    </label>
</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    #scenario_list_con {
    width: 100%;
    background-color: lightgray;
    border: 2px solid darkgray;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    }
    .scenario_list {
        background: none;
        text-align: left;
        padding-inline: 1rem;
        padding-block: 0.5rem;
        border: none;
        border-bottom: 1px solid darkgray;
        font-family: "poppins", sans-serif;
        font-weight: 600;
        cursor: pointer;
    }
    .scenario_list:active {
        background: darkgray;
    }
    .scenario_list_input {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
    }
    .scenario_list_input:checked + .scenario_list {
        background: darkgray;
    }
</style>