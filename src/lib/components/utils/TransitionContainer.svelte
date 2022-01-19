<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<section
	in:fly={{ delay: 500, y: 10, duration: 500 }}
	out:fly={{ y: -10, duration: 500 }}
	class="content"
>
	<slot />
</section>
