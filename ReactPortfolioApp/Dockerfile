#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
# WORKDIR /app

# FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# WORKDIR /src
# COPY ["ReactPortfolioApp.csproj", "ReactPortfolioApp/"]
# RUN dotnet restore "ReactPortfolioApp/ReactPortfolioApp.csproj"
# COPY . .
# WORKDIR "/src/ReactPortfolioApp"
# RUN dotnet build "ReactPortfolioApp.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "ReactPortfolioApp.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# CMD ASPNETCORE_URLS=http://*:$PORT dotnet ReactPortfolioApp.dll
# # ENTRYPOINT ["dotnet", "ReactPortfolioApp.dll"]



FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS publish
WORKDIR "/src/ReactPortfolioApp"
COPY . .

RUN dotnet publish "ReactPortfolioApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet /app/publish/ReactPortfolioApp.dll