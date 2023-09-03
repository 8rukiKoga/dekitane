'use client';

import styles from './page.module.css';
import firebaseConfig from '../lib/firebase';

import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, Firestore, updateDoc } from 'firebase/firestore';


export default function Home() {
  // 状態変数宣言
  const [totalPoint, setTotalPoint] = useState(0);
  const [pointList, setPointList] = useState([]);

  // firebase初期化
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // マウント時にDBと同期
  useEffect(() => {
    getTotalPoint()
    getPointList()
  }, []);

  // ポイントリスト取得
  async function getPointList() {
    const allPoints: any = [];
    // コレクション内のすべてのドキュメントを取得
    const querySnapshot = await getDocs(collection(db, "point"));
    querySnapshot.forEach((doc) => {
      allPoints.push(doc.data())
    });
    setPointList(allPoints)
  }

  // トータルポイント取得
  async function getTotalPoint() {
    const docRef = doc(db, "users", "shcNXJpe5y5iHyYnpNdV");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTotalPoint(docSnap.data().total_point)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // ポイント加算
  async function handleClick(point: number) {
    const docRef = doc(db, "users", "shcNXJpe5y5iHyYnpNdV");
    const nextTotalPoint = totalPoint + point;

    await updateDoc(docRef, {
      total_point: nextTotalPoint
    })
    setTotalPoint(nextTotalPoint)
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
                <button onClick={() => handleClick(data.point)} className={styles.button}>達成</button>
              </div>
            ))}
          </ul>
        </div>

      </main>
    </>
  );
}