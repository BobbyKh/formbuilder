"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  FileText,
  Type,
  Square,
  Circle,
  Minus,
  Plus,
  Trash2,
  Copy,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react"

// Types
interface FormField {
  id: string
  type: string
  label: string
  required: boolean
  options: string[]
  maxSize?: number
  acceptedFormats?: string[]
}

interface SavedForm {
  id: string
  name: string
  fields: FormField[]
  createdAt: Date
}

interface TemplateItem {
  id: string
  name: string
  type: "header" | "content" | "footer" | "sidebar"
  thumbnail: string
}

interface MediaItem {
  id: string
  name: string
  type: "image" | "video"
  url: string
  thumbnail: string
}

interface ShapeItem {
  id: string
  name: string
  type: "rectangle" | "circle" | "line"
  color: string
}

interface TextItem {
  id: string
  name: string
  type: "heading" | "paragraph" | "caption"
  content: string
  fontSize: number
  fontWeight: string
  fontStyle: string
  textAlign: "left" | "center" | "right"
  color: string
}

interface CanvasElement {
  id: string
  type: "form" | "template" | "media" | "shape" | "text"
  content: SavedForm | TemplateItem | MediaItem | ShapeItem | TextItem
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  zIndex: number
  selected: boolean
}

// Mock data
const mockTemplates: TemplateItem[] = [
  { id: "template-1", name: "Hero Header", type: "header", thumbnail: "/placeholder.svg?height=100&width=200" },
  { id: "template-2", name: "Two Column", type: "content", thumbnail: "/placeholder.svg?height=100&width=200" },
  { id: "template-3", name: "Contact Form", type: "footer", thumbnail: "/placeholder.svg?height=100&width=200" },
  { id: "template-4", name: "Features Grid", type: "content", thumbnail: "/placeholder.svg?height=100&width=200" },
  { id: "template-5", name: "Testimonials", type: "content", thumbnail: "/placeholder.svg?height=100&width=200" },
  { id: "template-6", name: "Team Section", type: "content", thumbnail: "/placeholder.svg?height=100&width=200" },
]

