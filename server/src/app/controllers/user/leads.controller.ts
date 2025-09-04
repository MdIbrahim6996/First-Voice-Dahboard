import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export const getUserLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusId, saleDate, fromDate, toDate } = req.query;
  const { id } = req.user!;

  const newSaleDate = new Date(saleDate as string);
  newSaleDate.setUTCHours(0, 0, 0, 0);
  const nextDay = new Date(saleDate as string);
  nextDay.setUTCHours(0, 0, 0, 0);
  nextDay.setDate(nextDay.getDate() + 1);
  try {
    const status = await prisma.status.findMany();
    const leads = await prisma.lead.findMany({
      where: {
        leadByUserId: id,
        statusId: statusId ? parseInt(statusId as string) : Prisma.skip,
        saleDate: {
          gte: saleDate ? newSaleDate : Prisma.skip,
          lt: saleDate ? nextDay : Prisma.skip,
        },
        createdAt: {
          gte: fromDate ? new Date(fromDate as string) : Prisma.skip,
          lte: toDate ? new Date(toDate as string) : Prisma.skip,
        },
      },
      include: {
        status: { select: { name: true } },
        process: { select: { name: true } },
        plan: { select: { name: true } },
        StatusChangeReason: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.render("pages/leads", { currentPath: "/user/leads", leads, status });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  //     {
  //   title: 'Mr.',
  //   firstName: 'dsfdsf',
  //   middleName: '',
  //   lastName: 'dfdsf',
  //   centre: 'dsfsdf',
  //   address: '',
  //   city: '',
  //   county: '',
  //   pincode: 'sdfsdf',
  //   password: '',
  //   dateOfBirth: '',
  //   phone: '3242343242',
  //   process: '1',
  //   plan: '1',
  //   closer: '6',
  //   verifier: '6',
  //   paymentMethod: 'demandDraft',
  //   shift: 'UNITED KINGDOM (UK)',
  //   bank: {
  //     bankName: 'dsfsdf',
  //     accountName: 'dsfsdf',
  //     accountNumber: 'sdfsdf',
  //     sort: 'sdfsdf'
  //   },
  //     card: {
  //     name: 'fsdf',
  //     bankName: 'sdf',
  //     cardNumber: 'sdf',
  //     expiry: 'dsf',
  //     cvv: 'sdf'
  //   }
  // }
  const {
    title,
    firstName,
    middleName,
    lastName,
    centre,
    address,
    city,
    county,
    pincode,
    password,
    dateOfBirth,
    phone,
    process,
    plan,
    poa,
    closer,
    verifier,
    bank,
    paymentMethod,
    shift,
    comment,
    card,
  } = req.body;
  const date = new Date();

  try {
    const status = await prisma.status.findFirst({
      where: { name: "pending" },
    });

    const lead = await prisma.lead.create({
      data: {
        title,
        firstName,
        middleName,
        lastName,
        centre,
        address,
        city,
        county,
        pincode,
        password,
        poa: poa === "true" ? true : false,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : Prisma.skip,
        phone,
        processId: parseInt(process),
        planId: parseInt(plan),
        leadByUserId: req?.user?.id!,
        closerId: parseInt(closer),
        verifierId: parseInt(verifier),
        paymentMethod,
        shift,
        comment: comment ? comment : Prisma.skip,

        // BANK
        bankName: bank?.bankName ? bank?.bankName : Prisma.skip,
        accountName: bank?.accountName ? bank?.accountName : Prisma.skip,
        accountNumber: bank?.accountNumber ? bank?.accountNumber : Prisma.skip,
        sort: bank?.sort ? bank?.sort : Prisma.skip,
        // CARD
        cardName: card?.name ? card?.name : Prisma.skip,
        cardBankName: card?.bankName ? card?.bankName : Prisma.skip,
        cardNumber: card?.cardNumber ? card?.cardNumber : Prisma.skip,
        expiry: card?.expiry ? card?.expiry : Prisma.skip,
        cardCvv: card?.cvv ? card?.cvv : Prisma.skip,
        statusId: status?.id,
      },
      include: { status: { select: { name: true } } },
    });

    const dailyLeadCount = await prisma.leadCount.upsert({
      where: {
        userId: lead?.leadByUserId as number,
        uniqueDate: {
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear() - 1,
          userId: lead?.leadByUserId as number,
        },
      },
      create: {
        userId: lead?.leadByUserId as number,
        count: 1,
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear() - 1,
      },
      update: { count: { increment: 1 } },
    });

    res.send(lead);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
