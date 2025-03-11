<script lang="ts">
	import { AppBar, Avatar, ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { SignOut } from '@auth/sveltekit/components';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
</script>

<AppBar>
	{#snippet lead()}
		<h1 class="mb-0 flex items-center font-extrabold">LISTD</h1>
	{/snippet}
	{#snippet trail()}
		<div class="flex items-center gap-4">
			<button><Icon icon="lucide:sun-moon" width={24} height={24} /></button>
			{#if page.data.session?.user}
				<Avatar
					name={page.data.session?.user?.name ?? 'User'}
					src={page.data.session.user.image ?? undefined}
					classes="w-7 h-7"
				/>
				<SignOut>
					<div slot="submitButton" class="variant-ringed-primary btn px-0">
						<Icon icon="lucide:log-out" width={24} height={24} />
					</div>
				</SignOut>
			{/if}
		</div>
	{/snippet}
</AppBar>
