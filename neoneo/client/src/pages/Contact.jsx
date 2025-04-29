import { useGetContactsQuery } from '../store/api';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function Contact(){
  const { data: cs=[] } = useGetContactsQuery();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY
  });
  return (
    <div>
      <h2 className="text-xl mb-4">Contacts</h2>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{width:'100%',height:'300px'}}
          center={cs[0]?.location.coordinates.reverse()||[31.5204,74.3587]}
          zoom={12}
        >
          {cs.map(c=>(
            <Marker
              key={c._id}
              position={c.location.coordinates.reverse()}
            />
          ))}
        </GoogleMap>
      )}
      <ul className="mt-4">
        {cs.map(c=>
          <li key={c._id}>{c.name} – {c.phone} – {c.email}</li>
        )}
      </ul>
    </div>
  );
}
