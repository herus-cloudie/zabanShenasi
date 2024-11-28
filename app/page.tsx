'use client'

import { useState } from 'react';
import { baseURL } from '../constant/index';

const data = 'ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...'; // Truncated for brevity

export default function Home() {
  const [inputText, setInputText] = useState<string>();
  const [isSended, setIsSended] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();

  const sendText = async () => {
    console.log(inputText);
    if (!inputText?.trim()) return alert('ابتدا متن را وارد کنید');
    setLoading(true);
    setIsSended(true);

    const req = await fetch(`${baseURL}/inflect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    });
    const { inflected } = await req.json();
    setResponse(inflected || 'متاسفانه جوابی دریافت نشد');
    setLoading(false);
  };

  return (
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
                <p className="break-words whitespace-pre-wrap">{response}</p>
              )}
            </div>
          </section>
          <footer className=" text-white fixed bottom-0 w-full p-5">
            <div
              className="relative bg-green-500 rounded-xl p-3 w-full flex items-center justify-center text-center text-2xl"
              dir="rtl"
            >
              <button onClick={() => setIsSended(false)}>ارسال مجدد</button>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
