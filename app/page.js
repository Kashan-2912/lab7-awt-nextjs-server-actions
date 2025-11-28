import ShopWrapper from './components/ShopWrapper';
import { getProducts } from './actions';

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <ShopWrapper initialProducts={products} />
    </main>
  );
}
