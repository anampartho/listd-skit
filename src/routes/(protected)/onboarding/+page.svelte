<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/Button.svelte';
	let { data }: PageProps = $props();

	console.log({ data });
</script>

<div class="card flex flex-col items-center justify-center">
	<div
		class="card card-hover block w-96 max-w-md divide-y overflow-hidden border-[1px] border-surface-200-800 divide-surface-200-800 preset-filled-surface-100-900"
	>
		<h1 class="p-4 text-center text-3xl font-bold uppercase">Welcome to Listd!</h1>

		<div class="space-y-4 p-4">
			<form class="flex flex-col gap-2">
				<label class="label">
					<span class="label-text">Name</span>
					<input class="input" type="text" placeholder="Name" value={data?.session?.user.name} />
				</label>
				<label class="label">
					<span class="label-text">Color Scheme</span>
					<select class="select" value={data?.session?.user.colorScheme ?? 'system'}>
						<option value="system">System</option>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
				</label>
			</form>
		</div>
		<footer class="flex items-center justify-center gap-4 p-4">
			<Button>Complete Onboarding</Button>
		</footer>
	</div>
</div>
