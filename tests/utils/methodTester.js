// Utility for testing methods on domain objects.
export const methodTester = (domainObject, doc) => ({

  // Tests a method with zero arguments.
  testMethod: (method, fn) => {
    it(`should expose ${method} method`, () => {
      domainObject[method]()
      expect(fn).toHaveBeenCalledWith(doc)
    })
  },

  // Tests a method with a single argument.
  testMethod1: (method, fn, arg) => {
    it(`should expose ${method} method`, () => {
      domainObject[method](arg)
      expect(fn).toHaveBeenCalledWith(doc, arg)
    })
  },

  // Tests a method with two arguments.
  testMethod2: (method, fn, arg1, arg2) => {
    it(`should expose ${method} method`, () => {
      domainObject[method](arg1, arg2)
      expect(fn).toHaveBeenCalledWith(doc, arg1, arg2)
    })
  }
})
