import {templateList} from "../templateApi";
import Loading from "../component/Loading";
import {useAsync} from "react-async-hook";
import {useTemplateDispatch, useTemplateState} from "../TemplateContext";
import {isEmpty} from "../../util/typeUtile";
import TemplateList from "../component/TemplateList";
import '../style/TemplateList.css'
const TemplateListView = () => {
    const {categoryNo} = useTemplateState()
    const state = useAsync(templateList,[0,categoryNo]);

    return(
            <TemplateList state={state}/>
    )


};
export default TemplateListView;
