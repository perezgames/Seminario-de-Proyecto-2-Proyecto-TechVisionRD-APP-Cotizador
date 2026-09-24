<p align="center">
<img width="400" height="300" alt="logo" src="https://github.com/user-attachments/assets/117b1be7-6705-4185-a876-94969f419d9a" />
<img width="400" height="300" alt="logo_combinado" src="https://github.com/user-attachments/assets/b839916b-4c84-4ba7-a560-67b81f49d2c5" />

</p>

<h1 align="center">TechVisionRD APP Cotizador</h1>

<p align="center">
  Aplicación móvil de cotización interactiva para <strong>TechVision RD</strong>, plataforma de transformación digital para PyMEs dominicanas.
</p>

<p align="center">
  <em>Seminario de Proyecto II (ISW-411) — Universidad Abierta Para Adultos (UAPA)</em>
</p>

---

## 📋 Descripción del proyecto

Las PyMEs dominicanas frecuentemente no tienen una forma rápida y accesible de estimar el costo de un proyecto de software antes de contactar a un proveedor, lo que genera fricción en la etapa inicial de contacto comercial.

**TechVisionRD APP Cotizador** resuelve esto ofreciendo una herramienta móvil que permite a clientes potenciales simular el presupuesto de un proyecto de software de forma interactiva, además de presentar de forma clara los servicios y el equipo de TechVision RD.

Esta app es la continuación móvil del sitio web de TechVision RD, desarrollado en **Seminario de Proyecto I**. No incluye autenticación, base de datos propia, ni conexión al backend de producción del sitio web: el cálculo del presupuesto replica localmente la lógica del simulador `presupuesto.html` del sitio principal.

## ✨ Funcionalidades

La app cuenta con 4 pantallas principales, accesibles por navegación de pestañas:

| Pantalla | Descripción |
|---|---|
| 🏠 **Inicio** | Presentación de la marca, resumen de servicios y botón directo al Cotizador |
| 💼 **Servicios** | Catálogo de servicios (Desarrollo a Medida, Automatización de Procesos, Consultoría Digital), enlace a la web y presentación del equipo |
| 🧮 **Cotizador** | Simulador interactivo de presupuesto con 7 parámetros ajustables y desglose de costos en tiempo real |
| 👥 **Nosotros** | Información institucional, datos de contacto y tecnologías utilizadas |

### Capturas de pantalla

<p align="center">
  
<img width="300" height="320" alt="inicio" src="https://github.com/user-attachments/assets/91f35fa7-ab55-4b33-b8c7-8a951d0c0887" />
<img width="300" height="320" alt="servicios" src="https://github.com/user-attachments/assets/8e886e87-aff5-4001-ab9a-48f60f101f2c" />
<img width="300" height="320" alt="cotizador" src="https://github.com/user-attachments/assets/04593969-dd0f-43a0-a73f-ddba95dd17a7" />
<img width="300" height="320" alt="nosotros" src="https://github.com/user-attachments/assets/99c8cd8c-7aaa-4d48-8c82-818c6f98106a" />

<p align="center">
<img width="300" height="320" alt="WhatsApp Image 2026-09-23 at 6 59 05 PM (1)" src="https://github.com/user-attachments/assets/44f8c13f-5e5e-48c9-9091-95160402db4b" />

</p>

El Cotizador permite ajustar: tarifa del programador, horas de desarrollo, horas de diseño UX/UI, meses de infraestructura cloud, licencias & APIs, horas de pruebas QA y sesiones de capacitación, mostrando el presupuesto estimado y su desglose en tiempo real.

## 🛠️ Tecnologías

- **React Native** — framework principal de la app móvil
- **Expo (SDK 57)** — entorno de desarrollo, build y pruebas
- **Expo Router** — navegación basada en archivos
- **@expo/vector-icons** — iconografía de la interfaz
- **@react-native-community/slider** — sliders del Cotizador

## 🏗️ Arquitectura

App cliente **standalone**, sin backend propio: toda la lógica del Cotizador corre en el dispositivo (estado local con `useState`), replicando la fórmula de cálculo del sitio web de TechVision RD.

```
src/
├── app/            # Rutas de Expo Router
├── screens/        # Componentes de cada pantalla (Inicio, Servicios, Cotizador, Nosotros)
└── components/     # Componentes reutilizables (botón flotante de WhatsApp)
```

## 🚀 Instalación

### Requisitos

- Computadora con Windows, macOS o Linux
- [Node.js](https://nodejs.org/) (versión LTS) y npm
- App **Expo Go** instalada en un dispositivo Android o iOS
- Dispositivo móvil y computadora conectados a la misma red Wi-Fi
- Firewall configurado para permitir conexiones de Node.js en redes privadas (Windows)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/perezgames/Seminario-de-Proyecto-2-Proyecto-TechVisionRD-APP-Cotizador.git
cd Seminario-de-Proyecto-2-Proyecto-TechVisionRD-APP-Cotizador

# 2. Instalar dependencias
npm install
npm install @react-navigation/native @react-native-community/slider @expo/vector-icons

# 3. Iniciar el servidor de desarrollo
npx expo start
```

Escanea el código QR generado con la app **Expo Go** en tu dispositivo móvil para ver la app en tiempo real.

## 📖 Manual de uso

1. Abrir la app en el dispositivo móvil (Android o iOS)
2. Navegar entre las pestañas inferiores: Inicio, Servicios, Cotizador y Nosotros
3. En **Cotizador**, ajustar los sliders según las necesidades del proyecto a estimar
4. Leer el desglose detallado de costos, actualizado en tiempo real
5. Contactar al equipo por WhatsApp desde el botón flotante disponible en cualquier pantalla
6. Visitar el sitio web institucional desde el botón correspondiente en **Servicios**

## 🗄️ Base de datos

Esta fase del proyecto **no implementa una base de datos propia**: es un simulador cuyo alcance es de front-end y presentación, sin backend ni persistencia. Los valores que el usuario ajusta y el presupuesto calculado existen solo en memoria mientras la app está abierta. El detalle del modelo de datos local y la justificación completa están en la documentación técnica del proyecto (`/docs`).

## ⚠️ Limitaciones y mejoras futuras

**Limitaciones actuales:**
- Sin conexión a base de datos real
- Sin autenticación de usuarios
- El Cotizador no envía la cotización generada a ningún sistema, solo la muestra en pantalla

**Mejoras futuras:**
- Conectar el Cotizador a un backend real para guardar cotizaciones
- Exportar la cotización a PDF
- Notificaciones push
- Panel administrativo para ajustar tarifas sin modificar código

## 👥 Equipo — TechVision RD

| Nombre | Rol |
|---|---|
| Ing. Jan Michael Pérez Feliz | Desarrollador |
| Claurileidy Coronado | Marketing |
| Joel Pérez | Administración y Finanzas |
| Daonil Montero | Desarrollo Web |

## 📞 Contacto

- 📱 WhatsApp: +1 (849) 409-3006
- 📧 Correo: jan9506xx@gmail.com
- 🎓 Correo institucional: 100059326@p.uapa.edu.do
- 📍 Santiago de los Caballeros, República Dominicana

---

<p align="center"><em>Proyecto académico — Seminario de Proyecto II (ISW-411), UAPA</em></p>
