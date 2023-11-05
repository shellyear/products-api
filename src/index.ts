type Product = any

type ProductsResponse = {
  total: number;
  count: number;
  products: Product[];
};

async function getProducts(): Promise<ProductsResponse["products"]> {
  const products: Product[] = [];
  let totalProducts = 0;
  let minPrice = 0;
  const maxPriceIncrement = 1000; // max that can be returned

  do {
    const response = await fetchProducts(
      minPrice,
      minPrice + maxPriceIncrement
    );

    totalProducts = response.total;
    const newProducts = response.products || [];

    products.push(...newProducts); // merge every 1000 or less elements into products 

    // Increment minPrice for the next iteration
    minPrice += maxPriceIncrement;
  } while (minPrice < totalProducts);

  return products;
}

async function fetchProducts(
  minPrice: number,
  maxPrice: number
): Promise<ProductsResponse> {
  const apiUrl = `https://api.ecommerce.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;

  const response = await fetch(apiUrl);
  const data: ProductsResponse = await response.json();

  return data;
}

async function main() {
  const allProducts = await getProducts();
  console.log(allProducts);
}

main();
