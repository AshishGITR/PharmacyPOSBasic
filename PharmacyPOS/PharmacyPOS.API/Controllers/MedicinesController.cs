using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyPOS.Core;

namespace PharmacyPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {
        private readonly PharmacyDbContext _context;

        public MedicinesController(PharmacyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMedicines()
        {
            var data = await _context.Medicines.ToListAsync();
            return Ok(data);
        }

        [HttpGet("batches/{medicineId}")]
        public async Task<IActionResult> GetBatches(int medicineId)
        {
            var batches = await _context.MedicineBatches
                .Where(x => x.MedicineId == medicineId && x.Quantity > 0)
                .ToListAsync();

            return Ok(batches);
        }
    }
}
