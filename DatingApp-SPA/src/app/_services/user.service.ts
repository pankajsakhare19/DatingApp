import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {
 }

getUsers(page?, itemsPerPage?, userParams?, likeParams?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();
  
  if(page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);

  }

  if(userParams != null){
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if(likeParams === 'Likers'){
    params = params.append('likers', 'true');
  }

  if(likeParams === 'Likees'){
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
  .pipe(
    map(response =>{
      paginatedResult.result = response.body;
      if(response.headers.get('Pagination')!= null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number){
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number, id: number){
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

sendLike(id:number, recipientId: number){
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}

}
