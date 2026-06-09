# Weather Agents with AI-lite (Next.js + TypeScript)

Este proyecto demuestra una SPA/SSR que obtiene la información del clima en tiempo real basada en la ubicación del usuario o una ciudad, utilizando una arquitectura de agentes (Location, Geocode, Weather, Orchestrator).

Instrucciones rápidas:
- Instala dependencias: `npm install`.
- Inicia el entorno de desarrollo: `npm run dev`.
- Abre http://localhost:3000 para ver la app.

Despliegue:
- Publicar en GitHub y conectar con Vercel para despliegue automático.

Archivos clave:
- AGENT.md (configuración de IA por agentes, en español)
- pages/index.tsx (UI React + Next.js)
- lib/agents/*.ts (agentes) 
- lib/models/WeatherResponse.ts ( contrato de datos )
