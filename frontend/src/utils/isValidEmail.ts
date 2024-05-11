import validator from "validator"

export default function isValidEmail(email : string) {
  return validator.isEmail(email);
}
