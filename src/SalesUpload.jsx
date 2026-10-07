import React, { useState } from "react";

function SalesUpload({ onDataLoaded }) {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;

      const lines = text.trim().split("\n");

      const headers = lines[0]
        .split(",")
        .map((header) => header.trim());

      const data = lines.slice(1).map((line) => {
        const values = line.split(",");

        const row = {};

        headers.forEach((header, index) => {
          row[header] = values[index]?.trim();
        });

        return {
          ...row,
          id: Number(row.id),
          revenue: Number(row.revenue),
          deals: Number(row.deals),
        };
      });

      onDataLoaded(data);
    };

    reader.readAsText(file);
  };

  return (
    <div className="sales-upload">
      <h2>Upload Sales Data</h2>

      <p>Upload a CSV file to update the dashboard.</p>

      <label className="upload-label">
        📁 Upload CSV

        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          hidden
        />
      </label>

      {fileName && (
        <p className="file-name">
          ✓ {fileName} uploaded
        </p>
      )}
    </div>
  );
}

export default SalesUpload;