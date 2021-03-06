import * as React from 'react';
import gql from 'graphql-tag';
import withRedux from 'next-redux-wrapper';
import initStore from '../src/store';
import PageWrapper from '../src/components/PageWrapper/PageWrapper';
import client from './../src/utils/apollo-client';
import { ApolloQueryResult } from 'apollo-client';
import formatPrice from './../src/utils/format-price';

interface GraphqlResponse {
  Product: Product;
}

interface Query {
  id: string;
}

interface Url {
  query: Query;
}

interface ProdutoProps {
  url: Url;
}

interface ProdutoState {
  product: Product;
}

class Produto extends React.Component<ProdutoProps, ProdutoState> {
  public state = {
    product: {
      image: null,
      name: null,
      price: null,
      sku: null,
    },
  };

  public componentDidMount() {
    client
      .query({
        query: gql`
          {
            Product(id: "${this.props.url.query.id}") {
              id
              sku
              name
              price
              image
            }
          }
        `,
      })
      .then((response: ApolloQueryResult<GraphqlResponse>): void => {
        this.setState({ product: response.data.Product });
      });
  }

  public render() {
    return (
      <PageWrapper>
        <h2 className="page-title tc black-60">Detalhes do produto</h2>
        {this.state.product.name ? (
          <div className="single-product-container flex flex-column items-center">
            <img
              className="mw5 product-image bottom-0 relative"
              src={this.state.product.image}
              alt={this.state.product.name}
            />
            <div className="product-name tc black-60">{this.state.product.name}</div>
            <div className="product-sku tc black-60">SKU: {this.state.product.sku}</div>
            <div className="product-price f2 b tc">{formatPrice(this.state.product.price)}</div>
          </div>
        ) : (
          <p className="tc">Carregando detalhes do produto</p>
        )}
        <style>
          {`
            .product-image {
              transition: bottom 0.4s;
            }

            .product:hover .product-image {
              bottom: 10px;
            }

            .product-name {
              line-height: 20px;
              max-width: 256px;
              min-height: 40px;
            }

            .product-price {
              color: #1f871c;
            }
          `}
        </style>
      </PageWrapper>
    );
  }
}

export default withRedux(initStore, (state) => state)(Produto);
