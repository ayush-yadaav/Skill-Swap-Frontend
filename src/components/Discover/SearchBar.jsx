import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => (
  <div className="flex items-center bg-white shadow rounded-xl px-4 mb-12 max-w-lg">
    <Search className="text-muted-foreground w-5 h-5" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by skill or name..."
      className="flex-1 py-3 px-2 text-sm border-none outline-none"
    />
  </div>
);

export default SearchBar;