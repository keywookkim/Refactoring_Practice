// beforeRefactoring
function base(aReading) {}
function texableCharge(aReading) {}
function calculateBaseCharge(aReading) {}

// afterRefactoring
class Reading {
  base() {}
  texableCharge() {}
  calculateBaseCharge() {}
}

/*
공통 데이터를 중심으로 긴밀하게 엮어 작동하는 함수 무리를 발견하면 클래스 하나로 묶는 아이디어를 떠올려보자.
클래스로 묶으면 이 함수들이 공유하는 공통 환경을 더 명확하게 표현할 수 있고, 각 함수에 전달되는 인수를 줄여서 객체 안에서의 함수 호출을 간결하게 만들 수 있다.

이 리팩터링은 이미 만들어진 함수들을 재구성할 때는 물론, 새로 만든 클래스와 관련하여 놓친 연산을 찾아서 새 클래스의 메서드로 뽑아내는 데도 좋다.
함수를 한데 묶는 또 다른 방법으로 여러 함수를 변환 함수로 묶기도 있다. 어느 방식으로 진행할지는 프로그램 문맥을 넓게 살펴보고 정해야 한다.
클래스로 묶을 때의 두드러진 장점은 클라이언트가 객체의 핵심 데이터를 변경할 수 있고, 파생 객체들을 일관되게 관리할 수 있다는 것이다.
*/