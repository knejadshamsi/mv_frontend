<script lang="ts">
import expRoute from "$lib/geodata/route_output.json"
import {location} from './stores'
    let steps = 500
    let coords = expRoute.features[0].geometry.coordinates
    let i =0
    let counter = 0 
    let freq = 3
    let anime:number;
    let speed_toggle = false
    let start_protection = false
    const speed = {
      1: "fastest",
      2: "faster",
      3: "normal",
      4: "slower",
      5: "slowest"
    }
    function AnimeStart() {
      return new Promise((resolve)=>{
        Animation();
        resolve();
      })
    }
    
    function Animation() {
        counter++
        if (counter%freq==0) {
          i++
          location.set(coords[i])
        }
        if (i < (steps-1)) {
          anime = requestAnimationFrame(Animation)
        }
      }
    function AnimationReset() {
      cancelAnimationFrame(anime)
      i=0;
      counter=0;
      freq=3
      start_protection = false
      location.set([-73.579374, 45.495724])
    }
    function AnimationPause(){
      cancelAnimationFrame(anime)
      start_protection = false
    }
    function AnimationSlowDown() {
      if (freq < 5){
        freq++
      }
    }
    function AnimationSpeedUP() {
      if (freq > 1) {
        freq = freq - 1
      }
    }
</script>

<div id="simpanel_con">
    <button class="sim_btn" id="sim_slow" on:click={AnimationSlowDown}>
      <svg style="rotate:180deg"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12l-12 8v-16l12 8zm0-8v16l12-8-12-8z"/></svg>
    </button>
    <button class="sim_btn" id="sim_play" on:click={()=> { if (start_protection==false) {AnimeStart().then(()=>{speed_toggle=true;start_protection = true})}}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
    </button>
    <button class="sim_btn" id="sim_pause" on:click={AnimationPause}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>
    </button>
    <button class="sim_btn" id="sim_fast" on:click={AnimationSpeedUP}>
      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12l-12 8v-16l12 8zm0-8v16l12-8-12-8z"/></svg>
    </button>
    <button class="sim_btn" id="sim_reset" on:click={()=> {AnimationReset();speed_toggle=false }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/></svg>
    </button>
    {#if (speed_toggle==true)}
    <span id="speed_ind">{speed[freq]}</span>
    {/if}
</div>

<style> 
  #simpanel_con {
    width: auto;
    height: 2rem;
    background-color: lightgray;
    border-radius: 25px;
    border: 2px solid darkgray;
    padding: 0.125rem;
    z-index: 102;
    position: absolute;
    top:7.5rem;
    left:1rem;
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
    /*background-color:darkgray;
    border-radius: 50%;*/
    margin-bottom: 0.25rem;
  }
  #speed_ind {
    height: 100%;
    border-radius: 0 25px 25px 0;
    background-color: rgba(132,21,38,1);
    z-index: 103;
    color: white;
    display: flex;
    align-items: center;
    padding-inline: 0.5rem ;
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
</style>