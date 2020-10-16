import React, { useEffect, useState } from 'react';
import Button from '../Button/button';

const years = [{ year: '2006', active: false },
    { year: '2007', active: false },
    { year: '2008', active: false },
    { year: '2009', active: false },
    { year: '2010', active: false },
    { year: '2011', active: false },
    { year: '2012', active: false },
    { year: '2013', active: false },
    { year: '2014', active: false },
    { year: '2015', active: false },
    { year: '2016', active: false },
    { year: '2017', active: false },
    { year: '2018', active: false },
    { year: '2019', active: false },
    { year: '2020', active: false },
]

const rocketLaunch= [{ launch: 'true', active: false }, { launch: 'false', active: false }]
const rocketLanding = [{ landing: 'true', active: false }, { landing: 'false', active: false }]


const updateArray = (item, updatedvalue,key) => {
    if (item[key] == updatedvalue) {
        return { ...item, active: true }
    }
    else {
        return { ...item, active: false }
    }
}

function Filter(props) {
    const { yearProp,launchProp,landingProp, updateFilter} = props;
    const [year, setYear] = useState(years);
    const [launch, setLaunch] = useState(rocketLaunch);
    const [landing, setLanding] = useState(rocketLanding);
    
    useEffect(() => {
        if (yearProp) {
            const updatedYear = year.map(y => updateArray(y, yearProp, 'year'));
            setYear(updatedYear);
      }
    }, [yearProp])
    
    useEffect(() => {
        if (launchProp) {
            const updatedLaunch = launch.map(lan => updateArray(lan, launchProp, 'launch')); 
            setLaunch(updatedLaunch); 
        }
    }, [launchProp])

    useEffect(() => {
        if (landingProp) {
            const updatedLanding = landing.map(l => updateArray(l, landingProp, 'landing'));
        setLanding(updatedLanding)
        }
        
    }, [landingProp])
    
    const btnFilter = (arr,key) => {
        return arr.map((y) => <Button
            key={y[key]}
            toUpdate={key}
            text={y[key]}
            status={y.active}
            handleClick={updateFilter}
        />)
    }

    
  return (
      <div className="Filter">
          <h3>Filter</h3>
          <h5>Launch year</h5>
          <hr />
          <div className="Filter-Btns">
              {year && year.length > 0 && btnFilter(year,'year') }
          </div>
          <h5>Successful Launch</h5>
          <hr />
          <div className="Filter-Btns">
              {launch && launch.length > 0 && btnFilter(launch,'launch')}
          </div>
          <h5>Successful Landing</h5>
          <hr />
          <div className="Filter-Btns">
              {landing && landing.length > 0 && btnFilter(landing,'landing')}
          </div>
      </div>
  );
}

export default Filter;
