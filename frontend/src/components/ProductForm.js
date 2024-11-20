import React, { useState } from "react";

const ProductForm = ({ productId, onSubmit }) => {
  const [formData, setFormData] = useState({
    product_id: productId,
    firm_nature: "",
    has_iec: false,
    iec_number: "",
    is_iec_up_to_date: false,
    trade_type: "",
    hs_codes: [],
    export_turnover: [],
    star_export_house: false,
    duty_free_imports: false,
    has_rcmc: false,
    export_promotion_council: "",
    has_certifications: false,
    grievance_personal_hearing: false,
    fee_refunds: false,
    applying_for_epcg_dfia: false,
    deemed_export_benefits: false,
    branches: [],
    export_obligations: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="product-form">
      <h2>Fill Details</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Add other form fields similarly */}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
