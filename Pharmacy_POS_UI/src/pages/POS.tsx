import React, { useEffect, useState } from "react";
import { getMedicines, getBatches, createSale } from "../api/api";
import type { Medicine,Batch,CartItem } from "../models/model";
import MedicineList from "../components/MedicineList";
import BatchSelector from "../components/BatchSelector";

const POS: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [qty, setQty] = useState<number>(1);

  let [customerName, setCustomerName] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const res = await getMedicines();
    setMedicines(res.data);
  };

  const loadBatches = async (medicineId: number) => {
    const res = await getBatches(medicineId);

    // Filter expired batches
    const validBatches = res.data.filter(
      (b: Batch) => new Date(b.expiryDate) > new Date()
    );

    setBatches(validBatches);
  };

  const addToCart = () => {
    if (!selectedBatch) return;
    const medicine = medicines.find(m=> m.id === selectedBatch.id);

    if(!medicine) return;

    setCart([
      ...cart,
      {
        batchId: selectedBatch.id,
        batchNumber: selectedBatch.batchNumber,
        medicineName: medicine.name,
        price: selectedBatch.price,
        quantity: qty,
      },
    ]);
  };

  const checkout = async () => {
    const payload = {
      customerName,
      doctorName,
      items: cart.map((c) => ({
        batchId: c.batchId,
        quantity: c.quantity,
      })),
    };
   
    try {
      await createSale(payload);
      alert("Sale Completed!");
      setCart([]);
    } catch (err: any) {
      alert(err.response?.data || "Error");
    }
  };

   return (
   <div className="container-fluid p-3">
  <div className="row">

    {/* LEFT PANEL */}
    <div className="col-md-6">
      <div className="card shadow-sm mb-3">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Medical Shop POS</h5>
        </div>

        <div className="card-body">

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Customer Name"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Doctor Name"
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
          {/* Medicine List */}
      <div className="card shadow-sm">
        
        <div className="card-header bg-secondary text-white">
          Medicines
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
          <MedicineList medicines={medicines} onSelect={loadBatches} />
          <BatchSelector batches={batches} onSelect={setSelectedBatch} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

          {/* <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div> */}
</div>
          <button
            className="btn btn-success w-100"
            onClick={addToCart}
          >
            Add to Cart
          </button>

        </div>
      </div>

      
    </div>

    {/* RIGHT PANEL */}
    <div className="col-md-6">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white d-flex justify-content-between">
          <span>Cart / Invoice</span>
          <span>{cart.length} Items</span>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>Medicine</th>
                <th>Batch</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.medicineName}</td>
                  <td>{item.batchNumber}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Section */}
          <div className="text-end">
            <h5>
              Total: ₹
              {cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </h5>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={checkout}
          >
            Checkout
          </button>

        </div>
      </div>
      <button
            className="btn btn-primary w-100 mt-3"
            onClick={checkout}
          >
            Sale Info 
          </button>
    </div>

  </div>

  
</div>
  );
};

export default POS;