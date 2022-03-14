const makefactory = require('./createStatementData.js')
const invoice = require('./invoices.json')
const plays = require('./plays.json')

console.log(htmlStatement(invoice, plays))

// 함수분리
function htmlStatement(invoice, plays) { 
  return renderHtml(makefactory.createStatementData(invoice, plays))
}

function renderHtml(data) {
  let result = `<h1>청구내역 (고객명: ${data.customer})\n</h1>`; 
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    //청구내역을 출력한다.
    result += ` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`; 
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += `</table>\n`
  result += `<p>총액: <em>${data.totalAmount}</em></p>\n`; // 변수 format을 함수호출로 대체
  result += `<p>적립포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat(
    "en-US", { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
}