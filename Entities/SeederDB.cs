using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Delivery_app.Entities
{
    public class SeederDB
    {
        public static void SeedData(IServiceProvider services,
            IWebHostEnvironment env, IConfiguration config)
        {
            try
            {
                using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                    if (context.Shops.Any() || context.Products.Any())
                    {
                        return;
                    }

                    var shops = new List<Shop>
                    {
                        new Shop { Name = "McDonald's" },
                        new Shop { Name = "Мацурі" },
                        new Shop { Name = "Katana sushi" }
                    };
                    context.Shops.AddRange(shops);

                    var products = new List<Product>
                    {
                        new Product { Name = "Сет Дракони 1000г", Price=835, Shop=shops.FirstOrDefault(x=>x.Name=="Katana sushi"),
                            Image="https://sales-box-photos.s3-eu-central-1.amazonaws.com/katanasushi/preview/services/1c376cdc-8bec-4d2e-8446-2b509d3ee8f9.jpg" },
                        new Product { Name = "Фермерська 500г", Price=207, Shop=shops.FirstOrDefault(x=>x.Name=="Katana sushi"),
                            Image="https://sales-box-photos.s3-eu-central-1.amazonaws.com/katanasushi/preview/services/81eb68ea-960e-4f3f-bce7-c31024f065a3.jpg" },
                        new Product { Name = "М'ясна 500г", Price=179, Shop=shops.FirstOrDefault(x=>x.Name=="Katana sushi"),
                            Image="https://sales-box-photos.s3-eu-central-1.amazonaws.com/katanasushi/preview/services/073137d7-eef9-4f9b-a782-2f9b963a8ff5.jpg" },
                        new Product { Name = "Сет Філа 1165г", Price=730, Shop=shops.FirstOrDefault(x=>x.Name=="Katana sushi"),
                            Image="https://sales-box-photos.s3-eu-central-1.amazonaws.com/katanasushi/preview/services/ee5509b0-b3e6-46fb-949d-9a587bbdd023.jpg" },
                        new Product { Name = "Стейк з курки", Price=179, Shop=shops.FirstOrDefault(x=>x.Name=="Katana sushi"),
                            Image="https://sales-box-photos.s3-eu-central-1.amazonaws.com/katanasushi/preview/services/b1cbd15f-e22a-43a2-b303-cb63b88074f7.jpg" },

                        new Product { Name = "Удон з соусом кімчі 350 г", Price=120, Shop=shops.FirstOrDefault(x=>x.Name=="Мацурі"),
                            Image="https://matsuri.com.ua/img_files/gallery_commerce/products/big/commerce_products.png" },
                        new Product { Name = "Хоші 240г", Price=235, Shop=shops.FirstOrDefault(x=>x.Name=="Мацурі"),
                            Image="https://matsuri.com.ua/img_files/gallery_commerce/products/big/commerce_products_5861.jpg?051e4e127b92f5d98d3c79b195f2b291" },
                        new Product { Name = "Компаньйола 520г", Price=140, Shop=shops.FirstOrDefault(x=>x.Name=="Мацурі"),
                            Image="https://matsuri.com.ua/img_files/gallery_commerce/products/big/commerce_products.png" },
                        new Product { Name = "Квантро Black 590г", Price=170, Shop=shops.FirstOrDefault(x=>x.Name=="Мацурі"),
                            Image="https://matsuri.com.ua/img_files/gallery_commerce/products/big/commerce_products_6042.jpg?f387624df552cea2f369918c5e1e12bc" },
                        new Product { Name = "Чорний дракон", Price=265, Shop=shops.FirstOrDefault(x=>x.Name=="Мацурі"),
                            Image="https://matsuri.com.ua/img_files/gallery_commerce/products/big/commerce_products_5802.jpg?140f6969d5213fd0ece03148e62e461e" },

                        new Product { Name = "Чікен макнагетс 9шт", Price=121, Shop=shops.FirstOrDefault(x=>x.Name=="McDonald's"),
                            Image="https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2131_Nuggets_9.png" },
                        new Product { Name = "Картопля фрі", Price=42, Shop=shops.FirstOrDefault(x=>x.Name=="McDonald's"),
                            Image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv758wlNux_MvWndQZWckjhg5Kul1rIYvEiyqDmBmtgQImGaOq" },
                        new Product { Name = "Макчікен", Price=100, Shop=shops.FirstOrDefault(x=>x.Name=="McDonald's"),
                            Image="https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2070_McChiken1.png" },
                        new Product { Name = "Чікен рол", Price=114, Shop=shops.FirstOrDefault(x=>x.Name=="McDonald's"),
                            Image="https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_2170_ChikenRollB.png" },
                        new Product { Name = "Тост із сиром", Price=39, Shop=shops.FirstOrDefault(x=>x.Name=="McDonald's"),
                            Image="https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_1160_McToast.png" },
                    };
                    context.Products.AddRange(products);

                    context.SaveChanges();
                }

            }
            catch { }
        }
    }
}
