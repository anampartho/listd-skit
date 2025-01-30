<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<form method="POST" action="?/register">
	<label>
		Username
		<input name="username" type="text" />
	</label>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<button>Log in</button>
</form>

{#if data.users.length > 0}
	<ul>
		{#each data.users as user}
			<li>{user.id} - {user.email} - {user.username}</li>
		{/each}
	</ul>
{/if}
