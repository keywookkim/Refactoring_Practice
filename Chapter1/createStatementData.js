exports.createStatementData = function(invoice, plays) { //필요 데이터 추출 전용함수
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformances);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformances(aPerformance) {
    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = playFor(result); // 중간데이터에 연극정보를 저장
    result.amount = amountFor(result); // 중간데이터에 수량계산한 중간결과값을 저장
    result.volumeCredits = volumeCreditsFor(result); // 적립포인트 계산결과값을 저장

    return result;              
  }

  function playFor(aPerformance) { 
    return plays[aPerformance.playID];
  }

  // perf를 aPerformance로 thisAmount를 result로
  // 함수선언 변경
  // 필요없어진 매개변수 삭제
  function amountFor(aPerformance) { // 중첩함수를 옮김
    let result = 0; // 변수를 초기화
    switch(aPerformance.play.type) { //playFor를 호출하던 부분을 중간 데이터를 사용
      case "tragedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        } 
        result += 300 * aPerformance.audience;
        break;
      default: 
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
    }
    return result
  }

  // result, aPerformance로 알기쉽게 변수명 변경
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

