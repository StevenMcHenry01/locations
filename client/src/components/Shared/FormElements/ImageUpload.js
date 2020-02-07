// 3rd party imports
import React, { useRef, useState, useEffect } from 'react'

// My imports
import styled from 'styled-components'
import { FormControlDivStyled } from './Input/InputStyles'
import Button from './Button/Button'

const ImageUpload = ({ id, center, onInput, errorText }) => {
  const ImageUploadStyled = center
    ? ImageUploadCenteredStyledDiv
    : ImageUploadStyledDiv

  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)

  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()

    // exexutes after file url is read
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = event => {
    let pickedFile
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
    }
    onInput(id, pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <FormControlDivStyled>
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <ImageUploadStyled>
        <ImageUploadPreviewStyled>
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>Please choose an image.</p>}
        </ImageUploadPreviewStyled>
        <Button type='button' onClick={pickImageHandler}>
          Pick Image
        </Button>
      </ImageUploadStyled>
      {!isValid && <p>{errorText}</p>}
    </FormControlDivStyled>
  )
}

export default ImageUpload

// STYLING
const ImageUploadStyledDiv = styled.div``
const ImageUploadCenteredStyledDiv = styled(ImageUploadStyledDiv)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ImageUploadPreviewStyled = styled.div`
  width: 13rem;
  height: 13rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
