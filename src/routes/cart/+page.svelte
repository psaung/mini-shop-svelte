<script context="module">

	import TransitionContainer from '$lib/components/utils/TransitionContainer.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<TransitionContainer>
	<h1 class="pb-5">About this app</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<!-- TODO lose the @next! -->
	<pre>npm init svelte@next</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>
</TransitionContainer>
