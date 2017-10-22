import React from 'react';

function DayItem(props) {
    
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">John Smith</p>
                        <p>{props.minTemp} {props.maxTemp}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function DaysList(props) {

    const days = props.days;
    const maxMinTemprt = [];
    
    let j = 0;

    for (let i = 0; i < days.length; i++) {
        maxMinTemprt.push({});

        const tempArr = [];

        for (let key in days[i]) {
            tempArr.push(days[i][key].main.temp);
        }

        maxMinTemprt[j].min = Math.min(...tempArr);
        maxMinTemprt[j].max = Math.max(...tempArr);

        j++;
    }


    const daysList = props.days.map((item, i) => <DayItem key={i} minTemp={maxMinTemprt[i].min} maxTemp={maxMinTemprt[i].max} />);
    
    return <ul>{daysList}</ul>;
    
}