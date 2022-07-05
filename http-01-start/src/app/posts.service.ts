import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})

export class PostsService{
    error = new Subject<string>();

    constructor(private http:HttpClient){}

    createAndStorePost(title: string, content:string){
        const postData:Post = {title,content}
        // Send Http request
        console.log(postData);
        //send http post request
        this.http.post<{name: string}>(
        'https://angular-firebase-guide-default-rtdb.europe-west1.firebasedatabase.app/posts.json',  //backend endpoint
        postData, //json data you want to post
        {   
            //Observe determines the return type according to what you are interested in observing
            observe: 'response', // events, response, body

        })
        .subscribe(response =>{
            console.log(response);
        }, error=>{
            this.error.next(error.message)
        });
    }

    fetchPosts(){
        //can set parameters to be sent to the backend
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        //will return an array using the key are a key value and the post as the value
        return this.http.get<{[key:string]: Post}>(
        'https://angular-firebase-guide-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
            headers: new HttpHeaders({'Custom-Header': 'Hello'}),
            params: searchParams,
            responseType: 'json'
        })
        .pipe(
            map(response =>{ // pipe the response to be proceseed before we look at the data
                const postArray:Post[] = [];
                for(const key in response){
                    if(response.hasOwnProperty(key)){
                        postArray.push({ ...response[key], id: key })
                    }
                }
                return postArray;
            }), catchError(errorResponse => {
                //oberver to emitt error
                return throwError(errorResponse);
            })
        );
    }

    deletePosts(){
        return this.http.delete('https://angular-firebase-guide-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
            observe: 'events',
            responseType: 'text'
        })
        .pipe(
            //tap allows any functionality within to manipulate observables
            tap(event => {
                console.log(event);
                //checking for the event type to be sent.
                if(event.type == HttpEventType.Sent){
                    
                }
                if(event.type == HttpEventType.Response){
                    console.log(event.body)
                }
        }));
    }

}