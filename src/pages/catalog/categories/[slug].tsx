//Dynamic Routing using [slug]
import { GetStaticPaths, GetStaticProps } from 'next';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';

interface IProduct {
    id: string;
    title: string;
  }
  

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps){

  const router = useRouter();

  if(router.isFallback){
    return <p>Carregando ...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch('http://localhost:3333/categories');

  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: {
        slug: category.id
      }
    }
  })

  return {
    paths,
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;
  
  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);

  const products = await response.json();
  

  //Utilizando revalidate, a cada 5 segundos a página será atualizada com os dados
  //da api, assim reduzindo processamento de máquina.
  return {
    props: {
      products
    },
    revalidate: 60,
  }
}