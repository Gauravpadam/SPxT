from sqlalchemy.orm import Session
from utils import add_form_links, form_list_extract_xml_content
from llm_calls.llm_calls import form_list_llm_call
from models.forms import Forms_Model
from schemas.form_schema import FormRequestData

def get_forms(session: Session, data: FormRequestData):
    forms = session.query(Forms_Model.form_purpose, Forms_Model.form_use_case).all()

    prompt = (
        f"The firm is a {data.firm_nature}. "
        f"It {'has' if data.has_iec else 'does not have'} an Importer-Exporter Code (IEC). "
        f"{'The IEC number is ' + data.iec_number + '. ' if data.has_iec and data.iec_number else ''}"
        f"{'The IEC is up-to-date. ' if data.is_iec_up_to_date else ''}"
        f"The firm is engaged in {data.trade_type.lower()} activities. "
        f"Products involved have HS codes: {', '.join(data.hs_codes)}. "
        f"The export turnover for the past three financial years is {', '.join(map(str, data.export_turnover))}. "
        f"{'It is registered as a Star Export House. ' if data.star_export_house else ''}"
        f"{'It requires duty-free imports for manufacturing export goods. ' if data.duty_free_imports else ''}"
        f"{'The firm holds an RCMC with ' + data.export_promotion_council + '. ' if data.has_rcmc and data.export_promotion_council else ''}"
        f"{'It has ISO, BIS, or other product certifications. ' if data.has_certifications else ''}"
        f"{'It needs to resolve a grievance or seek a personal hearing with DGFT. ' if data.grievance_personal_hearing else ''}"
        f"{'The firm needs to claim refunds for fees. ' if data.fee_refunds else ''}"
        f"{'The firm is applying for benefits under EPCG or DFIA. ' if data.applying_for_epcg_dfia else ''}"
        f"{'It wants to claim deemed export benefits. ' if data.deemed_export_benefits else ''}"
        f"The firm has branches/divisions located in {', '.join(data.branches)}. "
        f"{'Export-related obligations include: ' + data.export_obligations + '. ' if data.export_obligations else ''}"
    )

    forms_list = ""
    for i, form in enumerate(forms, start=1):
        forms_list += (
            f"<form-{i}>\n"
            f"  <name>{form.form_name}</name>\n"
            f"  <purpose>{form.form_purpose}</purpose>\n"
            f"  <use-case>{form.form_use_case}</use-case>\n"
            f"</form-{i}>\n"
        )

    # Combine into final structure
    output = (
        f"<input>\n"
        f"{prompt}\n"
        f"</input>\n"
        f"<forms-list>\n"
        f"{forms_list}</forms-list>"
    )

    response = form_list_llm_call(output)
    final_output = form_list_extract_xml_content(response)
    response_with_links = add_form_links(final_output)
    return response_with_links

def form_test():
    test_data = '''<form-list><form>form-1</form><form>form2</form></form-list>'''
    response = form_list_extract_xml_content(test_data)
    fin_res = add_form_links(response)
    return fin_res