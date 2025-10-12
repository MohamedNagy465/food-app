import React from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

function Home() {
  return (
    <div className='py-15'>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
    </div>
  )
}

export default Home
