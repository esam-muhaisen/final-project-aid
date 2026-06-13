const formatCategoryResponse = (category) => {
  return category;
};

const formatCategoryListResponse = (categories) => {
  return categories.map(formatCategoryResponse);
};

module.exports = {
  formatCategoryResponse,
  formatCategoryListResponse,
};
