const { DoctorModel } = require('../data/models/doctor');
const AppointmentModel = require('../data/models/appointment');
const mongoose = require('mongoose');

const getDoctorById = async(id) => {
  try {
    const dado = await DoctorModel.findById(id).exec();
    return dado;
  } catch (error) {
    const err = {
      message: error.message,
      code: 400,
    };
    throw err;
  }
};

const listAppointments = async(idDoctor) => {
  try {
    const appointments = await AppointmentModel.find({
      doctor: mongoose.Types.ObjectId(idDoctor),
    }, '_id date patient').populate('patient', '-password').sort({date: 'asc'}).exec();
    return appointments;
  } catch (error) {
    const err = {
      message: error.message,
      code: 400,
    };
    throw err;
  }
};

const validateDoctorLogin = async(email, password) => {
  const doctor = await DoctorModel.findOne({ email: email }).exec();
  const err = {
    message: 'login authentication failed',
    code: 400,
  };
  if (doctor != null){
    if (doctor.password === password){
      return doctor;
    } else {
      throw err;
    }
  } else {
    throw err;
  }
};

const createNewDoctor = async(name, email, password, cellphone, phone, rcn) => {
  try {
    const doctor = {
      name: name,
      email: email,
      password: password,
      cellphone: cellphone,
      phone: phone,
      rcn: rcn,
    };
    const data = await DoctorModel.create(doctor);
    return data;
  } catch (error) {
    const err = {
      message: error.message,
      code: 400,
    };
    throw err;
  }
};

module.exports = {
  getDoctorById: getDoctorById,
  listAppointments: listAppointments,
  createNewDoctor: createNewDoctor,
  validateDoctorLogin: validateDoctorLogin,
};
