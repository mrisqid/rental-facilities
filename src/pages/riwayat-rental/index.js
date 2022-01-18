import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from 'reactstrap'
import moment from 'moment'
import axios from 'axios'

import './styles.css'

const TableContent = ({ rental, index }) => {
  const route = useHistory()
  const facilityId = rental?.facilities
  const [facilityName, setFacilityName] = useState('')
  
  useEffect(() => {
    const getFacilityName = async (id) => {
      await axios.get(`http://localhost:8000/api/facility/get/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setFacilityName(response.data.data ? response.data.data.name : '')
        }
      })
    }
    getFacilityName(facilityId)
  }, [facilityId])

  const checkStatus = (status) => {
    if (status === 1) return (
      <span className="text-success">Telah Disetujui</span>
    )
    if (status === 2) return (
      <span className="text-danger">Ditolak/Dibatalkan</span>
    )
    return (
      <span className="text-warning">
        Menunggu Persetujuan
      </span>
    )
  }

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{rental.name}</td>
      <td>{rental.organization_name}</td>
      <td>{facilityName}</td>
      <td>({moment(rental.date_start).format('D-MMM-YY')}) / ({moment(rental.date_end).format('D-MMM-YY')})</td>
      <td>{checkStatus(rental.status)}</td>
      <td>
        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={() => route.push(`/rental-detail/${rental.id}`)}
        >
          Detail
        </Button>
      </td>
    </tr>
  )
}

const RentalTable = ({ data }) => {
  return (
    <Table className="overflow-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Organization Name</th>
          <th>Facility</th>
          <th>Date</th>
          <th>Status</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {
          data.length > 0 && data.map((rental, index) => {
            return (
              <TableContent
                key={rental.id}
                rental={rental}
                index={index}
              />
            )
          })
        }
      </tbody>
    </Table>
  )
}

const RiwayatRental = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState([])
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  const { id } = userData
  
  useEffect(() => {
    const getList = async () => {
      await axios.get('http://localhost:8000/api/rental/list/' + id)
        .then((response) => {
          setIsLoading(true)
          if (response.status === 200) {
            console.log(response)
            setList(response.data ? response.data : [])
            setIsLoading(false)
          }
        })
    }
    getList()
  }, [id])

  return (
    <>
      <h1>Riwayat Rental</h1>
      <div className="m-3">
        <Card>
          <CardHeader>List Rental</CardHeader>
          <CardBody className="px-4 pt-2">
            {
              isLoading ? (
                <div className="spinner-border text-center" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <RentalTable data={list} />
              )
            }
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default RiwayatRental