import React from 'react'
import logo from '../assets/image 7.png'
import { Link } from 'react-router-dom'
// import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family'

const style = {
  header: {
    // backgroundColor: "#FFD402",
    paddingVertical: "20px",
    // justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    textAlign: "left",
    fontSize: "15px",
    fontFamily: "arboria, sans-serif",
    textTransform: "uppercase",
    color: "#5E6669",
    fontWeight: "500",
    paddingLeft: "50px",
    paddingBottom: "10px"
  },
  image: {
    maxHeight: "80px",
  }
}

export default function Header() {

  return (
    <>
    <header className='container mx-auto px-5'>
      
      <div className='flex py-4' style={style.header}>
      <Link to='/'>
        <img className='max-w-[249px]' src={logo} alt="" />
        </Link>
        {/* <img className='max-w-[249px]' src={logo} alt="" style={style.image}/> */}
        <p style={style.title}>Kostenvoranschlag Generator</p>
        {/* <Link to='/'>
        </Link> */}
      
      </div>
    </header>
      
    </>
  )
}
