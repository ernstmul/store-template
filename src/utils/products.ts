export type Cart = {
	id: string;
	count: number;
	product: Product;
	features: Record<string, string>;
};

export type Product = {
	slug: string;
	name: string;
	description: string;
	imageUrls: string[];
	imageBlurhashUrl?: string[]; // Generated by SSR
	categories: string[];
	price: number;
	features?: ProductFeature[];
	metadata?: any;
};

export type ProductFeature = {
	name: string;
	variations: ProductVariation[];
	metadata?: any;
};

export type ProductVariation = {
	name: string;
	priceModifier: (
		price: number,
		product: Product,
		variation: ProductVariation,
		feature: ProductFeature
	) => number;
	metadata?: any;
};

const unisexFeatures: ProductFeature[] = [
	{
		name: 'Sex',
		variations: [
			{
				name: 'Unisex',
				priceModifier: (price) => price
			}
		]
	}
];

const shirtFeatures: ProductFeature[] = [
	{
		name: 'Size',
		variations: [
			{
				name: 'S',
				priceModifier: (price) => price
			},
			{
				name: 'M',
				priceModifier: (price) => price + 5
			},
			{
				name: 'L',
				priceModifier: (price) => price + 10
			},
			{
				name: 'XL',
				priceModifier: (price) => price + 15
			}
		]
	}
];

const shoeFeatures: ProductFeature[] = [
	{
		name: 'Size',
		variations: [
			{
				name: '6',
				priceModifier: (price) => price
			},
			{
				name: '7',
				priceModifier: (price) => price + 5
			},
			{
				name: '8',
				priceModifier: (price) => price + 5
			},
			{
				name: '9',
				priceModifier: (price) => price + 10
			},
			{
				name: '10',
				priceModifier: (price) => price + 10
			}
		]
	}
];

export const products: Product[] = [
	// Tops
	{
		slug: 'heavy-tshirt',
		name: 'Heavy T-Shirt',
		description: 'A premium heavy t-shirt, perfect for cooler weather.',
		imageUrls: ['products/heavy-tshirt.png'],
		categories: ['Tops'],
		price: 30,
		features: [
			...shirtFeatures,
			{
				name: 'Color',
				variations: [
					{
						name: 'Black',
						priceModifier: (price) => price
					},
					{
						name: 'White',
						priceModifier: (price) => price
					},
					{
						name: 'Gray',
						priceModifier: (price) => price
					}
				]
			}
		]
	},
	{
		slug: 'top',
		name: 'Stylish Top',
		description: 'A lightweight and trendy top for casual outings.',
		imageUrls: ['products/top.png'],
		categories: ['Tops'],
		price: 35,
		features: shirtFeatures
	},
	{
		slug: 'multiple-tshirts',
		name: 'Multiple T-Shirts',
		description: 'A set of colorful t-shirts, perfect for all seasons.',
		imageUrls: ['products/multiple-tshirts.png'],
		categories: ['Tops'],
		price: 60,
		features: shirtFeatures
	},

	// Sweaters
	{
		slug: 'sweatshirts',
		name: 'Sweatshirts',
		description: 'Warm and cozy sweatshirts for chilly days.',
		imageUrls: ['products/sweatshirts.png'],
		categories: ['Sweaters'],
		price: 45,
		features: shirtFeatures
	},

	// Shoes
	{
		slug: 'gray-shoes',
		name: 'Gray Shoes',
		description: 'Stylish and comfortable gray shoes for any occasion.',
		imageUrls: ['products/gray-shoes.png'],
		categories: ['Shoes'],
		price: 70,
		features: shoeFeatures
	},
	{
		slug: 'black-shoes',
		name: 'Black Shoes',
		description: 'Classic black shoes for both casual and formal occasions.',
		imageUrls: ['products/shoes-black.png'],
		categories: ['Shoes'],
		price: 75,
		features: shoeFeatures
	},
	{
		slug: 'hanging-shoes',
		name: 'Hanging Shoes',
		description: 'Durable shoes for everyday adventures.',
		imageUrls: ['products/hanging-shoes.png'],
		categories: ['Shoes'],
		price: 65,
		features: shoeFeatures
	},
	{
		slug: 'shoes',
		name: 'Casual Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		imageUrls: ['products/shoes.png'],
		categories: ['Shoes'],
		price: 55,
		features: shoeFeatures
	},

	// Accessories
	{
		slug: 'black-sunglasses',
		name: 'Black Sunglasses',
		description: 'Classic black sunglasses with UV protection.',
		imageUrls: ['products/sunglasses-black.png'],
		categories: ['Accessories'],
		price: 50,
		features: unisexFeatures
	},
	{
		slug: 'aviator-sunglasses',
		name: 'Aviator Sunglasses',
		description: 'Timeless aviator sunglasses with a sleek design.',
		imageUrls: ['products/sunglasses-aviator.png'],
		categories: ['Accessories'],
		price: 65,
		features: unisexFeatures
	},
	{
		slug: 'sunglasses',
		name: 'Stylish Sunglasses',
		description: 'Fashionable sunglasses for a sunny day.',
		imageUrls: ['products/sunglasses.png'],
		categories: ['Accessories'],
		price: 55,
		features: unisexFeatures
	},
	{
		slug: 'watch',
		name: 'Classic Watch',
		description: 'Elegant and durable watch to complement any outfit.',
		imageUrls: ['products/watch.png'],
		categories: ['Accessories'],
		price: 150,
		features: unisexFeatures
	}
];
