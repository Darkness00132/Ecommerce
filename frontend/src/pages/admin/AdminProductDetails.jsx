import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../axiosInstance/axiosInstance.js";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../../main.jsx";
import { toast } from "react-toastify";
import useAuthUser from "../../store/useAuthUser.js";
import { FaTrashAlt } from "react-icons/fa";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useAuthUser((state) => state.role);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({});

  const { data: product, refetch } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data.product;
    },
  });

  useEffect(() => {
    if (product) {
      const { images, ...rest } = product;
      setFormData({
        ...rest,
        sizes: product.sizes?.join(", ") || "",
        colors: product.colors?.join(", ") || "",
        tags: product.tags?.join(", ") || "",
      });
      setExistingImages(product.images);
    }
  }, [product]);

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: async ({ formData }) => {
      const response = await axiosInstance.put("/products/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products", id]);
      // refetch();
      setFiles([]);
      setImages([]);
      setExistingImages([]);
      toast.success("Product updated successfully!");
    },
    onError: (error) => {
      toast.error("Something went wrong: " + error.message);
    },
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete("/products/" + id);
      toast.success(response.data.message || "Deleted Succefully");
      navigate("/admin/products");
    },
    onError: (error) => {
      toast.error("Something went wrong: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    for (const file of files) {
      formDataToSend.append("images", file);
    }
    formDataToSend.append("existingImages", JSON.stringify(existingImages));

    mutate({ formData: formDataToSend });
  };
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Edit Product</h1>

      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        onSubmit={handleSubmit}
      >
        {[
          { label: "Name", name: "name" },
          { label: "SKU", name: "sku" },
          { label: "Price", name: "price" },
          { label: "Discount Price", name: "discountPrice" },
          { label: "Count In Stock", name: "countInStock" },
          { label: "Brand", name: "brand" },
          { label: "Category", name: "category" },
          { label: "Material", name: "material" },
          { label: "Gender", name: "gender" },
          { label: "Collections", name: "collections" },
          { label: "Sizes (comma-separated)", name: "sizes" },
          { label: "Colors (comma-separated)", name: "colors" },
          { label: "Tags (comma-separated)", name: "tags" },
          { label: "Meta Title", name: "metaTitle" },
          { label: "Meta Description", name: "metaDescription" },
          { label: "Meta Keyword", name: "metaKeyword" },
        ].map(({ label, name }, i) => (
          <div key={i}>
            <label className="label">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [name]: e.target.value }))
              }
              className="input input-bordered w-full"
            />
          </div>
        ))}

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={4}
          />
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4 sm:col-span-2">
            {existingImages.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded overflow-hidden border"
              >
                <img src={img.url} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() =>
                    setExistingImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-xl p-1"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New Uploaded Images */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 sm:col-span-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded overflow-hidden border"
              >
                <img
                  src={img.url}
                  alt={img.altText || ""}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages((prev) => prev.filter((_, i) => i !== index));
                    setFiles((prev) => {
                      const updated = Array.from(prev);
                      updated.splice(index, 1);
                      return updated;
                    });
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-xl p-1"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Images */}
        <div className="sm:col-span-2">
          <label className="label">Upload Images</label>
          <input
            type="file"
            multiple
            className="file-input file-input-bordered w-full"
            onChange={(e) => {
              const selected = Array.from(e.target.files);
              setFiles(selected);
              const newImages = selected.map((file) => ({
                url: URL.createObjectURL(file),
                altText: file.name,
              }));
              setImages((prev) => [...prev, ...newImages]);
            }}
          />
        </div>

        <div className="sm:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={isUpdating}
            className={`btn btn-primary lg:btn-wide ${
              isUpdating ? "btn-disabled" : ""
            }`}
          >
            {isUpdating ? "Updating" : "Update Product"}
          </button>
          {(role === "superAdmin" || role === "owner") && (
            <button
              type="button"
              className={`btn lg:btn-wide btn-error ml-0.5 ${
                isDeleting ? "btn-disabled" : ""
              }`}
              onClick={() => deleteProduct()}
              disabled={isDeleting}
            >
              <FaTrashAlt />
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminProductDetails;
