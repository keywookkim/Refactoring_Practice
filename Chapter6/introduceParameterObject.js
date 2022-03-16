// beforeRefactoring
function amountInvoiced(startDate, endDate) {}

// afterRefactoring
function amountInvoiced(aDateRange) { }


// example
class NumberRange {
  constructor(min, max) {
    this._data = {min: min, max: max};
  }
  get min() {return this._data.min;}
  get max() {return this._data.max;}
  // 온도가 허용 범위 안에 있는지 검사하는 메서드
  contains(arg) {return (arg >= this.min && arg<= this.max)}
}

// 정상 범위를 벗어난 측정값을 찾는 함수
function readingsOutsideRange(station, range) {
  return station.readings.filter(r => !range.contains(r.temp));
}

const station = {
  name: "ZB1",
  readings: [
    {temp: 47, time: "2016-11-10 09:10"},
    {temp: 53, time: "2016-11-10 09:20"},
    {temp: 58, time: "2016-11-10 09:30"},
    {temp: 53, time: "2016-11-10 09:40"},
    {temp: 51, time: "2016-11-10 09:50"},
  ]
}
const operationPlan = {temperatureFloor: 50, temperatureCeiling: 55}
const range = new NumberRange(operationPlan.temperatureFloor, operationPlan.temperatureCeiling)

alters = readingsOutsideRange(station, range);

/*
데이터 뭉치를 데이터 구조로 묶으면 데이터 사이의 관계가 명확해진다는 이점을 얻는다. 게다가 함수가 이 데이터 구조를 받게하면 매개변수 수가 줄어든다.
같은 데이터 구조를 사용하는 모든 함수가 원소를 참조할 때 항상 똑같은 이름을 사용하기 때문에 일관성도 높여준다.

하지만 이 리팩터링의 진정한 힘은 코드를 더 근본적으로 바꿔준다는 데 있다. 이런 데이터 구조를 새로 발견하면 이 데이터 구조를 활용하는 형태로 프로그램 동작을 재구성한다.
데이터 구조에 담길 데이터에 공통으로 적용되는 동작을 추출해서 함수로 만드는 것이다.(공용 함수를 나열하는 식으로 작성할 수도 있고, 이 함수들과 데이터를 합쳐 클래스로 만들 수도 있다.)
이 과정에서 새로 만든 데이터 구조가 문제 영역을 훨씬 간결하게 표현하는 추상 개념으로 격상되면서, 코드의 개념적인 그림을 다시 그릴 수도 있다.
*/