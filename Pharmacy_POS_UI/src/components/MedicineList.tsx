import React  from "react";
import type { Medicine } from "../models/model";

interface Props {
    medicines : Medicine[];
    onSelect:(id : number) =>void
}

const MedicineList : React.FC<Props> = ({medicines,onSelect})=> {
    return(
        <div>
            <h3>Medicines</h3>
            <select onChange={(e) => onSelect(Number(e.target.value))}>
                <option>Select Medicine</option>
                {medicines.map((m)=> (
                    <option key={m.id} value={m.id}>
                        {m.name}
                        </option>
                ))}
            </select>
        </div>

    )
}
export default MedicineList;