import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white absolute bottom-0 w-full p-5'>
        <div className="relative w-full flex items-center" dir="rtl">
            <textarea
                dir="rtl"
                placeholder="متن خود را اینجا بنویسید"
                style={{
                transition: "height 0.2s ease",
                maxHeight: "200px",
                }}
                className="bg-gray-900 border-none p-6 text-xl my-5 w-full rounded-2xl pl-20 resize-none overflow-y-scroll no-scrollbar"
                rows={1}
            />
            <img
                src="/icons/send.png"
                className="absolute left-4 cursor-pointer"
                style={{ filter: "invert(1)" }}
                width={40}
            />
        </div>

    </footer>
  )
}

export default Footer