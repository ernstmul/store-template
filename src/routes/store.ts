import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const categories = ['All Products', 'Tops', 'Sweaters', 'Bottoms', 'Shoes', 'Accessories'];

export const filterOptions = [
	{ value: 'popular', label: 'Popular' },
	{ value: 'discount', label: 'Highest discount' },
	{ value: 'lth', label: 'Price Low to High' },
	{ value: 'htl', label: 'Price High to Low' },
	{ value: 'newest', label: 'Newest' }
];

export const selectedCategory = derived(
	page,
	($page) => $page.url.searchParams.get('category') || 'All Products'
);

export const currentPage = derived(
	page,
	($page) => Number($page.url.searchParams.get('page')) || 1
);

export const showSiteHeaders = derived(
	page,
	($page) => $page.route.id?.trim() === '/' && !$page.error
);