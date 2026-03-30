//  TYPES (match backend categories)
export const TYPES = {
  LENGTH: "length",
  WEIGHT: "weight",
  TEMPERATURE: "temperature",
  VOLUME: "volume",
};

//  ACTIONS
export const ACTIONS = {
  COMPARE: "compare",
  CONVERT: "convert",
  ARITHMETIC: "arithmetic",
};

//  OPERATIONS (backend OperationType enum)
export const OPERATIONS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  DIVIDE: "DIVIDE",
  COMPARE: "COMPARE",
  CONVERT: "CONVERT",
};

//  UNITS — display labels (shown in UI dropdowns)
export const UNITS = {
  length: ["FEET", "INCHES", "YARDS", "CENTIMETERS"],
  weight: ["KILOGRAM", "GRAM", "POUND"],
  volume: ["LITRE", "MILLILITRE", "GALLON"],
  temperature: ["C", "F", "K"],
};

/*
 *  UNIT_API_MAP
 *
 * Maps frontend display values → backend-accepted strings.
 *
 * Backend fromString() methods expect lowercase aliases:
 *   LengthUnit:      "feet", "inches", "yard", "cm"
 *   WeightUnit:      "kg", "g", "lb"
 *   VolumeUnit:      "l", "ml", "gal"
 *   TemperatureUnit: "C", "F", "K"  (uppercase, switch uses toUpperCase)
 */
export const UNIT_API_MAP = {
  // Length
  FEET: "feet",
  INCHES: "inches",
  YARDS: "yard",
  CENTIMETERS: "cm",

  // Weight
  KILOGRAM: "kg",
  GRAM: "g",
  POUND: "lb",

  // Volume
  LITRE: "l",
  MILLILITRE: "ml",
  GALLON: "gal",

  // Temperature (TemperatureUnit.fromString uses toUpperCase, so these pass through)
  C: "C",
  F: "F",
  K: "K",
};

// Helper — convert a display unit to the API string the backend accepts
export const toApiUnit = (displayUnit) =>
  UNIT_API_MAP[displayUnit] ?? displayUnit.toLowerCase();
