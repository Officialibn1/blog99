import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export type User = {
	id: number;
	firstName: string;
	lastName: string;
	weight: number;
	height: number;
	age: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateUsers = (data: any): data is User => {
	// const validId = typeof data.id === 'number';
	// const validFirstName = typeof data.firstName === 'string';
	// const validLastName = typeof data.lastName === 'string';
	// const validWeight = typeof data.weight === 'number';
	// const validHeight = typeof data.height === 'number';
	// const validAge = typeof data.age === 'number';

	let isValidData: boolean = false;

	if (
		typeof data.id === 'number' &&
		typeof typeof data.firstName === 'string' &&
		typeof data.lastName === 'string' &&
		typeof data.weight === 'number' &&
		typeof data.height === 'number' &&
		typeof data.age === 'number'
	) {
		isValidData = true;

		return isValidData;
	}

	return isValidData;
};
