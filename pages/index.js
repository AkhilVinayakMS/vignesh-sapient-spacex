
import styles from '../styles/Home.module.css'
import React,{ useEffect, useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/router'
import Filter from '../components/Filter/filter';
import Card from '../components/Card/card';

function Home(props) {
  const { launches } = props;
  const router = useRouter();
  const { land_success, launch_success, launch_year } = router.query;
  const [filter, setFilter] = useState({year:launch_year ? launch_year:'',launch:launch_success?launch_success:'',landing:land_success?land_success:''});
  const [flights, setFlights] = useState(launches);
 
useEffect(() => {
    const yearFilter = launch_year ? launch_year : ""
    const launchFilter = launch_success ? launch_success : ""
    const landingFilter = land_success ? land_success : ""
    axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_year=${yearFilter}&launch_success=${launchFilter}&land_success=${landingFilter}`)
      .then(res => {
        setFlights(res.data)
      })
  }, [land_success,launch_success,launch_year]);


  
  const updateFilterState = (key, value) => {
    console.log(key, value)
   
    setFilter(prevState => ({
      ...prevState,
      [key]: value
    }));
    const _year = (key === 'year' && value) ? value : launch_year;
    const _land = (key === 'landing' && value) ? value : land_success;
    const _launch = (key === 'launch' && value) ? value : launch_success;
    
    router.push(`/?launch_success=${_launch?_launch:''}&land_success=${_land?_land:''}&launch_year=${_year?_year:''}`, undefined, { shallow: true });
  
  }

  console.log('-##############-',filter)
  return (
    <Container fluid={true} className={styles.App}>
      <Row xl="12">
        <Col><h2>Space X Launch Program</h2></Col>
      </Row>
      <Row  xs="12" sm="12">
        <Col xs="12" sm="4" md="3"><Filter
          updateFilter={(key, value) => updateFilterState(key, value)}
          yearProp={filter.year}
          launchProp={filter.launch}
          landingProp={filter.landing} /></Col>
        <Col xs="12" sm="8" md="9">
        <Row  xs="12" sm="8">
            {flights && flights.length > 0 && flights.map(f => <Col md="3" sm="6" xs="12" className={styles.padtop}>
              <Card
                missionName={f.mission_name}
                flightNumber={f.flight_number}
                imageURL={f.links.mission_patch_small}
                missionIds={f.mission_id}
                launchYear={f.launch_year}
                launchSuccess={f.launch_success === null ? '' : f.launch_success.toString()}
                launchLanding={f.rocket.first_stage.cores[0].land_success === null? '': f.rocket.first_stage.cores[0].land_success.toString()}
              />
              
            </Col>)}
            
          </Row>
        </Col>
        
        
      </Row>
      <Row xl="12">
        <Col><h2>Developed By Vignesh K B</h2></Col>
      </Row>
      
    </Container>
  )
}

export default React.memo(Home);


export async function getStaticProps() {
 
  const res = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_year=""&launch_success=""&land_success=""`);
  return {
    props: {
      launches: res.data,
    },
  }
}