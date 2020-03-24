// Transforms the first letter of a string into Upper Case
export function firstLetterToUpperCase(str: String): String {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
