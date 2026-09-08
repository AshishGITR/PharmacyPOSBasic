import React  from "react";
import type { Medicine } from "../models/model";

interface Props {
    medicines : Medicine[];
    onSelect:(id : number) =>void
}

const MedicineList : React.FC<Props> = ({medicines,onSelect})=> {
    return(
       
  <div className="card-body">

    {/* <h5 className="card-title mb-3 text-primary">
      Medicines
    </h5> */}

    
      <label className="form-label" style={{textAlign:"left"}}>Select Medicine</label>

      <select
        className="form-select"
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">-- Select Medicine --</option>

        {medicines.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>



    )
}
export default MedicineList;