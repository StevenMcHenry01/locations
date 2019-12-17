// 3rd party imports
import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'

// My imports
import Card from '../Shared/UIElements/Card'
import Button from '../Shared/FormElements/Button/Button'
import { Theme } from '../../styles/theme'
import Modal from '../Shared/UIElements/Modal'
import Map from '../Shared/UIElements/Map'

const PlaceItem = ({ place }) => {
  const {
    id,
    title,
    description,
    imageUrl,
    address,
    coordinates,
    creatorId
  } = place
  const { mode: theme } = useContext(ThemeContext)

  const [showMap, setShowMap] = useState(false)

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentStyles={{padding: 0}}
        footerStyles={{'textAlign': 'right'}}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <MapContainerDivStyled>
          <Map center={coordinates} zoom={16}/>
        </MapContainerDivStyled>
      </Modal>
      <LiStyled>
        <CardStyled>
          <ImgStyled>
            <img src={imageUrl} alt={title} />
          </ImgStyled>
          {theme === 'light' ? (
            <InfoDivStyled>
              <h2>{title}</h2>
              <h3>{address}</h3>
              <p>{description}</p>
            </InfoDivStyled>
          ) : (
            <InfoDivStyled style={{ color: Theme.colors.black }}>
              <h2>{title}</h2>
              <h3>{address}</h3>
              <p>{description}</p>
            </InfoDivStyled>
          )}
          <ActionsDivStyled>
            <Button inverse onClick={openMapHandler}>View On Map</Button>
            <Button route href={`/places/${id}`}>
              Edit
            </Button>
            <Button danger>Delete</Button>
          </ActionsDivStyled>
        </CardStyled>
      </LiStyled>
    </>
  )
}

export default PlaceItem

// STYLING
const LiStyled = styled.li`
  margin: 1rem 0;
`

const CardStyled = styled(Card)`
  padding: 0;
`

const ImgStyled = styled.div`
  width: 100%;
  height: 12.5rem;
  margin-right: 1.5rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (min-width: 768px) {
    height: 20rem;
  }
`

const InfoDivStyled = styled.div`
  padding: 1rem;
  text-align: center;
  h2,
  h3,
  p {
    margin: 0 0 0.5rem 0;
  }
`

const ActionsDivStyled = styled.div`
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;
  button,
  a {
    margin: 0.5rem;
  }
`

const MapContainerDivStyled = styled.div`
  height: 15rem;
  width: 100%;
`
