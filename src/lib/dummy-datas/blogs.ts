export type Blog = {
	id: string;
	title: string;
	slug: string;
	description: string;
	views: number;
	comments: number;
	published: boolean;
};

export const blogs: Blog[] = [
	{
		id: '1',
		title: 'Understanding JavaScript Closures',
		slug: 'understanding-javascript-closures',
		description:
			'A deep dive into closures, a fundamental concept in JavaScript that allows functions to retain access to their scope even after the outer function has completed. This article explores how closures work under the hood, their real-world applications, and common use cases in JavaScript programming.',
		views: 40,
		comments: 10,
		published: true
	},
	{
		id: '2',
		title: 'A Guide to CSS Flexbox',
		slug: 'guide-to-css-flexbox',
		description:
			'An in-depth look at Flexbox, a powerful layout module in CSS for designing complex, responsive layouts with ease. We cover the key properties of Flexbox, including flex-direction, justify-content, and align-items, and provide examples to help you master modern web layouts.',
		views: 400,
		comments: 12,
		published: false
	},
	{
		id: '3',
		title: 'Getting Started with React Hooks',
		slug: 'getting-started-with-react-hooks',
		description:
			'Learn how to use React Hooks to manage state and lifecycle methods in functional components. This guide covers useState, useEffect, and custom hooks, offering tips and examples to help you migrate from class-based components to a more functional, efficient code structure.',
		views: 783,
		comments: 5,
		published: true
	},
	{
		id: '4',
		title: 'Mastering Async/Await in JavaScript',
		slug: 'mastering-async-await-in-javascript',
		description:
			'A comprehensive guide to understanding and using async/await in JavaScript, helping you handle asynchronous operations more effectively. This article breaks down asynchronous programming concepts, common pitfalls, and provides practical examples for better error handling and code readability.',
		views: 1093,
		comments: 203,
		published: false
	},
	{
		id: '5',
		title: 'An Introduction to TypeScript for JavaScript Developers',
		slug: 'introduction-to-typescript',
		description:
			'TypeScript is a powerful superset of JavaScript that adds optional static typing. This guide introduces you to TypeScript fundamentals, including type annotations, interfaces, and generics, making your code more robust and maintainable in larger projects.',
		views: 394,
		comments: 21,
		published: true
	},
	{
		id: '6',
		title: 'State Management with Redux Toolkit',
		slug: 'state-management-with-redux-toolkit',
		description:
			'An article on how to effectively manage complex state in large-scale applications using Redux Toolkit. We cover essential concepts such as slices, thunks, and selectors, along with best practices for organizing and scaling your Redux codebase.',
		views: 2839,
		comments: 43,
		published: false
	},
	{
		id: '7',
		title: 'Exploring the New Features in ES2023',
		slug: 'exploring-es2023-features',
		description:
			'Stay up-to-date with the latest ECMAScript features introduced in ES2023, including new array methods, better error handling options, and more. This article provides detailed examples to help you take advantage of these features in your JavaScript projects.',
		views: 4000,
		comments: 100,
		published: true
	},
	{
		id: '8',
		title: 'Building Accessible Web Applications',
		slug: 'building-accessible-web-apps',
		description:
			'An essential guide to creating accessible web applications that comply with WCAG standards. Learn about semantic HTML, ARIA roles, keyboard navigation, and color contrast considerations to make your site inclusive for all users.',
		views: 9732,
		comments: 673,
		published: true
	},
	{
		id: '9',
		title: 'Optimizing Performance in React Applications',
		slug: 'optimizing-performance-in-react',
		description:
			'In this guide, we dive into strategies to optimize performance in React applications, including lazy loading, memoization, and code splitting. Improve your app’s responsiveness and user experience by learning how to manage resources effectively.',
		views: 736,
		comments: 32,
		published: true
	},
	{
		id: '10',
		title: 'Introduction to GraphQL and Apollo Client',
		slug: 'introduction-to-graphql-apollo',
		description:
			'Learn the basics of GraphQL and how to use Apollo Client for efficient data fetching in your applications. This article covers setting up a GraphQL client, querying data, and managing local state with Apollo, helping you unlock the power of GraphQL in your projects.',
		views: 10034,
		comments: 392,
		published: false
	}
];
