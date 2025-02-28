interface FormField {
    id: string
    type: "text" | "textarea" | "select" | "checkbox"
    label: string
    required: boolean
    options?: string[]
  }
  
  