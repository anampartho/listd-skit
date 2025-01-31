<script lang="ts">
	import '../app.css';
	import AppHeader from '$lib/components/AppHeader.svelte';

	let { children } = $props();
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<AppHeader />

	<!-- Main -->
	<main class="space-y-4 p-4">
		{@render children()}
	</main>
</div>
