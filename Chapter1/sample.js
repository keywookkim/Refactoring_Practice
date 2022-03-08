function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch(play.type) {
    case "tragedy": // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy": // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20)
      } 
      thisAmount += 300 * perf.audience;
      break;
    default: 
      throw new Error(`알 수 없는 장르: ${play.type}`)
    }

    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount = thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}


// 01 : 함수 추출하기
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount = thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

function amountFor(perf, play) {
  let thisAmount = 0; // 변수를 초기화
  switch(play.type) {
    case "tragedy": // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy": // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20)
      } 
      thisAmount += 300 * perf.audience;
      break;
    default: 
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return thisAmount
}

// 02 : 더 명확하게 이름 변경하기
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount = thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}
// perf를 aPerformance로 thisAmount를 result로
function amountFor(aPerformance, play) {
  let result = 0; // 변수를 초기화
  switch(play.type) {
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
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return result
}

// 03 : 임의 변수를 질의 함수로 바꾸기

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
function amountFor(aPerformance, play) {
  let result = 0; // 변수를 초기화
  switch(play.type) {
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
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    const play = playFor(perf) // 우변을 함수로
    let thisAmount = amountFor(perf, play);

    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount = thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 04 : 변수 인라인하기
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
function amountFor(aPerformance, play) {
  let result = 0; // 변수를 초기화
  switch(play.type) {
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
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf));

    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount = thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 05 : 함수 선언바꾸기
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf); // 필요없어진 매개변수 삭제

    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount = thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 06 : 함수 인라인하기2
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    // 포인트를 적립한다
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
    totalAmount = amountFor(perf);
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 07 : 적립포인트 계산코드 추출하기
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

// result, aPerformance로 알기쉽게 변수명 변경
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가포인트를 제공한다
  if ("comedy" == playFor(aPerformance).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format;
  
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
    totalAmount = amountFor(perf);
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 08 : format 변수 제거하기
function format(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber);
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

// result, aPerformance로 알기쉽게 변수명 변경
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가포인트를 제공한다
  if ("comedy" == playFor(aPerformance).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
    totalAmount = amountFor(perf);
  }
  result += `총액: ${format(totalAmount / 100)}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 09 : format 함수 선언 바꾸기
function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

// result, aPerformance로 알기쉽게 변수명 변경
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가포인트를 제공한다
  if ("comedy" == playFor(aPerformance).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
    totalAmount = amountFor(perf);
  }
  result += `총액: ${usd(totalAmount)}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 10 : 반복문 쪼개기
function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

// result, aPerformance로 알기쉽게 변수명 변경
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가포인트를 제공한다
  if ("comedy" == playFor(aPerformance).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
    totalAmount = amountFor(perf);
  }

  // 문장 슬라이드하기
  let volumeCredits = 0;
  // 반복문 쪼개기
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
  }
  result += `총액: ${usd(totalAmount)}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

// 11 : 함수추출 + 변수를 인라인
function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

// result, aPerformance로 알기쉽게 변수명 변경
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가포인트를 제공한다
  if ("comedy" == playFor(aPerformance).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result
}

function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
  }
  return volumeCredits;
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
    totalAmount = amountFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${totalVolumeCredits()}점\n`;
  return result;
}

// 12 : totalAmount 함수 추출, 함수 및 변수명 명확하게 변경
function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// perf를 aPerformance로 thisAmount를 result로
// 함수선언 변경
// 필요없어진 매개변수 삭제
function amountFor(aPerformance) {
  let result = 0; // 변수를 초기화
  switch(playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result
}

// result, aPerformance로 알기쉽게 변수명 변경
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가포인트를 제공한다
  if ("comedy" == playFor(aPerformance).type) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result
}

function totalVolumeCredits() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
  }
  return result;
}

function totalAmount() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf); // 추출한 함수를 이용해 값을 누적
  }
  return result
}

function statement(invoice, plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
  }
  result += `총액: ${usd(totalAmount())}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${totalVolumeCredits()}점\n`;
  return result;
}

// HTML 버전 함수만들기
// 13-1 : 계산단계와 포맷팅단계 분리하기(단계쪼개기)

function statement(invoice, plays) { //본문전체를 별도 함수로 추출
  return renderPlainText(invoice, plays)
}

