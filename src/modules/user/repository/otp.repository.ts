import { Injectable } from "@nestjs/common";
import { IOtpRepository } from "../interfaces/otp-repository.interface";

@Injectable()
export class OtpRepository implements IOtpRepository {
    constructor() {}
}