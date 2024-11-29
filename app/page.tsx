'use client'

import { useState } from 'react';
import { baseURL } from '../constant/index';

export default function Home() {
  const [inputText, setInputText] = useState<string>();
  const [isSended, setIsSended] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();
  const [endpoint , setEndPoint] = useState<string>('inflected')

  const flattenToString = (data: any): string => {
    let result = "";
  
    const traverse = (obj: any) => {
      if (typeof obj === "string") {
        result += obj + " ";
      } else if (Array.isArray(obj)) {
        obj.forEach((item) => traverse(item));
      } else if (typeof obj === "object" && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          if (key === "data") {
            traverse(value); // Focus on the "data" field
          } else {
            traverse(value);
          }
        });
      }
    };
  
    traverse(data);
    return result.trim(); 
  };
  
  
  const sendText = async () => {
    if (!inputText?.trim()) return alert('ابتدا متن را وارد کنید');
    setLoading(true);
    setIsSended(true);

    const req = await fetch(`${baseURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: endpoint == 'process_sentence' ? JSON.stringify({ sentence: inputText }) : JSON.stringify({ text: inputText }),
    });

    if(endpoint == 'inflect'){
        const { inflected } = await req.json();
        setResponse(inflected);
        
    }else if(endpoint == 'convert'){
      const { converted } = await req.json();
      setResponse(converted);

    }else if(endpoint == 'generate'){
      const { generated } = await req.json();
      setResponse(generated);

    }else if(endpoint == 'lemmatize'){
      const { lemmatized } = await req.json();
      const updatedval : any = Object.values(lemmatized).map((element: any) => element + ', ');

      setResponse(updatedval);
    
    }else if(endpoint == 'process_sentence'){
      const { data } = await req.json();
      setResponse(flattenToString(data.results))
      
    }
    setLoading(false);
  };

  return (
    <>
      <header className='bg-gray-800 text-white fixed  h-[80px] top-0 w-full pb-4'>
        <div
          className="flex items-center justify-center gap-4 h-[80px] overflow-hidden rounded-md p-6 shadow-sm shadow-[#00000050]"
        >
          <span
            className="text-center font-mono text-base font-black uppercase text-neutral-600"
          >
            
          </span>
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
                onClick={() => setEndPoint('inflect')}
                type="radio"
                id="radio"
                name="gender"
                value="male"
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
              ></div>
              <div
                className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]"
              ></div>
              <span className="absolute font-bold text-blue-400">۱</span>
            </div>
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
                onClick={() => setEndPoint('generate')}
                type="radio"
                id="radio"
                name="gender"
                value="female"
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
              ></div>
              <div
                className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]"
              ></div>
              <span className="absolute font-bold text-pink-400">۲</span>
            </div>
            <div className='justify-center sm:flex hidden items-center mx-[110px]'>
              <h2 className='text-4xl text-gray-300'>زبانشناسی</h2>
            </div>
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
              onClick={() => setEndPoint('lemmatize')}
                type="radio"
                name="gender"
                value="non-binary"
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="absolute h-full w-full rounded-full bg-purple-100 p-2 shadow-sm shadow-[#00000050] ring-purple-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
              ></div>
              <div
                className="absolute -z-10 h-full w-full scale-0 rounded-full bg-purple-200 duration-500 peer-checked:scale-[500%]"
              ></div>
              <span className="absolute font-bold text-purple-400">۳</span>
            </div>
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
                onClick={() => setEndPoint('convert')}
                type="radio"
                name="gender"
                value="none"
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="absolute h-full w-full rounded-full bg-neutral-100 p-2 shadow-sm shadow-[#00000050] ring-neutral-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
              ></div>
              <div
                className="absolute -z-10 h-full w-full scale-0 rounded-full bg-neutral-200 duration-500 peer-checked:scale-[500%]"
              ></div>
              <span className="absolute font-bold text-neutral-400">۴</span>
            </div>

            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
                onClick={() => setEndPoint('process_sentence')}
                type="radio"
                name="gender"
                value="none"
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="absolute h-full w-full rounded-full bg-orange-100 p-2 shadow-sm shadow-[#00000050] ring-orange-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
              ></div>
              <div
                className="absolute -z-10 h-full w-full scale-0 rounded-full bg-orange-200 duration-500 peer-checked:scale-[500%]"
              ></div>
              <span className="absolute font-bold text-orange-400">۵</span>
            </div>

          </div>
        </div>
      </header>
      <main className="min-h-screen bg-gray-900 text-white ">
        {!isSended ? (
          <footer className=" text-white fixed bottom-0 w-full p-5">
            <div className="relative w-full flex items-center" dir="rtl">
              <textarea
                value={inputText}
                dir="rtl"
                onChange={(e) => setInputText(e.target.value)}
                placeholder="متن خود را اینجا بنویسید"
                className="bg-gray-800 border-none p-4 text-xl w-full rounded-xl resize-none overflow-y-auto no-scrollbar"
                rows={1}
              />
              <img
                onClick={sendText}
                src="/icons/send.png"
                className="absolute left-4 cursor-pointer invert"
                width={40}
              />
            </div>
          </footer>
        ) : (
          <>
            <section dir="rtl" className="pb-20 px-4 pt-[100px]">
              <div
                className="mr-5 md:ml-[30%] ml-[20%] border-r rounded-lg bg-gray-800 border-none mt-5 p-5 shadow-md"
              >
                <span className="font-bold text-xl block mb-2">متن شما</span>
                <p className="break-words whitespace-pre-wrap">{inputText}</p>
              </div>
              <div
                className="ml-5 md:mr-[30%] mr-[20%] bg-darkslateblue border-r rounded-lg mt-5 p-5 shadow-md bg-blue-950 border-none"
              >
                {loading ? (
                  <div className="relative flex w-64 animate-pulse gap-2 p-4">
                    <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                    <div className="flex-1">
                      <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400"></div>
                      <div className="h-5 w-[90%] rounded-lg bg-slate-400"></div>
                    </div>
                  </div>
                ) : (
                  <>        
                    <span className="font-bold text-xl block mb-2">پاسخ</span>
                    <p className="break-words whitespace-pre-wrap">{response}</p>
                  </>        

                )}
              </div>
            </section>
            <footer className=" text-white fixed bottom-0 w-full p-5">
              <div 
                onClick={() => setIsSended(false)}
                className="relative cursor-pointer bg-green-500 rounded-xl p-3 w-full flex items-center justify-center text-center text-2xl"
                dir="rtl"
              >
                <button>ارسال مجدد</button>
              </div>
            </footer>
          </>
        )}
      </main>
    </>

  );
}
