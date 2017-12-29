import React from 'react'
import renderer from 'react-test-renderer'

import GraphView from './GraphView'

test('Return GraphView', () => {
    const component = renderer.create(<GraphView
        data={[{}, {}]}
        width={1200}
        height={400}
        margin={{}}
        xScale={() => {}}
        yScale={() => {}}
        x={() => {}}
        y={() => {}}
        glyphDot={() => {}}
    />)
    const GraphViewTree = component.toJSON()
    expect(GraphViewTree).toMatchSnapshot()
})
