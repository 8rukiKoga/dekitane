'use client';

import styles from './page.module.css';
import firebaseConfig from '../lib/firebase';

import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, query } from 'firebase/firestore';


export default function Home() {
  // DBをSTATEで管理
  const [pointList, setPointList] = useState([]);

  // マウント時にDBと同期
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);

    getPointList(firestoreDb)
  }, []);

  async function getPointList(db) {
    const allPoints = [];
    // コレクション内のすべてのドキュメントを取得
    const querySnapshot = await getDocs(collection(db, "point"));
    querySnapshot.forEach((doc) => {
      allPoints.push(doc.data())
    });
    setPointList(allPoints)
  }


  function showPointList() {
    console.log(pointList)
  }

  return (
    <main>

      {/* タイトル */}
      <div className={styles.title}>
        <h1>Dekitane</h1>
        <h2>~毎日のがんばりをポイントに~</h2>
      </div>

      {/* 今日溜まったポイント */}

      {/* これまで溜まったポイント */}
      <div>
        <p>たまったポイント：{ }</p>
      </div>

      {/* ポイント獲得表 */}
      <div>
        <ul>
          {pointList.map((data, index) => (
            <li key={index}>{data.name}</li>
          ))}
        </ul>
      </div>

    </main>
  );
}