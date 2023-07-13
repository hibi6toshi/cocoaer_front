export type User = {
  id : string;
  avatar?: {url: string}
}

export type Option = {
  value: string;
  label: string;
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
  created_at? : string;
  updated_at? : string;
  picture? : {url: string};
  user :User;
}

export type FormArticle = {
  piety_target_id : string;  
  piety_category_id : string;  
  days : string | undefined;
  cost : string | undefined; 
  title : string; 
  body : string; 
  picture? : File | undefined | null;
  warningTitle: string | null;
  warningBody: string | null;
  // warning?: {
  //   title?: string | null;
  //   body?: string | null;
  // }
}

export type Project = {
  id : string;
  user_id : string; 
  piety_target_id : number;  
  piety_category_id : number;  
  limit_day : string | undefined;
  cost : number | undefined; 
  title : string; 
  body : string; 
  created_at? : string;
  updated_at? : string; 
  user :User;
  tasks: Task[] ;
  actions: Action[] ;
}

export type FormProject = {
  piety_target_id : string;  
  piety_category_id : string;  
  limit_day : string | undefined;
  cost : string | undefined; 
  title : string; 
  body : string; 
  warningTitle: string | null;
  warningBody: string | null;
  tasks: FormTask[] ;
  actions: FormAction[] ;
}

export type Task = {
  id: string;
  user_id: string
  project_id: string;
  sort_number?: number;
  name: string;
}

export type FormTask = {
  id: string | null;
  user_id: string | null;
  project_id: string | null;
  sort_number?: number;
  name: string;
}

export type Action = {
  id: string;
  user_id: string
  project_id: string;
  sort_number?: number;
  name: string;
}

export type FormAction = {
  id: string | null;
  user_id: string | null;
  project_id: string | null;
  sort_number?: number;
  name: string;
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
  created_at? : string;
  updated_at? : string;
  user :User;
}

export type FormForum = {
  piety_target_id : string;  
  piety_category_id : string;  
  days : string | undefined;
  cost : string | undefined; 
  title : string; 
  body : string; 
  warningTitle: string | null;
  warningBody: string | null;
}

export type PietyCategory = {
  id: string;
  name: string;
}

export type PietyTarget = {
  id: string;
  name: string;
}