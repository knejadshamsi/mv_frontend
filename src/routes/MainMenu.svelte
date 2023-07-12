<script lang="ts">
    import Header from '$lib/Interface/Header.svelte';
    import Panel from '$lib/Interface/Panel.svelte';
    import ThirdMenu from '$lib/Interface/ThirdMenu.svelte';
    import {state} from "$lib/Interface/StateManagement"
</script>
<section>
    <Header />
    {#if $state === "Menu"} 
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