export function getAvailability(product, t) {
  const available = (product.countInStock ?? 0) > 0;
  const days = product.shippingDays ?? 14;
  return {
    available,
    label: available
      ? t('products.shipsInDays', { count: days })
      : t('products.unavailable'),
  };
}