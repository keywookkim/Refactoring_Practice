// 반대리팩터링 : 함수 인라인하기


// beforeRefactoring
function printOwing(invoice) {
  printBanner();
  let outStanding = calculateOutstanding();

  // 세부 사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outStanding}`);
}

// AfterRefactoring
function printOwing(invoice) {
  printBanner();
  let outStanding = calculateOutstanding();
  printDetails(invoice, outStanding); // 세부 사항 출력

}

function printDetails(invoice, outStanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outStanding}`);
}

/*
코드를 보고 무슨 일을 하는지 파악하는 데 한참이 걸린다면 그 부분을 함수로 추출한 뒤 '무슨 일'에 걸맞는 이름을 짓는다.
이렇게 해두면 나중에 코드를 다시 읽을 때 함수의 목적이 눈에 확 들어오고,
본문 코드(그 함수가 목적을 이루기 위해 구체적으로 수행 하는 일)에 대해서는 더 이상 신경 쓸 필요가 없어진다.

덧붙임) 이런게 추상화 아닐까?
*/