/**
 * Calculate cost split for cart items
 */
const calculateSplit = (totalAmount, numberOfPeople) => {
  if (numberOfPeople <= 0) {
    throw new Error('Number of people must be greater than 0');
  }

  const amountPerPerson = totalAmount / numberOfPeople;
  return parseFloat(amountPerPerson.toFixed(2));
};

/**
 * Calculate split with equal distribution
 */
const calculateEqualSplit = (totalAmount, userIds) => {
  const amountPerPerson = calculateSplit(totalAmount, userIds.length);
  
  return userIds.map(userId => ({
    userId,
    amount: amountPerPerson,
  }));
};

/**
 * Calculate split with custom amounts
 */
const calculateCustomSplit = (totalAmount, splitDetails) => {
  const totalDistributed = splitDetails.reduce((sum, detail) => sum + detail.amount, 0);
  
  if (Math.abs(totalDistributed - totalAmount) > 0.01) {
    throw new Error('Split amounts do not match total amount');
  }

  return splitDetails;
};

/**
 * Calculate who owes whom
 */
const calculateDebts = (cartItems) => {
  const debts = {};

  cartItems.forEach(item => {
    const payer = item.addedBy.toString();
    
    item.splitAmong.forEach(participant => {
      if (participant.userId.toString() !== payer && !participant.isPaid) {
        const debtor = participant.userId.toString();
        
        if (!debts[debtor]) {
          debts[debtor] = {};
        }
        
        if (!debts[debtor][payer]) {
          debts[debtor][payer] = 0;
        }
        
        debts[debtor][payer] += participant.amount;
      }
    });
  });

  return debts;
};

module.exports = {
  calculateSplit,
  calculateEqualSplit,
  calculateCustomSplit,
  calculateDebts,
};
