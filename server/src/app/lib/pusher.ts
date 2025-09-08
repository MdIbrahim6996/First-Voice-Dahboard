import Pusher from "pusher";
import {
  PUHSER_APP_ID,
  PUSHER_CLUSTER,
  PUSHER_KEY,
  PUSHER_SECRET,
} from "../utils/appContants";

export const pusher = new Pusher({
  appId: PUHSER_APP_ID!,
  key: PUSHER_KEY!,
  secret: PUSHER_SECRET!,
  cluster: PUSHER_CLUSTER!,
  useTLS: true,
});
