import { Router } from "express";
import {
    createHoliday,
    deleteHoliday,
    getAllHoliday,
    updateHoliday,
} from "../../controllers/holiday.controller";

const router = Router();

router.post("/", createHoliday);
router.get("/", getAllHoliday);
router.put("/:id", updateHoliday);
router.delete("/:id", deleteHoliday);

export default router;
