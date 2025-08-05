import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OPTIONS = {
  category: ["Top Wear", "Bottom Wear"],
  gender: ["Men", "Woman"],
  size: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    "Black",
    "White",
    "Navy",
    "Gray",
    "Beige",
    "Olive",
    "Brown",
    "Burgundy",
  ],
  material: [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Leather",
    "Viscose",
  ],
  brand: [
    "Urban Threads",
    "Modern Basics",
    "Street Pulse",
    "Minimal Code",
    "Casual Lane",
  ],
};

const FilterSideBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    category: [],
    gender: [],
    size: [],
    colors: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 200,
  });

  useEffect(() => {
    const parseParams = (key) => {
      const value = searchParams.get(key);
      return value ? value.split(",") : [];
    };

    setForm({
      category: parseParams("category"),
      gender: parseParams("gender"),
      size: parseParams("size"),
      colors: parseParams("colors"),
      material: parseParams("material"),
      brand: parseParams("brand"),
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 200,
    });
  }, [searchParams]);

  const handleCheckboxChange = (type, value) => {
    setForm((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(form)) {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (!Array.isArray(value)) {
        params.set(key, value.toString());
      }
    }

    navigate(`?${params.toString()}`);
  };

  const renderCheckboxGroup = (labelKey, type, translate = true) => (
    <div className="mb-4">
      <h3 className="font-bold mb-2">{t(`filter.${labelKey}`)}</h3>
      <div className="flex flex-wrap gap-2">
        {OPTIONS[type].map((opt) => (
          <label key={opt} className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              checked={form[type].includes(opt)}
              onChange={() => handleCheckboxChange(type, opt)}
            />
            <span className="label-text">
              {translate ? t(`filter.${opt}`) : opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 w-72 bg-base-100 border border-base-300 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">{t("Filters")}</h2>

      {renderCheckboxGroup("Category", "category")}
      {renderCheckboxGroup("Gender", "gender")}
      {renderCheckboxGroup("Size", "size", false)}

      <div className="mb-4">
        <h3 className="font-bold mb-2">{t("filter.Colors")}</h3>
        <div className="flex flex-wrap gap-2">
          {OPTIONS["colors"].map((color) => {
            const isSelected = form["colors"].includes(color);
            return (
              <button
                key={color}
                type="button"
                onClick={() => handleCheckboxChange("colors", color)}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-150 ${
                  isSelected ? "border-black scale-110" : "border-gray-300"
                }`}
                style={{
                  backgroundColor: color.toLowerCase(),
                  filter: isSelected ? "brightness(0.8)" : "brightness(0.5)",
                }}
                title={t(`filter.${color}`)}
              ></button>
            );
          })}
        </div>
      </div>

      {renderCheckboxGroup("Material", "material")}
      {renderCheckboxGroup("Brand", "brand", false)}

      <div className="mb-5">
        <h3 className="font-semibold mb-2">{t("Price Range")}</h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>${form.minPrice}</span>
          <span>${form.maxPrice}</span>
        </div>
        <input
          type="range"
          min={0}
          max={form.maxPrice}
          value={form.minPrice}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              minPrice: Number(e.target.value),
            }))
          }
          className="range range-sm range-primary mb-2"
        />
        <input
          type="range"
          min={form.minPrice}
          max={200}
          value={form.maxPrice}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="range range-sm range-primary"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full mb-8">
        {t("Apply Filters")}
      </button>
    </form>
  );
};

export default FilterSideBar;
