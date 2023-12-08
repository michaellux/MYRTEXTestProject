using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;

namespace MYRTEXTestProject
{
    /// <summary>
    /// ����� Startup ������������ ��� ��������� ���������� � ������������ HTTP-��������.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// ���� ����� ���������� �� ����� ���������� ��� ���������� �������� � ��������� ��������.
        /// </summary>
        /// <param name="services">��������� �������� ��� ������������.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }
        /// <summary>
        /// ���� ����� ���������� �� ����� ���������� ��� ��������� ��������� HTTP-�������� � ����������.
        /// </summary>
        /// <param name="app">����������� ����������, ������������ ��� ��������� ����������.</param>
        /// <param name="env">������������� ���������� �� ��������� ���-��������.</param>
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
