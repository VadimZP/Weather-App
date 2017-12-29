import React from 'react'
import renderer from 'react-test-renderer'

import DaysListView from './DaysListView'

test('Return DaysListView', () => {
    const component = renderer.create(<DaysListView />)
    const DaysListViewTree = component.toJSON()

    expect(DaysListViewTree).toMatchSnapshot()
})
