export function formatDate(date) {
    const year = date.getFullYear(); // 年を取得
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月を取得（0から始まるため、+1しています）
    const day = String(date.getDate()).padStart(2, '0'); // 日を取得
    const formattedDate = `${year}年${month}月${day}日`;
    return formattedDate
}