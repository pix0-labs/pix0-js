export interface Preference {
   preference : string, 

   value? : string ,
}

export interface ProfileImage {

    pic_type : number,

    value : string , 
}

export interface  Preferences {

    preference_type : number, 

    preferences? :Preference[],
}


export interface User {
    owner?: string, // the user's wallet address

    user_name? : string,

    first_name? : string,

    last_name? : string,

    email? : string,

    mobile? : string,

    bio? : string, 

    preferences? : Preferences[],

    profile_image? : ProfileImage, 

    status? : number, 

    date_created? : number,

    date_updated? : number,
    
}
