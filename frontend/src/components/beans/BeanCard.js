import React, { useState } from "react";
import BeanIcon from "../../assets/bean-black.png";
import BeanApi from "../../api/BeanApi";
import WellBeanPopup from "./WellBeanPopup";
import MessagePopup from "../reusables/MessagePopup";
import BeanActions from "./BeanActions";
import UpdateBeanPopup from "./UpdateBeanPopup";

export default function BeanCard({ bean, updateBean, deleteBean }) {
    const [isCollectible, setIsCollectible] = useState(true);
    const [lastEventTime, setLastEventTime] = useState();
    const [openWellBean, setOpenWellBean] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const {
        // eslint-disable-next-line no-unused-vars
        id, title, description
    } = bean;


    const getLastEventTimeById = () => {
        return BeanApi.getLastEventTimeById(id)
            .then(response => setLastEventTime(response.data));
    };

    const completeBean = () => {
        const completedBean = {
            id: id,
            title: title,
            description: description,
            completed: true
        }
        updateBean(completedBean);
    }

    const checkIfCollectible = () => {
        getLastEventTimeById(id);
        console.log("lastEventTime: " + lastEventTime);
        const current = new Date();
        console.log("current: " + current);
        setIsCollectible(true);
    };


    const onCollect = () => {
        checkIfCollectible();
        if (isCollectible) {
            setOpenWellBean(true);
            completeBean();


        } else {
            setOpenWarning(true);
        }
    };

    const onUpdateBean = () => {
        setOpenUpdate(true);
        
    }

    const onDeleteBean = () => {
        deleteBean(id);
    }


    return (
        <div>
            <div className=" bean-card flex-column">

                <button onClick={onCollect}>
                    <img className="bean-icon" src={BeanIcon} />
                </button>
                <BeanActions
                    currentBean={bean}
                    onUpdateBean={onUpdateBean}
                    onDeleteBean={onDeleteBean}

                />
            </div>

            <UpdateBeanPopup
            isOpen={openUpdate} 
            currentBean={bean} 
            updateBean={updateBean} 
            onClose={() => setOpenUpdate(false)}

            />

            {
                openWellBean ?
                    <WellBeanPopup
                        onClose={setOpenWellBean(false)} />
                    : null

            }

            {
                openWarning ? <MessagePopup
                    message="Collect when you finish the task!"
                    onClose={setOpenWarning(false)} />
                    : null
            }
        </div>
    );
}