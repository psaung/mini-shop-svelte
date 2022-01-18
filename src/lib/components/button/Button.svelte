<script lang="ts">
	export let handleClick = () => null;
	export let btnType: 'small' | 'medium' = 'medium';
	export let isDisabled = false;
</script>

<button
	class="bg-emerald-600 rounded-full  hover:bg-emerald-400 text-white {btnType === 'medium'
		? 'py-4 px-7'
		: 'py-2 px-4'}"
	on:click={handleClick}
	disabled={isDisabled}
>
	<slot />
</button>
