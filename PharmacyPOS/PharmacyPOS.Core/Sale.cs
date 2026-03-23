using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyPOS.Core
{
    public class Sale
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string DoctorName { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
