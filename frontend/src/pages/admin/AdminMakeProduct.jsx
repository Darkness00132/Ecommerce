import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../axiosInstance/axiosInstance.js";
import { toast } from "sonner";

const AdminProductDetails = () => {
  const formRef = useRef();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ formData }) => {
      const response = await axiosInstance.post(
        "/products/makeProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.product;
    },
    onSuccess: (data) => {
      toast.success("Product created successfully!");
      //formRef.current?.reset();
      //setImages([]);
      //setFiles([]);
    },
    onError: (error) => {
      console.log("Something went wrong: " + error.message);
      toast.error("Check you entered required inputs!");
    },
  });

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => {
      const newFiles = Array.from(prev);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({ formData });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Add Product</h1>

      <form
        ref={formRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        onSubmit={handleSubmit}
      >
        {[
          { label: "Name", name: "name" },
          { label: "SKU (UNIQUE)", name: "sku" },
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
            rows={4}
          />
        </div>

        {/* Image Preview */}
        <div className="sm:col-span-2">
          <div className="flex flex-wrap gap-4">
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
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-xl p-1"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Images */}
        <div className="sm:col-span-2">
          <label className="label">Upload Images</label>
          <input
            type="file"
            multiple
            name="images"
            defaultValue={files}
            className="file-input file-input-bordered w-full"
            onChange={(e) => {
              setFiles(e.target.files);
              const files = Array.from(e.target.files);
              const newImages = files.map((file) => ({
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
            className={`btn btn-primary lg:btn-wide ${
              isPending ? "btn-disabled" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductDetails;
