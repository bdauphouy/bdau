<script lang="ts">
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<span
	class="{variant === 'primary'
		? 'bg-primary text-secondary ring-primary/20'
		: 'text-secondary ring-secondary/20'} inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-2"
>
	<slot />
</span>
