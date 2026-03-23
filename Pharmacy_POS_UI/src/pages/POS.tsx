import React, { useEffect, useState } from "react";
import { getMedicines, getBatches, createSale } from "../api/api";
import type { Medicine,Batch,CartItem } from "../models/model";
import MedicineList from "../components/MedicineList";
import BatchSelector from "../components/BatchSelector";
import Cart from "../components/Cart";

const POS: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [qty, setQty] = useState<number>(1);

  const [customerName, setCustomerName] = useState("");
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
    <div style={{ display: "flex", padding: 20 }}>
      {/* LEFT */}
      <div style={{ width: "50%" }}>
        <h2>Medical Shop POS</h2>

        <input
          placeholder="Customer Name"
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          placeholder="Doctor Name"
          onChange={(e) => setDoctorName(e.target.value)}
        />

        <MedicineList medicines={medicines} onSelect={loadBatches} />
        <BatchSelector batches={batches} onSelect={setSelectedBatch} />

        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <button onClick={addToCart}>Add to Cart</button>
      </div>

      {/* RIGHT */}
      <div style={{ width: "50%" }}>
        <Cart cart={cart} />
        <button onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
};

export default POS;