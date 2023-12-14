using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using MYRTEXTestProject.Models;
namespace MYRTEXTestProject
{
    /// <summary>
    /// Класс Startup используется для настройки приложения и конфигурации HTTP-запросов.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Этот метод вызывается во время выполнения для добавления сервисов в контейнер сервисов.
        /// </summary>
        /// <param name="services">Коллекция сервисов для конфигурации.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = "Server=(localdb)\\mssqllocaldb;Database=MYRTEXTestProjectEmployeesdb;Trusted_Connection=True;";
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }
        /// <summary>
        /// Этот метод вызывается во время выполнения для настройки конвейера HTTP-запросов в приложении.
        /// </summary>
        /// <param name="app">Построитель приложений, используемый для настройки приложения.</param>
        /// <param name="env">Предоставляет информацию об окружении веб-хостинга.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
