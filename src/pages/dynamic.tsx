// import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {

    async function handleSum() {
        const { sum } = (await import('../lib/math')).default;

        alert(sum(3,5));
    }

    return (
    <section>
      <Title>Products</Title>
      <ul>
        {recommendedProducts.map(recommendedProduct => (
          <li key={recommendedProduct.id}>
            {recommendedProduct.title}
          </li>
        ))}
      </ul>
      <button onClick={handleSum}>Sum!</button>
    </section>

  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  const response = await fetch('http://localhost:3333/recommended');

  const recommendedProducts = await response.json();
  
  return {
    props: {
      recommendedProducts
    }
  }
}
