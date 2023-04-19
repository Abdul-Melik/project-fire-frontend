import React from 'react'
import MainArea from '../components/dashboard/MainArea' 
import Sidebar from '../components/dashboard/Sidebar'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <>
    <Sidebar />
    <MainArea />
    </>
  ) 
} 

export default Dashboard