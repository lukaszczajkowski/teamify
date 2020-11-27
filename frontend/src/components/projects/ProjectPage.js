import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import CategoryApi from "../../api/CategoryApi";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";

function ProjectPage() {
    const [categories, setCategories] = useState([]);


    const getAll = () => {
        CategoryApi.getAllCategories()
            .then(response => setCategories(response.data));
    }

    const createCategory = (categoryData) => {
        CategoryApi.createCategory(categoryData)
            .then(response => setCategories([response.data, ...categories]));
    }

    useEffect(() => {
        getAll()
    }, []);

    return (
        <div className="project-page">
            <Header />

            <div className="project-board flex-start">
                    <div className="category-card card-container">category test</div>
                    <div className="category-card card-container">category test</div>

                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}

                <div className="board-container">
                    <CreateCategoryCard onSubmit={createCategory} />
                </div>

            </div>

        </div>
    );
}

export default ProjectPage;