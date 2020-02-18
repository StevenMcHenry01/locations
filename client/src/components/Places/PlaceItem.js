// 3rd party imports
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

// My imports
import Card from '../Shared/UIElements/Card'
import Button from '../Shared/FormElements/Button/Button'
import Modal from '../Shared/UIElements/Modal'
import Map from '../Shared/UIElements/Map'
import { AuthContext } from '../../context/auth-context'
import { useHttpClient } from '../../hooks/http-hook'
import ErrorModal from '../Shared/UIElements/ErrorModal'
import LoadingSpinner from '../Shared/UIElements/LoadingSpinner'

const PlaceItem = ({ place, onDelete }) => {
  const { id, title, description, image, address, coordinates, creator } = place

  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)

  const openDeleteWarningHandler = () => setShowConfirmModal(true)
  const closeDeleteWarningHandler = () => setShowConfirmModal(false)

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false)
    try {
      await sendRequest(`http://localhost:5000/api/places/${id}`, 'DELETE', null,{
        Authorization: 'Bearer ' + auth.token
      })
      onDelete(id)
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentStyles={{ padding: 0 }}
        footerStyles={{ textAlign: 'right' }}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <MapContainerDivStyled>
          <Map center={coordinates} zoom={16} />
        </MapContainerDivStyled>
      </Modal>
      <Modal
        show={showConfirmModal}
        header='Are you sure?'
        footer={
          <>
            <Button inverse onClick={closeDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
        footerStyles={{}}
      >
        <p>Do you want to delete this place? This cannot be undone!</p>
      </Modal>
      <LiStyled>
        <CardStyled>
          {isLoading && <LoadingSpinner asOverlay />}
          <ImgStyled>
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </ImgStyled>

          <InfoDivStyled>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </InfoDivStyled>

          <ActionsDivStyled>
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {auth.userId === creator && (
              <Button route href={`/places/${id}`}>
                Edit
              </Button>
            )}
            {auth.userId === creator && (
              <Button danger onClick={openDeleteWarningHandler}>
                Delete
              </Button>
            )}
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
