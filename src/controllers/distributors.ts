import Distributors from "../models/distributors";
import Products from "../models/products";
import Process_Schedules from "../models/process-schedules";
import Channel_authorization from "../models/channel-authorization";
import Users from "../models/users";

import { Request, Response } from "express";

export const createDistributor = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    if (
      !params.name ||
      !params.code ||
      !params.emailAlert ||
      !params.emailNotification
    )
      return res
        .status(400)
        .json({ message: "Enter the resquested parameters" });

    const distributor = await Distributors.query().insert({
      name: params.name,
      code: params.code,
      emailAlert: params.emailAlert,
      emailNotification: params.emailNotification,
    });
    return res.status(201).json({ distributor });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getDistributorId = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });
    const distributor = await Distributors.query().findById(params.id);
    if (!distributor)
      return res
        .status(500)
        .json({ message: "No existing distributors with that Id" });
    return res.status(200).json({ distributor });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getDistributors = async (req: Request, res: Response) => {
  try {
    const distributor = await Distributors.query();
    if (distributor.length <= 0)
      return res.status(500).json({ message: "No existing distributors" });
    return res.status(200).json({ distributor });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteDistributor = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(400)
        .json({ message: "Enter the requested parameters" });
    const distributor = await Distributors.query().deleteById(params.id);
    if (!distributor)
      return res
        .status(400)
        .json({ message: "No existing distributor with that Id" });
    return res.status(200).json({ distributor });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateDistributor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const params = req.body;
    if (!id)
      return res
        .status(400)
        .json({ message: "Enter the requested parameters" });
    const distributor = await Distributors.query().findById(id).patch({
      name: params.name,
      code: params.code,
      emailAlert: params.emailAlert,
      emailNotification: params.emailNotification,
    });
    if (!distributor)
      return res
        .status(400)
        .json({ message: "No existing distributor with that Id" });

    return res.status(200).json({ distributor });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createDistributorComplete = async (
  req: Request,
  res: Response
) => {
  try {
    const params = req.body;
    if (
      !params.nameDistributor ||
      !params.codeDistributor ||
      !params.emailNotificationDistributor ||
      !params.emailAlertDistributor ||
      !params.nameChannel ||
      !params.codeChannel ||
      !params.nameProduct ||
      !params.codeProduct ||
      !params.descriptionProduct ||
      !params.amountProduct ||
      !params.startTimeProcess ||
      !params.finishTimeProcess ||
      !params.nameUser ||
      !params.codeUser ||
      !params.emailUser ||
      !params.phoneNumberUser
    )
      return res
        .status(500)
        .json({ message: "Enter the resqueted parameters" });

        const distributor = await Distributors.query().insert({
            name: params.nameDistributor,
            code: params.codeDistributor,
            emailAlert: params.emailAlertDistributor,
            emailNotification: params.emailNotificationDistributor,
          });  
         const idDistributor = distributor.id
        

          const channel = await Channel_authorization.query().insert({
            name: params.nameChannel,
            code: params.codeChannel,
            idDistributor: idDistributor
        });

        const processS = await Process_Schedules.query().insert({
            startTime: params.startTimeProcess,
            finishTime: params.finishTimeProcess,
            idDistributor: idDistributor
        });

        const product = await Products.query().insert({
            name: params.nameProduct,
            code: params.codeProduct,
            description: params.descriptionProduct,
            amount: params.amountProduct,
            idDistributor: idDistributor
        });

        const user = await Users.query().insert({
            name: params.nameUser,
            phoneNumber: params.phoneNumberUser,
            code: params.codeUser,
            email: params.emailUser,
            idDistributor: idDistributor,
          });
          return res.status(200).json({ distributor , user,product,processS,channel });
  } catch (err) {
      res.status(500).json(err)
  }
};
