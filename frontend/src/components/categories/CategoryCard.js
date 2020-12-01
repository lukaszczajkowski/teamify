import React from "react";

// eslint-disable-next-line react/prop-types
export default function CategoryCard({category}) {
    return(
        <div className="category-card">
            {/*eslint-disable-next-line react/prop-types*/}
            {category.title}

        </div>
    );
}