/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    env : {
        // FIREBASE
        FIREBASE_API_KEY: "AIzaSyCi2WUwD8_JBAwVdS000tLQb03b6oYydX0",
        FIREBASE_AUTH_DOMAIN: "dekitane.firebaseapp.com",
        FIREBASE_PROJECT_ID: "dekitane",
        FIREBASE_STORAGE_BUCKET: "dekitane.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "75951588975",
        FIREBASE_APP_ID: "1:75951588975:web:92284b7b7bdf6e984c2f9a",

        // ポイント表
        // 平日
        NIDONE_POINT: 20,
        GAKKOU_POINT: 70,
        KINTORE_POINT: 30,
        ARUKU_POINT: 10,
        KAMI_POINT: 5,
        HAMIGAKI_POINT: 2,
        KUSURI_POINT: 2,
        SUKIN_POINT: 5,
        OFURO_POINT: 10,
        KOME_POINT: 10,
        KE_POINT: 10,
        KURIMU_POINT: 5,
        HIYAKE_POINT: 5,
        UNKO_POINT: 5,
        MIZU_POINT: 10,
        OKASHI_POINT: 10,
        SHIKEN_POINT: 20,
        MASSAJI_POINT: 10,
        // 休日
        OKIRU_POINT: 20,
        KATAZUKE_POINT: 30,
        SOUJI_POINT: 10,
        SENTAKU_POINT: 20,
        GOHAN_POINT: 20,
    },
}