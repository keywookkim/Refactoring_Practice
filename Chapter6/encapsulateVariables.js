// beforeRefactoring
let defaultOwner = {firstName: '마틴', lastName: '파울러'}

// AfterRefactoring
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' }
export function defaultOwner() {return defaultOwnerData;}
export function setDefaultOwner() {defaultOwnerData = arg;}

// recordEncapsulation
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' }
export function defaultOwner() {return new Person(defaultOwnerData);}
export function setDefaultOwner() {defaultOwnerData = arg;}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() {return this._lastName;}
  get firstName() {return this._firstName;}
}

/*
데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동한다.
짧은 함수 안의 임시 변수처럼 유효범위가 아주 좁은 데이터는 어려울 게 없지만, 유효범위가 넓어질수록 다루기 어려워진다.
전역 데이터가 골칫거리인 이유도 바로 여기에 있다.

그래서 접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독점하는 함수를 만드는 식으로
캡슐화하는 것이 가장 좋은 방법일 때가 많다. 데이터 재구성이라는 어려운 작업을 함수 재구성이라는 더 단순한 작업으로 변환하는 것이다.

불변 데이터는 캡슐화할 이유가 적다. 그냥 복제하면 된다. 불변성은 강력한 방부제인 셈이다.
*/