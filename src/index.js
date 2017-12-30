import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import ApiDataContainer from './components/services/ApiDataContainer'
import SearchFormView from './components/SearchForm/SearchFormView'

const { $ } = window

class App extends React.Component {
    state = { city: null }

    retrieveCityFromSearchInput = (city) => {
        /**
         * Remove not valid symbols.
         * @param {string} val - сity name.
         * */

        function edit(val) {
            const str =
                $.trim(val)
                    .toLowerCase()
                    .replace(/[0-9]/g, '')
                    .replace(/^[a-z\d,]*-?[a-z\d,]*$ /g, '')
                    .replace(/\s+/g, ' ')

            return (
                (str === null || str === '') ? 'not valid' : str
            )
        }

        const editedValue = edit(city)

        if (editedValue === 'not valid') return

        this.setState({ city: editedValue })
    }

    render() {
        const isValidCity = this.state.city !== null

        return (
            isValidCity ?
                <Fragment>
                    <SearchFormView onClick={this.retrieveCityFromSearchInput} />
                    <ApiDataContainer city={this.state.city} />
                </Fragment>
                :
                <SearchFormView onClick={this.retrieveCityFromSearchInput} />
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
)
