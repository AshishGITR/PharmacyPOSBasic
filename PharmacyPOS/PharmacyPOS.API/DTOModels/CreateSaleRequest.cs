using PharmacyPOS.API.Controllers;

namespace PharmacyPOS.API.DTOModels
{
    public class CreateSaleRequest
    {
        public string CustomerName { get; set; }
        public string DoctorName { get; set; }
        public List<SaleItemDto> Items { get; set; }
    }
}
