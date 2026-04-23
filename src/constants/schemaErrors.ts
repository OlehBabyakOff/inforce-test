export const SCHEMA_ERRORS = Object.freeze({
  // number errors
  'number.base': '{{#label}} must be a number',
  'number.integer': '{{#label}} must be an integer',
  'number.max': '{{#label}} must be less than or equal to {{#limit}}',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
  'number.positive': '{{#label}} must be a positive number',

  // string errors
  'string.base': '{{#label}} must be a string',
  'string.empty': '{{#label}} cannot be empty',
  'string.min': '{{#label}} length must be at least {{#limit}} characters',
  'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters',
  'string.length': '{{#label}} length must be {{#limit}} characters',
  'string.email': '{{#label}} must be a valid email address',
  'string.pattern.base': '{{#label}} format is invalid',
  'string.uri': '{{#label}} must be a valid URI',
  'string.hex': '{{#label}} must be a valid hex value',

  // boolean errors
  'boolean.base': '{{#label}} must be a boolean',

  // other errors
  'any.required': '{{#label}} is required',
});

