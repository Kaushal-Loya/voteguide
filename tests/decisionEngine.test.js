import { evaluateUser } from "../lib/decisionEngine";

describe("evaluateUser", () => {
  it("returns 'ineligible' for age < 18", () => {
    const user = { age: 17, isRegistered: false };
    expect(evaluateUser(user)).toBe("ineligible");
  });

  it("returns 'register' for age >= 18 and not registered", () => {
    const user = { age: 18, isRegistered: false };
    expect(evaluateUser(user)).toBe("register");
  });

  it("returns 'polling' for age >= 18 and registered", () => {
    const user = { age: 25, isRegistered: true };
    expect(evaluateUser(user)).toBe("polling");
  });

  it("returns 'incomplete' if age is not a number", () => {
    const user = { age: null, isRegistered: false };
    expect(evaluateUser(user)).toBe("incomplete");
  });
});
