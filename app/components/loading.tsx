import React from 'react'
import styles from'./loading.module.css';

function Loading() {
  return (
    <div id={styles.container}>
        <div className={styles.box}>
        <div id={styles.d1}></div>
        <div id={styles.d2}></div>
        <div id={styles.d3}></div>
        </div>

    </div>
  )
}

export default Loading