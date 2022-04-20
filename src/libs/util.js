function formatDateTime (timestamp) {
  const date = new Date(timestamp)
  const y = date.getFullYear();
  const m = date.getMonth()+1;
  const d = date.getDate();
  const hh = formatD(date.getHours());
  const mm = formatD(date.getMinutes());
  const ss = formatD(date.getSeconds());
  return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`
}

function formatD(str) {
  return str>10?str:'0'+str;
}

export {formatDateTime}