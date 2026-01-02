import React from 'react';
import { useState } from 'react';

function Navbar(params) {
  const [text , setText] = useState("")  

    function handle_enter(e){
        if (e.key==='Enter'){
            setText("");
            params.function(text);
    }
    }
    function search_button(){
          setText("");
            params.function(text);
    }

  return (
    <nav className="flex justify-center items-center py-3 bg-[#0f0f0f] sticky top-0 z-50">
      <div className="flex w-full max-w-[600px] items-center">
        <input 
            value={text}
            onChange={(event)=>{setText(event.target.value)}}
            onKeyDown={(e) => handle_enter(e)}
          type="text" 
          placeholder="Search" 
          className="w-full bg-[#121212] border border-[#303030] text-white rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
        />
        <button onClick={() =>search_button()} className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-2 hover:bg-[#303030]">
          <svg className="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> 
          </svg>
        </button>
      </div>

    </nav>
  );
}

export default Navbar;