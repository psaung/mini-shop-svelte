<script lang="ts">
	import Step from './Step.svelte';

	export let count = 0;
	export let onDecrease;
	export let onIncrease;
</script>

<div class="counter">
	<button
		on:click={() => onDecrease(false)}
		aria-label="Decrease the counter by one"
		class="counter-btn"
	>
		<svg aria-hidden="true" viewBox="0 0 1 1" stroke="#fff" fill="#fff">
			<path d="M0,0.5 L1,0.5" fill="#fff" stroke="#fff" />
		</svg>
	</button>

	<Step step={count} />

	<button on:click={onIncrease} aria-label="Increase the counter by one" class="counter-btn">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button>
</div>

<style>
	.counter {
		display: flex;
		margin: 1rem 0;
	}

	.counter-btn {
		height: 32px;
		width: 32px;
		border-radius: 50%;
		background: #fff;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		width: 0.6em;
		height: 0.6em;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: var(--text-color);
	}
</style>
