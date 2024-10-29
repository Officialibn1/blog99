<script lang="ts">
	import {
		LayoutDashboard,
		LogOut,
		Newspaper,
		NotebookPen,
		Settings,
		UsersRound
	} from 'lucide-svelte';
	import { Button } from './ui/button';
</script>

<aside>
	<ul>
		<li>
			<Button
				class="gap-2 font-openSans justify-start text-xs tracking-wide p-2"
				variant="secondary"><LayoutDashboard size={24} strokeWidth={2} /> Dashbaord</Button
			>
		</li>

		<li>
			<Button
				class="gap-2 font-openSans justify-start text-xs tracking-wide p-2"
				variant="secondary"><NotebookPen size={24} strokeWidth={2} /> New Blog</Button
			>
		</li>

		<li>
			<Button
				class="gap-2 font-openSans justify-start text-xs tracking-wide p-2"
				variant="secondary"><Newspaper size={24} strokeWidth={2} /> Blogs</Button
			>
		</li>

		<li>
			<Button
				class="gap-2 font-openSans justify-start text-xs tracking-wide p-2"
				variant="secondary"><UsersRound size={34} strokeWidth={2} /> Subscribers</Button
			>
		</li>

		<li>
			<Button
				class="gap-2 font-openSans justify-start text-xs tracking-wide p-2"
				variant="secondary"><Settings size={24} strokeWidth={2} /> Settings</Button
			>
		</li>

		<li>
			<Button
				class="gap-2 font-openSans justify-start text-xs tracking-wide p-2"
				variant="destructive"><LogOut color="#fff" size={24} strokeWidth={2} /> Sign Out</Button
			>
		</li>
	</ul>
</aside>

<style lang="postcss">
	aside {
		@apply w-1/5 xl:w-1/12 min-h-screen px-4 py-20;

		& ul {
			@apply flex flex-col gap-5 w-full h-full;

			& li {
				@apply w-full flex flex-col last:mt-auto;
			}
		}
	}
</style>
