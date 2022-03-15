// 반대 리팩터링: 함수 추출하기

// beforeRefactoring
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

// afterRefactoring
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}

/*
간접 호출은 유용할 수도 있지만 쓸데없는 간접 호출은 거슬릴 뿐이다.
리팩터링 과정에서 잘못 추출된 함수들도 다시 인라인한다.
간접 호출을 너무 과하게 쓰는 코드도 흔한 인라인 대상이다. 가령 다른 함수로 단순히 위임하기만 하는 함수들이 너무 많아서
위임 관계가 복잡하게 얽혀 있으면 인라인해버린다.
*/
