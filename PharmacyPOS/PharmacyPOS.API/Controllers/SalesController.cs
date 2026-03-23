using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PharmacyPOS.API.DTOModels;
using PharmacyPOS.Core;

namespace PharmacyPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly PharmacyDbContext _context;

        public SalesController(PharmacyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSale([FromBody] CreateSaleRequest request)
        {
            decimal total = 0;

            foreach (var item in request.Items)
            {
                var batch = await _context.MedicineBatches.FindAsync(item.MedicineId);

                if (batch.ExpiryDate < DateTime.Now)
                    return BadRequest("Medicine expired!");

                if (batch.Quantity < item.Quantity)
                    return BadRequest("Insufficient stock!");

                total += batch.Price * item.Quantity;

                batch.Quantity -= item.Quantity;
            }

            var sale = new Sale
            {
                CustomerName = request.CustomerName,
                DoctorName = request.DoctorName,
                TotalAmount = total
            };

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return Ok(sale.Id);
        }
    }    
}

