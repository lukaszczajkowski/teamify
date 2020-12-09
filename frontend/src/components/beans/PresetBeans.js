import React from "react";
import BeanButton from "./BeanButton";

// eslint-disable-next-line react/prop-types
export default function PresetBeans({ presetBeans, createBean }) {


    return (
        <div className="preset-beans flex-start">
            {
                // eslint-disable-next-line react/prop-types
                presetBeans.map(bean => (
                    <BeanButton
                        key={bean.id}
                        bean={bean}
                        createBean={createBean}
                    />

                ))
            }
        </div>
    );
}