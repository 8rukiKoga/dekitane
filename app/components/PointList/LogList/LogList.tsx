'use client'

import { useEffect, useState } from 'react';
import styles from './logList.module.css'

export function LogList(props: any) {
    const [groupedDataList, setGroupedDataList]:any = useState([])

    useEffect(() => {
        groupDataByDate()
    }, [])

    // リストを日付ごとにグループ化
    function groupDataByDate() {
        const groupedData: any = {};
        props.list.forEach((data: any) => {
            const date = data.formattedDate;
            if (!groupedData[date]) {
                groupedData[date] = [];
                // 合計店初期化
                groupedData[date].total_point = 0
            }
            // その日の合計ポイントも計算
            groupedData[date].total_point += data.point
            groupedData[date].push(data);
        });
        setGroupedDataList(groupedData)
    }

    return (
        <div className={styles.logList}>
            {Object.keys(groupedDataList).map((date:string) => (
                <div key={date} className={styles.dayLogList}>
                    <h2 className={styles.headline}>{date} <span className={styles.point}>+{groupedDataList[date].total_point}</span></h2>
                    <ul>
                        {groupedDataList[date].map((data:any) => (
                            <li key={data.id} className={styles.logListItem}>{data.point_name}({data.point})</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}