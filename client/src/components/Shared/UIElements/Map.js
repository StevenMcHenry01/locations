// 3rd party imports
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

// My imports

const Map = ({ style, center, zoom }) => {
  const mapRef = useRef()

  useEffect(() => {
    // part of google maps API (Look up docs)
    // available through script tag in index.html
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom
    })

    // create new marker in center of map
    new window.google.maps.Marker({ position: center, map })
  }, [center, zoom])

  return <MapDivStyled ref={mapRef} style={style}></MapDivStyled>
}

export default Map

// STYLING
const MapDivStyled = styled.div`
  width: 100%;
  height: 100%;
`
