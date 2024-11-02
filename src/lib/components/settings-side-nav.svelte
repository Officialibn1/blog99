<script lang="ts">
	import { page } from '$app/stores';
	import { BellDot, Icon, Settings2, User } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { goto } from '$app/navigation';
	import type { ComponentType } from 'svelte';
	import { blogs } from '$lib/dummy-datas/blogs';

	type DashboardSideLinks = {
		name: string;
		href: string;
		icon: ComponentType<Icon>;
	};

	const dashboardSideLinks: DashboardSideLinks[] = [
		{
			name: 'Profile',
			href: '/dashboard/settings/profile',
			icon: User
		},
		{
			name: 'Blog Settings',
			href: '/dashboard/settings',
			icon: Settings2
		},
		{
			name: 'Notifications',
			href: '/dashboard/settings/notifications',
			icon: BellDot
		}
	];
</script>

<aside>
	<ul>
		{#each dashboardSideLinks as { icon, href, name }, i (i)}
			<li>
				<Button
					disabled={name === 'Notifications'}
					class="p-2 rounded-sm text-xs items-center justify-start gap-2 font-openSans font-semibold text-gray-900/80 "
					variant={$page.url.pathname === href ? 'secondary' : 'ghost'}
					onclick={() => goto(href)}
					><svelte:component this={icon} size={20} strokeWidth={2} /> {name}</Button
				>
			</li>
		{/each}
	</ul>
</aside>

<style lang="postcss">
	aside {
		@apply flex h-1/2 p-3 bg-white rounded-sm;

		& ul {
			@apply flex flex-col gap-5;

			& li {
				@apply flex w-full flex-col;
			}
		}
	}
</style>
