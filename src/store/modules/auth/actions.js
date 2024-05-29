let timer;

export default {
   async login(context, payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'signup'
        });
    },
    async auth(context, payload){
        const mode = payload.mode;
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPFYrJQ3VHgIBhLR_T-GZcYeZ3UbnSupk`;

        if(mode === 'signup'){
            url =  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPFYrJQ3VHgIBhLR_T-GZcYeZ3UbnSupk`;
        }
        const response= await fetch(
            url,
            {
            method : 'POST',
            body : JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to AUTHENTICATE.');
            throw error;
        }

        //const expriesIn = +responseData.expriesIn * 1000;
        const expriesIn =10000000;
        const expirationDate = new Date().getTime() +  expriesIn ;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout( function(){
            context.dispatch('autoLogout');
        } ,expriesIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.userId,
            //tokenExpiration: expirationDate,
        });
    },
    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

       const expriesIn = +tokenExpiration - new Date().getTime();

        if(expriesIn < 0){
            return; 
        }

        timer = setTimeout( function(){
            context.dispatch('autoLogout');
        } ,expriesIn);

        if(token && userId){
            context.commit('setUser',{
                token: token,
                userId: userId
            });
        }
    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

       context.commit('setUser', {
        token : null,
        userId : null,
       });
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};