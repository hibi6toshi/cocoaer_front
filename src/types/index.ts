export type User = {
  id : string;
  avatar?: {url: string};
  name: string;
  introduction? :string;
}

export type FormUser = {
  id : string;
  avatar : {url: string};
  imgAvatar: File | undefined;
  name: string;
  introduction :string;
  warningName: string | null;
}

export type Option = {
  value: string;
  label: string;
}

export type Favoritable = {
  favorited_by_user_ids: number[];
}
export type FavoritableType = "Article" | "Project" | "Forum";

export type contentType =  "Article" | "Project" | "Forum";

export type CommentableType =  "Article" | "Project" | "Forum";

export type Article = {
  type: "Article";
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
} & Favoritable

export type FormArticle = {
  id: string;
  piety_target_id : string;  
  piety_category_id : string;  
  days : string;
  cost : string; 
  title : string; 
  body : string; 
  picture : {url: string};
  imgPicture: File | undefined;
  warningTitle: string | null;
  warningBody: string | null;
  // warning?: {
  //   title?: string | null;
  //   body?: string | null;
  // }
}

export type Project = {
  type: "Project";
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
} & Favoritable

export type FormProject = {
  id: string
  piety_target_id : string;  
  piety_category_id : string;  
  limit_day : string;
  cost : string; 
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
  type: "Project";
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
} & Favoritable

export type FormForum = {
  id: string;
  piety_target_id : string;  
  piety_category_id : string;  
  days : string;
  cost : string; 
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

export type Comment = {
  id: string;
  user_id: string;
  commentable_type: string;
  commentable_id: string;
  body: string;
  user: User; 
}

export type PaginationInfo = {
  current_page : number;
  limit_value : number;
  total_count : number;
  total_pages : number;
}