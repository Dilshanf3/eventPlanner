// Email validation function
export const isValidEmail = (email: string): boolean => {
  // Check for a valid email format
  const emailPattern = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

// Phone number validation function
export const isValidPhoneNumber = (phone: string): boolean => {
  const phonePattern = /^\d{10}$/; // Example for 10 digit numbers
  return phonePattern.test(phone);
};
