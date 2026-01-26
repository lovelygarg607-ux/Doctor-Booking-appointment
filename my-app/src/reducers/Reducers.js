import {createSlice} from  "@reduxjs/toolkit"

const initialState ={
    doctorprofile:null,
    patientprofile:null,
    clinicprofile:null,
    doctorlist:[],
    patientlist:[],
    bookinglist:[],
    cliniclist:[],
}

const DoctorSlice = createSlice({
    name:"Doctor",
    initialState,
    reducers:{
        setProfileData:(state , action)=>{
            state.doctorprofile = action.payload
        },
        setpatientProfileData:(state , action)=>{
            state.patientprofile = action.payload
        },

        setClinicProfileData:(state , action)=>{
            state.clinicprofile = action.payload
        },

        setBookinglist:(state,action)=>{
            state.bookinglist=action.payload
        },

        setDoctorlist:(state,action)=>{
            state.doctorlist=action.payload
        },

        setcliniclist:(state,action)=>{
            state.cliniclist=action.payload
        },

        setpatientlist:(state,action)=>{
            state.patientlist=action.payload
        }
        

        
    }
})

export const {setProfileData , setpatientProfileData , setDoctorlist,setClinicProfileData,setBookinglist,setcliniclist} = DoctorSlice.actions;
export const Doctorreducer = DoctorSlice.reducer