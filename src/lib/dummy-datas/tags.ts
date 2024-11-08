export type Tag = {
	id: string;
	name: string;
	author: object;
	authorId: string;
	blogsId: string[];
	blogs: object[];
	createdAt: string;
	updatedAt: string;
};

export const tags: Tag[] = [
	{
		id: '1',
		name: 'JavaScript',
		author: { name: 'John Doe', email: 'john.doe@example.com' },
		authorId: '101',
		blogsId: ['1', '2', '3'],
		blogs: [
			{ title: 'Understanding JavaScript Closures', slug: 'understanding-javascript-closures' },
			{ title: 'Mastering Async/Await in JavaScript', slug: 'mastering-async-await-in-javascript' },
			{ title: 'Exploring the New Features in ES2023', slug: 'exploring-es2023-features' }
		],
		createdAt: '2024-01-10T12:00:00Z',
		updatedAt: '2024-01-12T14:00:00Z'
	},
	{
		id: '2',
		name: 'CSS',
		author: { name: 'Jane Smith', email: 'jane.smith@example.com' },
		authorId: '102',
		blogsId: ['4', '5'],
		blogs: [
			{ title: 'A Guide to CSS Flexbox', slug: 'guide-to-css-flexbox' },
			{ title: 'Building Accessible Web Applications', slug: 'building-accessible-web-apps' }
		],
		createdAt: '2024-02-15T09:30:00Z',
		updatedAt: '2024-02-18T16:45:00Z'
	},
	{
		id: '3',
		name: 'React',
		author: { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
		authorId: '103',
		blogsId: ['6', '7'],
		blogs: [
			{ title: 'Getting Started with React Hooks', slug: 'getting-started-with-react-hooks' },
			{
				title: 'Optimizing Performance in React Applications',
				slug: 'optimizing-performance-in-react'
			}
		],
		createdAt: '2024-03-20T11:15:00Z',
		updatedAt: '2024-03-22T17:00:00Z'
	},
	{
		id: '4',
		name: 'TypeScript',
		author: { name: 'Bob Brown', email: 'bob.brown@example.com' },
		authorId: '104',
		blogsId: ['8'],
		blogs: [
			{
				title: 'An Introduction to TypeScript for JavaScript Developers',
				slug: 'introduction-to-typescript'
			}
		],
		createdAt: '2024-04-05T14:25:00Z',
		updatedAt: '2024-04-06T19:00:00Z'
	},
	{
		id: '5',
		name: 'GraphQL',
		author: { name: 'Charlie Davis', email: 'charlie.davis@example.com' },
		authorId: '105',
		blogsId: ['9'],
		blogs: [
			{ title: 'Introduction to GraphQL and Apollo Client', slug: 'introduction-to-graphql-apollo' }
		],
		createdAt: '2024-05-10T10:00:00Z',
		updatedAt: '2024-05-12T18:30:00Z'
	},
	{
		id: '6',
		name: 'Web Development',
		author: { name: 'Diana Miller', email: 'diana.miller@example.com' },
		authorId: '106',
		blogsId: ['10', '11'],
		blogs: [
			{ title: 'Building Accessible Web Applications', slug: 'building-accessible-web-apps' },
			{
				title: 'Optimizing Performance in React Applications',
				slug: 'optimizing-performance-in-react'
			}
		],
		createdAt: '2024-06-20T13:45:00Z',
		updatedAt: '2024-06-22T16:50:00Z'
	},
	{
		id: '7',
		name: 'UI/UX Design',
		author: { name: 'Evan Taylor', email: 'evan.taylor@example.com' },
		authorId: '107',
		blogsId: ['12'],
		blogs: [{ title: 'A Guide to CSS Flexbox', slug: 'guide-to-css-flexbox' }],
		createdAt: '2024-07-05T14:20:00Z',
		updatedAt: '2024-07-08T18:15:00Z'
	},
	{
		id: '8',
		name: 'Functional Programming',
		author: { name: 'Fiona Wilson', email: 'fiona.wilson@example.com' },
		authorId: '108',
		blogsId: ['13'],
		blogs: [
			{ title: 'Understanding JavaScript Closures', slug: 'understanding-javascript-closures' }
		],
		createdAt: '2024-07-15T12:00:00Z',
		updatedAt: '2024-07-17T15:30:00Z'
	},
	{
		id: '9',
		name: 'Frontend Frameworks',
		author: { name: 'George Harris', email: 'george.harris@example.com' },
		authorId: '109',
		blogsId: ['14'],
		blogs: [
			{ title: 'Getting Started with React Hooks', slug: 'getting-started-with-react-hooks' }
		],
		createdAt: '2024-08-12T11:15:00Z',
		updatedAt: '2024-08-14T14:45:00Z'
	},
	{
		id: '10',
		name: 'Performance Optimization',
		author: { name: 'Helen Clark', email: 'helen.clark@example.com' },
		authorId: '110',
		blogsId: ['15'],
		blogs: [
			{
				title: 'Optimizing Performance in React Applications',
				slug: 'optimizing-performance-in-react'
			}
		],
		createdAt: '2024-09-01T10:30:00Z',
		updatedAt: '2024-09-03T13:40:00Z'
	},
	{
		id: '11',
		name: 'API Integration',
		author: { name: 'Ian Walker', email: 'ian.walker@example.com' },
		authorId: '111',
		blogsId: ['16'],
		blogs: [
			{ title: 'Introduction to GraphQL and Apollo Client', slug: 'introduction-to-graphql-apollo' }
		],
		createdAt: '2024-09-15T15:20:00Z',
		updatedAt: '2024-09-18T18:45:00Z'
	},
	{
		id: '12',
		name: 'Asynchronous Programming',
		author: { name: 'Jack White', email: 'jack.white@example.com' },
		authorId: '112',
		blogsId: ['17'],
		blogs: [
			{ title: 'Mastering Async/Await in JavaScript', slug: 'mastering-async-await-in-javascript' }
		],
		createdAt: '2024-09-25T14:30:00Z',
		updatedAt: '2024-09-27T17:20:00Z'
	},
	{
		id: '13',
		name: 'Software Architecture',
		author: { name: 'Karen Black', email: 'karen.black@example.com' },
		authorId: '113',
		blogsId: ['18'],
		blogs: [
			{ title: 'State Management with Redux Toolkit', slug: 'state-management-with-redux-toolkit' }
		],
		createdAt: '2024-10-05T13:10:00Z',
		updatedAt: '2024-10-08T16:35:00Z'
	},
	{
		id: '14',
		name: 'Modern JavaScript',
		author: { name: 'Laura Green', email: 'laura.green@example.com' },
		authorId: '114',
		blogsId: ['19'],
		blogs: [{ title: 'Exploring the New Features in ES2023', slug: 'exploring-es2023-features' }],
		createdAt: '2024-10-15T11:00:00Z',
		updatedAt: '2024-10-17T13:20:00Z'
	},
	{
		id: '15',
		name: 'HTML Semantics',
		author: { name: 'Michael Blue', email: 'michael.blue@example.com' },
		authorId: '115',
		blogsId: ['20'],
		blogs: [
			{ title: 'Building Accessible Web Applications', slug: 'building-accessible-web-apps' }
		],
		createdAt: '2024-10-25T14:25:00Z',
		updatedAt: '2024-10-28T16:00:00Z'
	}
];
