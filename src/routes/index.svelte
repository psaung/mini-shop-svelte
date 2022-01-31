<script context="module" lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import TransitionContainer from '$lib/components/utils/TransitionContainer.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Experimenting SSR with svelte kit" />
</svelte:head>

<TransitionContainer>
	<h1 class="max-w-4xl mx-auto pb-5">Mini Shop!</h1>
	<p>This project is experimenting how's page and SSR working with svelte kit and supabase.</p>
	<ul class="mt-5">
		<li>
			[Svelete kit](<a href="https://kit.svelte.dev" class="link" target="_blank" rel="noreferrer"
				>https://kit.svelte.dev</a
			>)
		</li>
		<li class="my-5">
			[Supabase](<a href="https://supabase.io" class="link" rel="noreferrer" target="_blank"
				>https://app.supabase.io</a
			>)
		</li>
		<li>
			<a target="_blank" href="https://icons8.com/icon/ePAVVWQeNuBC/shopping-cart" class="link"
				>Cart</a
			>
			icon by
			<a target="_blank" href="https://icons8.com" class="link">Icons8</a>
		</li>
	</ul>

	<div class="items-center flex justify-center mt-10">
		<a sveltekit:prefetch href="/products">
			<Button>Go To Product Page</Button>
		</a>
	</div>
</TransitionContainer>
