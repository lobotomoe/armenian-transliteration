import type { ContextCondition, CharMapping, SequenceMapping } from "../types.js";
import type { Token } from "../scanner/tokens.js";
import { toLowerCanonical } from "./casing.js";

/**
 * Evaluate a context condition against a token and its neighbors.
 * All specified conditions must be true (AND logic).
 */
export function evaluateCondition(
  condition: ContextCondition,
  token: Token,
  prevToken: Token | undefined,
  nextToken: Token | undefined,
): boolean {
  // wordInitial: token must be at word start
  if (condition.wordInitial !== undefined) {
    const isInitial =
      token.wordPosition === "initial" || token.wordPosition === "isolated";
    if (condition.wordInitial !== isInitial) return false;
  }

  // position: token must be at one of the specified positions
  if (condition.position !== undefined) {
    const positions = Array.isArray(condition.position)
      ? condition.position
      : [condition.position];
    if (!token.wordPosition || !positions.includes(token.wordPosition))
      return false;
  }

  // followedBy: next token's lowercase value must be in the list
  if (condition.followedBy !== undefined) {
    if (!nextToken) return false;
    const nextLower = toLowerCanonical(nextToken.value);
    if (!condition.followedBy.includes(nextLower)) return false;
  }

  // notFollowedBy: next token's lowercase value must NOT be in the list
  if (condition.notFollowedBy !== undefined) {
    if (nextToken) {
      const nextLower = toLowerCanonical(nextToken.value);
      if (condition.notFollowedBy.includes(nextLower)) return false;
    }
    // If no next token, notFollowedBy is satisfied (nothing follows)
  }

  // precededBy: prev token's lowercase value must be in the list
  if (condition.precededBy !== undefined) {
    if (!prevToken) return false;
    const prevLower = toLowerCanonical(prevToken.value);
    if (!condition.precededBy.includes(prevLower)) return false;
  }

  return true;
}

/**
 * Resolve the transliteration output for a mapping, considering context rules.
 * Evaluates context rules in order; first matching rule wins.
 * Falls back to default target if no rules match.
 */
export function resolveMapping(
  mapping: CharMapping | SequenceMapping,
  token: Token,
  prevToken: Token | undefined,
  nextToken: Token | undefined,
): string {
  if (mapping.contextRules) {
    for (const rule of mapping.contextRules) {
      if (evaluateCondition(rule.condition, token, prevToken, nextToken)) {
        return rule.target;
      }
    }
  }
  return mapping.target;
}