const mockMedia: MediaItem[] = [
  {
    id: "media-1",
    name: "Team Photo",
    type: "image",
    url: "/placeholder.svg?height=300&width=400",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "media-2",
    name: "Product Demo",
    type: "video",
    url: "/placeholder.svg?height=300&width=400",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "media-3",
    name: "Office",
    type: "image",
    url: "/placeholder.svg?height=300&width=400",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "media-4",
    name: "Logo",
    type: "image",
    url: "/placeholder.svg?height=300&width=400",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "media-5",
    name: "Background",
    type: "image",
    url: "/placeholder.svg?height=300&width=400",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "media-6",
    name: "Icon Set",
    type: "image",
    url: "/placeholder.svg?height=300&width=400",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
]

const mockShapes: ShapeItem[] = [
  { id: "shape-1", name: "Rectangle", type: "rectangle", color: "#3b82f6" },
  { id: "shape-2", name: "Circle", type: "circle", color: "#10b981" },
  { id: "shape-3", name: "Line", type: "line", color: "#6b7280" },
]

const mockText: TextItem[] = [
  {
    id: "text-1",
    name: "Heading",
    type: "heading",
    content: "Add a heading",
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "text-2",
    name: "Paragraph",
    type: "paragraph",
    content: "Add a paragraph",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "text-3",
    name: "Caption",
    type: "caption",
    content: "Add a caption",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#6b7280",
  },
]

const CanvaBuilderPage = () => {
  const [campaignName, setCampaignName] = useState("Untitled Campaign")
  const [savedForms, setSavedForms] = useState<SavedForm[]>([])
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([])
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null)
  const [zoom, setZoom] = useState(100)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, you would fetch from a database
    const storedForms = localStorage.getItem("savedForms")
    if (storedForms) {
      setSavedForms(JSON.parse(storedForms))
    }
  }, [])

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Deselect if clicking on the canvas background
    if (e.target === canvasRef.current) {
      setSelectedElement(null)
    }
  }

  const handleElementClick = (element: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElement(element)

    // Update selected state
    setCanvasElements(
      canvasElements.map((el) => ({
        ...el,
        selected: el.id === element.id,
      })),
    )
  }

  const handleElementDrag = (element: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragStart.x
      const dy = moveEvent.clientY - dragStart.y

      setCanvasElements(
        canvasElements.map((el) => {
          if (el.id === element.id) {
            return {
              ...el,
              position: {
                x: el.position.x + dx / (zoom / 100),
                y: el.position.y + dy / (zoom / 100),
              },
            }
          }
          return el
        }),
      )

      setDragStart({ x: moveEvent.clientX, y: moveEvent.clientY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleElementResize = (element: CanvasElement, direction: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = (moveEvent.clientX - dragStart.x) / (zoom / 100)
      const dy = (moveEvent.clientY - dragStart.y) / (zoom / 100)

      setCanvasElements(
        canvasElements.map((el) => {
          if (el.id === element.id) {
            const newSize = { ...el.size }
            const newPosition = { ...el.position }

            if (direction.includes("n")) {
              newSize.height = Math.max(50, el.size.height - dy)
              newPosition.y = el.position.y + dy
            }
            if (direction.includes("s")) {
              newSize.height = Math.max(50, el.size.height + dy)
            }
            if (direction.includes("w")) {
              newSize.width = Math.max(50, el.size.width - dx)
              newPosition.x = el.position.x + dx
            }
            if (direction.includes("e")) {
              newSize.width = Math.max(50, el.size.width + dx)
            }

            return {
              ...el,
              size: newSize,
              position: newPosition,
            }
          }
          return el
        }),
      )

      setDragStart({ x: moveEvent.clientX, y: moveEvent.clientY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const addElement = (type: string, content: any) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: type as any,
      content,
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      rotation: 0,
      zIndex: canvasElements.length + 1,
      selected: true,
    }

    // Deselect all other elements
    const updatedElements = canvasElements.map((el) => ({
      ...el,
      selected: false,
    }))

    setCanvasElements([...updatedElements, newElement])
    setSelectedElement(newElement)
  }

  const deleteSelectedElement = () => {
    if (selectedElement) {
      setCanvasElements(canvasElements.filter((el) => el.id !== selectedElement.id))
      setSelectedElement(null)
    }
  }

  const duplicateSelectedElement = () => {
    if (selectedElement) {
      const newElement: CanvasElement = {
        ...selectedElement,
        id: `element-${Date.now()}`,
        position: {
          x: selectedElement.position.x + 20,
          y: selectedElement.position.y + 20,
        },
        zIndex: canvasElements.length + 1,
      }

      // Deselect all other elements
      const updatedElements = canvasElements.map((el) => ({
        ...el,
        selected: false,
      }))

      setCanvasElements([...updatedElements, newElement])
      setSelectedElement(newElement)
    }
  }

  const updateSelectedElement = (updates: Partial<CanvasElement>) => {
    if (selectedElement) {
      const updatedElements = canvasElements.map((el) => {
        if (el.id === selectedElement.id) {
          const updatedElement = {
            ...el,
            ...updates,
            content: {
              ...el.content,
              ...(updates.content || {}),
            },
          }
          setSelectedElement(updatedElement)
          return updatedElement
        }
        return el
      })

      setCanvasElements(updatedElements)
    }
  }

  const updateTextProperty = (property: keyof TextItem, value: any) => {
    if (selectedElement && selectedElement.type === "text") {
      updateSelectedElement({
        content: {
          ...selectedElement.content,
          [property]: value,
        },
      })
    }
  }

  const saveCampaign = () => {
    if (!campaignName.trim()) {
      alert("Please enter a campaign name")
      return
    }

    if (canvasElements.length === 0) {
      alert("Please add at least one element to the campaign")
      return
    }

    // In a real app, you would save to a database
    alert("Campaign saved successfully!")
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="w-64 h-8" />
          <Button size="sm" onClick={saveCampaign}>
            <Save className="mr-1 h-4 w-4" />
            Save
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(25, zoom - 25))} disabled={zoom <= 25}>
            <Minus className="h-4 w-4" />
          </Button>
          <div className="w-16 text-center text-sm">{zoom}%</div>
          <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(200, zoom + 25))} disabled={zoom >= 200}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {selectedElement && (
            <>
              <Button size="sm" variant="outline" onClick={duplicateSelectedElement}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={deleteSelectedElement}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Elements */}
        <div className="w-64 bg-gray-50 border-r overflow-y-auto">
          <Tabs defaultValue="templates">
            <TabsList className="w-full">
              <TabsTrigger value="templates" className="flex-1">
                Templates
              </TabsTrigger>
              <TabsTrigger value="forms" className="flex-1">
                Forms
              </TabsTrigger>
              <TabsTrigger value="elements" className="flex-1">
                Elements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="p-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {mockTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => addElement("template", template)}
                  >
                    <img
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full aspect-video object-cover rounded-md border"
                    />
                    <p className="text-xs mt-1 truncate">{template.name}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forms" className="p-2 space-y-2">
              {savedForms.length > 0 ? (
                savedForms.map((form) => (
                  <div
                    key={form.id}
                    className="bg-white p-2 rounded-md border cursor-pointer hover:bg-gray-50"
                    onClick={() => addElement("form", form)}
                  >
                    <div className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">{form.name}</p>
                        <p className="text-xs text-gray-500">{form.fields.length} fields</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4 text-sm">No saved forms yet</p>
              )}
            </TabsContent>

            <TabsContent value="elements" className="p-0">
              <Tabs defaultValue="media">
                <TabsList className="w-full">
                  <TabsTrigger value="media" className="flex-1">
                    Media
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex-1">
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="shapes" className="flex-1">
                    Shapes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="media" className="p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {mockMedia.map((media) => (
                      <div
                        key={media.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => addElement("media", media)}
                      >
                        <img
                          src={media.thumbnail || "/placeholder.svg"}
                          alt={media.name}
                          className="w-full aspect-square object-cover rounded-md border"
                        />
                        <p className="text-xs mt-1 truncate">{media.name}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="text" className="p-2 space-y-2">
                  {mockText.map((text) => (
                    <div
                      key={text.id}
                      className="bg-white p-2 rounded-md border cursor-pointer hover:bg-gray-50"
                      onClick={() => addElement("text", text)}
                    >
                      <div className="flex items-center">
                        <Type className="mr-2 h-5 w-5 text-gray-500" />
                        <p className="font-medium text-sm">{text.name}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="shapes" className="p-2 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {mockShapes.map((shape) => (
                      <div
                        key={shape.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity aspect-square flex items-center justify-center"
                        onClick={() => addElement("shape", shape)}
                      >
                        {shape.type === "rectangle" && <Square className="h-12 w-12" style={{ color: shape.color }} />}
                        {shape.type === "circle" && <Circle className="h-12 w-12" style={{ color: shape.color }} />}
                        {shape.type === "line" && <Minus className="h-12 w-12" style={{ color: shape.color }} />}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-200 overflow-auto p-8 flex items-center justify-center">
          <div
            ref={canvasRef}
            className="bg-white shadow-lg relative"
            style={{
              width: "1200px",
              height: "800px",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
            onClick={handleCanvasClick}
          >
            {canvasElements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-move ${element.selected ? "ring-2 ring-blue-500" : ""}`}
                style={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: `${element.size.width}px`,
                  height: `${element.size.height}px`,
                  transform: `rotate(${element.rotation}deg)`,
                  zIndex: element.zIndex,
                }}
                onClick={(e) => handleElementClick(element, e)}
                onMouseDown={(e) => handleElementDrag(element, e)}
              >
                {/* Element content based on type */}
                {element.type === "template" && (
                  <img
                    src={(element.content as TemplateItem).thumbnail || "/placeholder.svg"}
                    alt={(element.content as TemplateItem).name}
                    className="w-full h-full object-cover"
                  />
                )}

                {element.type === "media" && (
                  <img
                    src={(element.content as MediaItem).url || "/placeholder.svg"}
                    alt={(element.content as MediaItem).name}
                    className="w-full h-full object-cover"
                  />
                )}

                {element.type === "form" && (
                  <div className="w-full h-full bg-gray-50 border p-4 overflow-auto">
                    <h3 className="font-bold mb-2">{(element.content as SavedForm).name}</h3>
                    <div className="space-y-2">
                      {(element.content as SavedForm).fields.map((field) => (
                        <div key={field.id} className="bg-white p-2 border rounded">
                          <p className="text-sm font-medium">{field.label}</p>
                          <p className="text-xs text-gray-500">{field.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {element.type === "shape" && (
                  <div className="w-full h-full flex items-center justify-center">
                    {(element.content as ShapeItem).type === "rectangle" && (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: (element.content as ShapeItem).color }}
                      />
                    )}
                    {(element.content as ShapeItem).type === "circle" && (
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: (element.content as ShapeItem).color }}
                      />
                    )}
                    {(element.content as ShapeItem).type === "line" && (
                      <div className="w-full h-1" style={{ backgroundColor: (element.content as ShapeItem).color }} />
                    )}
                  </div>
                )}

                {element.type === "text" && (
                  <div
                    className="w-full h-full p-2 overflow-hidden"
                    style={{
                      fontSize: `${(element.content as TextItem).fontSize}px`,
                      fontWeight: (element.content as TextItem).fontWeight,
                      fontStyle: (element.content as TextItem).fontStyle,
                      textAlign: (element.content as TextItem).textAlign as any,
                      color: (element.content as TextItem).color,
                    }}
                  >
                    {(element.content as TextItem).content}
                  </div>
                )}

                {/* Resize handles (only show when selected) */}
                {element.selected && (
                  <>
                    <div
                      className="absolute top-0 left-0 w-3 h-3 bg-white border border-blue-500 cursor-nw-resize"
                      onMouseDown={(e) => handleElementResize(element, "nw", e)}
                    />
                    <div
                      className="absolute top-0 right-0 w-3 h-3 bg-white border border-blue-500 cursor-ne-resize"
                      onMouseDown={(e) => handleElementResize(element, "ne", e)}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-3 h-3 bg-white border border-blue-500 cursor-sw-resize"
                      onMouseDown={(e) => handleElementResize(element, "sw", e)}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-white border border-blue-500 cursor-se-resize"
                      onMouseDown={(e) => handleElementResize(element, "se", e)}
                    />
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-blue-500 cursor-n-resize"
                      onMouseDown={(e) => handleElementResize(element, "n", e)}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-blue-500 cursor-s-resize"
                      onMouseDown={(e) => handleElementResize(element, "s", e)}
                    />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-blue-500 cursor-w-resize"
                      onMouseDown={(e) => handleElementResize(element, "w", e)}
                    />
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-blue-500 cursor-e-resize"
                      onMouseDown={(e) => handleElementResize(element, "e", e)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-gray-50 border-l overflow-y-auto">
          {selectedElement ? (
            <div className="p-4">
              <h3 className="font-bold mb-2">Properties</h3>

              <div className="space-y-4">
                {/* Position and Size */}
                <div>
                  <h4 className="text-sm font-medium mb-1">Position & Size</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">X</label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.position.x)}
                        onChange={(e) =>
                          updateSelectedElement({
                            position: { ...selectedElement.position, x: Number.parseInt(e.target.value) || 0 },
                          })
                        }
                        className="h-7"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Y</label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.position.y)}
                        onChange={(e) =>
                          updateSelectedElement({
                            position: { ...selectedElement.position, y: Number.parseInt(e.target.value) || 0 },
                          })
                        }
                        className="h-7"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Width</label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.size.width)}
                        onChange={(e) =>
                          updateSelectedElement({
                            size: { ...selectedElement.size, width: Number.parseInt(e.target.value) || 50 },
                          })
                        }
                        className="h-7"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Height</label>
                      <Input
                        type="number"
                        value={Math.round(selectedElement.size.height)}
                        onChange={(e) =>
                          updateSelectedElement({
                            size: { ...selectedElement.size, height: Number.parseInt(e.target.value) || 50 },
                          })
                        }
                        className="h-7"
                      />
                    </div>
                  </div>
                </div>

                {/* Rotation */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Rotation</label>
                  <div className="flex items-center">
                    <Slider
                      value={[selectedElement.rotation]}
                      min={0}
                      max={360}
                      step={1}
                      onValueChange={(value) => updateSelectedElement({ rotation: value[0] })}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={selectedElement.rotation}
                      onChange={(e) => updateSelectedElement({ rotation: Number.parseInt(e.target.value) || 0 })}
                      className="w-16 h-7 ml-2"
                    />
                  </div>
                </div>

                {/* Type-specific properties */}
                {selectedElement.type === "text" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Text Properties</h4>

                    {/* Text content */}
                    <div>
                      <label className="text-xs text-gray-500 block">Content</label>
                      <Input
                        value={(selectedElement.content as TextItem).content}
                        onChange={(e) => updateTextProperty("content", e.target.value)}
                        className="h-7"
                      />
                    </div>

                    {/* Font size */}
                    <div>
                      <label className="text-xs text-gray-500 block">Font Size</label>
                      <div className="flex items-center">
                        <Slider
                          value={[(selectedElement.content as TextItem).fontSize]}
                          min={8}
                          max={72}
                          step={1}
                          onValueChange={(value) => updateTextProperty("fontSize", value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={(selectedElement.content as TextItem).fontSize}
                          onChange={(e) => updateTextProperty("fontSize", Number.parseInt(e.target.value) || 16)}
                          className="w-16 h-7 ml-2"
                        />
                      </div>
                    </div>

                    {/* Text formatting */}
                    <div>
                      <label className="text-xs text-gray-500 block">Formatting</label>
                      <div className="flex space-x-1 mt-1">
                        <Button
                          size="sm"
                          variant={(selectedElement.content as TextItem).fontWeight === "bold" ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateTextProperty(
                              "fontWeight",
                              (selectedElement.content as TextItem).fontWeight === "bold" ? "normal" : "bold",
                            )
                          }
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={(selectedElement.content as TextItem).fontStyle === "italic" ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateTextProperty(
                              "fontStyle",
                              (selectedElement.content as TextItem).fontStyle === "italic" ? "normal" : "italic",
                            )
                          }
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Underline className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Text alignment */}
                    <div>
                      <label className="text-xs text-gray-500 block">Alignment</label>
                      <div className="flex space-x-1 mt-1">
                        <Button
                          size="sm"
                          variant={(selectedElement.content as TextItem).textAlign === "left" ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => updateTextProperty("textAlign", "left")}
                        >
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={(selectedElement.content as TextItem).textAlign === "center" ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => updateTextProperty("textAlign", "center")}
                        >
                          <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={(selectedElement.content as TextItem).textAlign === "right" ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => updateTextProperty("textAlign", "right")}
                        >
                          <AlignRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Text color */}
                    <div>
                      <label className="text-xs text-gray-500 block">Color</label>
                      <div className="flex items-center mt-1">
                        <div
                          className="w-8 h-8 rounded-md border mr-2"
                          style={{ backgroundColor: (selectedElement.content as TextItem).color }}
                        />
                        <Input
                          value={(selectedElement.content as TextItem).color}
                          onChange={(e) => updateTextProperty("color", e.target.value)}
                          className="h-7 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedElement.type === "shape" && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Shape Properties</h4>
                    <div>
                      <label className="text-xs text-gray-500 block">Color</label>
                      <div className="flex items-center mt-1">
                        <div
                          className="w-8 h-8 rounded-md border mr-2"
                          style={{ backgroundColor: (selectedElement.content as ShapeItem).color }}
                        />
                        <Input
                          value={(selectedElement.content as ShapeItem).color}
                          onChange={(e) =>
                            updateSelectedElement({
                              content: { ...(selectedElement.content as ShapeItem), color: e.target.value },
                            })
                          }
                          className="h-7 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>Select an element to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CanvaBuilderPage

