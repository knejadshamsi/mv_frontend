<script lang="ts">
    import {scenario_logic} from './sim_store'
    import type {BooleanObject} from "$lib/CustomTypes"

    let scenario_toggle: BooleanObject;
    scenario_logic.subscribe((value)=> {
        scenario_toggle = value as BooleanObject
    })
    function scenario_toggling(id:string) {
        for (let scenario in scenario_toggle) {
            if (scenario==id) {
                scenario_toggle[scenario] = true
            } else {
                scenario_toggle[scenario] = false
            }
        }
        scenario_logic.set(scenario_toggle as { 1: boolean; 2: boolean; 3: boolean; })
    }
</script>
<div id="scenario_list_con">
    <input class="scenario_list_input" type="checkbox" id="scenario_1_check" bind:checked={scenario_toggle["1"]} on:click={()=> {scenario_toggling("1")}} />
    <label class="scenario_list" for="scenario_1_check" >
        <span class="it_btn_text">scenario 1</span>
    </label>
    <input class="scenario_list_input" type="checkbox" id="scenario_2_check" bind:checked={scenario_toggle["2"]} on:click={()=> {scenario_toggling("2")}} />
    <label class="scenario_list" for="scenario_2_check" >
        <span class="it_btn_text">scenario 2</span>
    </label>
    <input class="scenario_list_input" type="checkbox" id="scenario_3_check" bind:checked={scenario_toggle["3"]} on:click={()=> {scenario_toggling("3")}} />
    <label class="scenario_list" for="scenario_3_check" >
        <span class="it_btn_text">scenario 3</span>
    </label>
</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    #scenario_list_con {
    width: auto;
    height: auto;
    background-color: lightgray;
    border: 2px solid darkgray;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    }
    .scenario_list {
        background: none;
        text-align: left;
        padding-left: 1rem;
        padding-right: 1.5rem;
        padding-left: 0.125rem;
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