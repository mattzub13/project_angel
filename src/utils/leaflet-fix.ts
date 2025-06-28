// En un archivo como leaflet-fix.ts o al inicio de tu componente de mapa
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Borramos la configuración por defecto que puede estar rota
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Fusionamos las nuevas opciones con la configuración por defecto de los íconos
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});