import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { JwtDto } from "./jwt.dto";

export class SuccessLoginDto {
    @ApiProperty()
    jwt: JwtDto;

    @ApiProperty()
    user: UserDto;
}
