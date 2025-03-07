// Función para reportar métricas de rendimiento web usando la librería web-vitals
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      
      // Mide Cumulative Layout Shift (CLS): estabilidad visual
      getCLS(onPerfEntry);
      // Mide First Input Delay (FID): tiempo de respuesta a la primera interacción
      getFID(onPerfEntry);
      // Mide First Contentful Paint (FCP): tiempo hasta que se renderiza el primer contenido
      getFCP(onPerfEntry);
      // Mide Largest Contentful Paint (LCP): tiempo hasta que se renderiza el elemento más grande
      getLCP(onPerfEntry);
      // Mide Time to First Byte (TTFB): tiempo hasta que el navegador recibe el primer byte
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;