import React from 'react'
import renderer from 'react-test-renderer'

import DayItemView from './DayItemView'

test('Return DayItem', () => {
    const component = renderer.create(<DayItemView
        onClick={() => {}}
        days={[{}, {}]}
        id={1}
        key={2}
        weatherImg="rain"
        date="2017-12-30"
        dayOfTheWeek="Monday"
        minTemp={-16}
        maxTemp={+30}
    />)
    const DayItemViewTree = component.toJSON()

    expect(DayItemViewTree).toMatchSnapshot()
})
