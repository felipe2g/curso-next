//Dynamic Routing using [slug]
import { route } from 'next/dist/next-server/server/router';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  {
    loading: () => <p>Loading... </p>
  }
)

export default function Products(){
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCard() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <button onClick={handleAddToCard}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal /> }
    </div>
  )
}