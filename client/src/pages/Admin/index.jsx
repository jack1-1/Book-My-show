import React from 'react'
import { Tabs } from 'antd'
import MovieList from './MovieList'
import TheatreList from './TheatreList'
function Admin() {
    const tabItems=[
        {
            key:'1',
            label:'Movies',
            childern:<MovieList/>
        },
        {
             key:'2',
            label:'TheatreList',
            childern:<TheatreList/>
        }
    ]
  return (
    <Tabs items={tabItems}/>
  )
}

export default Admin