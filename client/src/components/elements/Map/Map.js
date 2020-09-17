import React, { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import './Map.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = (props) => {
    const mapContainerRef = useRef(null);
    const mapZoom = props.map_zoom;
    const userLocation = props.user_location;
    const addControl = props.addControl

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

        map.on('move', (e) => {
            let center = map.getCenter();
            if (getCenter) {
                getCenter(center)
            }

        })
        // Clean up on unmount
        return () => map.remove();
    }, [userLocation]);

    return (
        <div>

            <div className='map-container' ref={mapContainerRef} />
        </div>
    )
}

export default Map