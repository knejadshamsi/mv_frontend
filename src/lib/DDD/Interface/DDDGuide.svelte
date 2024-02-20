<script>
    import { fly } from 'svelte/transition';
</script>
<button in:fly|global={{duration:150}} out:fly|global={{duration:150}}  class="guide_btn">W,A,S,D to walk</button>
<button in:fly|global={{duration:150}} out:fly|global={{duration:150}}  class="guide_btn">Shift to run</button>
<button in:fly|global={{duration:150}} out:fly|global={{duration:150}}  class="guide_btn">Space to jump</button>
<button in:fly|global={{duration:150}} out:fly|global={{duration:150}}  class="guide_btn">Left click to select</button>
<button in:fly|global={{duration:150}} out:fly|global={{duration:150}}  class="guide_btn">Right click to deselect</button>
<button in:fly|global={{duration:150}} out:fly|global={{duration:150}}  class="guide_btn">E to bring up a menu</button>
<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    .guide_btn {
    z-index: 100;
    font-family: "poppins", sans-serif;
    font-weight: 650;
    font-size: 0.8rem;
    padding-right: 0.25rem;
    height: var(--btn_height);
    border: 1.5px solid darkgray;
    border-radius: 10px;
    background: lightgray;
    margin-left: 0.125rem;
    padding-inline: 0.45rem;
    user-select: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: scale(0.95);
}
</style>