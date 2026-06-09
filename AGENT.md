# AGENT.md — Configuración Estándar

Propósito
- Proporcionar una guía de arquitectura, flujos y contratos para construir una SPA/SSR en Next.js que muestre información del clima en tiempo real basada en la ubicación del usuario o una ciudad introducida manualmente.
- Emplear una capa de IA liviana basada en agentes para orquestar la obtención de datos y gestionar fallbacks, sin depender de APIs de IA de pago.

Alcance
- Ubicación: GPS del navegador o búsqueda de ciudad.
- Fuentes de datos: Open-Meteo (clima actual y geocoding) sin claves.
- Actualización: refresco periódico cada 60 segundos.
- Despliegue: GitHub + Vercel.

Arquitectura de Software
- Agentes:
  - LocationAgent: obtiene latitud/longitud desde GPS o acepta entrada de ciudad.
  - GeocodeAgent: resuelve nombre de ciudad a coordenadas usando Open-Meteo Geocoding API.
  - WeatherAgent: consulta clima actual usando Open-Meteo Current Weather API.
  - OrchestratorAgent: motor de decisión (IA ligera) que coordina agentes, aplica reglas de fallback y normaliza la salida a WeatherResponse.
  - DataModel: WeatherResponse con campos estandarizados: ubicación, lat, lon, temperatura, viento, humedad, código de clima, timestamp.

Flujo de datos
- UI → Orchestrator → Geocode/Weather (según entrada) → WeatherResponse → UI.
- Persistencia y caché: caching en memoria y/o localStorage para evitar refrescos innecesarios.
- Observabilidad: logs básicos en consola; indicadores de latencia y estado para detectar caídas.

Contrato de datos
- Entrada:
  - Coordenadas: { lat, lon } o nombre de ciudad (string).
- Salida:
  - WeatherResponse: { location: { name?: string, lat, lon }, current: { temperature, windSpeed, windDirection, humidity?, precipitation?, weatherCode }, timestamp }.
- Errores:
  - Si no hay datos, retornar WeatherResponse con current null y un mensaje de error amigable.

Tecnologías y herramientas
- Frontend/Servidor: Next.js (React) + TypeScript (opcional).
- Llamadas a APIs:
  - Open-Meteo Geocoding: GET /v1/search?name={city}&count=1
  - Open-Meteo Weather: GET /v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
- Despliegue: Repositorio GitHub + Vercel.
- Pruebas (opcional): pruebas unitarias para funciones de parsers y de orquestación con mocks.
- Observabilidad: consola, con planes de ampliar a Sentry/LogRocket si se desea.

Directrices de implementación
- Evita depender de claves de API para la arquitectura base. Open-Meteo es suficiente para un prototipo gratuito.
- Mantén la lógica de IA (Orchestrator) simple y predecible; se debe poder sustituir por un servicio de IA más avanzado en el futuro sin cambios en la UI.
- Estandariza nombres de campos para facilitar tests y mantenibilidad.
- Escribe comentarios en inglés en el código; los comentarios deben estar en español para claridad del equipo.

Plan de despliegue
- Crea un repositorio en GitHub con la estructura recomendada.
- Implementa la app Next.js en la raíz o en /apps/next-app (según preferencia).
- Configura Open-Meteo (sin claves) para Geocoding y Current Weather.
- Añade AGENT.md al repositorio raíz (este archivo).
- Empuja a GitHub y conecta el repositorio con Vercel para despliegue automático.
- Opcional: configura CI para pruebas básicas.

Notas de implementación
- Open-Meteo Geocoding API no requiere clave y admite una ciudad para obtener coordenadas. Úsalo para transformar entrada de ciudad en lat/lon.
- Open-Meteo Current Weather API no requiere clave y devuelve temperatura, viento, etc. Úsalo para el clima actual.
- Si se desea ampliar a múltiples fuentes gratuitas, se puede añadir otra API y permitir que el Orchestrator negocie entre ellas basándose en latencia y disponibilidad.

Preguntas para afinar el alcance
1) ¿Quieres incluir soporte para múltiples ciudades y guardar historial de búsquedas?
2) ¿Prefieres que el Orchestrator tenga un modo de ‘fallback’ con datos en caché por un periodo corto?

Notas finales
- Este AGENT.md está pensado para ser ejecutable como guía viva junto al código; se recomienda mantenerlo en versión y actualizarlo conforme evolucione la arquitectura.
