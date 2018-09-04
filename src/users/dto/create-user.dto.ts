import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiModelProperty()
    readonly username: string;
    
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty({ type: String, isArray: true })
    readonly notes: any[];
}