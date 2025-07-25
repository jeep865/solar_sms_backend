import React, { useState } from "react";

export default function LeadEntryForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
    interestLevel: "",
    solarConditions: []
  });

  const solarOptions = ["Good Sunlight", "Shaded Roof", "Flat Roof", "Metal Roof", "Asphalt Roof"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        solarConditions: checked
          ? [...prev.solarConditions, value]
          : prev.solarConditions.filter((item) => item !== value)
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted lead:", form);
    // TODO: Call API to trigger AI + SMS + store
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow-lg rounded-2xl bg-white">
      <h2 className="text-2xl font-bold mb-4">Lead Entry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Visit Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border p-2 rounded" rows="3" required></textarea>
        </div>

        <div>
          <label className="block font-medium">Interest Level</label>
          <select name="interestLevel" value={form.interestLevel} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Solar Conditions</label>
          <div className="flex flex-wrap gap-2">
            {solarOptions.map((option) => (
              <label key={option} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="solarConditions"
                  value={option}
                  checked={form.solarConditions.includes(option)}
                  onChange={handleChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Lead
        </button>
      </form>
    </div>
  );
}
