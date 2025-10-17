import {ChartBar, Check, CheckIcon, File, Phone, Plus, QrCode, Siren, Trash, User} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {type ChangeEvent, type FormEvent, useState} from "react";
import { QRCodeSVG } from 'qrcode.react';
import axiosInstance from "@/providers/axios.ts";

export default function PatientRegistration(){

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        dob: "",
        gender: "male",
        nic: "",
        btype: "O+",
        phone: "",
        email: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        emergency: {
            name: "",
            relationship: "",
            phone: "",
        },
        generateQR: false,
    });

    const [qrData, setQrData] = useState<string | null>(null); // this will hold patient info for QR

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const target = e.target as HTMLInputElement; // Type assertion for checkbox
        if (name.includes("emergency.")) {
            const key = name.split(".")[1];
            setForm(prev => ({
                ...prev,
                emergency: { ...prev.emergency, [key]: value }
            }));
        } else if (type === "checkbox") {
            setForm(prev => ({ ...prev, [name]: target.checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const mutation = useMutation({
        mutationFn: async (patientData: typeof form) => {
            const res = await axiosInstance.post(`/patient`, patientData, { withCredentials: true });
            return res.data;
        },
        onSuccess: (data) => {
            alert(data.message);
            queryClient.invalidateQueries({ queryKey: ["patient"] });

            if (form.generateQR && data.patient?._id) {
                const qrInfo = JSON.stringify({
                    id: data.patient._id,
                    name: `${data.patient.fname} ${data.patient.lname}`,
                    dob: data.patient.dob,
                    phone: data.patient.phone
                });
                setQrData(qrInfo);
            }
        },
        onError: (err: any) => {
            alert(err.response?.data?.message || "Error creating patient");
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };


    return(
        <div className="h-[150vh] flex justify-center items-center bg-gray-200">

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
                <div className="w-full h-[5%] bg-gradient-to-r bg-white rounded-lg ">
                    <div className="w-full h-full flex flex-col justify-center items-center px-5 gap-1">
                        <h1 className="text-xs font-bold text-center">Registration Progress Demographic: Information Collection</h1>
                        <div className="w-full text-left flex flex-row justify-center items-center">
                            <div className="w-full h-[8px] bg-gray-100">
                                <div className="w-[100%] h-full flex justify-between items-center flex-row rounded-full  bg-blue-400">
                                    <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                    <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                    <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                    <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                    <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center text-center text-[14px]">
                            <h1>Start</h1>
                            <h1>Demographic</h1>
                            <h1>Validation</h1>
                            <h1>QR Generation</h1>
                            <h1>Complete</h1>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[85%] flex flex-row justify-center items-center rounded-lg gap-2">
                    <form onSubmit={handleSubmit} className="w-[75%] h-full bg-white rounded-lg">
                        <div className="w-full h-[5%] flex flex-row justify-start items-center px-5 bg-blue-400 rounded-t-lg text-white gap-2">
                            <File />
                            <h1 className="font-bold text-sm">Patient Demographic Information</h1>
                        </div>
                        <div className="w-full h-[95%] flex flex-col justify-between items-center px-5 gap-2 py-2">

                            <div className="w-full h-[30%] border-b flex flex-col justify-between items-center py-3">
                                <h1 className="flex w-full flex-row items-center gap-2 ">
                                    <User /> Personal Information
                                </h1>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">First Name</label>
                                        <input
                                            type="text"
                                            name="fname"
                                            value={form.fname}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Last Name</label>
                                        <input
                                            type="text"
                                            name="lname"
                                            value={form.lname}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Date Of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={form.dob}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Gender</label>
                                        <select
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">National ID Number</label>
                                        <input
                                            type="text"
                                            name="nic"
                                            value={form.nic}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">Blood Type</label>
                                        <select
                                            name="btype"
                                            value={form.btype}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        >
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* --- Contact Information --- */}
                            <div className="w-full h-[32%] border-b flex flex-col justify-between items-center py-3">
                                <h1 className="flex w-full flex-row items-center gap-2 ">
                                    <Phone /> Contact Information
                                </h1>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">Address</label>
                                        <textarea
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            className="w-full border h-[100%] rounded-md p-2 resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Province</label>
                                        <select
                                            name="province"
                                            value={form.province}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        >
                                            <option value="">Select a Province</option>
                                            <option value="central">Central Province</option>
                                            <option value="eastern">Eastern Province</option>
                                            <option value="north-central">North Central Province</option>
                                            <option value="northern">Northern Province</option>
                                            <option value="north-western">North Western Province</option>
                                            <option value="sabaragamuwa">Sabaragamuwa Province</option>
                                            <option value="southern">Southern Province</option>
                                            <option value="uva">Uva Province</option>
                                            <option value="western">Western Province</option>
                                        </select>
                                    </div>
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Postal Code</label>
                                        <input
                                            type="number"
                                            name="postalCode"
                                            value={form.postalCode}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- Emergency Contact --- */}
                            <div className="w-full h-[20%] border-b flex flex-col justify-between items-center py-3">
                                <h1 className="flex w-full flex-row items-center gap-2 ">
                                    <Siren /> Emergency Contact
                                </h1>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">Contact Name</label>
                                        <input
                                            type="text"
                                            name="emergency.name"
                                            value={form.emergency.name}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-center ">
                                        <label className="w-full text-sm text-gray-400">Relationship</label>
                                        <select
                                            name="emergency.relationship"
                                            value={form.emergency.relationship}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        >
                                            <option value="">Select Relationship</option>
                                            <option value="spouse">Spouse</option>
                                            <option value="parent">Parent</option>
                                            <option value="child">Child</option>
                                            <option value="sibling">Sibling</option>
                                            <option value="friend">Friend</option>
                                            <option value="relative">Relative</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-between items-center gap-2">
                                    <div className="flex w-full flex-col items-center">
                                        <label className="w-full text-sm text-gray-400">Contact Phone</label>
                                        <input
                                            type="tel"
                                            name="emergency.phone"
                                            value={form.emergency.phone}
                                            onChange={handleChange}
                                            className="w-full border h-[40px] rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- QR Code --- */}
                            <div className="w-full h-[10%] border-b flex flex-col justify-around items-center py-3">
                                <h1 className="flex w-full flex-row items-center gap-2 ">
                                    <QrCode /> QR Code Generation
                                </h1>
                                <div className="flex w-full h-full flex-row items-center justify-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="generateQR"
                                        checked={form.generateQR}
                                        onChange={handleChange}
                                        className="h-[20px] w-[20px] rounded-lg "
                                    />
                                    <label className="w-full text-md text-black">
                                        Generate QR code for patient identification
                                    </label>
                                </div>
                            </div>

                            {/* --- Submit Button --- */}
                            <div className="w-full h-[8%]  flex flex-col justify-center items-center py-3">
                                <button
                                    type="submit"
                                    className="flex w-full h-[40px] flex-row items-center justify-center gap-2 bg-blue-400 rounded-md text-white"
                                >
                                    Validate & Create Patient Account
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="w-[25%] h-full bg-white rounded-lg">
                        <div className="w-full h-[5%] flex flex-row justify-start items-center px-5 bg-blue-400 rounded-t-lg text-white gap-2"><ChartBar/><h1 className="font-bold text-sm">Registration Status and Confirmation</h1></div>
                        <div className="w-full h-[95%] flex flex-col justify-between items-center px-4 gap-2 py-2">
                            <h1 className="text-xs text-left text-[12px] w-full">System Status Monitor</h1>
                            <div className="w-full flex h-[15%] text-[12px] text-gray-500 flex-col justify-around items-center border p-3 rounded-lg bg-gray-100">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">Patient Database</div>
                                    <div className="flex flex-row items-center text-green-500"><Check size={20}/>Online</div>
                                </div>
                                <div className="w-full flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">Authentication Service</div>
                                    <div className="flex flex-row items-center text-green-500"><Check size={20}/> Active</div>
                                </div>
                                <div className="w-full flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">QR Code Generator</div>
                                    <div className="flex flex-row items-center text-green-500"><Check size={20}/> Ready</div>
                                </div>
                                <div className="w-full flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">Duplication Check</div>
                                    <div className="flex flex-row items-center text-green-500"> <Check size={20}/>Functional</div>
                                </div>
                            </div>
                            <h1 className="text-xs text-left text-[12px] w-full">QR Code Preview</h1>
                            <div className="w-full h-[25%] border border-dashed rounded-lg p-1">
                                <div className="w-full h-[65%] flex justify-center items-center">
                                    <div className="w-full h-[65%] flex justify-center items-center">
                                        {qrData ? (
                                            <QRCodeSVG
                                                value={qrData}
                                                size={120}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                level="Q"
                                                includeMargin={true}
                                            />
                                        ) : (
                                            <div className="text-gray-400 text-sm text-center">No QR Code Generated</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex w-full text-xs h-[35%] justify-center items-center flex-col">
                                    <h1 className={`text-lg ${qrData ? "text-green-500" : "text-red-500"}`}>{qrData ? "QR Code Generated Successfully" : "QR Code Not Generated"}</h1>
                                    <div><span className="font-bold">Patient ID: </span>P789012345</div>
                                    <div><span className="font-bold">QR Code: </span>QR-KP-2024</div>
                                    <div><span className="font-bold">Generated On: </span>05/02/2024</div>
                                </div>
                            </div>
                            <h1 className="text-xs text-left text-[12px] w-full">Quick Actions</h1>
                            <div className="w-full h-[20%] text-[14px] flex flex-col items-center justify-around">
                                <div className="w-full h-[20%] bg-green-700 rounded-md flex justify-center items-center text-white">Print QR Code</div>
                                <div className="w-full h-[20%] bg-gray-300 rounded-md flex justify-center items-center text-black">Email Confirmation</div>
                                <div className="w-full h-[20%] bg-gray-300 rounded-md flex justify-center items-center text-black">Schedule First Appointment</div>
                                <div className="w-full h-[20%] bg-gray-300 rounded-md flex justify-center items-center text-black">View Patient Profile</div>
                            </div>
                            <h1 className="text-xs text-left text-[12px] w-full">Registration Summary</h1>
                            <div className="w-full text-[14px] text-gray-600 h-[40%] bg-gray-100 border rounded-md flex flex-col justify-around items-center  p-3">
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Patient Name</div>
                                        <div className="flex flex-row items-center">Manushi</div>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Date of Birth</div>
                                        <div className="flex flex-row items-center">01/01/2000</div>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Phone Number</div>
                                        <div className="flex flex-row items-center">1234567890</div>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Address</div>
                                        <div className="flex flex-row items-center">123 Main St, Anytown, USA</div>
                                    </div>
                                    <div className="w-full  flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Emergency Contact</div>
                                        <div className="flex flex-row items-center">John Doe</div>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Registration Date</div>
                                        <div className="flex flex-row items-center">01/01/2024</div>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">Patient ID</div>
                                        <div className="flex flex-row items-center">P789012345</div>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">QR Code Status</div>
                                        <div className="flex text-green-500 flex-row items-center"><Check size={20}/> Generated</div>
                                    </div>




                            </div>


                        </div>
                    </div>

                </div>
                <div className="w-full h-[5%]  rounded-lg flex justify-center items-center">
                    <div className="w-full h-full rounded-lg grid grid-cols-3 gap-2 text-[12px]">
                        <div className="flex flex-col items-center justify-center gap-1 border rounded-lg bg-white">
                            <Trash/>
                            <h1>Clear Form</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border rounded-lg bg-white">
                            <CheckIcon/>
                            <h1>Complete Registration</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border rounded-lg bg-white">
                            <Plus/>
                            <h1>Register Another Patient</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}