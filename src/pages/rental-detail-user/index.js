import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap'

import NotifSuccess from '../../components/notif-success'
import NotifFail from '../../components/notif-fail'
import moment from 'moment'
import axios from 'axios'

import './styles.css'

const RentalDetail = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [facilityName, setFacilityName] = useState('')
  const getData = useCallback(async () => {
    setIsLoading(true)
    await axios.get(`${process.env.REACT_APP_DB}/api/rental/get/${id}`)
    .then((response) => {
      if (response.status === 200) {
        setData(response.data ? response.data : null)
        setIsLoading(false)
      }
    })
    .catch((error) => console.log(error))
  }, [id])
  
  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const getFacilityName = async (id) => {
      await axios.get(`${process.env.REACT_APP_DB}/api/facility/get/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setFacilityName(response.data.data ? response.data.data.name : '')
        }
      })
      .catch((error) => console.log(error))
    }
    getFacilityName(data.facilities)
  }, [data, id])

  const checkStatus = useCallback(() => {
    if (data.status === 1) return (<span className="text-success">Telah Disetujui</span>)
    if (data.status === 2) return (<span className="text-danger">Ditolak/Dibatalkan</span>)
    return (<span className="text-warning">Menunggu Persetujuan</span>)
  }, [data])

  const updateStatus = useCallback(async (status) => {
    setIsLoading(true)
    await axios.post(`${process.env.REACT_APP_DB}/api/rental/status/${id}`, { status })
      .then((response) => {
        getData()
        if (response.data.status === 200) {
          NotifSuccess('Your Rental', 'canceled')
        } else {
          NotifFail()
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [getData, id])

  return (
    <div className="users-section mt-4 mx-3">
      <Card className="overflow-auto">
        <CardHeader>Keterangan Rental</CardHeader>
        <CardBody className="px-4 pt-2">
          {
            isLoading ? (
              <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="d-flex flex-row justify-content-evenly my-3">
                <div className="text-center">
                  <div className="text-center mb-3">
                    <h5>Kartu Identitas</h5>
                  </div>
                  <div>
                    <img
                      src={`${process.env.REACT_APP_DB}/uploads/identity-card/` + data?.identity_card}
                      alt={data?.name}
                      width="200"
                      height="200"
                    />
                  </div>
                  <div className="mt-4">
                    <p>
                      Status: {checkStatus()}
                    </p>
                  </div>
                  {
                    data?.status === 0 && (
                      <div className="d-flex flex-row gap-2 justify-content-center pt-3 border-top">
                        <Button
                          type="button"
                          color="danger"
                          onClick={() => updateStatus(2)}
                        >
                          Batalkan
                        </Button>
                      </div>
                    )
                  }
                  {
                    data?.status === 1 && (
                      <div className="d-flex justify-content-center mt-3">
                        <Button
                          type="button"
                          size="sm"
                          href={`${process.env.REACT_APP_DB}/uploads/file-approve/` + data?.file_approve}
                          target="_blank"
                        >
                          Donwload Berkas Persetujuan
                        </Button>
                      </div>
                    )
                  }
                </div>
                <div className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <h5>Formulir Pengajuan</h5>
                  </div>
                  <p>Nama : {data?.name}</p>
                  <p>No Kontak : {data?.phone_number}</p>
                  {
                    data.organization_name && (
                      <p>Nama Organisasi: {data.organization_name}</p>
                    )
                  }
                  {
                    data.organization_address && (
                      <p>Alamat Organisasi: {data.organization_address}</p>
                    )
                  }
                  <p>Fasilitas : {facilityName}</p>
                  <p>Tanggal Peminjaman : {moment(data?.date_start).format('D-MMM-YY')} / {moment(data?.date_end).format('D-MMM-YY')}</p>
                  <p>
                    Pesan : {data?.message}
                  </p>
                  <div className="d-flex flex-row gap-2 pt-2 border-top">
                    {
                      data?.organization_image && (
                        <Button
                          type="button"
                          size="sm"
                          href={`${process.env.REACT_APP_DB}/uploads/organization-image/` + data?.organization_image}
                          target="_blank"
                        >
                          Foto Organisasi
                        </Button>
                      )
                    }
                    <Button
                      type="button"
                      size="sm"
                      href={`${process.env.REACT_APP_DB}/uploads/rental-file/` + data?.file}
                      target="_blank"
                    >
                      Berkas
                    </Button>
                  </div>
                </div>
              </div>
            )
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default RentalDetail