import type { Product } from '../../utils/products';
import { account } from './account.svelte';

export type CartItem = {
	slug: string;
	features: Record<string, string>;
	quantity: number;
	product: Product;
	price: number; // Product price + features price modifiers
};

export type Cart = CartItem[];

let items = $state([] as Cart);
let isOpen = $state(false);
let isInitialized = $state(false);
const totalItems = $derived(items.reduce((total, item) => total + item.quantity, 0));

const debounceSave = (fn: Function, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return (...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
};

const saveCartToPrefs = debounceSave(async (cartItems: Cart) => {
	if (!isInitialized) return;
	try {
		await account.updatePrefs({ cart: cartItems });
	} catch (error) {
		console.error('Failed to save cart:', error);
	}
}, 1000);

export const cart = {
	// State getters
	getItems: () => items,
	getIsOpen: () => isOpen,
	getTotalItems: () => totalItems,

	// Sheet controls
	setIsOpen: (value: boolean) => (isOpen = value),
	openCart: () => (isOpen = true),
	closeCart: () => (isOpen = false),
	toggleCart: () => (isOpen = !isOpen),

	// Cart operations
	init: (initialValue: Cart) => {
		items = initialValue;
		isInitialized = true;
	},

	add: (product: Product, features: Record<string, string>) => {
		const featuresId = Object.keys(features)
			.map((v) => `${v}-${features[v]}`)
			.join('-');
		const cartItemSlug = `${product.slug}_${featuresId}`;

		const index = items.findIndex((item) => cartItemSlug === item.slug);
		if (index !== -1) {
			items[index].quantity += 1;
		} else {
			let price = product.price;
			for (const featureName in features) {
				const feature = product.features?.find((f) => f.name === featureName);
				const variation = feature?.variations.find((v) => v.name === features[featureName]);

				if (variation && feature && variation.priceModifier) {
					price = variation.priceModifier(price, product, variation, feature);
				}
			}

			items = [
				...items,
				{
					slug: cartItemSlug,
					quantity: 1,
					features,
					product,
					price
				}
			];
		}
		saveCartToPrefs(items);
	},

	remove: (product: Product, features: Record<string, string>) => {
		const featuresId = Object.keys(features)
			.map((v) => `${v}-${features[v]}`)
			.join('-');
		const cartItemSlug = `${product.slug}_${featuresId}`;

		items = items.filter((item) => item.slug !== cartItemSlug);
		saveCartToPrefs(items);
	},

	updateQuantity: (product: Product, features: Record<string, string>, newQuantity: number) => {
		const featuresId = Object.keys(features)
			.map((v) => `${v}-${features[v]}`)
			.join('-');
		const cartItemSlug = `${product.slug}_${featuresId}`;

		if (newQuantity <= 0) {
			items = items.filter((item) => item.slug !== cartItemSlug);
		} else {
			items = items.map((item) =>
				item.slug === cartItemSlug ? { ...item, quantity: newQuantity } : item
			);
		}
		saveCartToPrefs(items);
	},

	clear: () => {
		items = [];
		saveCartToPrefs(items);
	}
};
