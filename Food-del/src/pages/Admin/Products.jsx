import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StorContext";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function Products() {
  const {
    food_list,
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    updateFoodItem,
  } = useContext(StoreContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("❌ Please upload an image file!");
    if (file.size > 2 * 1024 * 1024)
      return toast.error("⚠️ Max image size is 2MB!");
    const reader = new FileReader();
    reader.onloadend = () =>
      setNewProduct({ ...newProduct, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      (!newProduct.image && !editingProduct)
    ) {
      return toast.error("⚠️ Please fill in all fields!");
    }

    const payload = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      description: newProduct.description || "",
    };

    if (editingProduct) {
      const existsInProducts = products.some((p) => p.id === editingProduct.id);
      if (existsInProducts) {
        updateProduct(editingProduct.id, payload);
      } else {
        updateFoodItem(editingProduct.id || editingProduct._id, payload);
      }
      setEditingProduct(null);
    } else {
      const newId = Date.now();
      addProduct({ id: newId, ...payload });
    }

    setNewProduct({ name: "", price: "", image: "", description: "" });
  };

  const handleEdit = (item) => {
    setEditingProduct(item);
    setNewProduct({
      name: item.name,
      price: item.price,
      image: item.image || "",
      description: item.description || "",
    });
    toast("📝 Edit mode activated!");
      window.scrollTo({ top: 0, behavior: "smooth" });

  };

  // ✅ توست تأكيد الحذف
  const handleDelete = (id) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-white shadow-lg rounded-lg px-5 py-4 flex flex-col gap-3 border border-gray-200`}
      >
        <span className="font-medium text-gray-800">🗑️ Confirm Delete</span>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this product?
        </p>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md text-sm bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteProduct(id);
              toast.dismiss(t.id);
             
            }}
            className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">
        🛒 Manage All Products
      </h1>

      {/* Form */}
      <form
        onSubmit={handleAddOrEdit}
        className="flex flex-wrap gap-4 mb-6 items-center"
        data-aos="fade-up"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border px-3 py-2 rounded-md w-full sm:w-1/4 focus:border-orange-500 outline-none"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border px-3 py-2 rounded-md w-full sm:w-1/4 focus:border-orange-500 outline-none"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border px-3 py-2 rounded-md w-full sm:w-1/4 focus:border-orange-500 outline-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border px-3 py-2 rounded-md w-full sm:w-1/4 cursor-pointer"
        />
        <button
          type="submit"
          className={`${
            editingProduct
              ? "bg-green-500 hover:bg-green-600"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white px-6 py-2 rounded-md transition`}
        >
          {editingProduct ? "Save" : "Add"}
        </button>

        {newProduct.image && (
          <img
            src={newProduct.image}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md border"
          />
        )}
      </form>

      {/* Table */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price ($)</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Added At</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {food_list.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500 text-lg">
                No products found 👀
              </td>
            </tr>
          ) : (
            food_list.map((item, i) => {
              const key = item.id || item._id;
              const isAdmin = products.some((p) => p.id === item.id);
              return (
                <tr
                  key={key}
                  className="border-t hover:bg-gray-50 hover:scale-[1.02] transition-transform duration-200"
                  data-aos="fade-up"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3 truncate max-w-[150px]">{item.name}</td>
                  <td className="p-3">${parseFloat(item.price).toFixed(2)}</td>
                  <td className="p-3 truncate max-w-[200px]">
                    {item.description || "-"}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-US")
                      : "—"}
                  </td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
