let products = [];

// Get all
export const find = async () => products;

// Create
export const create = async (body) => {
  const newProduct = { ...body, id: crypto.randomUUID() };

  products.push(newProduct);

  return {
    status: "ok",
    message: "Produkt oprettet",
    data: newProduct,
  };
};

// Delete
export const findByIdAndDelete = async (id) => {
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return null;

  const deleted = products[index];

  products.splice(index, 1);

  return deleted;
};
