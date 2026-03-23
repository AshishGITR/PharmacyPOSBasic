import React from "react";
import type { Batch } from "../models/model";

interface Props {
  batches: Batch[];
  onSelect: (batch: Batch) => void;
}

const BatchSelector: React.FC<Props> = ({ batches, onSelect }) => {
  return (
    <div>
      <h3>Batches</h3>
      {batches.map((b) => (
        <div key={b.id}>
          <button onClick={() => onSelect(b)}>
            {b.batchNumber} | ₹{b.price} | Exp: {b.expiryDate}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BatchSelector;