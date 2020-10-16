//O código do _app é renderizado apenas uma vez, por este motivo é colocado
//aqui dentro o GlobalStyle.
import React from 'react';
import GlobalStyle from "../styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.Fragment>
  )
}
