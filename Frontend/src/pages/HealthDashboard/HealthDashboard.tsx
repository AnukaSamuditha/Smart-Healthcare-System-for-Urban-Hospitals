import {BarChart, ChartArea, Clock, File, FileImage, LineChart, PieChart, Trophy, User, Users} from "lucide-react";


export default function HealthDashboard(){



    return(
        <div className="h-[150vh] flex justify-center items-center">
            <div className=" w-[90vw] h-[95%] flex flex-col justify-between items-center gap-2">
                <div className="w-full h-[5%] bg-gradient-to-r from-blue-800 to-blue-400 rounded-lg">
                    <div className="w-full h-full flex flex-row justify-between items-center px-5 ">
                        <h1 className="text-xl font-bold text-white">Health Dashboard</h1>
                        <div className="text-left flex flex-row justify-center items-center px-5 gap-1">
                            <div className="w-[50px] h-[50px] rounded-full bg-white flex flex-col justify-center items-center">
                                <User/>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-white">Username:</h1>
                                <h1 className="text-white">Type:</h1>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full h-[90%] rounded-lg flex flex-row justify-between items-center gap-2">
                    <div className="w-[20%] h-full bg-gray-100 rounded-lg flex flex-col justify-start items-center p-2 gap-2">
                        <div className="w-full rounded-lg bg-white">
                            <div className="w-full  flex justify-start items-center text-[14px] px-2 py-1 ">
                                Select Report Category
                            </div>
                            <div className="w-full grid grid-cols-2 gap-2 p-2 text-center">
                                <div className="flex flex-col justify-center items-center border rounded-lg h-[100px]">
                                    <Users size={30}/>
                                    <h1 className="text-[12px]">Patient Visits</h1>
                                    <span className="text-[8px] px-2">Daily,weekly,monthly visit statistics</span>
                                </div>
                                <div className="flex flex-col justify-center items-center border rounded-lg h-[100px]">
                                    <Trophy size={30}/>
                                    <h1 className="text-[12px]">Staff Utilization</h1>
                                    <span className="text-[8px] px-2">Staff workload and efficiency</span>
                                </div>

                                <div className="flex flex-col justify-center items-center border rounded-lg h-[100px]">
                                    <Clock size={30}/>
                                    <h1 className="text-[12px]">Peak Times</h1>
                                    <span className="text-[8px] px-2">Busiest hours and days analysis</span>
                                </div>

                                <div className="flex flex-col justify-center items-center border rounded-lg h-[100px]">
                                    <ChartArea size={30}/>
                                    <h1 className="text-[12px]">Service Analysis</h1>
                                    <span className="text-[8px] px-2">Service performance metics</span>
                                </div>

                            </div>

                        </div>
                        <div className="w-full bg-white rounded-lg p-2 text-sm">
                            <div className="w-full flex justify-start items-center text-[14px] border-b py-0.5">
                                Report Configuration
                            </div>
                            <div className="w-full flex flex-col justify-start items-center gap-3 py-1">
                                <div className="w-full flex flex-col justify-center items-center gap-5">
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <label className="text-[12px] text-gray-500 w-full">Date Range</label>
                                        <select className="border border-gray-300 w-full h-[2rem] text-md p-1 rounded-sm">
                                            <option>Last 3 days</option>
                                            <option>Last 7 days</option>
                                            <option>Last Month</option>
                                        </select>
                                    </div>

                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div className="w-[49%] flex justify-center items-center">
                                            <input type="date" className="border border-gray-300 w-full text-sm h-[2rem] rounded-sm px-1" />
                                        </div>
                                        <div className="w-[49%] flex justify-center items-center">
                                            <input type="date" className="border border-gray-300 w-full text-sm h-[2rem] rounded-sm px-1" />

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col justify-center items-center">
                                    <label className="text-[12px] text-gray-500 w-full">Department/Unit</label>
                                    <select className="border border-gray-300 w-full h-[2rem] text-md p-1 rounded-sm">
                                        <option>All Departments</option>
                                        <option>Department 1</option>
                                        <option>Department 2</option>
                                        <option>Department 3</option>
                                    </select>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center">
                                    <label className="text-[12px] text-gray-500 w-full">Visualization Type</label>
                                    <div className="w-full grid grid-cols-3 gap-2 text-xs h-[70px]">
                                        <div className="flex flex-col justify-center items-center border rounded-lg">
                                            <BarChart size={20}/>
                                            <h1 >Bar Chart</h1>
                                        </div>
                                        <div className="flex flex-col justify-center items-center border rounded-lg">
                                            <LineChart size={20}/>
                                            <h1>Line Chart</h1>
                                        </div>
                                        <div className="flex flex-col justify-center items-center border rounded-lg">
                                            <PieChart size={20}/>
                                            <h1>Pie Chart</h1>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-2 rounded-lg bg-blue-400 text-white" onClick={()=>console.log("generate")}>Generate Report</button>
                            </div>

                        </div>


                    </div>
                    <div className="w-[80%] h-full bg-gray-100 rounded-lg ">
                        <div className="w-full h-[10%] grid grid-cols-3 gap-2 p-2">
                            <div className="flex flex-col justify-center items-center border rounded-lg bg-white">
                                <h1 className="text-3xl font-bold">24847</h1>
                                <h1 className="text-gray-400 text-sm">Patients Visited</h1>

                            </div>
                            <div className="flex flex-col justify-center items-center border rounded-lg bg-white">
                                <h1 className="text-3xl font-bold">92</h1>
                                <h1 className="text-gray-400 text-sm">Daily Average</h1>

                            </div>
                            <div className="flex flex-col justify-center items-center border rounded-lg bg-white">
                                <h1 className="text-3xl font-bold">15%</h1>
                                <h1 className="text-gray-400 text-sm">Growth vs Last Month</h1>
                            </div>
                        </div>
                        <div className="w-full h-[40%] p-2">
                            <div className="w-full h-full flex flex-col justify-between items-center border rounded-lg bg-white gap-2 p-2">
                                <h1 className="w-full">Bar Char:Patient Visits by Departments</h1>
                                <div className="bg-gray-300 rounded-lg w-full h-full flex justify-center items-center">
                                    <BarChart/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[30%] p-2">
                            <div className="w-full h-full justify-center items-center border rounded-lg bg-white">
                                <table className="w-full h-full border-collapse">
                                    <thead>
                                    <tr className="bg-blue-50 text-gray-500 text-left">
                                        <th className="p-2">Department</th>
                                        <th className="p-2">Total Visits</th>
                                        <th className="p-2">Avg</th>
                                        <th className="p-2">% of total</th>
                                        <th className="p-2">Trend</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr className="border-b">
                                        <td>Emergency Department</td>
                                        <td>845</td>
                                        <td>12</td>
                                        <td>15%</td>
                                        <td>↑</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>General Medicine</td>
                                        <td>845</td>
                                        <td>12</td>
                                        <td>15%</td>
                                        <td>↑</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>Cardiology</td>
                                        <td>845</td>
                                        <td>12</td>
                                        <td>15%</td>
                                        <td>↑</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>Surgery</td>
                                        <td>845</td>
                                        <td>12</td>
                                        <td>15%</td>
                                        <td>↑</td>
                                    </tr>
                                    <tr>
                                        <td>Pediatrics</td>
                                        <td>845</td>
                                        <td>12</td>
                                        <td>15%</td>
                                        <td>↑</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div className="w-full h-[20%] p-2">
                            <div className="w-full h-full flex flex-col justify-between items-center bg-white px-2 py-1 rounded-xl gap-2">
                                <h1 className="w-full">Export Report</h1>
                                <div className="w-full h-full flex flex-row justify-between items-center grid grid-cols-2 gap-2">
                                    <div className="flex flex-col justify-center items-center border rounded-lg h-full">
                                        <File/>
                                        <h1>PDF Report</h1>
                                    </div>
                                    <div className="flex flex-col justify-center items-center border rounded-lg h-full">
                                        <FileImage/>
                                        <h1>PNG Image</h1>
                                    </div>
                                </div>
                                <div className="w-full ">
                                    <div className="w-full text-center py-2 text-white bg-blue-400 rounded-md">
                                        Export Selected Format
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full bg-gray-100 text-center  rounded-lg flex flex-col justify-between p-2 flex-row">
                    <div className="py-2 w-[250px] bg-blue-400 text-white rounded-md">Generate New Report</div>
                    <div className="py-2 w-[250px] bg-blue-400 text-white rounded-md">Save Report Template</div>
                    <div className="py-2 w-[250px] bg-blue-400 text-white rounded-md">Schedule Automated Report</div>
                    <div className="py-2 w-[250px] bg-blue-400 text-white rounded-md">View Report History</div>
                </div>


            </div>

        </div>
    )

}