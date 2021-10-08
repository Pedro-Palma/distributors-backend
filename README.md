# Distributions 
## Test

El API maneja distribuidores cada distribuidor posee su atributos de identificación. Cada distribuidor puede tener uno o varios Canales de autorización, productos,usuarios, y horarios de proceso. Cada una de estas propiedades anteriormente son independientes pero todas son de un único distribuidor ya que son 4 entidades distintas. El API poseé el CRUD completo de cada entidad mencionada como tambien sus propios test de cada una.

Para poder ejecutar el proyecto debe clonar el repositorio.

## Setup

Use `nvm` para instalar de manera correcta la versión de node:
```shell script
nvm install
```

Copiar `.env.example` en `.env`.
```shell script
cp .env.example .env
```

Instalar packages.
```shell script
npm install
```

## Uso

Run the migrations.
```shell script
npm run db
```

Run the app.
```shell script
npm run dev
```

Run the testss.
```shell script
npm test
```