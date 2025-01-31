<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import YoutubeIcon from '$lib/icons/youtube.svelte';
</script>

<div class="card flex justify-center">
	<div
		class="card card-hover block max-w-md divide-y overflow-hidden border-[1px] border-surface-200-800 divide-surface-200-800 preset-filled-surface-100-900"
	>
		<div class="space-y-4 p-4">
			<div>
				<h3 class="h3 text-center">Welcome to Listd!</h3>
			</div>
			<p class="text-center opacity-60">
				A place where you can create and share your favorite feeds from Youtube and other platforms.
			</p>
		</div>
		<footer class="flex items-center justify-center gap-4 p-4">
			<Button>Login using Youtube</Button>
		</footer>
	</div>
</div>
