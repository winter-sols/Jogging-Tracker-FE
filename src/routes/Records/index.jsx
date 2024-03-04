import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RecordEdit from '../RecordEdit'
import RecordsList from '../RecordsList'

function Records () {
    
    return (
      <Routes>
        <Route path='/' exact element={<RecordsList />} />
        <Route path='/edit/:id' element={<RecordEdit />} />
        <Route path='/new' element={<RecordEdit />} />
      </Routes>
    )
}

export default Records;
