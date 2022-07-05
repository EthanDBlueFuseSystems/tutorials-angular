import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";



//HttpInterceptor will intercept every request that goes to the server
export class AuthInterceptorService implements HttpInterceptor{
    //intercept needs the outgoing request
    //HttpHandler transforms HttpRequest into a stream of HttpEvents mostly likely being the response

    intercept(request: HttpRequest<any>, next: HttpHandler){
        const modifiedRequest = request.clone({headers: request.headers.append('Auth', 'xyz')})
        //handle next request
        return next.handle(modifiedRequest)
      
    }
}