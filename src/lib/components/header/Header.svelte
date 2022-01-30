<script lang="ts">
	import { page } from '$app/stores';
	import ToggleButton from '$lib/components/button/ToggleButton.svelte';

	import theme from '$lib/shared/stores/theme';

	$: isDark = $theme !== 'light';

	async function toggleTheme() {
		const t = isDark ? 'light' : 'dark';
		await fetch('/theme.json', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				theme: t
			})
		});

		theme.set(t);
	}
</script>

<header>
	<nav>
		<ul>
			<li class:active={$page.path === '/'}>
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li class:active={$page.path === '/cart'}><a sveltekit:prefetch href="/cart">About</a></li>
			<li class:active={$page.path === '/products'}>
				<a sveltekit:prefetch href="/products">Products</a>
			</li>
		</ul>
	</nav>

	<div class="corner mt-2">
		<ToggleButton active={isDark} handleClick={toggleTheme} />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		max-width: var(--column-width);
		margin: 0 auto;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		column-gap: 20px;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
