import React, { Component } from 'react';

class InputPage extends Component {
    state = {
    path: 'scrapy/scrapy',

    };

    onChange = event => {
        this.setState({ path: event.target.value });
    };
    render() {
        const { path, organization, errors } = this.state;

        return (
          <div>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="url">
                Owner/Repository
              </label> &nbsp;
              <input
                id="url"
                type="text"
                value={path}
                onChange={this.onChange}
                style={{ width: '300px' }}
              />
              <button type="submit">Search</button>
            </form>

            <hr />


          </div>
        );
      }
    }
export default InputPage;
