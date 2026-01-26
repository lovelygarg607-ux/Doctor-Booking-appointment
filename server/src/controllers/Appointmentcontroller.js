import { Appointmentmodel } from "../models/Appointmentmodel.js"

const bookingappointmentcontroller = async (req, res) => {
    try {


        const { PatientId, DoctorId, ClinicId, bookingDate, bookingTime } = req.body
        if ([PatientId, DoctorId, ClinicId, bookingDate, bookingTime].some((field) => {
            field.trim() === ""
        })) {


            return res.status(200).send({
                message: "all fields are required",
                status: "not success"
            })
        }


        const existingbooking = await Appointmentmodel.findOne(
            {
                PatientId,
                bookingDate,
                ClinicId,
            }
        )

        if (existingbooking) {
            return res.status(200).send(
                {
                    message: "Alreday booked",
                    status: "not success"
                }
            )
        }

        const booking = await Appointmentmodel.create(
            {
                PatientId, DoctorId, ClinicId, bookingDate, bookingTime, bookingStatus: "pending"
            }
        )

        return res.status(200).send(
            {
                message: "Appointment request sent. Waiting for approval.",
                status: "success",
                booking
            }
        )





    } catch (error) {


        res.status(500).send(
            {
                message: `bookingcontroller error,${error}`,
                status: "failed"
            }
        )
    }
}

const getAppointmentList = async (req, res) => {

    try {
        
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const total = await Appointmentmodel.countDocuments();

        const appointments = await Appointmentmodel.find()
            .populate("PatientId", "patientname patientImage DOB")
            .populate("DoctorId", "doctorname")
            .populate("ClinicId", "clinicname")
            .skip(skip)
            .limit(limit)
            .sort({ bookingDate: 1 });

        res.status(200).send({
            status: "success",
            totalrecords: total,
            appointments
        });
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message
        });
    }
};

const approvedAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).send({
        status: "failed",
        message: "appointmentId is required"
      });
    }

    const updatedAppointment = await Appointmentmodel.findByIdAndUpdate(
      appointmentId,
      { bookingStatus: "approved" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send({
        status: "failed",
        message: "Appointment not found"
      });
    }

    res.status(200).send({
      status: "success",
      message: "Appointment approved successfully",
      appointment: updatedAppointment
    });

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: error.message
    });
  }
};





const cancelappointment = async (req, res) => {
    try {

        const { PatientId, ClinicId, DoctorId, bookingDate, bookingTime } = req.body;

        const existingbooking = await Appointmentmodel.findOne(
            {
                PatientId,
                bookingDate,
                bookingTime,
                DoctorId,
                ClinicId
            }
        )

        if (!existingbooking) {
            res.status(200).send(
                {
                    message: "booking not found"
                }
            )
        }

        const updatebooking = await Appointmentmodel.findOneAndUpdate(existingbooking._id, { bookingStatus: "cancelled" }, { new: true })
        res.status(200).send(
            {
                message: "cancelled appointment  successfully",
                status: "success",
                updatebooking
            }
        )

    } catch (error) {

        res.status(500).send(
            {
                message: "booking status not cancelled",
                status: "failed"
            }
        )

    }
}



const Completeappointment = async (req, res) => {
    try {


        const { PatientId, ClinicId, DoctorId, bookingDate, bookingTime } = req.body


        const existingbooking = await Appointmentmodel.findOne(
            {
                PatientId,
                ClinicId,
                DoctorId,
                bookingTime,
                bookingDate
            }
        )

        if (!existingbooking) {
            res.status(200).send(
                {
                    message: "booking not found",
                    status: "not success"
                }
            )
        }


        const updatebooking = await Appointmentmodel.findOneAndUpdate(existingbooking._id, { bookingStatus: "completed" }, { new: true })


        res.status(200).send(
            {
                message: "completed appointment  successfully",
                status: "success",
                updatebooking
            }
        )





    } catch (error) {


        res.status(500).send(
            {
                message: "booking status not cancelled",
                status: "failed"
            }
        )
    }
}



export { bookingappointmentcontroller, cancelappointment, Completeappointment, getAppointmentList ,approvedAppointment}