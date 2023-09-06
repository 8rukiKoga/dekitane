'use client'

import { useEffect, useState } from 'react';
import styles from './logList.module.css'

export function LogList(props:any) {
    const [groupedData, setGroupedData] = useState({});

    return (
        <div className={styles.pointList}>
        <ul>
            {
                props.list.map((data: any) => (
                    <div className={styles.pointCol} key={data.id}>
                        <li>{data.point_name}<span className={styles.caption}>({data.point}) {data.formattedDate}</span></li>
                    </div>
                ))
            }
        </ul>
    </div>
    );
  }