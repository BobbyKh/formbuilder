import { PlusIcon } from "lucide-react";
import Link from "next/dist/client/link";

const PageTempalte = () => {
    const demoTemplates = [
        {
            title: "Create Blank Page",
            description: "",
            isBlank: true,
            link: "/pagebuilder",
        },
        {
            title: "Template 1",
            description: "A simple one-column template",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        },
        {
            title: "Template 2",
            description: "A two-column template with a sidebar",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        },
        {
            title: "Template 3",
            description: "A three-column template with a header and footer",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        },
        {
            title: "Template 4",
            description: "A four-column template with a sidebar and footer",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        },
        {
            title: "Template 5",
            description: "A four-column template with a sidebar and footer",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        },
        {
            title: "Template 6",
            description: "A four-column template with a sidebar and footer",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        },
        {
            title: "Template 7",
            description: "A four-column template with a sidebar and footer",
            imageSrc: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-black">Page Templates</h1>
            <p className="mt-4 text-lg text-gray-600">Choose from a variety of pre-designed page templates to get started quickly. Or, start from scratch with a blank page.</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                {demoTemplates.map((template, index) => (
                    <div key={index} className="bg-white rounded-lg border-2 border-gray-300 p-4">
                        <div className="flex items-center justify-center h-64">
                            {template.isBlank ? (
                                <Link href={template.link}>
                                
                                        <PlusIcon className="h-24 w-full text-gray-600 justify-center" />
                                 
                                </Link>
                            ) : (
                                <img src={template.imageSrc} alt="Logo" className="h-24 w-auto rounded-lg" />
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-bold text-center text-gray-800">{template.title}</h2>
                            {template.description && <p className="mt-2 text-gray-600">{template.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Previous</button>
                <span className="px-4 py-2 text-gray-700">Page 1 of 10</span>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Next</button>
            </div>

        </div>
    );
};

export default PageTempalte;
