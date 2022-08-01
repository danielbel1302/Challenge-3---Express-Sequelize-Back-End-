"use strict";

const models = require("../models/model");
const express = require("express");
const { response } = require("../app");

const router = express.Router();
module.exports = router;

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan
router.get("/users", (req, res) => {
  res.json(models.listUsers());
});
router.post("/users", (req, res) => {
  let { email, name } = req.body;
  try {
    let msg = models.addUser(email, name);
    res.status(201).json({ msg: msg });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
router.patch("/users/plan", (req, res) => {
  let { user } = req.query;
  try {
    let msg = models.switchPlan(user);
    res.json({ msg: msg });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
router.get("/series", (req, res) => {
  res.json(models.listSeries());
});
router.post("/series", (req, res) => {
  let { name, seasons, category, year } = req.body;
  try {
    let msg = models.addSerie(name, seasons, category, year);
    res.status(201).json({ msg: msg });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
router.get("/series/:category", (req, res) => {
  let { category } = req.params;
  try {
    res.json(models.listSeries(category));
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
router.get("/play/:serie", (req, res) => {
  let { serie } = req.params;
  let { user } = req.query;
  try {
    let msg = models.play(serie, user);
    res.json({ msg: msg });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
router.get("/watchAgain", (req, res) => {
  let { user } = req.query;
  try {
    res.json(models.watchAgain(user));
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
router.post("/rating/:serie", (req, res) => {
  let { serie } = req.params;
  let { email, score } = req.body;
  console.log(req.body);
  try {
    res.json({ msg: models.rateSerie(serie, email, score) });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.
