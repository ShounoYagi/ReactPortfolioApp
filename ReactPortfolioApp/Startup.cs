using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ReactPortfolioApp.Data;
using ReactPortfolioApp.Models;
using System;
using System.IO;



namespace ReactPortfolioApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Env = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Env { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // if (Env.IsDevelopment())
            // {
            //     services.AddDbContext<ApplicationDbContext>(options =>
            //                 options.UseSqlServer(
            //                     Configuration.GetConnectionString("DefaultConnection")));
            // }
            // else
            // {
            //     var uri = new Uri(Configuration["DATABASE_URL"]);
            //     var userInfo = uri.UserInfo.Split(":");
            //     (var user, var password) = (userInfo[0], userInfo[1]);
            //     var db = Path.GetFileName(uri.AbsolutePath);

            //     var connStr = $"Host={uri.Host};Port={uri.Port};Database={db};Username={user};Password={password};Enlist=true";
            //     services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connStr));
            // }


            //
            var uri = new Uri(Configuration["DATABASE_URL"]);
            var userInfo = uri.UserInfo.Split(":");
            (var user, var password) = (userInfo[0], userInfo[1]);
            var db = Path.GetFileName(uri.AbsolutePath);
            var connStr = $"Host={uri.Host};Port={uri.Port};Database={db};Username={user};Password={password};Enlist=true";
            // var host = "ec2-54-156-110-139.compute-1.amazonaws.com";
            // var port = "5432";
            // var dbname = "dp4qe5j3dekm9";
            // var username = "rdhvybtgszodxh";
            // var pass = "9995cba1267d8d28baa074f37ba585360eea91b24b6a41073419c560287da938";
            // var connStr = $"Host={host};Port={port};Database={dbname};Username={username};Password={pass};Enlist=true";
            Console.WriteLine(connStr);
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connStr));
            
            // services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseSqlServer(
            //         Configuration.GetConnectionString("DefaultConnection")));

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddControllersWithViews();
            services.AddRazorPages();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
