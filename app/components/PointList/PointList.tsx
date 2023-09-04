'use client'

import styles from './pointList.module.css'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { useEffect, useState } from 'react';

import { formatDate } from '../../helpers/formatDate'

export function PointList(props: any) {
    const [isWeekday, setIsWeekday] = useState(true);
    const [filteredPointList, setFilteredPointList] = useState([]);
    const initialButtonStates: Record<string, boolean> = {};
    const [buttonStates, setButtonStates] = useState(initialButtonStates)

    // 達成ボタンを押した時
    function handleClick(data: any) {
        addPoint(data.point)
        completeTask(data.id)
    }

    // ポイント加算
    async function addPoint(point: number) {
        const docRef = doc(props.db, "users", "shcNXJpe5y5iHyYnpNdV");
        const nextTotalPoint = props.totalPoint + point;

        await updateDoc(docRef, {
            total_point: nextTotalPoint
        })
        props.setTotalPoint(nextTotalPoint)
    }

    // 達成→済
    async function completeTask(id: string) {
        const docRef = doc(props.db, "point", id);

        await updateDoc(docRef, {
            last_get_date: serverTimestamp()
        })
        
        //ボタンスタイル変更
        updateButtonStates(id)
    }

    // 今日獲得済みのポイントは獲得できないようにする
    function isClickedToday(timestamp: any) {
        const today = formatDate(new Date())
        const lastGetDate = formatDate(timestamp.toDate())
        if (today == lastGetDate) {
            return true
        } else {
            return false
        }
    }

    function updateButtonStates(id: string) {
        let tmpList = buttonStates
        setButtonStates(prevButtonStates => ({
            ...prevButtonStates,
            [id]: true
        }));
    }

    // 平日リストと休日リストの出しわけ
    useEffect(() => {
        filterList()
        console.log(buttonStates)
    }, [isWeekday, props.pointList, buttonStates]);

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
                            <div className={styles.pointCol} key={index}>
                                <li>{data.name}<span className={styles.caption}>({data.point})</span></li>
                                <button
                                    onClick={() => handleClick(data)}
                                    disabled={buttonStates[data.id] || isClickedToday(data.last_get_date)}
                                    className={styles.button}
                                >
                                    {buttonStates[data.id] || isClickedToday(data.last_get_date) ? "済" : "達成"}
                                </button>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}