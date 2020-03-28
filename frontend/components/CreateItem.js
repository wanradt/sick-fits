import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

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

  uploadFile = async ( e ) => {
    console.log( 'Uploading', e );
    const files = e.target.files;
    const data = new FormData();
    data.append( 'file', files[0] );
    data.append( 'upload_preset', 'sickfits' );
    const res = await fetch( 'https://api.cloudinary.com/v1_1/wanradt/image/upload', { 
      method: 'POST', 
      body: data 
    } );

    const file = await res.json();
    console.log( file );
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  }

  render() {
    return(
      <Mutation mutation={ CREATE_ITEM_MUTATION } variables={ { data: this.state } }>
        { ( createItem, { loading, error } ) => (
          <Form onSubmit={ async e => {
            e.preventDefault();
            console.log( this.state );
            const res = await createItem();
            console.log( res );
            Router.push( {
              pathname: '/item',
              query: {
                id: res.data.createItem.id
              }
            } );
          } } >
            <Error error={ error } />
            <fieldset disabled={ loading } aria-busy={ loading } >
              <label htmlFor="file">
                Image
                <input 
                  type="file" 
                  id="file" 
                  name="file" 
                  placeholder="Upload an image..." 
                  required 
                  onChange={ this.uploadFile }
                />
              </label>
              { this.state.image && <img width="200" src={this.state.image} alt="upload preview" /> }
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
