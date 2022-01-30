<script context="module">
	export async function load({ session }) {
		return {
			props: {
				t: session.theme
			}
		};
	}
</script>

<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import MiniCart from '$lib/components/cart/MiniCart.svelte';
	import theme from '$lib/shared/stores/theme';

	import '../app.css';

	export let t;

	theme.set(t);
</script>

<section class={$theme === 'dark' ? 'dark' : 'light'}>
	<div class="dark:bg-gray-900 bg-white dark:text-white min-h-screen">
		<Header />

		<main>
			<MiniCart />
			<slot />
		</main>
	</div>
</section>

<style>
</style>
