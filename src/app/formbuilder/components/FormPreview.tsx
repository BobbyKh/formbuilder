import type React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
  date?: string
}

interface FormPreviewProps {
  fields: FormField[]
}

const FormPreview: React.FC<FormPreviewProps> = ({ fields }) => {
  return (
    <><div className="bg-white p-4 rounded-lg shadow">
      <Input className="text-2xl font-bold mb-6" placeholder="Form Title Here" />
      <form className="space-y-6">
        {fields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.type !== "button" && (
                <>
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </>
              )}
            </Label>
            {field.type === "text" && <Input id={field.id} type="text" placeholder={`enter your ${field.label.toLowerCase()}`} required={field.required} />}
            {field.type === "email" && <Input id={field.id} type="email" placeholder={`enter your ${field.label.toLowerCase()}`} required={field.required} />}

            {field.type === "textarea" && <Textarea id={field.id} required={field.required} placeholder={`enter your ${field.label.toLowerCase()}`} />}
            {field.type === "number" && <Input id={field.id} type="number" placeholder={`enter your ${field.label.toLowerCase()}`} required={field.required} />}
            {field.type === "password" && <Input id={field.id} type="password" placeholder={`enter your ${field.label.toLowerCase()}`} required={field.required} />}
            {field.type === "button" && <Button id={field.id} type="submit" className="w-full rounded-sm" style={{ backgroundColor: field.color, color: field.textcolor }}>{field.label}</Button>}
            {field.type === "dropdown" && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {field.options.length > 0 ? (
                    field.options.map((option, index) => (
                      <SelectItem key={index} value={option || `option-${index}`}>
                        {option || "Unnamed option"}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-options">No options available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
            {field.type === "radio" && (
              <div className="flex items-center space-x-2">
                {field.options.length > 0 ? (
                  field.options.map((option: string, index) => (
                    <div key={index} className="flex items-center">
                      <input type="radio" id={`${field.id}-${index}`} name={field.id} defaultChecked={index === 0} />
                      <label htmlFor={`${field.id}-${index}`} className="ml-2">{option}</label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No options available</p>
                )}
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <label htmlFor={field.id}></label>
                {field.options.length > 0 ? (
                  <div className="space-x-2">
                    <div className="flex items-center space-x-2">
                      {field.options.map((option: string, index) => (
                        <div className="flex items-center" key={index}>
                          <input type="checkbox" id={`${field.id}-${index}`} name={field.id} defaultChecked={index === 0} />
                          <label htmlFor={`${field.id}-${index}`} className="ml-2">{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No options available</p>
                )}
              </div>
            )}
            {field.type === "image" && (
              <div>
                <Input id={field.id} type="file" required={field.required} accept={field.acceptedFormats?.join(",")} />
                {field.maxSize && <p className="text-sm text-gray-500 mt-1">Max file size: {field.maxSize}MB</p>}
                {field.acceptedFormats && field.acceptedFormats.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">Accepted formats: {field.acceptedFormats.join(", ")}</p>
                )}
              </div>
            )}

            {field.type === "file" && (
              <div>
                <Input id={field.id} type="file" required={field.required} accept={field.acceptedFormats?.join(",")} />
                {field.maxSize && <p className="text-sm text-gray-500 mt-1">Max file size: {field.maxSize}MB</p>}
                {field.acceptedFormats && field.acceptedFormats.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">Accepted formats: {field.acceptedFormats.join(",")}</p>
                )}
              </div>
            )}
               {field.type === "date" && (
                  <div className="flex flex-col space-y-2">
                    <Input id={field.id} type="date" className="border rounded-md px-3 py-2" placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} />
                  </div>
                )}
                {field.type === "time" && (
                  <div className="flex flex-col space-y-2">
                    <Input id={field.id} type="time" className="border rounded-md px-3 py-2" placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} />
                  </div>
                )}

          </div>
        ))}
     
      </form>

    </div>
    <div className="flex justify-center ">
        {fields.length > 0 && <Button className="mt-4 text-center" type="submit">Save Form</Button>}

      </div></>
    
  )
}

export default FormPreview

