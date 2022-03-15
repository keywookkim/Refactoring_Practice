// beforeRefactoring
function circum(radius) { return 2 * Math.PI * radius;}

// afterRefactoring
function circumference(radius) { return 2 * Math.PI * radius;}

/*
함수의 이름이 좋으면 함수의 구현 코드를 살펴볼 필요 없이 호출문만 보고도 무슨 일을 하는지 파악할 수 있다.
함수의 매개변수도 마찬가지다. 매개변수는 함수가 외부 세계와 어우러지는 방식을 정의한다. 매개변수는 함수를 사용하는 문맥을 설정한다.
에컨대 전화번호 포매팅 함수가 매개변수로 사람을 받는다고 해보자. 그러면 회사 전화번호 포매팅에는 사용할 수 없게 된다.
사람 대신 전화번호 자체를 받도록 정의하면 이 함수의 활용 범위를 넓힐 수 있다.
*/