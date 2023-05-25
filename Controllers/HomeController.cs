using Delivery_app.Models;
using Delivery_app.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery_app.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IShopService _shopService;
        public HomeController(ILogger<HomeController> logger, IShopService shopService)
        {
            _logger = logger;
            _shopService = shopService;
        }

        public IActionResult Index(string shopName= "Мацурі")
        {
            var model=_shopService.GetShopViewModel(shopName);
            return View(model);
        }
        [Route("cart")]
        public IActionResult Cart()
        {
            return View();
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
