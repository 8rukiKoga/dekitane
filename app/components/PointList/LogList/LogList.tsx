import styles from './logList.module.css'

export function LogList(props:any) {
    return (
        <div className={styles.logList}>
            <ul>
                {
                    props.list.map((data:any) => (
                        <div className={styles.logCol} key={data.id}>
                            <li>{data.point_name}<span className={styles.caption}>({data.formattedDate})</span></li>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}