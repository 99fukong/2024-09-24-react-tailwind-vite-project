import {useState, useContext} from "react";
import {Link, Routes, Route} from "react-router-dom";
import ChatBot from "./ChatBot";

function App() {

    return (
        <div>
            <Header/>
            <div className="max-w-5xl mx-auto">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/pictures"} element={<Pictures/>}/>
                    <Route path={"/ChatBot"} element={<ChatBot/>}/>
                    <Route path={"/contact"} element={<Contact/>}/>
                    
                </Routes>
            </div>
        </div>
    )
}

function Header() {
    return (
        <div className="p-4 mb-10">
            <nav className="space-x-4 text-2xl flex justify-center items-center shadow">
                <Link className="px-8 py-5 block" to="/">Home</Link>
                <Link className="px-8 py-5 block" to="/pictures">pictures</Link>
                <Link className="px-8 py-5 block" to="/contact">Contact</Link>
                <Link className="px-8 py-5 block" to="/ChatBot">ChatBot</Link>
                <a href="https://www.fukonglzw.cn/"
                   className="flex gap-2 items-start justify-start">
                    <span>fukong</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </a>
            </nav>
        </div>
    )
}

function Home() {
    return (
        <div className="flex justify-center flex-col items-center">
        <img src="https://img.131213.xyz/api/cfile/AgACAgUAAx0Eflp52gACJphm9VfIhK7US4j2PR62ITA1R2C1xAACxr8xG0zXqFdFkPmLZiYWvAEAAwIAA3cAAzYE" alt="" className="rounded-full mb-20" style={{ width: '100px',height: 'auto', objectFit: 'contain' }}/>
        <h2 className="text-2xl mb-10">Home <a href="https://99fukong-github-io.vercel.app/" target="_blank" className="font-bold uppercase text-blue-400">Hollis</a></h2>        
            <p>Hello , everyone , I'm Hollis.</p>
        </div>
    )
}

function Pictures() {
    return (
        <div className="space-y-10 text-center">
            <h2 className="text-2xl">This is Pictures.</h2>
            <div className="flex gap-4 flex-wrap items-start">
                <Image 
                    src="https://img.131213.xyz/api/cfile/AgACAgUAAx0Eflp52gACJplm9VffFunUY4cRdcp_rsCmeisvmAACx78xG0zXqFcN5OqN2VywZwEAAwIAA3cAAzYE"
                    width={500} 
                />
                <Image 
                    src="https://img.131213.xyz/api/cfile/AgACAgUAAx0Eflp52gACJppm9VfuUGhDfHRXefMcgerrcln3RwACyL8xG0zXqFfx5qGyjSOwqgEAAwIAA3cAAzYE"
                    width={500}  
                />
            </div>
        </div>
    );
}

function Image({ src, width }) {
    return (
        <img 
            src={src} 
            alt="" 
            style={{ width: `${width}px`, height: '500px' }} 
            // style={{ width: `${width}px`, height: 'auto', objectFit: 'contain' }} 
        />
    );
}

function Contact() {
    return (
        <div>
            <h2 className="text-2xl mb-10">Contact me</h2>
            <p className="text-lg">Email: <a href="mailto:someone@somewhere.gone"
                                             className="underline text-blue-700 leading-relaxed">fukongovo@gmail.com</a>
            </p>
        </div>
    )
}


export default App
