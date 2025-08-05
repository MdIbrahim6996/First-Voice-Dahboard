import { Router } from "express";
import { getAllHoliday } from "../../controllers/holiday.controller";

const router = Router();

router.get("/", getAllHoliday);

export default router;
