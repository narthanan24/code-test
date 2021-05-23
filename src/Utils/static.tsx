export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Blog:object;
};

export type ParamList = {
    Blog: {
        item:{
            content:string,
            imageUrl:string,
            title:string
        }
    };
};

