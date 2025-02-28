"use client"

import { useState } from "react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import FieldToolbox from "./components/FieldToolBox"
import FormBuilder from "./components/FormBuilder"
import FormPreview from "./components/FormPreview"


interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  options: string[]
  maxSize?: number
  acceptedFormats?: string[]
  color: string
  textcolor: string
}

const CreateJobPostingPage = () => {
  const [formFields, setFormFields] = useState<FormField[]>([])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    // Moving within the form
    if (source.droppableId === "form-fields" && destination.droppableId === "form-fields") {
      const newFields = Array.from(formFields)
      const [reorderedItem] = newFields.splice(source.index, 1)
      newFields.splice(destination.index, 0, reorderedItem)
      setFormFields(newFields)
    }
    // Adding new field from toolbox
    else if (source.droppableId === "toolbox" && destination.droppableId === "form-fields") {
      const newField: FormField = {
        id: `field-${Date.now()}`,
        type: result.draggableId,
        label: `New ${result.draggableId} field`,
        required: false,
        options: [],
        color: "primary",
        textcolor: "white",
      }
      if (newField.type === "image") {
        newField.maxSize = 5 // Default max size of 5MB
        newField.acceptedFormats = [".jpg", ".png", ".gif"] // Default accepted formats
      }
      const newFields = Array.from(formFields)
      newFields.splice(destination.index, 0, newField)
      setFormFields(newFields)
    }
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Job Posting</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <FieldToolbox />
          </div>
          <div className="w-full md:w-1/2">
            <FormBuilder fields={formFields} updateField={updateField} removeField={removeField} />
          </div>
          <div className="w-full md:w-1/4">
            <FormPreview fields={formFields} />
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default CreateJobPostingPage

