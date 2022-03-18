// json Data 생성용 함수
function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20
  };
}

class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach(d => this.addProducer(new Producer(this, d)));
  }
  get name() { return this._name; }
  get producers() { return this._producers.slice(); }
  get totalProduction() { return this._totalProduction; }
  set totalProduction(arg) { this._totalProduction = arg; }
  get demand() { return this._demand; }
  set demand(arg) { this._demand = arg; }
  get price() { return this._price; }
  set price(arg) { this._price = arg; }

  get shortfall() {
    return this._demand - this.totalProduction;
  }
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    console.log(this.producers)
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }

  addProducer(arg){
      this._producers.push(arg);
      this._totalProduction += arg.production
  }
}

class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }
  get name() { return this._name; }
  get cost() { return this._cost; }
  set cost(arg) { this._cost = arg; }

  get production() { return this._production; }
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

/*
테스트프레임 워크 Mocha 사용
*/


const assert = require("assert"); //nodeJS 제공하는 assert 모듈
const chai = require('chai'); // Chai 라이브러리
const expect = chai.expect;

// Passing용 기본 테스트
describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData()); //Set fixture
    assert.equal(asia.shortfall, 5); // Validate(assert 문법)
  })
});

// Passing용 기본 테스트
describe('province', function () {
  const asia = new Province(sampleProvinceData()); //Set fixture
  it('shortfall', function () {
    expect(asia.shortfall).equal(5); // Validate(expect 문법)
  });
  it('profit', function () {
    expect(asia.profit).equal(230); // Validate(expect 문법)
  });
});

// beforeEach 구문을 사용해 asia를 공유하지 않고 픽스처마다 새로 생성
describe('province', function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', function () {
    expect(asia.shortfall).equal(5); // Validate(expect 문법)
  });
  it('profit', function () {
    expect(asia.profit).equal(230); // Validate(expect 문법)
  });
});

// 픽스처 수정
describe('province', function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });
  it('change production', function () {
    asia.producers[0].production = 20
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });
}); //  여기서는 두 속성이 굉장히 밀접하기 때문에 두 개를 동시에 진행했지만, 일반적으로 it 구문당 하나의 검증씩만 진행하는게 좋다.

// 경계조건 검사
// 생산자없음
describe('province', function () {
  let asia;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: "",
      demand: 30,
      price: 20
    };
    asia = new Province(data);
  });
  it('no producers shortfall', function () {
    expect(asia.shortfall).equal(30);
  });
  it('no producers profit', function () {
    expect(asia.profit).equal(0);
  });
  it('zero demand', function () {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });
  it('minus demand', function () {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
  it('empty string demand', function () {
    asia.demand = "";
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
  it('string for producers', function () {
    asia.producers = "";
    expect(asia.shortfall).equal(0);
  });
});