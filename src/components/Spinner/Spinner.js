import React from 'react'
import { PulseLoader } from 'react-spinners'

export default class Spinner extends React.Component {
        state = {
            loading: true,
        }

        render() {
            return (
                <div className="loader">
                    <PulseLoader
                        color="#123abc"
                        loading={this.state.loading}
                    />
                </div>
            )
        }
}
