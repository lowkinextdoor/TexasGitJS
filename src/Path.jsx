import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Viewuser from './Day6/Viewuser'
import Home from "./Day6/Home"
import Layout from './Day6/Layout';
import Pagenotfound from './Pagenotfound' ;
import Todo from './Day8/Todo';

export default function Path() {
  return (
    <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="userlist" element={<Viewuser />} />
    <Route path="*" element={<Pagenotfound />} />
  </Route>

  <Route path="/Day8/Todo" element={<Todo />} /> {/* move outside */}
</Routes>

  )
}