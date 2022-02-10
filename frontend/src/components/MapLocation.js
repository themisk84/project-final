import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2NhcmZhY2VkNyIsImEiOiJja3o3NmExODUwaWszMnZtdWd4MXJoZGh1In0.xdKCJvY3ROQC7E8AqJIJ9w";

const MapLocation = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(18.06324);
  const [lat, setLat] = useState(59.334591);
  const [zoom, setZoom] = useState(3);

  let name = "";
  let imageUrl = "";

  const locations = useSelector((store) =>
    store.sightseeing.sightseeings.map((item) => {
      let object = {
        lng,
        lat,
        name,
        imageUrl,
      };

      return (object = {
        lng: item.lng,
        lat: item.lat,
        name: item.name,
        imageUrl: item.imageUrl,
      });
    })
  );

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
        `<img src=${location.imageUrl} class="imagePopup"/><p>${location.name}</p>`
      );

      const el = document.createElement("div");
      el.id = "marker";

      const marker = new mapboxgl.Marker(el)
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
      {/* <Sidebar>
        Longtitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Sidebar> */}
      <div ref={mapContainer} className="map-container" />
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
    width: 100%;
    margin: 120px 20px 0px;
  }

  /* @media (min-width: 992px) {
    width: 80%;
  } */
`;

// const Sidebar = styled.div`
//   /* background-color: rgba(35, 55, 75, 0.9); */
//   background-color: white;
//   /* color: #fff; */
//   padding: 6px 12px;
//   font-family: monospace;
//   z-index: 1;
//   position: absolute;
//   top: 0;
//   left: 0;
//   margin: 12px;
//   border-radius: 4px;
// `;
