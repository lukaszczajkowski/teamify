import React from "react";

const BeansGraph = ({beans}) => {
    const graphItems = [];

    console.log("inside BeansGraph")
    // change value here to map with data
        
    // const data = [{
    //     day: 1,
    //     bean: 1
    // , {
    //     day: 2,
    //     bean: 2
    // }, {
    //     day: 365,
    //     bean: 3
    // }];
    // const graphItems = data.map((item) => <li data-level={item.bean}></li>)

    {beans.sort((a, b) => b.id - a.id).map(bean => (
       console.log({bean})
    ))} 

    
    for (var i = 1; i < 365; i++) {
        const level = Math.floor(Math.random() * 3);
        graphItems.push(<li data-level={level} key={i} />);
    }

    return (
        <div className="graph">
            <ul className="months">
                <li>Jan</li>
                <li>Feb</li>
                <li>Mar</li>
                <li>Apr</li>
                <li>May</li>
                <li>Jun</li>
                <li>Jul</li>
                <li>Aug</li>
                <li>Sep</li>
                <li>Oct</li>
                <li>Nov</li>
                <li>Dec</li>
            </ul>
            <ul className="days">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
            <ul className="squares">
                {graphItems}
            </ul>
        </div>
    );
}

export default BeansGraph;