import Api from "./Api";

class BeanApi {
    getPresets() {
        return Api.get("/beans/preset");
    }

    //for the user for today 
    getAllBeansForToday() {
        return Api.get("/beans");
    }

    getAllBeansForWholeTime() {
        return Api.get("/beans/AllBeans");
    }

    getBeanById(beanId) {
        return Api.get(`/beans/${beanId}`);
    }

    getLastEventTimeById(beanId) {
        return Api.get(`/beans/beanLastEventTime/${beanId}`);
    }

    createNewBean(bean) {
        return Api.post("/beans", bean);
    }

    addPresetBean(presetBeanId) {
        return Api.post(`/beans/${presetBeanId}`);
    }

    updateBean(updatedBean) {
        return Api.put("/beans/", updatedBean);
    }

    deleteBean(beanId) {
        return Api.delete("/beans/" + beanId);
    }
}

export default new BeanApi();