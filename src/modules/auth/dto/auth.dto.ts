import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPhoneNumber, IsString } from "class-validator";

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

export class CheckOtpDto {
    @ApiProperty({
        description: "The phone number of the user",
        example: "+201010101010",
        type: String,
        required: true,
    })
    @IsString({ message: "شماره تماس باید به صورت عدد وارد شود" })
    @IsPhoneNumber("IR", { message: "لطفا شماره تماس خود را به صورت صحیح وارد کنید" })
    phone: string;
    @ApiProperty({
        description: "The code of the user",
        example: "12345",
        type: Number,
        required: true,
    })
    @IsNumber({}, { message: "کد تایید باید به صورت عدد وارد شود" })
    code: number;
}

export class TokenDto {
    @ApiProperty({
        description: "The access token of the user",
        example: "so9hijoi(*&ff.si89g8y.I(h9o",
        type: String,
        required: true,
    })
    refreshToken: string;
}