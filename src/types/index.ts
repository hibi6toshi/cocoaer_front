export type User = {
  id : string;
}

export type Article = {
  id : string;
  user_id : string; 
  piety_target_id : number;  
  piety_category_id : number;  
  days : number | undefined;
  cost : number | undefined; 
  title : string; 
  body : string; 
  created_at : string;
  updated_at : string;
  picture : string | undefined;
  user :User;
}

export type Project = {
  id : string;
  user_id : string; 
  piety_target_id : number;  
  piety_category_id : number;  
  limit_day : string | undefined;
  cost : number | undefined; 
  title : string; 
  body : string | undefined; 
  created_at : string;
  updated_at : string; 
  user :User;
}

export type Forum = {
  id : string;
  user_id : string; 
  piety_target_id : number;  
  piety_category_id : number;  
  days : number | undefined;
  cost : number | undefined; 
  title : string; 
  body : string | undefined; 
  created_at : string;
  updated_at : string;
  user :User;
}