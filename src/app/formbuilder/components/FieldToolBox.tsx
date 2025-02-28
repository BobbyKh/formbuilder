import type React from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { FileInputIcon as Input, TextIcon as Textarea, CheckSquare, List, Image, FileInputIcon, Mail, Phone, Lock, FrameIcon, Radio, Calendar, LucideMousePointerClick, Timer } from "lucide-react"

const fieldTypes = [
  { type: "text", label: "Text Input", icon: Input , font: "text", required: true },
  { type: "textarea", label: "Text Area", icon: Textarea },
  { type: "dropdown", label: "Dropdown", icon: List },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare , options: [] },
  {type: "radio", label: "Radio", icon: Radio, options: []},
  { type: "image", label: "Image Upload", icon: Image },
  {type: "file", label: "File Upload", icon: FileInputIcon, maxSize: 10, acceptedFormats: ["image/jpeg", "image/png", "image/gif"]},
  {type:"email", label: "Email", icon: Mail},
  {type:"number", label: "Number", icon: Phone},
  {type:"password", label: "Password", icon:Lock},
  {type:"button", label: "Button", name: "name", color: "primary", textcolor: "white", icon: LucideMousePointerClick,},
  {type:"date", label: "Date", icon: Calendar,},
  {type:"time", label: "Time", icon: Timer,},
  


]

const FieldToolbox: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Field Toolbox</h2>
      <Droppable droppableId="toolbox" isDropDisabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {fieldTypes.map((field, index) => (
              <Draggable key={field.type} draggableId={field.type} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-100 p-2 mb-2 rounded flex items-center cursor-move"
                  >
                    <field.icon className="mr-2 h-5 w-5" />
                    <span>{field.label}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default FieldToolbox

