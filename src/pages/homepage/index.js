import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const Homepage = () => {
  const route = useHistory()
  const [list, setList] = useState([])

  useEffect(() => {
    const getList = () => {
      axios.get('http://localhost:8000/api/facility/list')
        .then((response) => {
          if (response.status === 200) {
            setList(response.data.data ? response.data.data : [])
          }
        })
    }
    getList()
  }, [])

  return (
    <div className="home container bg-white shadow">
      <div className="title">
        <h1 className="text-uppercase">
          selamat datang di sistem pengajuan rental fasilitas
          <br />
          IAIN Bukittinggi
        </h1>
      </div>
      <div className="body mt-5">
        <div className="mt-5 d-flex flex-row flex-wrap justify-content-between align-items-center">
          {
            list.map(facility => {
              return (
                <div
                  onClick={() => route.push(`/formulir/${facility.id}`)}
                  key={facility.id}
                  className="facility-box text-center d-flex flex-column shadow rounded-lg mb-5 py-3"
                >
                  <div className="mb-2">
                    <img
                      src={"http://localhost:8000/uploads/" + facility.image}
                      alt={facility.name}
                      width="250"
                      height="200"
                      className="facility-img"
                    />
                  </div>
                  <div className="mx-3 d-flex flex-column">
                    <h3 className="font-weight-bold facility-name">{facility.name}</h3>
                    <span className="text-primary">
                      {facility.type}
                    </span>
                    <span className="text-warning mt-2 facility-location">
                      <FontAwesomeIcon icon={faLocationArrow} className="icon-location" />
                      {facility.location}
                    </span>
                    <div className="w-100 mt-3 py-2 price-box">
                      <span className="font-weight-bolder facility-price">
                        Rp. {facility.price || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Homepage