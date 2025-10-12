import React, { useContext, useState } from "react";
import { StoreContext } from "../../Context/StorContext";
import toast from "react-hot-toast";

function Products() {
  const { food_list, products, addProduct, deleteProduct, updateProduct, updateFoodItem } =
    useContext(StoreContext);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("❌ Please upload an image file!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("⚠️ Image size should be under 2MB!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setNewProduct({ ...newProduct, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    addProduct({ ...newProduct, price: parseFloat(newProduct.price) });
    setNewProduct({ name: "", price: "", image: "" });
  };

  const handleEdit = (item) => {
    setEditingProduct(item);
    setNewProduct({
      name: item.name,
      price: item.price,
      image: item.image || "",
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    if (products.find((p) => p.id === editingProduct.id)) {
      updateProduct(editingProduct.id, { ...newProduct, price: parseFloat(newProduct.price) });
    } else {
      updateFoodItem(editingProduct.id || editingProduct._id, {
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
    }

    setEditingProduct(null);
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">🛒 Manage All Products</h1>

      <form
        onSubmit={editingProduct ? handleSaveEdit : handleAddProduct}
        className="flex flex-wrap gap-4 mb-6 items-center"
      >
        <input
          type="text"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border px-3 py-2 rounded-md w-1/4 focus:border-orange-500 outline-none"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border px-3 py-2 rounded-md w-1/4 focus:border-orange-500 outline-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border px-3 py-2 rounded-md w-1/4 cursor-pointer"
        />
        <button
          type="submit"
          className={`${
            editingProduct ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
          } text-white px-6 py-2 rounded-md transition`}
        >
          {editingProduct ? "Save" : "Add"}
        </button>

        {newProduct.image && (
          <img src={newProduct.image} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
        )}
      </form>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price ($)</th>
            <th className="p-3 text-left">Added At</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {food_list.map((item, i) => {
            const isAdmin = products.some((p) => p.id === item.id);
            return (
              <tr key={item.id || item._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">${parseFloat(item.price).toFixed(2)}</td>
                <td className="p-3 text-sm text-gray-500">{item.createdAt || "Default"}</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
