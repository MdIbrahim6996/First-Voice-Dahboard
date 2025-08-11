import { Router } from "express";
import { getAllUserHoliday } from "../../controllers/holiday.controller";

const router = Router();

router.get("/", getAllUserHoliday);

export default router;
