import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION( 
    $data: ItemCreateInput! 
  ) {
    createItem( 
      data: $data 
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'jahedad kingad',
    description: 'Itaalias valmistatud kingad on kõige jahedamad',
    image: 'king.png',
    largeImage: 'suur-king.png',
    price: 2500
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat( value ) : value;
    console.log( name, type, value );
    this.setState( { [name]: value } );
  };

  render() {
    return(
      <Mutation mutation={ CREATE_ITEM_MUTATION } variables={ { data: this.state } }>
        { ( createItem, { loading, error } ) => (
          <Form onSubmit={ async e => {
            e.preventDefault();
            console.log( this.state );
            const res = await createItem();
            console.log( res );
          } } >
            <Error error={ error } />
            <fieldset disabled={ loading } aria-busy={ loading } >
              <label htmlFor="title">
                Title
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  placeholder="Title" 
                  required 
                  value={ this.state.title } 
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
                  value={ this.state.price } 
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
                  value={ this.state.description } 
                  onChange={ this.handleChange }
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
