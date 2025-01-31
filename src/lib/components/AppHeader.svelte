<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import Icon from '@iconify/svelte';
</script>

<AppBar>
	{#snippet lead()}
		<h1 class="mb-0 flex items-center font-extrabold">LISTD</h1>
	{/snippet}
	{#snippet trail()}
		<button><Icon icon="lucide:sun-moon" width={24} height={24} /></button>
	{/snippet}
</AppBar>
