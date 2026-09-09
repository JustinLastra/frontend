const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  const value = email?.trim() ?? "";

  if (!value) {
    return "Email is required";
  }

  if (!EMAIL_PATTERN.test(value)) {
    return "Invalid email address";
  }

  return "";
}

export function validatePassword(password, { minLength = 8 } = {}) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters`;
  }

  return "";
}

export function validateName(name) {
  const value = name?.trim() ?? "";

  if (!value) {
    return "Name is required";
  }

  if (value.length < 2) {
    return "Name must be at least 2 characters";
  }

  if (value.length > 30) {
    return "Name must be at most 30 characters";
  }

  return "";
}
