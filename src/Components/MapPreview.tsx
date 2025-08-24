'use client';

import { useState } from 'react';
import { MapPinIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface MapPreviewProps {
  latitude: string;
  longitude: string;
  venueName: string;
  address?: string;
  language: 'en' | 'ar';
}

export default function MapPreview({ 
  latitude, 
  longitude, 
  venueName, 
  address, 
  language 
}: MapPreviewProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Using OpenStreetMap static map API (free alternative to Google Maps)
  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(${longitude},${latitude})/${longitude},${latitude},14/400x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;
  
  // Fallback to OpenStreetMap if Mapbox fails
  const fallbackMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude)-0.01},${parseFloat(latitude)-0.01},${parseFloat(longitude)+0.01},${parseFloat(latitude)+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
  
  // Google Maps link for external navigation
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
  // Apple Maps link for iOS devices
  const appleMapsUrl = `https://maps.apple.com/?q=${latitude},${longitude}`;

  const handleOpenInMaps = () => {
    // Detect if user is on iOS/macOS for Apple Maps, otherwise use Google Maps
    const isAppleDevice = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);
    const mapsUrl = isAppleDevice ? appleMapsUrl : googleMapsUrl;
    window.open(mapsUrl, '_blank');
  };

  if (imageError) {
    return (
      <div className="bg-gray-100 rounded-lg h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
        <MapPinIcon className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 text-center mb-2">
          {language === 'ar' ? 'لا يمكن تحميل الخريطة' : 'Map unavailable'}
        </p>
        <button
          onClick={handleOpenInMaps}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          <span>
            {language === 'ar' ? 'فتح في الخرائط' : 'Open in Maps'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden h-48 group cursor-pointer" onClick={handleOpenInMaps}>
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3 }}
       >
         <div className="w-full h-full">
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-pulse flex flex-col items-center">
            <MapPinIcon className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'تحميل الخريطة...' : 'Loading map...'}
            </p>
          </div>
        </div>
      )}
      
      {/* Map iframe as fallback */}
      <iframe
        src={fallbackMapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${venueName}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className="w-full h-full"
      />
      
      {/* Overlay with venue info */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
        <div className="w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{venueName}</p>
              {address && (
                <p className="text-xs opacity-90">{address}</p>
              )}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              <span>
                {language === 'ar' ? 'فتح' : 'Open'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pin marker overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
        <div className="relative">
          <MapPinIcon className="w-8 h-8 text-red-500 drop-shadow-lg" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>
          </div>
       </motion.div>
     </div>
  );
}