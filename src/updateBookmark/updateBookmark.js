import React from 'react';
import PropTypes from 'prop-types';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './updateBookmark.css';


class UpdateBookmark extends React.Component {
    static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
        }),
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
      };

      static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
        }),
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
      };

      componentDidMount() {
        const { bookmarkId } = this.props.match.params
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${config.API_KEY}`
          }
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
    
            return res.json()
          })
          .then(responseData => {
            this.setState({
              id: responseData.id,
              title: responseData.title,
              url: responseData.url,
              description: responseData.description,
              rating: responseData.rating,
            })
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }
         
  handleSubmit = e => {
    e.preventDefault()
    const { bookmarkId } = this.props.match.params
    const { id, title, url, description, rating } = this.state
    const newBookmark = { id, title, url, description, rating }
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(newBookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newBookmark)
        this.context.updateBookmark(newBookmark)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }


  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      title: newFields.title || '',
      url: newFields.url || '',
      description: newFields.description || '',
      rating: newFields.rating || '',
    })
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

    handleClickCancel = () => {
        this.props.history.push('/')
      };

    render(){
        const { error, title, url, description, rating } = this.state
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
                  value = {this.title}
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
                  value = {this.url}
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
                  value = {this.description}
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
                  value = {this.rating}
                  onChange={this.onRatingChange}
                />
              </div>
              <div className='UpdateBookmark__buttons'>
                <button type='button' onClick={this.handleClickCancel}>
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