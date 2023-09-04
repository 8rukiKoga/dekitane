'use client'

import firebaseConfig from '../../../lib/firebase'

import { useEffect, useState } from 'react';
import styles from './top.module.css'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, Firestore, updateDoc } from 'firebase/firestore';

import { PointList } from '../../components/PointList/PointList';

export function Top() {
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

  // 平日か休日かでポイントリスト切り替え
  // useEffect(() => {
  //   point
  // }, [myVariable]);

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

  return (
    <>
      {/* タイトル */}
      <div className={styles.title}>
        <h1>Dekitane</h1>
        <h2>~毎日のがんばりをポイント化~</h2>
      </div>

      <main>
        {/* 今日溜まったポイント */}
        <div className={styles.pointHeadline}>
          <p>たまったポイント：<span className={styles.totalPoint}>{totalPoint}</span></p>
        </div>

        {/* ポイント獲得表 */}
        <PointList db={db} totalPoint={totalPoint} setTotalPoint={setTotalPoint} pointList={pointList} />
      </main>
    </>
  );
}