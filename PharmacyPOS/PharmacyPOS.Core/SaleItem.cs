using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyPOS.Core
{
    public class SaleItem
    {
        public int Id { get; set; }
        public int SaleId { get; set; }
        public int BatchId { get; set; }
        public int Quantity { get; set; }
    }
}
