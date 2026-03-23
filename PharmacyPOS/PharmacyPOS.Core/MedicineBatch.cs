using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyPOS.Core
{
    public class MedicineBatch
    {
        public int Id { get; set; }
        public int MedicineId { get; set; }
        public string BatchNumber { get; set; }
        public DateTime ExpiryDate { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
