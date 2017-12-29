import React from 'react'
import renderer from 'react-test-renderer'

import SearchFormView from './SearchFormView'

test('Return SearchForm', () => {
    const component = renderer.create(<SearchFormView />)
    const SearchFormViewTree = component.toJSON()
    expect(SearchFormViewTree).toMatchSnapshot()
})
