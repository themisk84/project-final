import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const MapLocation = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(18.64);
  const [lat, setLat] = useState(61.01);
  const [zoom, setZoom] = useState(4);

  const locations = useSelector((store) => store.sightseeing.sightseeings);

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
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<a href=${location.link} rel="no referrer"><img src=${location.imageUrl} class="image-popup"/><p>${location.name}</p></a>`
      );

      const el = document.createElement("div");
      el.id = "marker";

      return new mapboxgl.Marker(el)
        .setLngLat({ lng: location.lng, lat: location.lat })
        .setPopup(popup)
        .addTo(map);
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <MapLocationContainer>
      <Div ref={mapContainer} />
    </MapLocationContainer>
  );
};

export default MapLocation;

const MapLocationContainer = styled.div`
  height: 400px;
  width: 400px;
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 97%;
    margin: 120px 20px 0px;
  }
`;
const Div = styled.div`
  border-radius: 10px;
  height: 400px;
  width: 100%;
  padding-top: 100px;
`;
