import React from 'react'

export default function Fedex({demo}) {
    console.log(demo);
  return (
    <div>
        <p>{demo?demo.email:'hello'}</p>

    </div>
  )
}
