import React from 'react';

import styles from '../../styles/Card.module.css';


function Card(props) {

    const { launchYear, launchSuccess ,missionIds,launchLanding,missionName,flightNumber,imageURL } = props
  return (
      <div className={styles.CustomCard}>
          <div ><img className={styles.CustomCardImage} src={imageURL} alt="spaceX" /></div>
          <div className={styles.CustomCardName}>
              {missionName} #{flightNumber}
          </div>
          <div className={styles.CustomCardID}>
              Mission Ids :
              <ul>
              {missionIds&& missionIds.length>0 && missionIds.map((item, i) => (
                                        <li key={i}>{item}</li>    
                                    ))}
              </ul>
              
          </div>
          <div className={styles.CustomCardDesc}>
              <div>Launch Year: <span>{launchYear}</span></div>
              <div>Successful Launch: <span>{launchSuccess}</span></div>
              <div>Successful Landing: <span>{launchLanding}</span> </div>
          </div>
          
    </div>
  );
}

export default Card;
