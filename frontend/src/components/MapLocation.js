import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { map_marker } from "../avatarAssets/map_marker.png";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2NhcmZhY2VkNyIsImEiOiJja3o3NjJyMm4wZnN4MndtcGNienM1ZGNoIn0.gkZ9hcSAXMS5H4ghHB5C9Q";

const MapLocation = () => {
  const mapContainer = useRef(null);
  // const map = useRef(null);
  const [lng, setLng] = useState(18.06324);
  const [lat, setLat] = useState(59.334591);
  const [zoom, setZoom] = useState(3);

  let link;

  const locations = useSelector((store) =>
    store.sightseeing.sightseeings.map((item) => {
      let object = {
        lng,
        lat,
        link,
      };

      return (object = { lng: item.lng, lat: item.lat, link: item.link });
    })
  );
  console.log("locations", locations);

  // console.log(locationsCoordinates);
  // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  //   "Construction on the Washington Monument began in 1848."
  // );

  // const el = document.createElement("div");
  // el.id = "marker";

  useEffect(() => {
    const map = new mapboxgl.Map(
      {
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      },
      []
    );

    locations.map((location) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.link);

      const el = document.createElement("div");
      el.id = "marker";
      const marker = new mapboxgl.Marker(el)
        .setLngLat({ lng: location.lng, lat: location.lat })
        .setPopup(popup)
        // .setPopup(new mapboxgl.Popup({ offset: 30 }))
        //   .setText("<h3>Stockholm</h3>")
        .addTo(map);
      // console.log(marker);
    });
  });

  return (
    <MapLocationContainer>
      <div className="sidebar">
        Longtitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </MapLocationContainer>
  );
};

export default MapLocation;

const MapLocationContainer = styled.div`
  height: 400px;
  width: 400px;
`;
