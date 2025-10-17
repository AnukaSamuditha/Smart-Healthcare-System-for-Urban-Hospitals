import {
    Cake,
    Calendar, ChartBar, Check,
    ClipboardList,
    FileEdit,
    House,
    Phone,
    Pin,
    QrCode,
    Search,
    Stethoscope,
    User
} from "lucide-react";

export default function PatientVisitManagement(){
    return(
        <div className="h-[180vh] flex justify-center items-center bg-gray-300">
            <div className="w-[90vw] h-[95%] flex flex-col justify-start items-center gap-2">
                <div className="w-full h-[5%] bg-gradient-to-r from-blue-800 to-blue-400 rounded-lg">
                    <div className="w-full h-full flex flex-row justify-between items-center px-5 ">
                        <h1 className="text-xl font-bold text-white">Patient Registration System</h1>
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
                <div className="w-full h-[60%] flex flex-row justify-center items-center gap-2">
                    <div className="w-[33.33%] flex flex-col justify-between items-center h-full gap-2 bg-white rounded-lg">
                        <div className="w-full h-[5%] flex flex-row justify-start items-center gap-2 p-2 bg-blue-400 rounded-t-lg text-white"><Search size={20}/><div>Patient Check-in & Verification</div></div>
                        <div className="w-full h-[95%] flex flex-col justify-between items-center gap-2 p-2">
                            <div className="w-full h-[20%] flex justify-center items-center ">
                                <div className="w-full h-full flex justify-center items-center flex-col rounded-lg bg-gray-100 border border-dashed">
                                    <div className="w-full h-[70%] flex justify-center items-center">
                                        <QrCode size={70}/>
                                    </div>
                                    <div className="w-full h-[30%] flex flex-col justify-center items-center">
                                        <h1 className="text-[14px] font-bold text-green-500">QR Code Verification Successfully</h1>
                                        <h1 className="text-[12px]">Authentication Service validated patient identify</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[25%] flex justify-center items-center ">
                                <div className="w-full h-full flex justify-center items-center flex-col rounded-lg bg-gray-100 border border">
                                    <div className="w-full h-[30%] flex justify-between items-center px-5">
                                        <div className="text-[18px] font-bold">Dinuka Lakmal</div>
                                        <div className="bg-blue-400 text-white px-5 py-2 text-[12px] font-bold rounded-full">234567</div>
                                    </div>
                                    <div className="w-full h-[70%] grid grid-cols-2 text-[14px]">
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <Cake size={20}/>
                                            <div>24 Year Old Male</div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <Phone size={20}/>
                                            <div>+94779876543</div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <House size={20}/>
                                            <div>123 Kandy Road</div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <Pin size={20}/>
                                            <div>Colombo 07</div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <Calendar size={20}/>
                                            <div>Last Visit:15/07/2025</div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <Stethoscope size={20}/>
                                            <div>Cardiology Patient</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full h-[45%] flex justify-center items-center">
                                <div className="w-full h-full flex justify-around items-center flex-col rounded-lg bg-gray-100 border border-dashed p-2">
                                    <h1>Manual Verfication (If QR Code is not available)</h1>
                                    <div className="flex w-full flex-col justify-center items-start ">
                                        <label className="text-[12px] text-gray-500">Patient Id Or Full Name</label>
                                        <input type="text" placeholder="Enter Patient ID or Full Name" className="w-full h-[40px] border rounded-md p-2 bg-white"/>
                                    </div>
                                    <div className="flex w-full flex-col justify-center items-start ">
                                        <label className="text-[12px] text-gray-500">Phone Number</label>
                                        <input type="tel" placeholder="Enter Phone Number" className="w-full h-[40px] border rounded-md p-2 bg-white"/>
                                    </div>
                                    <div className="flex w-full flex-col justify-center items-start">
                                        <label className="text-[12px] text-gray-500">Date Of Birth</label>
                                        <input type="date" className="w-full h-[40px] border rounded-md p-2 text-gray-400 bg-white"/>
                                    </div>
                                    <div className="flex w-full flex-col justify-center items-start ">
                                        <button className="bg-blue-400 w-full py-2 text-white rounded-md">Verify Manuelly</button>
                                    </div>

                                </div>
                            </div>
                            <div className="w-full h-[5%]">
                                <div className="w-full h-full flex justify-center items-center flex-col rounded-lg bg-green-700 text-white">
                                    Proceed With Verified Patient
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[33.33%] flex flex-col justify-between items-center h-full gap-2 bg-white rounded-lg">
                        <div className="w-full h-[5%] flex flex-row justify-start items-center gap-2 p-2 bg-blue-400 rounded-t-lg text-white"><FileEdit size={20}/><div>Visit Logging</div></div>
                        <div className="w-full h-[95%] flex flex-col justify-between items-center ">
                            <div className="w-full  flex flex-col justify-center items-center rounded-lg px-3 py-2 gap-2">
                                <div className="w-full flex flex-col justify-center items-center gap-2">
                                    <label className="w-full text-sm text-gray-400">Visit Type</label>
                                    <select className="w-full border h-[40px] rounded-md p-2">
                                        <option>Out Patient</option>
                                        <option>Emergency</option>
                                    </select>
                                </div>
                                <div className="w-full flex-col justify-center items-center gap-2">
                                    <label className="w-full text-sm text-gray-400">Department</label>
                                    <select className="w-full border h-[40px] rounded-md p-2">
                                        <option>Emergency Department</option>
                                        <option>General Medicine</option>
                                        <option>Cardiology</option>
                                        <option>Surgery</option>
                                        <option>Pediatrics</option>
                                    </select>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center gap-2">
                                    <label className="w-full text-sm text-gray-400">Doctor</label>
                                    <select className="w-full border h-[40px] rounded-md p-2">
                                        <option>Dr. John Doe</option>
                                        <option>Dr. Jane Smith</option>
                                        <option>Dr. Michael Johnson</option>
                                    </select>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center gap-2">
                                    <label className="w-full text-sm text-gray-400">Visit Purpose/Notes</label>
                                    <input type="date" className="w-full border h-[40px] rounded-md p-2"/>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center gap-2">
                                    <label className="w-full text-sm text-gray-400">Visit Date</label>
                                    <input type="date" className="w-full border h-[40px] rounded-md p-2"/>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center bg-blue-400 rounded-md text-white py-2">
                                    Log Patient Visit
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="w-[33.33%] h-full bg-white rounded-lg">
                        <div className="w-full h-[5%] flex flex-row justify-start items-center gap-2 p-2 bg-blue-400 rounded-t-lg text-white"><ClipboardList size={20}/><div>Visit Logging</div></div>
                        <div className="w-full h-[95%] flex flex-col justify-start items-center p-3 gap-2 ">
                            <h1 className="text-xs text-left text-[12px] w-full">Medical Record Update</h1>
                            <div className="w-full flex flex-col p-2 justify-center items-center border gap-3 text-gray-500 rounded-md">
                                <div className="w-full py-3 flex items-center justify-start flex-row gap-2 px-2 rounded-md">
                                    <input type="checkbox" className="w-[20px] h-[20px]"/>
                                    <h1 className="text-gray-500 text-[16px]">Update Medical Record with new information</h1>
                                </div>
                                <h1 className="text-xs text-left text-[12px] w-full">New Medical Information</h1>
                                <div className="w-full flex items-center justify-start flex-row rounded-md">
                                    <textarea className="w-full h-[100px] border rounded-md resize-none p-2"></textarea>
                                </div>
                                <div className="w-full py-2 bg-blue-400 rounded-lg text-white text-center">Update Medical Records</div>
                            </div>

                            <h1 className="text-xs text-left text-[12px] w-full">System Status Monitor</h1>
                            <div className="w-full flex flex-col p-2 justify-center items-center border gap-2 text-gray-500 rounded-md">
                                <div className="w-full flex text-[14px] flex-row justify-between items-center">
                                    <div>Record System</div>
                                    <div className="flex flex-row text-green-500 font-bold">
                                        <Check/>
                                        <h1>Online</h1>
                                    </div>
                                </div>
                                <div className="w-full flex text-[14px] flex-row justify-between items-center">
                                    <div>Authentication System</div>
                                    <div className="flex flex-row text-green-500 font-bold">
                                        <Check/>
                                        <h1>Online</h1>
                                    </div>
                                </div>
                                <div className="w-full flex text-[14px] flex-row justify-between items-center">
                                    <div>Patient Database</div>
                                    <div className="flex flex-row text-green-500 font-bold">
                                        <Check/>
                                        <h1>Online</h1>
                                    </div>
                                </div>
                                <div className="w-full flex text-[14px] flex-row justify-between items-center">
                                    <div>Backup System</div>
                                    <div className="flex flex-row text-green-500 font-bold">
                                        <Check/>
                                        <h1>Online</h1>
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-xs text-left text-[12px] w-full">Quick Actions</h1>
                            <div className="w-full flex flex-col justify-start text-[14px] items-center gap-2">
                                <div className="w-full py-2 bg-gray-300 text-gray-600 text-center rounded-lg">View Patient History</div>
                                <div className="w-full py-2 bg-gray-300 text-gray-600 text-center rounded-lg">Print Visit Summary</div>
                                <div className="w-full py-2 bg-gray-300 text-gray-600 text-center rounded-lg">Next Patient Queue</div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="w-full h-[35%] flex flex-row justify-center items-center gap-2">
                    <div className="w-[75%] h-full bg-white rounded-lg">
                        <div className="w-full h-[10%] px-2 bg-blue-400 rounded-t-lg text-white flex flex-row items-center justify-start gap-2">
                            <ChartBar/>
                            <h1>Visit Processing Activity Log</h1>
                        </div>
                        <div className="h-[90%] w-full p-2 overflow-y-auto  flex flex-col items-start justify-start gap-2">
                            <div className="w-full min-h-[80px] bg-gray-100 rounded-md flex-col flex items-start justify-center p-2 gap-2">
                                <div className="text-gray-500 text-[12px]">09:05:15AM</div>
                                <div>Loggged data</div>
                            </div>
                            <div className="w-full min-h-[80px] bg-gray-100 rounded-md flex-col flex items-start justify-center p-2 gap-2">
                                <div className="text-gray-500 text-[12px]">09:05:15AM</div>
                                <div>Loggged data</div>
                            </div>
                            <div className="w-full min-h-[80px] bg-gray-100 rounded-md flex-col flex items-start justify-center p-2 gap-2">
                                <div className="text-gray-500 text-[12px]">09:05:15AM</div>
                                <div>Loggged data</div>
                            </div>
                            <div className="w-full min-h-[80px] bg-gray-100 rounded-md flex-col flex items-start justify-center p-2 gap-2">
                                <div className="text-gray-500 text-[12px]">09:05:15AM</div>
                                <div>Loggged data</div>
                            </div>


                        </div>

                    </div>
                    <div className="w-[25%] flex flex-col justify-center items-center h-full bg-white rounded-lg p-2 gap-2">
                        <div className="w-full h-[60%] flex items-center justify-center gap-2 flex-col border-b">
                            <div className="w-full bg-gray-200 text-[16px] rounded-lg font-semibold py-3 text-center">Complete Visit Logging</div>
                            <div className="w-full bg-gray-200 text-[16px] rounded-lg font-semibold py-3 text-center">Print Visit Record</div>
                            <div className="w-full bg-gray-200 text-[16px] rounded-lg font-semibold py-3 text-center">Schedule Follow Up</div>
                            <div className="w-full bg-gray-200 text-[16px] rounded-lg font-semibold py-3 text-center">End Patient Session</div>
                        </div>
                        <div className="w-full h-[40%] flex items-center justify-center gap-2 p-4 flex-col bg-gray-100 rounded-lg">
                            <div className="w-full flex flex-row justify-between items-center text-[16px] rounded-lg font-semibold py-3 text-center">
                                <div className="text-[14px] text-gray-600">Current Queue: </div>
                                <div className="text-[14px]">8 patient waiting</div>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center text-[16px] rounded-lg font-semibold py-3 text-center">
                                <div className="text-[14px] text-gray-600">Average Processing Time: </div>
                                <div className="text-[14px]">3.5 mins</div>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center text-[16px] rounded-lg font-semibold py-3 text-center">
                                <div className="text-[14px] text-gray-600">Visits Logged: </div>
                                <div className="text-[14px]">67 completed</div>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center text-[16px] rounded-lg font-semibold py-3 text-center">
                                <div className="text-[14px] text-gray-600">System Uptime: </div>
                                <div className="text-[14px]">100%</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}