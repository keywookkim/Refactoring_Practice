// beforeRefactoring
function base(aReading) {}
function texableCharge(aReading) {}

// afterRefactoring
function enrishReading(argReading) {
  const aReading = _.deepClone(argReading)
  aReading.baseCharge = base(aReading);
  aReading.texableCharge = texableCharge(aReading);
  return aReading;
}

/*
정보가 사용되는 곳마다 같은 도출 로직이 반복되는 경우를 볼 수 있다.
이런 도출 작업들을 한데로 마오두면 검색과 갱신을 일관된 장소에서 처리할 수 있고 로직 중복도 막을 수 있다.
이렇게 하기 위한 방법으로 변환 함수를 사용할 수 있다. 변환 함수는 원본 데이터를 입력받아서 필요한 정보를 모두 도출한 뒤,
각각을 출력 데이터의 필드에 넣어 반환한다. 이렇게 해두면 도출 과정을 검토할 일이 생겼을 때 변환 함수만 살펴보면 된다.

원본데이터가 갱신 될 때 -> 클래스로 묶기
원본데이터가 갱신 되지 않음 -> 변환 함수로 묶기
*/