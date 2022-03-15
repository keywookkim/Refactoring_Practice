// 반대리팩터링 : 변수 인라인하기


// beforeRefactoring
function calculateOrders(order) {
  return order.quantity * order.itemPrice
    - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
    + Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

// AfterRefactoring
function calculateOrders(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

/*
표현식이 너무 복잡해서 이해하기 어려울 때가 있다. 이럴 때 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.
그러면 복잡한 로직을 구성하는 단계마다 이름을 붙일 수 있어서 코드의 목적을 훨씬 명확하게 드러낼 수 있다.
*/