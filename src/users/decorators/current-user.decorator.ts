import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { jWTPayloadType } from "src/utils/types";


// Custom decorator to extract current user payload from request
export const CurrentUser = createParamDecorator(
    (data, context:ExecutionContext) =>{ 
        const request =context.switchToHttp().getRequest()   // Switch to HTTP context 
        const payload :jWTPayloadType= request.user //Extract user payload from request
        return payload  //Return the payload
    }
)