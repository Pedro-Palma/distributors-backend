import Process_Schedules from "../models/process-schedules";
import { Request, Response } from "express";
import { scheduleSchema, scheduleSchemaId } from "../schemas/process-schedule";

export const createProcessSchedules = async (req: Request, res: Response) => {
  try {
    const { error, value } = scheduleSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: "Enter the resquested parameters" });
    const params = req.body;

    const process = await Process_Schedules.query().insert({
      startTime: params.startTime,
      finishTime: params.finishTime,
      idDistributor: params.idDistributor,
    });
    return res.status(201).json({ process });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getProcessSchedulesId = async (req: Request, res: Response) => {
  try {
    const { error, value } = scheduleSchemaId.validate(req.params);

    if (error)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });
    const params = req.params;

    const process = await Process_Schedules.query().findById(params.id);
    if (!process)
      return res
        .status(500)
        .json({ message: "No existing process schedules  with that Id" });
    return res.status(200).json({ process });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getProcessSchedules = async (req: Request, res: Response) => {
  try {
    const process = await Process_Schedules.query();
    if (process.length <= 0)
      return res.status(500).json({ message: "No existing process schedules" });
    return res.status(200).json({ process });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteProcessSchedules = async (req: Request, res: Response) => {
  try {
    const { error, value } = scheduleSchemaId.validate(req.params);
    if (error)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });
    const params = req.params;
    const process = await Process_Schedules.query().deleteById(params.id);
    if (!process)
      return res
        .status(400)
        .json({ message: "No existing process schedules with that Id" });
    return res.status(200).json({ process });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateProcessSchedules = async (req: Request, res: Response) => {
  try {
    const { error, value } = scheduleSchemaId.validate(req.params);

    if (error)
      return res
        .status(400)
        .json({ message: "Enter the requested parameters" });
    const id = req.params.id;
    const params = req.body;
    const process = await Process_Schedules.query().findById(id).patch({
      startTime: params.startTime,
      finishTime: params.finishTime,
      idDistributor: params.idDistributor,
    });
    if (!process)
      return res
        .status(400)
        .json({ message: "No existing process schedules with that Id" });

    return res.status(200).json({ process });
  } catch (err) {
    return res.status(500).json(err);
  }
};
