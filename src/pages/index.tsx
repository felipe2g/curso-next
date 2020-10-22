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
  // const [recommendedProducts, setrecommendedProducts] = useState<IProduct[]>([]);

  //Client Side Fetching
  //É utilizado principalmente quando não precisamos que a informação que está
  //sendo apresentada na tela, não precisa ser apresentada aos motores de busca.
  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then(response => {
  //     response.json().then(data => {
  //       setrecommendedProducts(data);
  //     })
  //   })
  // }, [])

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
    </section>
  )
}

// TTFB => Time to first byte
// Tempo para o primeiro código estar disponível ao usuário.

//Só utilizamos getServerSideProps para informações que sejam necessárias
//aos motores de busca, caso contrário deve-se utilizar client side fetching
export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  const response = await fetch('http://localhost:3333/recommended');

  const recommendedProducts = await response.json();
  
  return {
    props: {
      recommendedProducts
    }
  }
}
