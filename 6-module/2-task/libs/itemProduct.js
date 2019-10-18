module.exports = function itemProduct(item) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    subcategory: item.subcategory,
    images: item.images,
  };
}; // управление отображением
