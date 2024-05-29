export default{
    async contactCoach(context, payload){
        const newRequest ={
            
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message,
        };
        const response = await fetch(`https://find-coach-afdbe-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        const responseData = await response.json();

        newRequest.id = responseData.name;

        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequest(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://find-coach-afdbe-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=` + token);
        const responseData = await response.json();

        if(!response.ok){
            const error =  new Error(responseData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests =[];

        for(const key in responseData){
            const request={
                id : key,
                coachId: coachId,
                userEmail : responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }
        context.commit('setRequest', requests)
    }
};