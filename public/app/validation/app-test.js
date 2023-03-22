describe("validation/app-test.js", function() {
  describe("ValidatingBookmark", function() {
    it("requires a url and title", function() {
      var invalid = new ValidatingBookmark();
      expect(invalid.errors).toBeDefined();
      can.each(["url", "title"], function(field) {
        expect(invalid.errors()[field].length).toBeGreaterThan(0);
      });
    });

    it("requires a valid url", function() {
      var invalid = new ValidatingBookmark({url:"invalid"});
      expect(invalid.errors).toBeDefined();
      expect(invalid.errors()["url"].length).toBeGreaterThan(0);
    });

    it("accepts a valid url", function() {
      var valid = new ValidatingBookmark({url:"http://www.pragprog.com"});
      expect(valid.errors).toBeDefined();
      expect(valid.errors()["url"]).toBeUndefined();
    });

    it("triggers error event", function(done) {
      var invalid = new ValidatingBookmark();
      invalid.bind("error", function(evt, attr, errors) {
        expect(attr).toBe("url");
        expect(errors["url"].length).toBeGreaterThan(0);
        done();
      });
      invalid.attr("url", "invalid");
    });
  });
  describe("App_validation", function() {
    it("initializes (sanity check)", function() {
      new App_validation();
      expect(true).toBe(true);
    });
  });
});
