'use client'

import styles from './pointList.module.css'
import { doc, updateDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';

import { formatDate } from '../../helpers/formatDate'

export function PointList(props: any) {
    const [isWeekday, setIsWeekday] = useState(true);
    const [filteredPointList, setFilteredPointList] = useState([]);

    // const today = formatDate(new Date())

    // ポイント加算
    async function handleClick(point: number) {
        const docRef = doc(props.db, "users", "shcNXJpe5y5iHyYnpNdV");
        const nextTotalPoint = props.totalPoint + point;

        await updateDoc(docRef, {
            total_point: nextTotalPoint
        })
        props.setTotalPoint(nextTotalPoint)
    }

    // // 今日獲得済みのポイントは獲得できないようにする
    // function isClickedToday(timestamp:any) {
    //     const lastGetDate = timestamp.toDate()

    //     console.log("今日:" + today)
    //     console.log("lastGetDate:" + lastGetDate)

    //     if (today == lastGetDate) {
    //         return false
    //     } else {
    //         return false
    //     }
    // }

    // 平日リストと休日リストの出しわけ
    useEffect(() => {
        filterList()
    }, [isWeekday, props.pointList]);

    function filterList() {
        let filteredList = [];
        if (isWeekday) {
            filteredList = props.pointList.filter((data: any) => {
                return data.is_weekday == true
            })
        } else {
            filteredList = props.pointList.filter((data: any) => {
                return data.is_weekday == false
            })
        }
        // もし前のバージョンと違う点があれば更新
        if (filteredPointList != filteredList) {
            setFilteredPointList(filteredList)
        }
    }

    return (
        <>
            {/* 平日か休日か切り替え */}
            <div className={styles.weekdayToggler}>
                <button onClick={() => setIsWeekday(true)} className={`${styles.weekdayButton} ${isWeekday ? styles.weekdayButtonOn : styles.weekdayButtonOff}`}>平日</button>
                <button onClick={() => setIsWeekday(false)} className={`${styles.weekdayButton} ${isWeekday ? styles.weekdayButtonOff : styles.weekdayButtonOn}`}>休日</button>
            </div>

            {/* ポイント獲得表 */}
            <div className={styles.pointList}>
                <ul>
                    {
                        filteredPointList.map((data: any, index: any) => (
                            <div className={styles.pointCol}>
                                <li key={index}>{data.name}<span className={styles.caption}>({data.point})</span></li>
                                <button onClick={() => handleClick(data.point)} className={styles.button}>達成</button>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}