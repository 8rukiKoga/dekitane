'use client'

import styles from './css/history.module.css'
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { formatDate } from "../helpers/formatDate";

export function History(props: any) {
    const [logList, setLogList] = useState([]);

    useEffect(() => {
        // getLog();
    }, []);



    return (
        <div className={styles.pointList}>
            <ul>
                {
                    logList.map((data:any) => (
                        <div className={styles.logCol} key={data.id}>
                            <li>{data.name}<span className={styles.caption}>({data.get_date})</span></li>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}
