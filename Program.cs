using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYRTEXTestProject
{
    /// <summary>
    /// Класс Program является главной точкой входа для .NET Core приложения.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Главная точка входа для приложения. 
        /// </summary>
        /// <param name="args">Аргументы командной строки.</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }
        /// <summary>
        /// Создание и запуск веб-хоста с использованием конфигурации, определенной в CreateHostBuilder.
        /// </summary>
        /// <param name="args">Аргументы командной строки.</param>
        /// <returns>Возвращает экземпляр IHostBuilder, который представляет собой новый экземпляр класса HostBuilder.</returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
