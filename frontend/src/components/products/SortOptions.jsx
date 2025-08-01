import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "";

  function handleChange(e) {
    const sortBy = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());

    if (sortBy) {
      newParams.set("sortBy", sortBy);
    } else {
      newParams.delete("sortBy");
    }

    setSearchParams(newParams);
  }

  return (
    <div className="form-control w-full max-w-xs mb-4">
      <label className="label">
        <span className="label-text text-base-content">Sort By</span>
      </label>
      <select
        value={currentSort}
        onChange={handleChange}
        className="select select-bordered select-info w-full"
      >
        <option value="">Default</option>
        <option value="priceASC">Price: Low to High</option>
        <option value="priceDESC">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
