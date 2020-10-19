import React from 'react';
import styles from '../../styles/Button.module.css';
function Btn(props) {
  const { text, status, handleClick, key, toUpdate } = props;
 
  const buttonActive = status ? "active" : ""
  return (
    <button key={key} className={buttonActive == 'active' ?  styles.custombtnactive:styles.custombtn}
    onClick={() => { handleClick(toUpdate,text) }}>{text}</button>
  );
}

export default React.memo(Btn);
