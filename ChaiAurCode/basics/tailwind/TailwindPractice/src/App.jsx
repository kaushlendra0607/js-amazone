import './App.css'

function App() {

  return (
    <>
      <div className='p-6 m-auto mt-60 flex place-items-center space-x-4 max-w-sm bg-gray-400 rounded-2xl shadow-lg'>
        <div>
          <img className='h-30 w-50 rounded-2xl'
            src="https://i.pinimg.com/736x/fd/52/6c/fd526c73b63c64c2473aa38d3aeae409.jpg"
            alt="image" />
        </div>
        <div>
          <div className='font-bold text-lg'>
            Tailwind CSS
            <p className='heloo'>By K. P. Singh</p>
            {/* Vanilla css still works with tailwind */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
