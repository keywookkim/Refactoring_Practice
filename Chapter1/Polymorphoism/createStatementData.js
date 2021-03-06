exports.createStatementData = function (invoice, plays) { //필요 데이터 추출 전용함수
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformances);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;

  function enrichPerformances(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = calculator.play; // 중간데이터에 연극정보를 저장
    result.amount = calculator.amount; // 중간데이터에 수량계산한 중간결과값을 저장
    result.volumeCredits = calculator.volumeCredits; // 적립포인트 계산결과값을 저장

    return result;              
  }

  function playFor(aPerformance) { 
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  // result, aPerformance로 알기쉽게 변수명 변경
  function volumeCreditsFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
    case "comedy": return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`)
  }
}
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.')  
  }

  get volumeCredits() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() { 
    let result = 40000;
    if (this.performances.audience > 30) {
      result += 1000 * (this.performances.audience - 30);
    }
    return result    
  }    
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() { 
    let result = 30000;
    if (this.performances.audience > 20) {
        result += 10000 + 500 * (this.performances.audience - 20)
    } 
    result += 300 * this.performances.audience;
    return result    
  }  

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performances.audience / 5);
  }
}