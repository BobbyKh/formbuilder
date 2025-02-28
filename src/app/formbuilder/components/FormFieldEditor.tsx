import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Trash2, GripVertical } from "lucide-react"
import { Checkbox } from "@radix-ui/react-checkbox"

interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  options: string[]
  maxSize?: number
  acceptedFormats?: string[]
  color?: string
  textcolor?: string
  date?: string
  time ?: string
}

interface FormFieldEditorProps {
  field: FormField
  updateField: (id: string, updates: Partial<FormField>) => void
  removeField: (id: string) => void
}


const FormFieldEditor: React.FC<FormFieldEditorProps> = ({ field, updateField, removeField }) => {
  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionsString = e.target.value;
    const optionsArray = optionsString
      .split(",")
      .map((option) => option.trim())
      .filter((option) => option !== ""); // Filter empty strings
    updateField(field.id, { options: optionsArray });
    
  };


  const handleMaxSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = Number.parseInt(e.target.value)
    if (!isNaN(maxSize) && maxSize > 0) {
      updateField(field.id, { maxSize })
    }
  }

  const handleAcceptedFormatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatsString = e.target.value
    const formatsArray = formatsString
      .split(",")
      .map((format) => format.trim())
      .filter((format) => format !== "")
    updateField(field.id, { acceptedFormats: formatsArray })
  }


  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <GripVertical className="h-5 w-5 mr-2 text-gray-500" />
          <h3 className="text-lg font-semibold">{field.type.charAt(0).toUpperCase() + field.type.slice(1)}</h3>
        </div>
        <Button variant="destructive" size="icon" onClick={() => removeField(field.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <div>
          <Label htmlFor={`${field.id}-label`}>Label</Label>
          <Input
            id={`${field.id}-label`}
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
          />
        </div>
        {field.type === "email" &&(


            <Label htmlFor="email">
                    
            
            </Label>
        

        )
        
        
        
        }
        {
          field.type === "radio" && (
            <div>
              <Label htmlFor={`${field.id}-options`}>Options (comma-separated)</Label>
              <Input
                id={`${field.id}-options`}
                value={field.options.join(",")}
                onChange={handleOptionsChange}
                placeholder="Enter options separated by commas"
                onKeyDown={(e) => {
                  if (e.key === ",") {
                      e.preventDefault();
                      const newOptions = [...field.options, ""];
                      updateField(field.id, { options: newOptions });
                  }
              }}
              />
            </div>  
          )
        }
        {
            field.type === "checkbox" && (
                <div>
                    <Label htmlFor={`${field.id}-options`}>Options (comma-separated)</Label>
                    <Input
                        id={`${field.id}-options`}
                        value={field.options.join(",")}
                        onChange={handleOptionsChange}
                        placeholder="Enter options separated by commas"
                        onKeyDown={(e) => {
                            if (e.key === ",") {
                                e.preventDefault();
                                const newOptions = [...field.options, ""];
                                updateField(field.id, { options: newOptions });
                            }
                        }}
                    />
                </div>
            )

        }
        {field.type === "dropdown" && (
          <div>
            <Label htmlFor={`${field.id}-options`}>Options (comma-separated)</Label>
            <Input
              id={`${field.id}-options`}
              value={field.options.join(",")}
              onChange={handleOptionsChange}
              placeholder="Enter options separated by commas"
              onKeyDown={(e) => {
                if (e.key === ",") {
                    e.preventDefault();
                    const newOptions = [...field.options, ""];
                    updateField(field.id, { options: newOptions });
                }
            }}
            />
          </div>
        )}
    
        {field.type === "image" && (
          <>
            <div>
              <Label htmlFor={`${field.id}-max-size`}>Max Size (in MB)</Label>
              <Input
                id={`${field.id}-max-size`}
                type="number"
                value={field.maxSize || ""}
                onChange={handleMaxSizeChange}
                placeholder="Enter max file size in MB"
              />
            </div>
            <div>
              <Label htmlFor={`${field.id}-accepted-formats`}>Accepted Formats (comma-separated)</Label>
              <Input
                id={`${field.id}-accepted-formats`}
                value={field.acceptedFormats?.join(", ") || ""}
                onChange={handleAcceptedFormatsChange}
                placeholder="E.g., .jpg, .png, .gif"
              />
            </div>
          </>
        )}
        {
          field.type === "button" && (
            <div>
              <Label htmlFor={`${field.id}-color`}>Button Color</Label>
              <Input
                id={`${field.id}-color`}
                type="color"
                value={field.color || "#000000"}
                onChange={(e) => updateField(field.id, { color: e.target.value })}
              />
              <Label htmlFor={`${field.id}-textcolor`}>Text Color</Label>
              <Input
              id="{`${field.id}-textcolor`}"
              type="color"
              value={field.textcolor || "#000000"}
              onChange={(e) => updateField(field.id, { textcolor: e.target.value })}
              />
            </div>
          )

        }
        {
          field.type === "date" && (
            <div>
             <Label htmlFor="{`${field.id}-date`}" >Date</Label>
             <Input
             id="{`${field.id}-date`}"
             type="date"
             value={field.date || ""}
             onChange={(e) => updateField(field.id, { date: e.target.value })}
             />
            </div>
          )
        }
      
        {
          field.type === "time" && (
            <div>
             <Label htmlFor="{`${field.id}-time`}" >Time</Label>
             <Input
             id="{`${field.id}-time`}"
             type="time"
             value={field.time || ""}
             onChange={(e) => updateField(field.id, { time: e.target.value })}
             />
            </div>
          )
        }
        {field.type === "file" && (
          <>
            <div>
              <Label htmlFor={`${field.id}-max-size`}>Max Size (in MB)</Label>
              <Input
                id={`${field.id}-max-size`}
                type="file"
                value={field.maxSize || ""}
                onChange={handleMaxSizeChange}
                placeholder="Enter max file size in MB"
              />
            </div>
            <div>
              <Label htmlFor={`${field.id}-accepted-formats`}>Accepted Formats (comma-separated)</Label>
              <Input
                id={`${field.id}-accepted-formats`}
                value={field.acceptedFormats?.join(", ") || ""}
                onChange={handleAcceptedFormatsChange}
                placeholder="E.g., .pdf, .doc, .docx"
              />
            </div>
          </>
        )}
        <div className="flex items-center space-x-2">
          <Switch
            id={`${field.id}-required`}
            checked={field.required}
            onCheckedChange={(checked) => updateField(field.id, { required: checked })}
          />
          <Label htmlFor={`${field.id}-required`}>Required</Label>
        </div>
      </div>
    </div>
  )
}

export default FormFieldEditor

