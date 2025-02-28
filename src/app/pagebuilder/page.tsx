import FormCollection from "./components/FormCollection"
import PageSection from "./components/PageSection"

const PageBuilder = () => {

    return(
        <div>
            <h1 className="text-black">Page builder</h1>
            <div className="flex">
                <FormCollection/>
                <PageSection />
            </div>
        </div>
    )

}

export default PageBuilder