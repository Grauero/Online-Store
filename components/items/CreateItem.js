import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import Form from '../styles/Form';
import ErrorMessage from '../error/ErrorMessage';
import { CREATE_ITEM_MUTATION } from '../../mutations/items';

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;

    this.setState({
      [name]: convertedValue
    });
  };

  uploadFile = async (e) => {
    const { files } = e.target;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'onlineStore');

    const res = await fetch('https://api.cloudinary.com/v1_1/dqohugslk/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await createItem();

              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  onChange={this.uploadFile}
                  required
                />
                {this.state.image && (
                  <img src={this.state.image} width="200" alt="Upload Preview" />
                )}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
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
