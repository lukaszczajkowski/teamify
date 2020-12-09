import React from "react";
import BeanButton from "./BeanButton";

// eslint-disable-next-line react/prop-types
export default function PresetBeans({PresetBeans}) {

   

    return (
        <div className="preset-beans">
            {/* {
                // eslint-disable-next-line react/prop-types
                presetBeans.map(item => (
                    <BeanButton
                        key={item.id}
                        bean={item}
                    />))
            } */}

           <BeanButton />
        </div>
    );
}