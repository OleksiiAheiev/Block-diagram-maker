import React, { useState } from "react";
import Category from "./Category/Category";
import { Plus } from "../icons";
import "./categories-list.scss";

export interface SubCategoryType {
  id: string;
  name: string;
  subCategory: SubCategoryType[];
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<SubCategoryType[]>([]);

  const handleAddCategory = () => {
    const newCategory: SubCategoryType = {
      id: `category-${categories.length}`,
      name: `Category ${categories.length + 1}`,
      subCategory: [],
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
  };
  
  const hasCategories = categories.length > 1;

  return (
    <div className="categories-list">
      <div className="categories-list__block">
        <span className="categories-list__block--title">Categories</span>
        <div onClick={handleAddCategory}>
          <Plus className="plus-icon" />
        </div>
        {hasCategories && <span className="categories-list__line"></span>}
      </div>
      <div className={`categories-list__items ${hasCategories && 'more-than-two'}`}>
        {categories.map((category, index) => (
          <Category
            key={category.id}
            category={category}
            level={index}
            onDeleteCategory={handleDeleteCategory}
            hasCategories={hasCategories}
          />
        ))}
      </div>
    </div>
  );
}