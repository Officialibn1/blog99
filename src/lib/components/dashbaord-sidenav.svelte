<script lang="ts">
	import { page } from '$app/stores';

	import {
		LayoutDashboard,
		LogOut,
		Newspaper,
		NotebookPen,
		Settings,
		Tags,
		UsersRound,
		ChartColumnStacked
	} from 'lucide-svelte';
	import { Button } from './ui/button';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { cn } from '$lib/utils';

	type DashboardSideLinks = {
		name: string;
		href: string;
		icon: ComponentType<Icon>;
	};

	const dashboardSideLinks: DashboardSideLinks[] = [
		{
			name: 'Dashbaord',
			href: '/dashboard',
			icon: LayoutDashboard
		},
		{
			name: 'New Blog',
			href: '/dashboard/blogs/new',
			icon: NotebookPen
		},
		{
			name: 'Blogs',
			href: '/dashboard/blogs',
			icon: Newspaper
		},
		{
			name: 'Tags',
			href: '/dashboard/blog-tags',
			icon: Tags
		},
		{
			name: 'Categories',
			href: '/dashboard/blog-categories',
			icon: ChartColumnStacked
		},

		{
			name: 'Subscribers',
			href: '/dashboard/subscribers',
			icon: UsersRound
		},
		{
			name: 'Settings',
			href: '/dashboard/settings',
			icon: Settings
		}
	];
</script>

<aside>
	<ul>
		{#each dashboardSideLinks as { name, href, icon }, i}
			<li>
				<Button
					onclick={() => goto(href)}
					variant={$page.url.pathname === href ? 'secondary' : 'ghost'}
					class={cn(
						'gap-2 font-openSans justify-start text-xs tracking-wide p-2 font-semibold text-gray-500 rounded-sm',
						$page.url.pathname === href && 'text-gray-900'
					)}><svelte:component this={icon} size={20} strokeWidth={2} /> <span>{name}</span></Button
				>
			</li>
		{/each}

		<li>
			<form method="POST" use:enhance action="/signout?">
				<Button
					type="submit"
					variant="destructive"
					class="gap-2 font-openSans justify-start text-xs tracking-wide p-2 font-semibold rounded-sm"
					><LogOut color="#fff" size={20} strokeWidth={2} /><span class="text-white">Sign Out</span
					></Button
				>
			</form>
		</li>
	</ul>
</aside>

<style lang="postcss">
	aside {
		@apply w-fit min-h-screen px-4 py-4;

		& ul {
			@apply flex flex-col gap-5 w-full h-full;

			& li {
				@apply w-full flex flex-col last:mt-auto last:mb-20;

				& span {
					@apply hidden lg:block;
				}
			}
		}
	}
</style>
