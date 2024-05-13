import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(){}

    intercept(req:HttpRequest<any>,next:HttpHandler){

        const token = localStorage.getItem("token");
        if(!token){
          return next.handle(req)
        }

        const request = req.clone({
            headers:req.headers.set('Authorization','Bearer '+token)
        });

        // const request = req.clone({
        //   setHeaders: {
        //     "x-auth-token": token,
        //   }
        // });
        return next.handle(request)
    }
}
