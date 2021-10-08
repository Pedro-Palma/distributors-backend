import { Router } from "express";
import * as ChannelController from "../controllers/channel-authorization"

const router = Router();

router
.post('/channel',ChannelController.createChannel)
.get('/channel',ChannelController.getChannels)
.get('/channel/:id',ChannelController.getChannelId)
.delete('/channel/:id',ChannelController.deleteChannel)
.put('/channel/:id',ChannelController.updateChannel)
export default router;
