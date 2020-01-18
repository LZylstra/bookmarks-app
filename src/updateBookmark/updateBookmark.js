import React from 'react';
import './updateBookmark.css';


class UpdateBookmark extends React.Component {
    state = {
        error: null,
        title: '',
        url: '',
        description: '',
        rating: 0
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log("this worked")
        //take data from state and use update
        //patch req to endpoint
    }

    onTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    }

    onUrlChange = e => {
        this.setState({
            url: e.target.value
        });
    }

    onDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    }

    onRatingChange = e => {
        this.setState({
            rating: e.target.value
        });
    }

    render(){
        const { error } = this.state
        const { onClickCancel } = this.props
        return (
          <section className='UpdateBookmark'>
            <h2>Update a bookmark</h2>
            <form
              className='UpdateBookmark__form'
              onSubmit={this.handleSubmit}
            >
              <div className='UpdateBookmark__error' role='alert'>
                {error && <p>{error.message}</p>}
              </div>
              <div>
                <label htmlFor='title'>
                  Title
                  {' '}
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Great website!'
                  value = {this.state.title}
                  onChange={this.onTitleChange}
                />
              </div>
              <div>
                <label htmlFor='url'>
                  URL
                  {' '}
                </label>
                <input
                  type='url'
                  name='url'
                  id='url'
                  placeholder='https://www.great-website.com/'
                  value = {this.state.url}
                  onChange={this.onUrlChange}
                />
              </div>
              <div>
                <label htmlFor='description'>
                  Description
                </label>
                <textarea
                  name='description'
                  id='description'
                  value = {this.state.description}
                  onChange={this.onDescriptionChange}
                />
              </div>
              <div>
                <label htmlFor='rating'>
                  Rating
                  {' '}
                </label>
                <input
                  type='number'
                  name='rating'
                  id='rating'
                  min='1'
                  max='5'
                  value = {this.state.rating}
                  onChange={this.onRatingChange}
                />
              </div>
              <div className='UpdateBookmark__buttons'>
                <button type='button' onClick={onClickCancel}>
                  Cancel
                </button>
                {' '}
                <button type='submit'>
                  Save
                </button>
              </div>
            </form>
          </section>
        );
    }
}

export default UpdateBookmark;