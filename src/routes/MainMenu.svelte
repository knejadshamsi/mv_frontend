<script lang="ts">
    import Header from '$lib/Interface/Header.svelte';
    import Panel from '$lib/Interface/Panel.svelte';
    import ThirdMenu from '$lib/Interface/ThirdMenu.svelte';
    import {panel_logic} from "$lib/Interface/Interface_stores"
    
</script>
<section>
    <Header />
    {#if $panel_logic} 
    <Panel />
    {/if}
    <ThirdMenu />
</section>
<style>
    section {
        display: flex;
        flex-direction: column;
        margin: 0.75rem 0.5rem 0 0.5rem;
    }
</style>