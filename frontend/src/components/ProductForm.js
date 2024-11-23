import React, { useState } from "react";

const ProductForm = ({ productId, onSubmit }) => {
  const [formData, setFormData] = useState({
    product_id: productId,
    firm_nature: "",
    has_iec: false,
    iec_number: "",
    is_iec_up_to_date: false,
    trade_type: "",
    hs_codes: [""],
    export_turnover: ["", "", ""],
    star_export_house: false,
    duty_free_imports: false,
    has_rcmc: false,
    export_promotion_council: "",
    has_certifications: false,
    grievance_personal_hearing: false,
    fee_refunds: false,
    applying_for_epcg_dfia: false,
    deemed_export_benefits: false,
    branches: [""],
    export_obligations: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (index, name, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[name]];
      updatedArray[index] = value;
      return { ...prev, [name]: updatedArray };
    });
  };

  const addToArray = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data" ,formData)
    onSubmit(formData);
  };

  return (
    <div className="product-form-2">
     
      <h2>Fill Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Firm Nature */}
        <div className="form-group">
          <label>Nature of the Firm</label>
          <input
            type="text"
            name="firm_nature"
            value={formData.firm_nature}
            onChange={handleChange}
            required
          />
        </div>

        {/* Has IEC */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="has_iec"
              checked={formData.has_iec}
              onChange={handleChange}
            />
            Does the firm have an IEC?
          </label>
        </div>

        {/* IEC Number */}
        {formData.has_iec && (
          <>
            <div className="form-group">
              <label>IEC Number</label>
              <input
                type="text"
                name="iec_number"
                value={formData.iec_number}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-check">
              <label>
                <input
                  type="checkbox"
                  name="is_iec_up_to_date"
                  checked={formData.is_iec_up_to_date}
                  onChange={handleChange}
                />
                Is the IEC up-to-date?
              </label>
            </div>
          </>
        )}

        {/* Trade Type */}
        <div className="form-group">
          <label>Trade Type</label>
          <select
            name="trade_type"
            value={formData.trade_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Trade Type</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* HS Codes */}
        <div className="form-group">
          <label>HS Codes</label>
          {formData.hs_codes.map((code, index) => (
            <input
              key={index}
              type="text"
              value={code}
              onChange={(e) => handleArrayChange(index, "hs_codes", e.target.value)}
              placeholder={`HS Code ${index + 1}`}
            />
          ))}
          <div class="button-row">
  <button type="button"  style={{marginTop:"10px",padding:"10px"}} onClick={() => addToArray("hs_codes")}>
    Add Another HS Code
  </button>
</div>
        </div>

        {/* Export Turnover */}
        <div className="form-group">
          <label>Export Turnover (Last 3 Years)</label>
          {formData.export_turnover.map((turnover, index) => (
            <input
              key={index}
              type="number"
              value={turnover}
              onChange={(e) =>
                handleArrayChange(index, "export_turnover", e.target.value)
              }
              placeholder={`Year ${index + 1}`}
            />
          ))}
        </div>

        {/* Star Export House */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="star_export_house"
              checked={formData.star_export_house}
              onChange={handleChange}
            />
            Is the firm a Star Export House?
          </label>
        </div>

        {/* Duty-Free Imports */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="duty_free_imports"
              checked={formData.duty_free_imports}
              onChange={handleChange}
            />
            Does the firm need duty-free imports?
          </label>
        </div>

        {/* RCMC */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="has_rcmc"
              checked={formData.has_rcmc}
              onChange={handleChange}
            />
            Does the firm hold an RCMC?
          </label>
        </div>
        {formData.has_rcmc && (
          <div className="form-group">
            <label>Export Promotion Council</label>
            <input
              type="text"
              name="export_promotion_council"
              value={formData.export_promotion_council}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Certifications */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="has_certifications"
              checked={formData.has_certifications}
              onChange={handleChange}
            />
            Does the firm have product certifications?
          </label>
        </div>

        {/* Grievances */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="grievance_personal_hearing"
              checked={formData.grievance_personal_hearing}
              onChange={handleChange}
            />
            Need to resolve a grievance or request a personal hearing?
          </label>
        </div>

        {/* Fee Refunds */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="fee_refunds"
              checked={formData.fee_refunds}
              onChange={handleChange}
            />
            Are there any fees or refunds to claim?
          </label>
        </div>

        {/* EPCG/DFIA */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="applying_for_epcg_dfia"
              checked={formData.applying_for_epcg_dfia}
              onChange={handleChange}
            />
            Is the firm applying for EPCG or DFIA benefits?
          </label>
        </div>

        {/* Deemed Export Benefits */}
        <div className="form-group-check">
          <label>
            <input
              type="checkbox"
              name="deemed_export_benefits"
              checked={formData.deemed_export_benefits}
              onChange={handleChange}
            />
            Is the firm claiming deemed export benefits?
          </label>
        </div>

        {/* Branches */}
        <div className="form-group">
          <label>Branches/Divisions/Units</label>
          {formData.branches.map((branch, index) => (
            <input
              key={index}
              type="text"
              value={branch}
              onChange={(e) => handleArrayChange(index, "branches", e.target.value)}
              placeholder={`Branch ${index + 1}`}
            />
          ))}

          <button type="button" style={{marginTop:"10px",padding:"10px"}} onClick={() => addToArray("branches")}>
            Add Another Branch
          </button>
        </div>

        {/* Export Obligations */}
        <div className="form-group">
          <label>Export Obligations</label>
          <textarea
            name="export_obligations"
            value={formData.export_obligations}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      
     
     
    </div>
  );
};

export default ProductForm;
