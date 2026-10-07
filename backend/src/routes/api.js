import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  contactsController,
  companiesController,
  dealsController,
  tasksController,
  productsController,
  invoicesController,
} from "../controllers/crudController.js";
import { getDashboard, getReports } from "../controllers/dashboardController.js";
import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../controllers/calendarController.js";

const router = Router();

// All data routes require authentication
router.use(authenticate);

// ── Dashboard ──
router.get("/dashboard", getDashboard);
router.get("/dashboard/reports", getReports);

// ── Calendar ──
router.get("/calendar", getEvents);
router.post("/calendar", createEvent);
router.delete("/calendar/:id", deleteEvent);

// ── CRUD routes factory ──
function crud(path, controller) {
  router.get(path, controller.getAll);
  router.get(`${path}/:id`, controller.getById);
  router.post(path, controller.create);
  router.put(`${path}/:id`, controller.update);
  router.delete(`${path}/:id`, controller.remove);
}

crud("/contacts", contactsController);
crud("/companies", companiesController);
crud("/deals", dealsController);
crud("/tasks", tasksController);
crud("/products", productsController);
crud("/invoices", invoicesController);

export default router;
