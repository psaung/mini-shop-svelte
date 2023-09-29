<script lang="ts">
    const list = [1, 2, 3]
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each list as l}
   <div>{l}</div> 
{/each}
