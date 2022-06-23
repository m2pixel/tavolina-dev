import React from 'react'

export default function Pagination({ nPages }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
  return <div>Pagination</div>
}
