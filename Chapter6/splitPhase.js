// beforeRefactoring
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

// afterRefactoring
const orderRecord = parseOrder(order)
const calulatedOrderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return ({
    productID: values[0].split("-")[1],
    quantity: parseInt(values[1])
  });
}

function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}

/*
서로 다른 두 대상을 한꺼번에 다루는 코드를 발견하면 각각을 별개 모듈로 나누는 방법을 모색한다.
코드를 수정해야 할 때 두 대상을 동시에 생각할 필요 없이 하나에만 집중하기 위해서다.
모듈이 잘 분리되어 있다면 다른 모듈의 상세 내용을 전혀 기억하지 못해도 원하는 대로 수정을 끝마칠 수도 있다.

이렇게 분리하는 방법 중 하나는 동작을 연이은 두 단계로 쪼개는 것이다. 입력이 처리 로직에 적합하지 않은 형태로 들어오는 경우,
본 작업에 들어가기 전에 입력값을 다루기 편한 형태로 가공한다. 아니면 로직을 순차적인 단계들로 분리해도 된다.
이때 각 단계는 서로 확연히 다른일을 수행해야 한다.

단계쪼개기의 대표적인 예는 컴파일러가 있다. 컴파일러는 텍스트를 토큰화하고, 토큰을 파싱해서 구문트리를 만들고, 구문트리를 변환하는 다양한 단계를 거쳐
마지막으로 목적 코드를 생성한다. 각 단계는 자신만의 문제에 집중하기 때문에 나머지 단게에 관해서는 자세히 몰라도 이해할 수 있다.
*/