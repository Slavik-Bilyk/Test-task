import React from 'react'

const Home = () => {
  return (
   <div>
    <form>
        <h1>Create contact</h1>
        <div className='block'>
            <label htmlFor='name'>
                First Name
                <input type='text' id='name'/>
            </label>
        </div>
    </form>
   </div>
  )
}

export default Home
