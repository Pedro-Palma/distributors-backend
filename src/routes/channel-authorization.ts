import { Router } from "express";
import * as ChannelController from "../controllers/channel-authorization"

const router = Router();

router
.post('/CreateChannelAuthorization',ChannelController.createChannel)
.get('/getChannelAuthorizations',ChannelController.getChannels)
.get('/getChannelAuthorizationId/:id',ChannelController.getChannelId)
.delete('/deleteChannelAuthorization/:id',ChannelController.deleteChannel)
.put('/updateChannelAuthorization/:id',ChannelController.updateChannel)
export default router;
