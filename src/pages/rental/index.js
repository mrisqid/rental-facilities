import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap'
import moment from 'moment'
import axios from 'axios'

import './styles.css'

const RentalTable = ({ data }) => {
  return (
    <Table className="overflow-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Organization Name</th>
          <th>Facility</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          data.length > 0 && data.map((rental, index) => {
            return (
              <tr key={rental.name + index}>
                <th scope="row">{index + 1}</th>
                <td>{rental.name}</td>
                <td>{rental.phone_number}</td>
                <td>{rental.organization_name}</td>
                <td>{rental.facilities}</td>
                <td>{rental.message}</td>
                <td>{moment(rental.date_start).format('d-MM-Y')} / {moment(rental.date_end).format('d-MM-Y')}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

const Rental = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState([])
  
  useEffect(() => {
    const getList = () => {
      axios.get('http://localhost:8000/api/rental/list')
        .then((response) => {
          setIsLoading(true)
          if (response.status === 200) {
            setList(response.data.data ? response.data.data : [])
            setIsLoading(false)
          }
        })
    }
    getList()
  }, [])

  return (
    <div className="users-section mt-4 mx-3">
      <Card className="overflow-auto">
        <CardHeader>Rental List</CardHeader>
        <CardBody className="px-4 pt-2">
          {
            isLoading ? (
              <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <RentalTable
                data={list}
              />
            )
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default Rental