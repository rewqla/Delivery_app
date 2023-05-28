# Delivery_app
This project is a test task completed for the ElifTech IT school. It includes the implementation of both the Basic level and the Middle level requirements. 
Additionally, the "Order history" and "Coupons" pages were implemented

To use this application update the appsettings.json file to configure the DefaultConnection with the connection details for your database. Open the console or terminal where your project is located and run the following command: dotnet ef migrations update

!!! If you are using SQL Server load the Microsoft.EntityFrameworkCore.SqlServer package from the NuGet Package Manager. 
Then in the Startup.cs file, add the following code:                                              
services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
  
To test the application, you can visit the following link: http://delivery-app.somee.com/
