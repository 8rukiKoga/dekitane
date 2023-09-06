'use client'

import firebaseConfig from '@/lib/firebase';

import { useEffect, useState } from 'react';
import styles from './css/top.module.css'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, Firestore, updateDoc, query, orderBy } from 'firebase/firestore';

import { PointList } from '@/app/components/PointList/PointList';
import { LogList } from './components/PointList/LogList/LogList';

import { formatDate } from './helpers/formatDate';

export function Top() {
  // 状態変数宣言
  const [totalPoint, setTotalPoint] = useState(0);
  const [list, setList] = useState([]);
  const [showingPointList, setShowingPointList] = useState(true)

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
      // ドキュメントデータ内にidを含めて取得
      const id = doc.id;
      const dataWithId = { ...doc.data(), id };
      allPoints.push(dataWithId);
    });
    setList(allPoints)
    setShowingPointList(true)
  }

  // ログリスト取得
  async function getLog() {
    const logs: any = [];
    try {
      const docRef = doc(db, "users", "shcNXJpe5y5iHyYnpNdV");
      const collectionRef = collection(docRef, "log");
      // logコレクション内のすべてのドキュメントを取得
      const querySnapshot = await getDocs(query(collectionRef, orderBy("get_date", "desc")));

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // ドキュメントデータ内にidを含めて取得
        const id = doc.id;
        const nextObj: any = { ...data, id };

        const formattedDate = formatDate(data.get_date.toDate())
        nextObj.formattedDate = formattedDate

        logs.push(nextObj)
      });
      setList(logs);
      setShowingPointList(false)
    } catch (error) {
      console.error("データを取得できませんでした: ", error);
    }
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

                {/* 履歴に切り替え */}
                {showingPointList ? <button onClick={()=>getLog()} className={styles.toggleButton}>りれき</button> : <button onClick={()=>getPointList()} className={styles.toggleButton}>リストに戻る</button>}

        {/* リスト */}
        {showingPointList ? <PointList db={db}totalPoint={totalPoint} setTotalPoint={setTotalPoint} list={list} /> : <LogList db={db} list={list} />}
      </main>
    </>
  );
}