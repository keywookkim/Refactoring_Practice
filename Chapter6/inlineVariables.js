// 반대 리팩터링: 변수 추출하기

// beforeRefactoring
let basePrice = anOrder.basePrice;
return (basePrice > 1000);

// afterRefactoring
return anOrder.basePrice > 1000;

/*
변수의 이름이 원래 표현식과 다를 바 없을 때도 있다. 또 변수가 주변 코드를 리팩터링을 하는데 방해가 되기도 한다.
이럴 때는 그 변수를 인라인하는 것이 좋다. 이럴 때는 그 변수를 인라인하는 것이 좋다.
*/