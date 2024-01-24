<script lang="ts">
    import Header from '$lib/Interface/Header.svelte'
    import Panel from '$lib/Interface/Panel.svelte'
    import ActionMenu from '$lib/Interface/ActionMenu.svelte'
    import {state} from "$lib/Interface/StateManagement"
</script>
<section>
    <Header />
    {#if $state === "Menu"} 
    <Panel />
    {/if}
    <ActionMenu />
</section>
<style>
    section {
        z-index: 100;
        display: flex;
        flex-direction: column;
    }
</style>