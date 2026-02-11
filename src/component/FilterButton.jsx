import { IoClose } from "react-icons/io5";

const FilterButton = ({ label, count, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 border py-1 px-1 whitespace-nowrap rounded-lg! transition
        ${
          active
            ? "bg-red-700 text-white border-red-500"
            : "bg-white text-black border-gray-400"
        }`}
    >
      <span className="font-semibold px-1">
        {label} ({count})
      </span>

      {active && (
        <IoClose
          size={20}
          className="ml-1 cursor-pointer"
        />
      )}
    </button>
  );
};
export default FilterButton;
