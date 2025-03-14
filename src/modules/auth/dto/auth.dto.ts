import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class SendOtpDto {
    @ApiProperty({
        description: "The phone number of the user",
        example: "+201010101010",
        type: String,
        required: true,
    })
    @IsString({ message: "شماره تماس باید به صورت عدد وارد شود" })
    @IsPhoneNumber("IR", { message: "لطفا شماره تماس خود را به صورت صحیح وارد کنید" })
    phone: string;
}