import React from "react";
import CreateTaskCard from "../tasks/CreateTaskCard";
export default function CategoryCard(category) {
    return(
        <div className="category-card">
            this is a category card {category.title}
            < CreateTaskCard />

        </div>
    );
}