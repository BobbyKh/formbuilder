import type React from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import FormFieldEditor from "./FormFieldEditor"

interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  options: string[] // Ensure options is not undefined by providing a default empty array
}

interface FormBuilderProps {
  fields: FormField[]
  updateField: (id: string, updates: Partial<FormField>) => void
  removeField: (id: string) => void
}

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, updateField, removeField }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Form Builder</h2>
      <Droppable droppableId="form-fields">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-lg"
          >
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <FormFieldEditor field={field} updateField={updateField} removeField={removeField} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {fields.length === 0 && <div className="text-center text-gray-500 py-4">Drag and drop fields here</div>}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default FormBuilder

