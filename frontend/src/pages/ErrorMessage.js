import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ErrorMessage = () => {
  return (
    <Main>
      <Link to="/">Go back</Link>
      <Heading>Sorry! this page was not found...</Heading>
    </Main>
  )
}

export default ErrorMessage

const Main = styled.main`
  padding-top: 100px;
`
const Heading = styled.h1`
  text-align: center;
  padding-top: 100px;
  color: white;
`
