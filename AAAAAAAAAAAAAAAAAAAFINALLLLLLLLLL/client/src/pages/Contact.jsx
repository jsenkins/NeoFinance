import { MapPin, Phone, Mail } from 'lucide-react';
import { useGetContactsQuery } from '../store/api';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function Contact() {
  const { data: contacts = [] } = useGetContactsQuery();

  /* ─────────── Google‑Maps loader ─────────── */
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,   // add this to client/.env
  });

  /* ─────────── Build a safe center object ─────────── */
  const defaultCenter = { lat: 31.5204, lng: 74.3587 };      // Lahore example fallback
  const center =
    contacts.length > 0
      ? (() => {
          const [lng, lat] = contacts[0].location.coordinates; // GeoJSON = [lng, lat]
          return {
            lat: Number(lat) || defaultCenter.lat,
            lng: Number(lng) || defaultCenter.lng,
          };
        })()
      : defaultCenter;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact Information</h2>

      {/* ─────────── Map ─────────── */}
      <div className="bg-base-100 rounded-xl overflow-hidden shadow-sm border border-base-200">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}        /* object, not array ‼️ */
            zoom={12}
          >
            {contacts.map((contact) => {
              const [lng, lat] = contact.location.coordinates;
              return (
                <Marker
                  key={contact._id}
                  position={{ lat: Number(lat), lng: Number(lng) }}
                />
              );
            })}
          </GoogleMap>
        )}
      </div>

      {/* ─────────── Contact cards ─────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* no reverse(); clone‑then‑reverse if you ever need ordering */}
        {[...contacts].reverse().map((contact) => (
          <div
            key={contact._id}
            className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-200"
          >
            <h3 className="font-medium text-lg mb-4">{contact.name}</h3>
            <div className="space-y-3 text-base-content/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
