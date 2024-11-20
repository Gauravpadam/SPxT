from pydantic import BaseModel, Field
from typing import List, Optional

class FormRequestData(BaseModel):
    product_id: int = Field(..., description="Product ID")
    firm_nature: str = Field(..., description="Nature of the firm (e.g., Proprietorship, Partnership, etc.)")
    has_iec: bool = Field(..., description="Does the firm have an IEC?")
    iec_number: Optional[str] = Field(None, description="IEC number if applicable")
    is_iec_up_to_date: Optional[bool] = Field(None, description="Is the IEC up-to-date?")
    trade_type: str = Field(..., description="Trade type: Import, Export, or Both")
    hs_codes: List[str] = Field(..., description="HS codes for the products involved")
    export_turnover: List[float] = Field(..., description="Export turnover for the past three financial years")
    star_export_house: bool = Field(..., description="Is the firm a Star Export House?")
    duty_free_imports: bool = Field(..., description="Does the firm need duty-free imports?")
    has_rcmc: bool = Field(..., description="Does the firm hold an RCMC?")
    export_promotion_council: Optional[str] = Field(None, description="Name of the Export Promotion Council if RCMC is held")
    has_certifications: bool = Field(..., description="Does the firm have ISO, BIS, or other product certifications?")
    grievance_personal_hearing: bool = Field(..., description="Does the firm need to resolve a grievance or request a personal hearing?")
    fee_refunds: Optional[bool] = Field(None, description="Are there any fees or refunds to claim?")
    applying_for_epcg_dfia: bool = Field(..., description="Is the firm applying for EPCG or DFIA benefits?")
    deemed_export_benefits: bool = Field(..., description="Is the firm claiming deemed export benefits?")
    branches: List[str] = Field(..., description="Locations of branches/divisions/units")
    export_obligations: Optional[str] = Field(None, description="Export-related obligations to report or discharge")