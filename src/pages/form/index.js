import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useParams } from 'react-router-dom'

import {
  FormGroup,
  Label,
  Input,
} from "reactstrap"

import Button from '../../components/button'
import NotifSuccess from '../../components/notif-success'
import NotifFail from '../../components/notif-fail'

import {
  faArrowLeft,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const Form = () => {
  const route = useHistory()
  const { id } = useParams()
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  const userId = userData?.id
  const [dataPost, setDataPost] = useState({
    name: '',
    identity_card: '',
    phone_number: '',
    organization_name: '',
    organization_address: '',
    organization_image: '',
    facilities: id,
    message: '',
    date_start: '',
    date_end: '',
    file: '',
    user_id: userId,
  })
  const [facility, setFacility] = useState([])

  const onChange = useCallback((e) => {
    if (e.target.name === 'identity_card') {
      setDataPost({ ...dataPost, [e.target.name]: e.target.files[0] })
    } else if (e.target.name === 'organization_image') {
      setDataPost({ ...dataPost, [e.target.name]: e.target.files[0] })
    } else if (e.target.name === 'file') {
      setDataPost({ ...dataPost, [e.target.name]: e.target.files[0] })
    } else {
      setDataPost({ ...dataPost, [e.target.name]: e.target.value })
    }
  }, [dataPost])

  const post = useCallback((e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", dataPost.name)
    data.append("identity_card", dataPost.identity_card)
    data.append("phone_number", dataPost.phone_number)
    data.append("organization_name", dataPost.organization_name)
    data.append("organization_address", dataPost.organization_address)
    data.append("organization_image", dataPost.organization_image)
    data.append("facilities", dataPost.facilities)
    data.append("message", dataPost.message)
    data.append("date_start", dataPost.date_start)
    data.append("date_end", dataPost.date_end)
    data.append("file", dataPost.file)
    data.append("user_id", dataPost.user_id)
    axios.post('http://localhost:8000/api/rental/create', data)
      .then((response) => {
        setDataPost({
          name: '',
          identity_card: '',
          phone_number: '',
          organization_name: '',
          organization_address: '',
          organization_image: '',
          facilities: id,
          message: '',
          date_start: '',
          date_end: '',
          file: '',
          user_id: userId,
        })
        document.querySelector("#addFormRental").reset()
        if (response) {
          if (response.data.status === 200) {
            NotifSuccess('Your Rental', 'created successfull')
          } else {
            NotifFail()
          }
        }
      })
  }, [dataPost, id, userId])

  useEffect(() => {
    const getFacility = () => {
      axios.get(`http://localhost:8000/api/facility/get/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setFacility(response.data.data ? response.data.data : [])
          }
        })
        .catch((error) => console.log(error))
    }
    getFacility()
  }, [id])

  return (
    <div className="d-flex flex-row justify-content-between p-5">
      <div className="d-flex flex-column flex-grow-1">
        <div>
          <Button
            variant="contained"
            color="primary"
            size="sm"
            onClick={() => route.push('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} />
            Kembali
          </Button>  
        </div>
        <div className="mt-5">
          <img
            src={"http://localhost:8000/uploads/" + facility.image}
            alt={facility.name}
            width="500"
            height="400"
            className="facility-img"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-weight-bold facility-title">
            {facility.name}
          </h3>
          <div className="mt-2">
            Tipe Property : 
            <span className="text-primary facility-type">
              {facility.type}
            </span>
          </div>
          <div className="mt-2">
            Lokasi :
            <span className="text-warning facility-map">
              <FontAwesomeIcon icon={faLocationArrow} className="icon-location" />
              {facility.location}
            </span>
          </div>
          <div className="mt-3">
            Harga : 
            <span className="font-weight-bolder">
              Rp. {facility.price || 0}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-grow-1">
        <form onSubmit={post} encType="multipart/form-data" id="addFormRental">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mt-3 d-flex flex-column">
            <Label for="identity_card">Kartu Identitas (KTP)</Label>
            <Input
              id="identity_card"
              type="file"
              name="identity_card"
              className="mt-2"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label for="phone_number">No HP</Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="number"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label for="organization_name">Nama Organisasi (opsi)</Label>
            <Input
              id="organization_name"
              name="organization_name"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label for="organization_address">Alamat Organisasi (opsi)</Label>
            <Input
              id="organization_address"
              name="organization_address"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mt-3 d-flex flex-column">
            <Label for="organization_image">Bukti Identitas Organisasi</Label>
            <Input
              id="organization_image"
              type="file"
              name="organization_image"
              className="mt-2"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label for="message">Pesan</Label>
            <Input
              id="message"
              name="message"
              type="textarea"
              onChange={onChange}
            />
          </FormGroup>
          <div className="d-flex flex-row mt-3">
            <FormGroup>
              <Label for="date_start">Tgl Mulai</Label>
              <Input
                id="date_start"
                name="date_start"
                type="date"
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup style={{ marginLeft: '1rem' }}>
              <Label for="date_end">Tgl Selesai</Label>
              <Input
                id="date_end"
                name="date_end"
                type="date"
                onChange={onChange}
              />
            </FormGroup>
          </div>
          <FormGroup className="mt-3 d-flex flex-column">
            <Label for="file">File (Berkas/Surat Permohonan)</Label>
            <Input
              id="file"
              type="file"
              name="file"
              className="mt-2"
              onChange={onChange}
            />
          </FormGroup>
          <div className="mt-4">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form