import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";


export class LoggingInterceptorSErvice implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler){
        console.log('Outgoing request');
        console.log(request.url);
        console.log(request.headers);
        return next.handle(request)
        .pipe(
            
            tap(event => {
                if(event.type === HttpEventType.Response){
                    console.log('Incoming Response');
                    console.log(event.body);
                }
            })
        );
    }
}