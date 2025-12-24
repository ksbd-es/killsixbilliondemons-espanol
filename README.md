# Kill Six Billion Demons - Traducción Español

Un sitio web de lectura de cómics para la traducción al español de **Kill Six Billion Demons** de Tom Parkinson-Morgan.

## Características

- Interfaz limpia y minimalista para lectura de cómics
- Navegación mediante:
  - Menús desplegables de capítulos y páginas
  - Botones de navegación
  - Teclas de flecha (izquierda/derecha)
  - Clic en los bordes de la imagen (izquierda: anterior, derecha: siguiente)
- Estados de carga con spinner animado
- Transiciones suaves entre páginas
- Imágenes alojadas en Cloudinary
- Diseño responsive
- Rutas con parámetros de URL para compartir páginas específicas

## Tecnologías

- React 19
- TypeScript
- TailwindCSS v4
- Vite
- React Router DOM

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ksbd-es/killsixbilliondemons-espanol.git

# Entrar al directorio
cd killsixbilliondemons-espanol

# Instalar dependencias
npm install
```

## Configuración

### Configurar Cloudinary

Edita el archivo `src/utils/comicUtils.ts` y actualiza la URL base de Cloudinary:

```typescript
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/';
```

Reemplaza `YOUR_CLOUD_NAME` con tu nombre de cuenta de Cloudinary.

### Actualizar datos del cómic

Los datos del cómic están en `src/data/comic.json`. La estructura es:

```json
{
  "books": [
    {
      "title": "Título del libro",
      "chapters": [
        {
          "number": 1,
          "pages": [
            "1-1-1.jpg",
            "1-1-2.jpg"
          ]
        }
      ]
    }
  ]
}
```

Los nombres de archivo siguen el formato: `{libro}-{capítulo}-{página}.{jpg|png}`

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

El sitio estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── data/
│   └── comic.json          # Datos del cómic
├── pages/
│   ├── Home.tsx           # Página de inicio
│   └── Reader.tsx         # Componente lector
├── types/
│   └── comic.ts           # Tipos TypeScript
├── utils/
│   └── comicUtils.ts      # Funciones de utilidad
├── App.tsx                # Configuración de rutas
├── main.tsx              # Punto de entrada
└── index.css             # Estilos globales
```

## Paleta de Colores

El sitio usa la paleta de colores original de killsixbilliondemons.com:

- Fondo: `#191315`
- Color principal: `#ea2f45`
- Links hover: `white`

## Navegación

### Teclado
- `←` Página anterior
- `→` Página siguiente

### Mouse
- Clic en el tercio izquierdo de la imagen: página anterior
- Clic en el tercio derecho de la imagen: página siguiente

### Controles
- Menú desplegable de capítulos (agrupados por libro)
- Menú desplegable de páginas (actualizado por capítulo)
- Botones `◄◄` y `►►` para navegación de capítulos
- Botones `◄` y `►` para navegación de páginas

## Licencia

Kill Six Billion Demons © Tom Parkinson-Morgan

Esta traducción es un proyecto comunitario sin fines comerciales.

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en GitHub.
