<script lang="ts">
	let { children, ...rest } = $props();
</script>

<button class="btn font-bold preset-filled-secondary-500" {...rest}>{@render children()}</button>
