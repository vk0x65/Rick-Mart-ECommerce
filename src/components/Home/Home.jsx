import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
  return (
    <>
      <MainSlider  />
      <CategorySlider />
      <FeatureProducts />
    </>
  )
}
