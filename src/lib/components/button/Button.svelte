<script lang="ts">
	export let handleClick = (e) => null;
	export let btnType: 'small' | 'medium' = 'medium';
	export let isDisabled = false;
	const onClick = (e) => {
		if (!isDisabled) {
			handleClick(e);
		}
	}
</script>

<button
	class="bg-emerald-600 rounded-full hover:bg-emerald-400 text-white {btnType === 'medium'
		? 'py-4 px-7'
		: 'py-2 px-4'}
		{isDisabled ? 'cursor-not-allowed pointer-events-none bg-emerald-400' : ''}
	"
	on:click={onClick}
	disabled={isDisabled}
>
	<slot />
</button>
