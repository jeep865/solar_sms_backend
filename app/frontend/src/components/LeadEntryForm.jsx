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

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Lead submitted successfully!");
        setForm({
          fullName: "",
          phone: "",
          address: "",
          notes: "",
          interestLevel: "",
          solarConditions: []
        });
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit lead.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border border-blue-100">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mb-8">
          Lexi Solar Lead Form
        </h1>

        {status && <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md font-medium text-center">{status}</div>}
        {error && <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-md font-medium text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Visit Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" rows="3" required></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Interest Level</label>
            <select name="interestLevel" value={form.interestLevel} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none" required>
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Solar Conditions</label>
            <div className="flex flex-wrap gap-3">
              {solarOptions.map((option) => (
                <label key={option} className="inline-flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="solarConditions"
                    value={option}
                    checked={form.solarConditions.includes(option)}
                    onChange={handleChange}
                    className="mr-2 rounded border-gray-300 focus:ring-blue-400"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white py-3 px-4 rounded-full font-semibold shadow-md transition-all">
            Submit Lead
          </button>
        </form>
      </div>
    </div>
  );
}
