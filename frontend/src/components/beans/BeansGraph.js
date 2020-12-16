import React from "react";
import moment from 'moment';

const BeansGraph = ({beans}) => {
    const graphItems = [];

    /* {beans} - array of beans related to current user 
     we need to go through all the elements and check if completed = true;  
    //then we check the date of complted bean  and it is 
    //createdDate (LocalDate) (maybe user has completed this task next day but for simplification, I propose 
    //to use creation date as completion date)
    //if it is a new date, need to assing 1 to score and got next with the element in the loop
    //If the date is the same, for the current day we need to add +1 to beanscore 
    */
    
    //initial beans for the whole year is 0 
    const levelArr = []

    for (var j = 0; j< 366; j++) {
        levelArr.push(0)
    }

    for (var i = 0; i < beans.length; i++) {
       if (beans[i].completed === true)
        {
            //Date is in LocalDate, we need to convert the date to range (1-365)
            //fill in beanscore 
            levelArr[moment(beans[i].createdDate).format("DDD")] +=1
        }
    } 

    //NB max of data-level is 5! if data-level >5, cube will be empty
    console.log(levelArr)
    for ( i = 0; i < 366; i++) {
        graphItems.push(<li data-level={levelArr[i]} key={i} />);
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