const formatBeneficiaryOrderResponse = (order) => {
  if (!order) return null;
  if (order.beneficiaries && order.beneficiaries.users) {
    const { password, ...userWithoutPassword } = order.beneficiaries.users;
    order.beneficiaries.users = userWithoutPassword;
  }
  return order;
};

const formatBeneficiaryOrderListResponse = (orders) => {
  return orders.map(formatBeneficiaryOrderResponse);
};

module.exports = {
  formatBeneficiaryOrderResponse,
  formatBeneficiaryOrderListResponse,
};
