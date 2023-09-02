'use client';

import styles from './page.module.css';
import firebaseConfig from '../lib/firebase';

import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, query } from 'firebase/firestore';


export default function Home() {
  const [totalPoint, setTotalPoint] = useState(0);
  const [pointList, setPointList] = useState([]);

  // マウント時にDBと同期
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);

    getPointList(firestoreDb)
  }, []);

  // ポイントリスト取得
  async function getPointList(db: any) {
    const allPoints: any = [];
    // コレクション内のすべてのドキュメントを取得
    const querySnapshot = await getDocs(collection(db, "point"));
    querySnapshot.forEach((doc) => {
      allPoints.push(doc.data())
    });
    setPointList(allPoints)
  }

  return (
    <>
      {/* タイトル */}
      <div className={styles.title}>
        <h1>Dekitane</h1>
        <h2>~毎日のがんばりをポイント化~</h2>
      </div>

      {/* 今日溜まったポイント */}

      <main>
        {/* これまで溜まったポイント */}
        <div>
          <p>たまったポイント：<span className={styles.totalPoint}>{totalPoint}</span></p>
        </div>

        {/* ポイント獲得表 */}
        <div className={styles.pointList}>
          <ul>
            {pointList.map((data: any, index) => (
              <div className={styles.pointCol}>
                <li key={index}>{data.name}<span className={styles.caption}>({data.point})</span></li>
                <button className={styles.button}>達成!</button>
              </div>
            ))}
          </ul>
        </div>

      </main>
    </>
  );
}