function renderPlainText(invoice, plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
  }
  result += `총액: ${usd(totalAmount())}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // perf를 aPerformance로 thisAmount를 result로
  // 함수선언 변경
  // 필요없어진 매개변수 삭제
  function amountFor(aPerformance) {
    let result = 0; // 변수를 초기화
    switch(playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }

  // result, aPerformance로 알기쉽게 변수명 변경
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf); // 추출한 함수를 이용해 값을 누적
    }
    return result
  }
}

// HTML 버전 함수만들기
// 13-2 : 중간데이터 구조 객체만들기

function statement(invoice, plays) { //본문전체를 별도 함수로 추출
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData, invoice, plays)
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: ${data.customer})\n`; // 매개변수 invoice대신 중간데이터 객체 사용
  for (let perf of data.performances) {
    //청구내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
  }
  result += `총액: ${usd(totalAmount())}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // perf를 aPerformance로 thisAmount를 result로
  // 함수선언 변경
  // 필요없어진 매개변수 삭제
  function amountFor(aPerformance) {
    let result = 0; // 변수를 초기화
    switch(playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }

  // result, aPerformance로 알기쉽게 변수명 변경
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가포인트를 제공한다
    if ("comedy" == playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf); // 추출한 함수를 이용해 값을 누적
    }
    return result
  }
}

// HTML 버전 함수만들기
// 13-3 : 얕은복사 및 함수옮기기

function statement(invoice, plays) { //본문전체를 별도 함수로 추출
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformances);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return renderPlainText(statementData, invoice, plays)

  function totalVolumeCredits(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits; // 추출한 함수를 이용해 값을 누적 -> 중간 데이터로 치환
    }
    return result;
  }

  function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount; // 추출한 함수를 이용해 값을 누적 -> 중간 데이터로 치환
    }
    return result
  }

  function enrichPerformances(aPerformance) {
    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = playFor(result); // 중간데이터에 연극정보를 저장
    result.amount = amountFor(result); // 중간데이터에 수량계산한 중간결과값을 저장
    result.volumeCredits = volumeCreditsFor(result); // 적립포인트 계산결과값을 저장

    return result;              
  }

  function playFor(aPerformance) { //renderPlainText 중첩함수를 옮김
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
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: ${data.customer})\n`; // 매개변수 invoice대신 중간데이터 객체 사용
  for (let perf of data.performances) {
    //청구내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
  }
  result += `총액: ${data.totalAmount}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
  }
}

// HTML 버전 함수만들기
// 14 : 반복문을 파이프라인으로 바꾸기

function statement(invoice, plays) { //본문전체를 별도 함수로 추출
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformances);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return renderPlainText(statementData, invoice, plays)

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function enrichPerformances(aPerformance) {
    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = playFor(result); // 중간데이터에 연극정보를 저장
    result.amount = amountFor(result); // 중간데이터에 수량계산한 중간결과값을 저장
    result.volumeCredits = volumeCreditsFor(result); // 적립포인트 계산결과값을 저장

    return result;              
  }

  function playFor(aPerformance) { //renderPlainText 중첩함수를 옮김
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
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: ${data.customer})\n`; // 매개변수 invoice대신 중간데이터 객체 사용
  for (let perf of data.performances) {
    //청구내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
  }
  result += `총액: ${data.totalAmount}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
  }
}

// HTML 버전 함수만들기
// 15 : 필요 데이터 처리에 해당하는 코드를 모두 별도 함수로 추출

function statement(invoice, plays) { 
  return renderPlainText(createStatementData(invoice, plays))

  function createStatementData(invoice, plays) { //필요 데이터 추출 전용함수
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformances);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function enrichPerformances(aPerformance) {
    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = playFor(result); // 중간데이터에 연극정보를 저장
    result.amount = amountFor(result); // 중간데이터에 수량계산한 중간결과값을 저장
    result.volumeCredits = volumeCreditsFor(result); // 적립포인트 계산결과값을 저장

    return result;              
  }

  function playFor(aPerformance) { //renderPlainText 중첩함수를 옮김
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
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: ${data.customer})\n`; // 매개변수 invoice대신 중간데이터 객체 사용
  for (let perf of data.performances) {
    //청구내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`; // 변수 format을 함수호출로 대체
  }
  result += `총액: ${data.totalAmount}\n`; // 변수 format을 함수호출로 대체
  result += `적립포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minumumFractionDigits: 2 }).format(aNumber/100); // 단위변환 로직도 함수 안으로 이동
  }
}