//decribe is used to define suite
describe("Caculater.js", function () {
  describe("Calculator", function () {
    let calculater;
    let calculater1;
    beforeEach(function () {
      //executes before execution of each spec in the suite
      calculater = new Calculator();
      calculater1 = new Calculator();
      console.log("Execute every time before spec");
    });

    beforeAll(function () {
      console.log("Execute only one time before execute any spec");
    });

    afterEach(function () {
      //executes after execution of each spec in the suite
      //clean up after the spec execution
      console.log("Execute every time after spec");
    });

    afterAll(function () {
      console.log("Execute only one time after every spec");
    });

    //matcher --toBe : it check memory address; it compare value and type
    it("should initilize total with 0", function () {
      calculater.add(0);
      //toBe perfome ===
      //expect(calculater.total).toBe('0'); //fall
      // const person1 = {name:'aamir'};
      // const person2 = {name:'aamir'};
      // expect(person1).toBe(person2); //fall
      expect(calculater.total).toBe(0);
    });

    //toEqual: it does not check memory address; it compare value and type
    it("should initilize the constructor", function () {
      //calculater1.total = '0';
      //expect(calculater1).toEqual(calculater2); //fall bcoz value is differ
      expect(calculater).toEqual(calculater1); //pass
    });

    //not: it inverse te result
    it("should have unique object", function () {
      expect(calculater).not.toBe(calculater1); //pass
    });

    //toContain: check in array and string
    it("should have constructor name and value in array", function () {
      expect(calculater1.constructor.name).toContain("Cal"); //pass
      expect([1, 2, 3, 4]).toContain(3); //pass
    });

    //toBeNaN: check in array and string
    it("should be NaN value after multiply", function () {
      calculater.add(5);
      calculater.multiply("a");
      expect(calculater.total).toBeNaN(); //pass
    });

    //toThrow
    it("should throw error when we divide by zero", function () {
      calculater.total = 10;

      expect(function () {
        calculater.divide(0);
      }).toThrow(); //pass

      expect(function () {
        calculater.divide(0);
      }).toThrow(new Error("Can not be divided by number")); //pass
    });

    //toThrowError
    it("should throw error when we divide by zero by using toThrowError", function () {
      calculater.total = 10;

      //when we don't know exact error.
      expect(function () {
        calculater.divide(0);
      }).toThrowError();

      //when we know exact error message
      expect(function () {
        calculater.divide(0);
      }).toThrowError("Can not be divided by number");

      //when we type and error string
      expect(function () {
        calculater.divide(0);
      }).toThrowError(Error, "Can not be divided by number");

      //when we type and error string bcoz ArithematicError extends Error
      expect(function () {
        calculater.divide(0);
      }).toThrowError(ArithematicError, "Can not be divided by number");

      //We are throwing ArithematicError not BadRequestError
      // expect(function () {
      //   calculater.divide(0);
      // }).toThrowError(BadRequestError, "Can not be divided by number");
    });

    //toMatch: it matches with string and regex
    it("should return total number", function () {
      calculater.total = 10;
      expect(calculater.add(10)).toMatch(/-?\d+/);
      expect(typeof calculater.total).toMatch("num"); //number
    });

    //jasmine.anything()
    it("should return total value", function () {
      calculater.total = 10;
      //it can be anything except null or undefined
      expect(calculater.total).toEqual(jasmine.anything());
    });

    //jasmine.any(): it match types
    it("should return instance", function () {
      calculater.total = 10;

      expect(calculater).toEqual(jasmine.any(Object));
      expect(calculater.total).toEqual(jasmine.any(Number));
      //expect(calculater.total).toEqual(jasmine.any(String)); //fail
      expect(calculater).toEqual(jasmine.any(Calculator));
    });

    //custom Matcher
    it("should be an instance by using custom matcher", function () {
      //register custom matcher
      jasmine.addMatchers(CustomMatcher);

      calculater.total = 10;
      expect(calculater).toBeCalculator(); //pass
      expect(calculater.total).not.toBeCalculator(); //pass
      //expect(calculater).not.toBeCalculator(); //fail
      //expect(calculater.total).toBeCalculator(); fail;
    });

    //objectContaining and
    it("should conatain object property or string", function () {
      calculater.total = 10;

      expect(calculater).toEqual(
        jasmine.objectContaining({
          total: 10,
        })
      );

      expect(typeof calculater.total).toEqual(jasmine.stringContaining("numb"));
    });

    describe("add", () => {
      it("should add number to the total", function () {
        //expect 5+5 to be 10
        //expect(5 + 5).toBe(10);

        calculater.add(5);
        expect(calculater.total).toBe(5);
      });
    });

    describe("multiply", () => {
      it("should multiply number to the total", function () {
        calculater.add(5);
        calculater.multiply(5);
        expect(calculater.total).toBe(25);
      });
    });

    describe("subtract", () => {
      it("should subtract number to the total", function () {
        calculater.add(35);
        calculater.subtract(5);
        expect(calculater.total).toBe(30);
      });
    });

    describe("divide", () => {
      it("should divide number to the total", function () {
        calculater.add(15);
        calculater.divide(3);
        expect(calculater.total).toBe(5);
      });
    });

    describe("get version", function () {
      //here we are dealing with asyc code
      //done specify when our test case is completed
      //by default test case only test sync code. To inform jasmine our
      //code is still need to be run then we use done method
      it("fetches version from external source", function (done) {
        calculater.version.then(function (version) {
          expect(version).toBe("0.4");
          done();
        });
      });
    });
  });
});
