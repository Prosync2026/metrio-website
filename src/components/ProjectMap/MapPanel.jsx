import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ─────────────────────────────────────────────────────────────────────
   BASEMAP TILES

   CARTO's basemaps (basemaps.cartocdn.com) now require an API key.
   Unauthenticated requests still return HTTP 200 with a valid PNG — but
   the tile image itself has an "API KEY REQUIRED" watermark burned into
   it. That is why the map appeared broken without ever throwing an error.

     • VITE_CARTO_API_KEY set → CARTO Positron (the original styling).
     • key missing            → Esri's keyless light-grey canvas, which
                                renders cleanly with no watermark.

   Grab a key at https://carto.com/basemaps and put it in .env.local
   (see .env.example). Vite only exposes vars prefixed with VITE_, and the
   dev server must be restarted after adding one.
   ───────────────────────────────────────────────────────────────────── */
const CARTO_API_KEY = import.meta.env.VITE_CARTO_API_KEY?.trim();

const CARTO_BASEMAP = {
  url: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?api_key=${CARTO_API_KEY}`,
  subdomains: 'abcd',
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const ESRI_BASEMAP = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  /* Esri splits place labels into a separate overlay layer */
  labels:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
  maxZoom: 16,
  attribution: 'Tiles &copy; <a href="https://www.esri.com">Esri</a>',
};

const basemap = CARTO_API_KEY ? CARTO_BASEMAP : ESRI_BASEMAP;

/* Warn once per page load rather than on every render or map instance. */
let hasWarnedAboutKey = false;

const warnIfKeyMissing = () => {
  if (hasWarnedAboutKey || CARTO_API_KEY) return;
  hasWarnedAboutKey = true;
  console.warn(
    '[MapPanel] VITE_CARTO_API_KEY is not set. CARTO basemap tiles would render ' +
      'with an "API KEY REQUIRED" watermark, so the map has fallen back to ' +
      "Esri's keyless light-grey canvas.\n" +
      'To restore the CARTO Positron basemap, add VITE_CARTO_API_KEY to .env.local ' +
      '(see .env.example) and restart the dev server.'
  );
};

/* ─── Custom gold marker icon ─── */
const createMarkerIcon = (isActive) => {
  const color = isActive ? '#1B5E30' : '#9A845C';
  const size = isActive ? 36 : 28;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

/* ─── Fly to region center when region changes ─── */
const FlyToRegion = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

/* ─── Scroll-wheel zoom only after the map is clicked, so scrolling the
   page past the map doesn't get hijacked. Turns off when the cursor leaves. ─── */
const ClickToScrollZoom = () => {
  const map = useMap();
  useEffect(() => {
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();
    map.on('click focus', enable);
    map.on('mouseout blur', disable);
    return () => {
      map.off('click focus', enable);
      map.off('mouseout blur', disable);
    };
  }, [map]);
  return null;
};

/* heightClass: optional fixed height (e.g. 'h-[400px] lg:h-[600px]').
   Without it the map stretches to its grid row, min 400px. */
const MapPanel = ({ region, activeProject, onSelectProject, heightClass }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    warnIfKeyMissing();
  }, []);

  return (
    <div className="lg:col-span-2">
      <div
        className={`relative rounded-lg overflow-hidden border border-black/5 ${heightClass ?? ''}`}
        style={{ ...(heightClass ? {} : { height: '100%', minHeight: '400px' }), isolation: 'isolate', zIndex: 0 }}
      >
        <MapContainer
          ref={mapRef}
          center={region.center}
          zoom={region.zoom}
          scrollWheelZoom={false}
          zoomControl={false}
          maxZoom={basemap.maxZoom}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Attribution is required by both CARTO's and Esri's terms of use */}
          <TileLayer
            url={basemap.url}
            attribution={basemap.attribution}
            subdomains={basemap.subdomains ?? 'abc'}
            maxZoom={basemap.maxZoom}
          />
          {basemap.labels && <TileLayer url={basemap.labels} maxZoom={basemap.maxZoom} />}
          <ZoomControl position="bottomright" />
          <ClickToScrollZoom />
          <FlyToRegion center={region.center} zoom={region.zoom} />
          {region.projects.map((p, i) => (
            <Marker
              key={p.name}
              position={[p.coords.lat, p.coords.lng]}
              icon={createMarkerIcon(activeProject === i)}
              eventHandlers={{
                click: () => onSelectProject(activeProject === i ? null : i),
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'Open Sans, sans-serif', minWidth: '140px' }}>
                  <strong style={{ fontSize: '14px', color: '#1B5E30' }}>{p.name}</strong>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>{p.type} · {p.location}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPanel;
