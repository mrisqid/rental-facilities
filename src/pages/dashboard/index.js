import React from "react"

import './styles.css'

const Dashboard = () => {
  return (
    <div className="w-100 text-center">
      <h1 className="title">
        Selamat Datang di Admin Panel Sistem Pengajuan Rental Fasilitas
        <br />
        IAIN Bukittinggi
      </h1>

      <img
        src="/png/logo.png"
        alt="logo"
        width="150"
      />

      <h3 className="author mt-3">
        Teddy Rahmadi
      </h3>
      <h5 className="nim mt-2">
        2516.025
      </h5>

      <h1 className="prodi mt-4">
        Jurusan Pendidikan Teknik Informatika dan Komputer
        <br />
        Fakultas Tarbiyah dan Ilmu Keguruan
      </h1>
    </div>
  )
}

export default Dashboard