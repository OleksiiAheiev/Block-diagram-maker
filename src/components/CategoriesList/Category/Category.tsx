import React, { useEffect, useRef, useState } from "react";
import { Cancel, Edit, Plus, Save } from "../../icons";
import "../categories-list.scss";
import "./category.scss";
import { SubCategoryType } from "../CategoriesList";

interface CategoryProps {
  category: SubCategoryType;
  level: number;
  onDeleteCategory: (id: string) => void;
  hasCategories: boolean;
}

export default function Category({
  category,
  level,
  onDeleteCategory,
  hasCategories,
}: CategoryProps) {
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  const [editedText, setEditedText] = useState(category.name);

  const categoryRef = useRef<HTMLDivElement>(null);
  // const addNewCategory = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && categoryRef.current) {
      const inputElement = categoryRef.current.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isEditing]);

  // useEffect(() => {
  //   const handleAddSubCategory = () => {
  //     if (!isEditing) {
  //       const newSubCategory: SubCategoryType = {
  //         id: `sub-${subCategories.length}`,
  //         name: `SubCategory ${subCategories.length + 1}`,
  //         subCategory: [],
  //       };
  //       setSubCategories([...subCategories, newSubCategory]);
  //     }
  //   };

  //   const addSubCategory = addNewCategory.current;

  //   addSubCategory?.addEventListener('click', handleAddSubCategory);

  //   return () => {
  //     addSubCategory?.removeEventListener('click', handleAddSubCategory);
  //   };
  // }, [isEditing]);

  const handleAddSubCategory = () => {
    if (!isEditing) {
      const newSubCategory: SubCategoryType = {
        id: `sub-${subCategories.length}`,
        name: `SubCategory ${subCategories.length + 1}`,
        subCategory: [],
      };
      setSubCategories([...subCategories, newSubCategory]);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    category.name = editedText;
  };

  const handleDeleteCategory = () => {
    onDeleteCategory(category.id);
  };

  const handleDeleteSubCategory = (subCategoryId: string) => {
    const updatedSubCategories = subCategories.filter(
      (subCategory) => subCategory.id !== subCategoryId
    );
    setSubCategories(updatedSubCategories);
  };

  const hasSubCategories = subCategories.length > 1;

  return (
    <div className={`category ${hasCategories && "category__lines"}`} ref={categoryRef}>
      <div className={`category__block`}>
        <span className={`category__top-line`}></span>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            className="category__block--input"
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span className="category__block--title">{category.name}</span>
        )}
        <div className="category__block--icons">
          <span onClick={handleAddSubCategory}>
            <Plus className="plus-icon" />
          </span>
          {isEditing ? (
            <span onClick={handleSaveClick}>
              <Save className="save-icon" />
            </span>
          ) : (
            <span onClick={handleEditClick}>
              <Edit className="edit-icon" />
            </span>
          )}

          <span onClick={handleDeleteCategory}>
            <Cancel className="delete-icon" />
          </span>
        </div>
        {hasSubCategories && <span className="category__bot-line"></span>}
      </div>
      <div
        className={`category__subcategories ${
          hasSubCategories && " more-than-two"
        }`}
      >
        <div className="level">
          {subCategories.map((subCategory) => (
            <Category
              key={subCategory.id}
              category={subCategory}
              level={level}
              onDeleteCategory={handleDeleteSubCategory}
              hasCategories={hasSubCategories}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
