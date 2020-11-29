import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import CategoryApi from "../../api/CategoryApi";
import CreateCategoryCard from "../categories/CreateCategoryCard";
import CategoryCard from "../categories/CategoryCard";
import { useParams, useHistory } from "react-router-dom";
import ProjectApi from "../../api/ProjectApi";

function ProjectPage() {
    const history = useHistory();

    const { projectId } = useParams();
    const [categories, setCategories] = useState([]);

    const DeleteCurrentProject = () => {
        return ProjectApi.deleteProject(projectId)
            .then(history.push("/users"))
            .catch(err => alert(`error on delete project ${err}`));
    }

    const getAllCategories = () => {
        return CategoryApi.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(err => alert(`error on get all categories ${err}`));
    }

    const createCategory = (categoryData) => {
        CategoryApi.createCategory(categoryData)
            .then(response => setCategories([response.data, ...categories]))
            .catch(err => alert(`error on create new category ${err}`));
    }

    useEffect(() => {
        getAllCategories()
    }, []);

    return (
        <div className="project-page">
            <Header />
            <button className="button"
                onClick={DeleteCurrentProject}>
                Delete project
                </button >
            <div className="projects-board flex-start">
                <div className="category-card card-container">category test</div>
                <div className="category-card card-container">category test</div>

                {
                    categories.length === 0 ?
                        null :
                        <div>
                            {categories.map(category => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>
                }
                
                <div className="board-container">
                    <CreateCategoryCard onSubmit={createCategory} />
                </div>

            </div>

        </div>
    );
}

export default ProjectPage;