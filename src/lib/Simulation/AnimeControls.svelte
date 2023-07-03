<script lang="ts">
  import type { BooleanObject } from "$lib/CustomTypes";
  import {scenario_logic,speed_indicator_logic,speed_indicator} from "./sim_store"
  import {sim_panel_logic} from "$lib/Interface/Interface_stores"
  import {function_map} from './ac_functions'
  import * as ACFunction from './ac_functions'

  let button_protection = false

function SLCurrent(scenario_logic : BooleanObject):string | null {
  for (let scenario in scenario_logic) {
    if (scenario_logic[scenario]==true) {
      return scenario as string
    }
  }
  return null
}

function AnimationButton(action: string) {
  let current_scenario : string | null= SLCurrent($scenario_logic)
  if (current_scenario == null) {
    console.log("Error! Somethings Not Right!")
  } else {
    let the_correct_function : string = function_map[current_scenario][action]
    //@ts-ignore
    ACFunction[the_correct_function]()
  }
}

</script>

<div id="simpanel_con">
    <button class="sim_btn" id="sim_slow" on:click={()=>{AnimationButton("SlowDown")}}>
      <svg style="rotate:180deg"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12l-12 8v-16l12 8zm0-8v16l12-8-12-8z"/></svg>
    </button>
    <button class="sim_btn" id="sim_play" on:click={()=> {if (button_protection==false) {speed_indicator_logic.set(true);button_protection = true;AnimationButton("Play")}}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
    </button>
    <button class="sim_btn" id="sim_pause" on:click={()=> {button_protection = false;AnimationButton("Pause")}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>
    </button>
    <button class="sim_btn" id="sim_fast" on:click={()=> {AnimationButton("SpeedUP")}}>
      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12l-12 8v-16l12 8zm0-8v16l12-8-12-8z"/></svg>
    </button>
    <button class="sim_btn" id="sim_reset" on:click={()=> {speed_indicator_logic.set(false);button_protection = false;AnimationButton("Reset")}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/></svg>
    </button>
    <button id="sim_close" class="sim_btn" on:click={()=> {sim_panel_logic.set(false)}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"/></svg>
    </button>
</div>
{#if $speed_indicator_logic}
<span id="speed_ind">{$speed_indicator}</span>
{/if}

<style> 
  #simpanel_con {
    width: 100%;
    height: 2.125rem;
    background-color: lightgray;
    border: 2px solid darkgray;
    z-index: 102;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .sim_btn {
    height: 100%;
    display: grid;
    place-items: center;
    aspect-ratio: 1/1;
    margin-right: 0.125rem;
    background: none;
    border: none;
    transform: scale(0.95);
    cursor: pointer;
    transition: 0.25s ease;
  }
  .sim_btn:hover {
    margin-bottom: 0.25rem;
  }
  #speed_ind {
    width: 100%;
    height: 2.5rem;
    background-color: rgba(132,21,38,1);
    z-index: 103;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    user-select: none;
  }
  #sim_play {
    padding-right: 0;
  }
  #sim_reset,#sim_pause {
    padding-left: 0;
  }
  #sim_fast {
    padding-left: 0.125rem;
  }
  /* #sim_close {
    margin-left: auto;
  } */
</style>