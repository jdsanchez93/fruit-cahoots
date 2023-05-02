FROM node:18-alpine as clientbuild
ENV NODE_ENV=production
WORKDIR /app
COPY ["./play-fruit-cahoots/package.json", "./play-fruit-cahoots/package-lock.json*", "./"]
RUN npm install --production
COPY ./play-fruit-cahoots .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ./fruit-cahoots-api/fruit-cahoots-api.csproj .
RUN dotnet restore
COPY ./fruit-cahoots-api .
COPY --from=clientbuild /app/build ./wwwroot
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "fruit-cahoots-api.dll"]
