<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import MiniCart from '$lib/components/cart/MiniCart.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<MiniCart />
	<slot />
</main>

<style>
</style>
