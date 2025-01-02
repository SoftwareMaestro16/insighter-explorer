import { types } from "./types";

export function getClosestContractType(interfaces) {
  if (!interfaces || interfaces.length === 0) {
      return "unknown";
  }

  for (const type of types) {
      if (interfaces.some((intf) => intf.startsWith(type))) {
          return type;
      }
  }

  return "unknown";
}
