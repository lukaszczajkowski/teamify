import React, { useState, useEffect } from "react";
import BeanIcon from "../../assets/bean-black.png";
import BeanApi from "../../api/BeanApi";
import WellBeanPopup from "./WellBeanPopup";
import MessagePopup from "../reusables/MessagePopup";
import BeanActions from "./BeanActions";
import UpdateBeanPopup from "./UpdateBeanPopup";
import { Link } from "react-router-dom";

export default function BeanCard({ bean, updateBean, deleteBean }) {
    const [isCollectible, setIsCollectible] = useState(false);
    const [lastEventTime, setLastEventTime] = useState();
    const [openWellBean, setOpenWellBean] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const {
        // eslint-disable-next-line no-unused-vars
        id, title, description
    } = bean;


    const getLastEventTime = () => {
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
        getLastEventTime();
        const current = new Date().toISOString().split(".")[0];

        console.log("current: " + current);
        console.log(lastEventTime);
        console.log(current > lastEventTime);

        if (current > lastEventTime) { setIsCollectible(true) }
    };

    useEffect(() => {
        checkIfCollectible()
    }, [id]);


    const onCollect = () => {
        checkIfCollectible();
        if (isCollectible) {
            setOpenWellBean(true);
            console.log(JSON.stringify(bean));


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


    const onCloseWellBean = () => {
        setOpenWellBean(false);
        completeBean();
    }

    const onCloseWarning = () => {
        setOpenWarning(false);
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
                        onClose={onCloseWellBean} />
                    : null

            }

            {
                openWarning ? <MessagePopup
                    message={
                        <div id="bean-warning" className="flex-column">
                            <p>Collect when you finish the task!</p>
                            <Link className="link" to="/calendar">Check your calendar here</Link>
                        </div>
                    }
                    onClose={onCloseWarning} />
                    : null
            }
        </div>
    );
}