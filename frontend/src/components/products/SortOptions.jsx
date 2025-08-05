import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

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
        <span className="label-text text-base-content">{t("sort.label")}</span>
      </label>
      <select
        value={currentSort}
        onChange={handleChange}
        className="select select-bordered select-info w-full"
      >
        <option value="">{t("sort.default")}</option>
        <option value="priceASC">{t("sort.priceASC")}</option>
        <option value="priceDESC">{t("sort.priceDESC")}</option>
        <option value="popularity">{t("sort.popularity")}</option>
      </select>
    </div>
  );
};

export default SortOptions;
