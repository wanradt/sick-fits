import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION( 
    $data: ItemUpdateInput! 
  ) {
    updateItem( 
      data: $data 
    ) {
      id
      title
      description
      price
      image
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY( 
    $id: ID! 
  ) {
    item( 
      where: { id: $id } 
    ) {
      id
      title
      description
      price
      image
    }
  }
`;

class UpdateItem extends Component {
  state = {
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat( value ) : value;
    console.log( name, type, value );
    this.setState( { [name]: value } );
  };

  render() {
    return(
      <Query query={ SINGLE_ITEM_QUERY }variables={ {
        id: this.props.id
      } } > 
        { ( { data, loading } ) => {
          if ( loading ) return <p>Loading...</p>;

          return (
            <Mutation mutation={ UPDATE_ITEM_MUTATION } variables={ { data: this.state } }>
              { ( updateItem, { loading, error } ) => (
                <Form onSubmit={ async e => {
                  e.preventDefault();
                  console.log( this.state );
                  const res = await updateItem();
                  console.log( res );
                  Router.push( {
                    pathname: '/item',
                    query: {
                      id: res.data.updateItem.id
                    }
                  } );
                } } >
                  <Error error={ error } />
                { data.item.image && <img width="200" src={data.item.image} alt="preview" /> }
                  <fieldset disabled={ loading } aria-busy={ loading } >
                    <label htmlFor="title">
                      Title
                      <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Title" 
                        required 
                        defaultValue={ data.item.title } 
                        onChange={ this.handleChange }
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        placeholder="Price" 
                        required 
                        defaultValue={ data.item.price } 
                        onChange={ this.handleChange }
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Enter a description" 
                        required 
                        defaultValue={ data.item.description } 
                        onChange={ this.handleChange }
                      />
                    </label>
                    <button type="submit">Save</button>
                   </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
