import React, { useState } from "react";
import Category from "./Category/Category";
import { Plus } from "../icons";
import "./categories-list.scss";
import colors from "../../helper";

export interface SubCategoryType {
  id: string;
  name: string;
  subCategory: SubCategoryType[];
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<SubCategoryType[]>([]);

  const handleAddCategory = (): void => {
    const newCategory: SubCategoryType = {
      id: `category-${categories.length}`,
      name: `Category ${categories.length + 1}`,
      subCategory: [],
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string): void => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
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
      <div
        className={`categories-list__items ${hasCategories && "more-than-two"}`}
      >
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            level={0}
            onDeleteCategory={handleDeleteCategory}
            hasCategories={hasCategories}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
}
