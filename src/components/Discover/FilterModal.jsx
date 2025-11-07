import { useState } from "react";
import { filterProfiles } from "../../api/discoverApi.js";
import { X, SlidersHorizontal } from "lucide-react";

const FilterModal = ({ close, token, setProfiles }) => {
  const [form, setForm] = useState({
    skill: "",
    location: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const applyFilter = async () => {
    try {
      const filtered = await filterProfiles(token, form);
      setProfiles(filtered);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" /> Advanced Filters
        </h2>

        <label className="block text-sm font-medium mb-1">Skill</label>
        <input
          name="skill"
          value={form.skill}
          onChange={handleChange}
          placeholder="e.g., React"
          className="border rounded-xl w-full p-2 mb-3"
        />

        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g., Delhi"
          className="border rounded-xl w-full p-2 mb-3"
        />

    
     

        <div className="flex gap-3">
          <button
            onClick={applyFilter}
            className="flex-1 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90"
          >
            Apply
          </button>
          <button
            onClick={close}
            className="flex-1 py-2 border border-border rounded-xl font-semibold hover:bg-muted/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;