<script lang="ts">
	import { spring } from 'svelte/motion';

	export let step = 0;

	const displayed_count = spring();

	$: displayed_count.set(step);

	$: offset = modulo($displayed_count, 1);
	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="step-viewport">
	<div class="step-digits" style="transform: translate(0, {100 * offset}%)">
		<strong style="top: -100%" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
		<strong>{Math.floor($displayed_count)}</strong>
	</div>
</div>

<style>
	.step-viewport {
		width: 2em;
		height: 2em;
		margin: 0 0.5em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.step-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--accent-color);
		align-items: center;
		justify-content: center;
	}

	.step-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
