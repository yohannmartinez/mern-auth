import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
import mapboxgl from "mapbox-gl"
import { setSelectedSpot } from "../../../actions/spotActions"
import './Map.css';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const Map = (props) => {
    const mapContainerRef = useRef(null);
    const mapZoom = props.map_zoom;
    const userLocation = props.user_location;
    const addControl = props.addControl
    const spots = props.spots
    const selectedSpot = props.selectedSpot

    //optionnal -- if the props contains this function, active a loop to send center location of the map
    const getCenter = (center) => {
        if (props.getCenter) {
            props.getCenter(center);
        }
    }

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/yohannmartinezmispots/ckf58j9bc2dub19oegqc7x95i',
            center: userLocation,
            zoom: mapZoom,
            attributionControl: false
        });
        // Add navigation control (the +/- zoom buttons)
        if (addControl) {
            map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
        }

        if (props.selectedSpot) {
            map.flyTo({ zoom: 15, center: [props.selectedSpot.longitude, props.selectedSpot.latitude] })
        }
        var positionMarker = document.createElement('div');
        positionMarker.className = "positionMarker";
        new mapboxgl.Marker({ element: positionMarker }).setLngLat(userLocation).addTo(map)

        if (spots) {
            spots.map((spot) => {
                var marker = document.createElement('div');
                if (spot.type === "0") {
                    marker.className = 'skateparkMarker';
                } else if (spot.type === "1") {
                    marker.className = 'streetMarker';
                } else if (spot.type === "2") {
                    marker.className = 'shopMarker';
                }
                marker.addEventListener('click', function () {
                    map.flyTo({
                        center: [spot.longitude, spot.latitude],
                        zoom: 15,
                        speed: 1,
                    })
                    if (props.onSelectSpot) {
                        props.setSelectedSpot(spot);
                        props.onSelectSpot(spot.name)
                    }
                });
                new mapboxgl.Marker({ element: marker, anchor: 'bottom' }).setLngLat([spot.longitude, spot.latitude]).addTo(map)
            })
        }

        map.on('move', (e) => {
            let center = map.getCenter();
            if (getCenter) {
                getCenter(center)
            }

        })
        return () => map.remove();
    }, [userLocation, spots, selectedSpot]);

    return (
        <div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    )
}

export default connect(
    null, { setSelectedSpot }
)(Map);