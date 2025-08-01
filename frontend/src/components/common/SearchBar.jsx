import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearchToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
      setSearchTerm("");
    }
  }

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-200 px-4 pr-12 pl-2 py-2 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass size={32} />
            </button>
          </div>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800 ml-4"
            onClick={handleSearchToggle}
          >
            <HiMiniXMark size={28} className="cursor-pointer" />
          </button>
        </form>
      ) : (
        <button
          className="btn btn-ghost btn-circle"
          onClick={handleSearchToggle}
        >
          <HiMagnifyingGlass size={22} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
