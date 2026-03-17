"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import { IoFilterOutline,  } from "react-icons/io5";
import { CiImport } from "react-icons/ci";
import { FaRegObjectUngroup } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

export default function dashboard(){
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos");
            const json = await res.json();

            setData(json);
        }

        fetchData();
    }, []);

    type Todo = {
        id: number;
        title: string;
        completed: boolean;
    };

    type BarGroupProps = {
        activeCount: number;
        totalCount: number;
        activeColor: string;
    };

    function BarGroup({ activeCount, totalCount, activeColor }: BarGroupProps) {
    return (
        <div className="flex space-x-[2px]">
        {Array.from({ length: totalCount }).map((_, i) => (
            <div
            key={i}
            className={`w-[4px] h-8 rounded-sm ${
                i < activeCount ? activeColor : "bg-gray-200"
            }`}
            />
        ))}
        </div>
    );
    }

    return(
        <>
        <div className="m-6 font-sans">
            <div className="my-8">
                <h1 className="font-bold text-xl">Dashboard</h1>
                <p className="text-sm">View and manage todo list</p>
            </div>
            
            <div className="border border-[#757575] rounded-md py-4 px-4 mb-4">
                <div className="flex justify-between pb-12">
                    <div>
                        <h1 className="text-sm">Available Balance</h1>
                        <p className="text-xs">Track your current balance and available balance</p>
                    </div>
                    <div>
                        <button className="text-sm bg-[#46c2ff] text-[#333550] cursor-pointer border rounded-md py-1 px-2 ml-2 shadow-lg shadow-cyan-500/30">
                        + Add Todo</button>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div>
                        <div className="text-sm font-semibold">$226,635</div>
                        <div className="text-xs text-gray-500 mb-1">Balance</div>
                        <BarGroup activeCount={30} totalCount={50} activeColor="bg-[#8CE352]" />
                    </div>

                    <div>
                        <div className="text-sm font-semibold">$183,531</div>
                        <div className="text-xs text-gray-500 mb-1">Revenue</div>
                        <BarGroup activeCount={36} totalCount={50} activeColor="bg-[#FFC756]" />
                    </div>

                    <div>
                        <div className="text-sm font-semibold">$24,842</div>
                        <div className="text-xs text-gray-500 mb-1">Not Complete</div>
                        <BarGroup activeCount={12} totalCount={50} activeColor="bg-[#FF502F]" />
                    </div>
                </div>

                
            </div>

            <div>
                <nav>
                    <ul className="flex border-b border-[#757575]">
                        <li className="w-18 text-center content-center py-4 text-sm text-[#46c2ff] border-b-3 border-[#46c2ff]">All</li>
                        <li className="w-18 text-center content-center py-4 text-sm border-b-3 border-transparent">Date</li>
                        <li className="w-18 text-center content-center py-4 text-sm border-b-3 border-transparent">Completed</li>
                    </ul>
                </nav>
            </div>
            <div className="my-6 flex justify-between">
                <div className="relative w-64">
                    <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full border border-[#757575] rounded-md pl-8 pr-2 py-1"
                    />
                </div>
                <div className="flex ">
                    <button className="flex items-center justify-center text-xs bg-[#46c2ff] text-[#333550] cursor-pointer border rounded-md py-1 px-2 ml-2 shadow-lg shadow-cyan-500/30">
                        <IoFilterOutline className="mr-1"/>
                        Filter
                    </button>
                    <button className="flex items-center justify-center text-xs bg-[#46c2ff] text-[#333550] cursor-pointer border rounded-md py-1 px-2 ml-2 shadow-lg shadow-cyan-500/30">
                        <FaRegObjectUngroup className="mr-1"/>
                        Group by
                    </button>
                    <button className="flex items-center justify-center text-xs bg-[#46c2ff] text-[#333550] cursor-pointer border rounded-md py-1 px-2 ml-2 shadow-lg shadow-cyan-500/30">
                        <CiImport className="mr-1"/>
                        Import
                    </button>
                    <button className="flex items-center justify-center text-xs bg-[#46c2ff] text-[#333550] cursor-pointer border rounded-md py-1 px-2 ml-2 shadow-lg shadow-cyan-500/30">
                        <HiOutlineRefresh className="mr-1"/>
                        Refresh
                    </button>
                </div>
            </div>
            <div className="w-full md:w-auto p-4 border border-[#757575] rounded-md">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-left">ID</th>
                            <th className="text-left">Name</th>
                            <th className="text-left">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: Todo) => (
                            <tr key={item.id} className="hover:bg-sky-900 cursor-pointer border-b-1 border-[#757575]">
                                <td><input type="checkbox"/></td>
                                <td className="text-blue-500 py-2">{item.id}</td>
                                <td className="py-2">{item.title}</td>
                                <td className="py-2">{item.completed ? "Yes" : "No"}</td>
                                <td className="py-2">...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}