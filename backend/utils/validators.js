const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const validateMongoId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const validateCartName = (name) => {
  return name && name.trim().length > 0 && name.length <= 100;
};

const validateAmount = (amount) => {
  return amount && parseFloat(amount) > 0;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateMongoId,
  validateCartName,
  validateAmount,
};
