<script>
    import ScenaroOne from "./1/ScenaroOne.svelte"
    //import ScenaroTwo from "./2/ScenaroTwo.svelte"
    import {scenario} from "$lib/Interface/StateManagement"
</script>

{#if $scenario===1}
<ScenaroOne/>
{/if}
