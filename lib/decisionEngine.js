/**
 * Evaluates the user context and determines the routing path.
 * @param {Object} user - The user context object.
 * @param {number|null} user.age - User's age.
 * @param {boolean|null} user.isRegistered - Registration status.
 * @returns {string} The route decision.
 */
export function evaluateUser(user) {
  if (!user || typeof user.age !== "number") {
    return "incomplete";
  }

  if (user.age < 18) {
    return "ineligible";
  }

  if (user.age >= 18 && !user.isRegistered) {
    return "register";
  }

  if (user.age >= 18 && user.isRegistered) {
    return "polling";
  }

  return "incomplete";
}
