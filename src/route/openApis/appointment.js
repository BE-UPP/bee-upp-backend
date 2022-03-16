const express = require('express');
const router = express.Router();
const {
  checkAppointment,
} = require('../../service/appointment');

router.get('/check', async(req, res) => {
  try {
    const id = req.query ? req.query.id : false;
    if (!id) {
      throw Object.assign(
        new Error('Ausência de valores (requerido: appointmentId)'),
        { code: 400 },
      );
    }
    const appointment = await checkAppointment(id);
    res.send(appointment);
  } catch (error) {
    console.log(error);
    // TODO error
    res.status(error.code).send(error.message);
  }
});

module.exports = router;
