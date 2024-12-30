<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import * as Table from '$lib/components/ui/table';
	import BlogsTableActions from './blogs-table-actions.svelte';
	import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import TableBadge from '$lib/components/table-badge.svelte';
	import type { BlogWithComments } from './+page';

	type Props = {
		blogs: BlogWithComments[];
	};

	const { blogs }: Props = $props();

	const table = createTable(readable(blogs), {
		page: addPagination({
			initialPageSize: 8
		}),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: '',
			cell: ({ value }) => {
				return `${value}.`;
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'title',
			header: 'Title'
		}),
		table.column({
			accessor: 'published',
			header: 'Status',
			cell: ({ value }) => {
				return value
					? // @ts-expect-error
						createRender(TableBadge, {
							variant: 'secondary',
							className: 'bg-green-300/50 text-green-900 pointer-events-none',
							title: 'Published'
						})
					: // @ts-expect-error
						createRender(TableBadge, {
							variant: 'secondary',
							className: 'bg-yellow-300/50 text-yellow-900 pointer-events-none',
							title: 'Draft'
						});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'comments',
			header: 'Comments',
			cell: ({ value }) => {
				return value ? value.length : 0;
			}
		}),
		table.column({
			accessor: 'views',
			header: 'Total Views'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				// @ts-expect-error
				return createRender(BlogsTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;

	const { filterValue } = pluginStates.filter;

	const pageCountArray = $derived(Array.from({ length: $pageCount }, (_, index) => index));
</script>

<section>
	<div class="search-filter-container">
		<Input
			bind:value={$filterValue}
			placeholder="Filter by Title, Comments or Views..."
			type="text"
			class="max-w-md mx-auto bg-white shadow-none rounded-sm"
		/>
	</div>

	<div class="table-container min-h-[500px]">
		<Table.Root {...$tableAttrs}>
			<Table.Header class="bg-white">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										<div
											class={cell.id === 'views' || cell.id === 'comments'
												? 'text-right font-openSans'
												: cell.id === ''
													? 'flex justify-end font-openSans'
													: 'font-openSans'}
										>
											{#if cell.id === 'title' || cell.id === 'comments' || cell.id === 'views'}
												<Button variant="ghost" onclick={props.sort.toggle}>
													<Render of={cell.render()} />

													<ArrowUpDown class="ml-2 h-4 w-4" />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</div>
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>

			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} class="even:bg-slate-200/50 ">
							{#each row.cells as cell}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<div
											class={cell.id === 'views' || cell.id === 'comments'
												? 'text-right font-number mr-3'
												: cell.id === ''
													? 'flex justify-center '
													: cell.id !== 'published'
														? 'ml-4'
														: ''}
										>
											<Render of={cell.render()} />
										</div>
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>

		{#if blogs.length === 0}
			<h1 class="text-3xl font-medium text-center mt-5">There are no blogs</h1>
		{/if}
	</div>

	<div class="pagination-container">
		<Button
			variant="outline"
			size="icon"
			onclick={() => {
				hasPreviousPage && ($pageIndex = $pageIndex - 1);
			}}
			disabled={!$hasPreviousPage}
		>
			<ChevronLeft />
		</Button>

		<div>
			{#each pageCountArray as page (page)}
				<Button
					size="icon"
					variant={$pageIndex === page ? 'outline' : 'secondary'}
					onclick={() => ($pageIndex = page)}
				>
					{page + 1}
				</Button>
			{/each}
		</div>
		<Button
			variant="outline"
			size="icon"
			onclick={() => ($pageIndex = $pageIndex + 1)}
			disabled={!$hasNextPage}
		>
			<ChevronRight />
		</Button>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col gap-5 pt-10 h-full;
	}

	.table-container {
		@apply mt-5;
	}

	.pagination-container {
		@apply flex gap-5 justify-end mt-20;

		& > div {
			@apply flex gap-2 items-center;
		}
	}
</style>
