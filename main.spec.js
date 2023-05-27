describe("main.js", function () {
  describe("calculate()", function () {
    it("validate expression if first the number is invalid", function () {
      //spyOn(window, "updateResult").and.stub();
      spyOn(window, "updateResult"); //.and.stub() is the default one and can be omitted
      calculate("a+3");
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        "Expression not recognized"
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("validate expression if the second number is invalid", function () {
      spyOn(window, "updateResult");
      calculate("3+a");
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        "Expression not recognized"
      );
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("validate expression if the operation is invalid", function () {
      const spy = spyOn(window, "updateResult");
      calculate("3@3");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith("Expression not recognized");
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Calls add", function () {
      const spy = spyOn(Calculator.prototype, "add");
      calculate("3+2");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(2);
      expect(spy).toHaveBeenCalledWith(3);
    });

    it("Calls subtract", function () {
      const spy = spyOn(Calculator.prototype, "subtract");
      calculate("3-2");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(2);
      //3 is called with add not with subtract
      expect(spy).not.toHaveBeenCalledWith(3);
    });

    it("Calls multiply", function () {
      const spy = spyOn(Calculator.prototype, "multiply");
      calculate("4*3");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(3);
      //3 is called with add not with multiply
      expect(spy).not.toHaveBeenCalledWith(4);
    });

    it("Calls divide", function () {
      const spy = spyOn(Calculator.prototype, "divide");
      calculate("10/2");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(2);
      //3 is called with add not with divide
      expect(spy).not.toHaveBeenCalledWith(10);
    });

    it("calls updateResult (example for callThrough)", function () {
      const spyUpateResult = spyOn(window, "updateResult");
      //it call the real function; we can test by adding debugger in the real function;
      const spyMultiply = spyOn(
        Calculator.prototype,
        "multiply"
      ).and.callThrough();

      calculate("3*3");
      expect(spyMultiply).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalledTimes(1);
      expect(spyUpateResult).toHaveBeenCalledWith(9);
    });

    it("calls updateResult (example for callFake)", function () {
      const spyUpateResult = spyOn(window, "updateResult");
      //it does not call the real function; it calls custom defined function;
      const spyMultiply = spyOn(Calculator.prototype, "multiply").and.callFake(
        function () {
          //we can define our custom logic
          return "Fake Call";
        }
      );

      calculate("3*3");
      expect(spyMultiply).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalledTimes(1);
      expect(spyUpateResult).toHaveBeenCalledWith("Fake Call");
    });

    it("calls updateResult (example for returnValue)", function () {
      const spyUpateResult = spyOn(window, "updateResult");
      //it simply return expected value
      const spyMultiply = spyOn(
        Calculator.prototype,
        "multiply"
      ).and.returnValue("return value");
      calculate("3*3");
      expect(spyMultiply).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalledTimes(1);
      expect(spyUpateResult).toHaveBeenCalledWith("return value");
    });

    it("calls updateResult (example for returnValues)", function () {
      const spyUpateResult = spyOn(window, "updateResult");
      //it tracks function how many types of value is returning
      //As noticed multiple arguments are passed; null,'second value' in the  below code
      //we can define as many as arguments in the returnValues
      //we used "returnValues"
      //in the first call add function will return null
      //in the second call add functon will return 'second value';
      const spyMultiply = spyOn(Calculator.prototype, "add").and.returnValues(
        null,
        "second value"
      );
      calculate("3+3");
      expect(spyMultiply).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalled();
      expect(spyUpateResult).toHaveBeenCalledTimes(1);
      expect(spyUpateResult).toHaveBeenCalledWith("second value");
    });

    it("doesnot handle errors", function () {
      //whenever your spy method throw error. we can handle this situation by using this technique
      spyOn(Calculator.prototype, "multiply").and.throwError("Some Error");
      //if we do not define this function inside the expect then this test case will
      //directly fail without executeting
      expect(function () {
        calculate("3*3");
      }).toThrowError("Some Error");
    });
  });

  describe("updateResult()", function () {
    let element;
    beforeAll(function () {
      element = document.createElement("div");
      element.setAttribute("id", "result");
      document.body.appendChild(element);
    });

    afterAll(function () {
      document.body.removeChild(element);
    });
    it("add result to the dom element", function () {
      updateResult("5");
      expect(element.innerText).toBe("5");
    });
  });

  describe("showCalculotorType()", function () {
    it("should call the showCalculotorType method", function () {
      spyOn(document, "getElementById").and.returnValue({
        innerText: null,
      });

      //here we are getting spy of getter function
      //const spy = spyOnProperty(Calculator.prototype, "calculatorType", "get");

      //here we are getting spy of getter function with return value
      const spy = spyOnProperty(
        Calculator.prototype,
        "calculatorType",
        "get"
      ).and.returnValue("simple calculator");
      showCalculotorType();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledTimes(1);
      //we need to call the spy to get the return value
      expect(spy()).toEqual("simple calculator");
    });
  });
});
