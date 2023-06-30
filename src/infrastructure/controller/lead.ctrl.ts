import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";
const fs = require('fs');

class LeadCtrl {
  constructor(private readonly leadCreator: LeadCreate) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const response = await this.leadCreator.sendMessageAndSave({ message, phone })
    res.send(response);
  };

  public getQR = async (req: Request, res: Response) => {
    const qrSvgPath = `${process.cwd()}/tmp/qr.svg`;
    fs.readFile(qrSvgPath, 'utf8', (err:any, data:any) => {
      if (err) {
        console.error('Error reading QR SVG:', err);
        return res.status(500).send('Error reading QR SVG');
      }
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(data);
    });
}
}

export default LeadCtrl;
